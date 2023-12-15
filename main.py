import os
from fastapi import FastAPI
from pydantic import BaseModel
import openai
from fastapi.middleware.cors import CORSMiddleware
import pymysql
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from haversine import haversine, Unit
from typing import List
import itertools
from kiwipiepy import Kiwi
from DB_select_module import get_user_favorites
from distance_modules import sort_by_distance
from distance_modules import calculate_distance
from fastapi.responses import JSONResponse
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone
from langchain.vectorstores import Pinecone
from langchain.prompts.prompt import PromptTemplate
from langchain.prompts import ChatPromptTemplate
from langchain.schema import format_document
from langchain.schema.runnable import RunnableLambda, RunnablePassthrough
from operator import itemgetter
from langchain.schema.output_parser import StrOutputParser
from langchain.memory import ConversationSummaryBufferMemory
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.agents import Tool, AgentExecutor, LLMSingleActionAgent, AgentOutputParser
from langchain.prompts import StringPromptTemplate
from langchain.llms import OpenAI
from langchain.utilities import SerpAPIWrapper
from langchain.chains import LLMChain
from typing import List, Union
from langchain.schema import AgentAction, AgentFinish, OutputParserException
from langchain.tools import Tool
from langchain.utilities import GoogleSearchAPIWrapper
import re
import textwrap
from time import monotonic
from dotenv import load_dotenv

# env읽기
load_dotenv()

class Message(BaseModel):
    content: str

class AItem(BaseModel):
    attr_num: int
    tourtype: str



app = FastAPI()
# 도커빌드

# github올릴때 주석풀고 본인이 쓴 apikey는 삭제 ### 중요중요중요중요중요중요중요중요중요
#openai.api_key= os.getenv('API_KEY')
openai.api_key= os.getenv("API_KEY")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 오리진 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 챗봇 기능

model_name = 'text-embedding-ada-002'

embed = OpenAIEmbeddings(
    model=model_name,api_key=openai.api_key
)

index_name = 'chatbot'
pinecone.init(
    api_key=os.getenv("PINECONE_KEY"),
    environment="gcp-starter"  # find next to API key in console
)
index = pinecone.Index(index_name)

vectorstore = Pinecone(
    index, embed, "text",namespace='detail_info'
)
in_retriever=vectorstore.as_retriever(search_kwargs={"k": 3})

vectorstore = Pinecone(
    index, embed, "text",namespace='review'
)
rv_retriever=vectorstore.as_retriever(search_kwargs={"k": 15})




_template = """
You are a chatbot dedicated to Jeju Island tourism.Given the following conversation and a follow-up question, combine the two and summarize them, turning the follow-up question into a stand-alone question in the original language

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:"""
CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_template)

# 답변을 생성하는 템플릿을 정의합니다.
template = """ If you can answer the question well based on the information provided, please answer in 400 Korean characters or less using as much information as possible. Otherwise, answer 'no'

{context}

Question: {question}
"""

ANSWER_PROMPT = ChatPromptTemplate.from_template(template)
DEFAULT_DOCUMENT_PROMPT = PromptTemplate.from_template(template="{page_content}")
def _combine_documents(
    docs, document_prompt=DEFAULT_DOCUMENT_PROMPT, document_separator="\n\n"
):
    doc_strings = [format_document(doc, document_prompt) for doc in docs]
    return document_separator.join(doc_strings)
llm = OpenAI(
    temperature=0,
    openai_api_key=openai.api_key,
    model_name="text-davinci-003"
)
memory = ConversationSummaryBufferMemory(llm=llm, max_token_limit=80,output_key="answer", input_key="question")
loaded_memory = RunnablePassthrough.assign(
    chat_history=RunnableLambda(memory.load_memory_variables) | itemgetter("history"),
)

# Now we calculate the standalone question
standalone_question = {
    "standalone_question": {
        "question": lambda x: x["question"],
        "chat_history": lambda x: x["chat_history"],
    }
    | CONDENSE_QUESTION_PROMPT
    | ChatOpenAI(temperature=0,api_key=openai.api_key)
    | StrOutputParser(),
}
retrieved_documents_rv = {
    "docs": itemgetter("standalone_question") | rv_retriever,
    "question": lambda x: x["standalone_question"],
}
retrieved_documents_in = {
    "docs": itemgetter("standalone_question") | in_retriever,
    "question": lambda x: x["standalone_question"],
}

# Now we construct the inputs for the final prompt
final_inputs = {
    "context": lambda x: _combine_documents(x["docs"]),
    "question": itemgetter("question"),
}


# And finally, we do the part that returns the answers
answer = {
    "answer": final_inputs | ANSWER_PROMPT |ChatOpenAI(temperature=0,model='gpt-4-1106-preview',api_key=openai.api_key),
    "docs": itemgetter("docs"),
}
# And now we put it all together!
final_chain_rv = loaded_memory | standalone_question | retrieved_documents_rv | answer
final_chain_in = loaded_memory | standalone_question | retrieved_documents_in | answer
os.environ["GOOGLE_CSE_ID"] = os.getenv('GOOGLE_CSE')
os.environ["GOOGLE_API_KEY"] = os.getenv('GOOGLE_KEY')
search = GoogleSearchAPIWrapper(k=8)


tools = [
    Tool(
        name="Google Search",
        func=search.run,
        description="useful for when you need to answer questions about current events"
    )
]

template = """Answer the following questions as best you can, You have access to the following tools:

{tools}

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer is provided in Korean by making full use of the search results for the original input question.
Begin!
Question: {input}
{agent_scratchpad}"""
# Set up a prompt template
class CustomPromptTemplate(StringPromptTemplate):
    # The template to use
    template: str
    # The list of tools available
    tools: List[Tool]

    def format(self, **kwargs) -> str:
        # Get the intermediate steps (AgentAction, Observation tuples)
        # Format them in a particular way
        intermediate_steps = kwargs.pop("intermediate_steps")
        thoughts = ""
        for action, observation in intermediate_steps:
            thoughts += action.log
            thoughts += f"\nObservation: {observation}\nThought: "
        # Set the agent_scratchpad variable to that value
        kwargs["agent_scratchpad"] = thoughts
        # Create a tools variable from the list of tools provided
        kwargs["tools"] = "\n".join([f"{tool.name}: {tool.description}" for tool in self.tools])
        # Create a list of tool names for the tools provided
        kwargs["tool_names"] = ", ".join([tool.name for tool in self.tools])
        return self.template.format(**kwargs)

prompt = CustomPromptTemplate(
    template=template,
    tools=tools,
    # This omits the `agent_scratchpad`, `tools`, and `tool_names` variables because those are generated dynamically
    # This includes the `intermediate_steps` variable because that is needed
    input_variables=["input", "intermediate_steps"]
)
class CustomOutputParser(AgentOutputParser):

    def parse(self, llm_output: str) -> Union[AgentAction, AgentFinish]:
        # Check if agent should finish
        if "Final Answer:" in llm_output:
            return AgentFinish(
                # Return values is generally always a dictionary with a single `output` key
                # It is not recommended to try anything else at the moment :)
                return_values={"output": llm_output.split("Final Answer:")[-1].strip()},
                log=llm_output,
            )
        # Parse out the action and action input
        regex = r"Action\s*\d*\s*:(.*?)\nAction\s*\d*\s*Input\s*\d*\s*:[\s]*(.*)"
        match = re.search(regex, llm_output, re.DOTALL)
        if not match:
            raise OutputParserException(f"Could not parse LLM output: `{llm_output}`")
        action = match.group(1).strip()
        action_input = match.group(2)
        # Return the action and action input
        return AgentAction(tool=action, tool_input=action_input.strip(" ").strip('"'), log=llm_output)
output_parser = CustomOutputParser()
llm_name="gpt-3.5-turbo-1106"
llm=ChatOpenAI(model_name=llm_name,temperature=0,openai_api_key=openai.api_key)

llm_chain = LLMChain(llm=llm, prompt=prompt)
tool_names = [tool.name for tool in tools]
agent = LLMSingleActionAgent(
    llm_chain=llm_chain,
    output_parser=output_parser,
    stop=["\nObservation:"],
    allowed_tools=tool_names
)
agent_executor = AgentExecutor.from_agent_and_tools(agent=agent, tools=tools, verbose=True)
prompt = ChatPromptTemplate.from_template(
    "Which category does {question} fall into, 'description', 'recommendation', or 'evaluation through review'? Show only the category."
)
llm = ChatOpenAI(temperature=0, model='gpt-3.5-turbo-1106',api_key=openai.api_key)
chain = LLMChain(llm=llm, prompt=prompt)
def intend_chain(question):
    inputs={'question':question}
    intend=chain.run(question)
    if intend=='description':
        result=final_chain_in.invoke(inputs)
    else:
        result=final_chain_rv.invoke(inputs)
    return result['answer'].content

@app.post("/post-response")
async def conditional_chain(message: Message):
    question=message.content
    result = intend_chain(message.content)
    yn = result
    if yn == 'no':
        qa=agent_executor.run(question)
        memory.save_context({'question':question}, {"answer": qa})
    else:
        qa=yn
        memory.save_context({'question':question}, {"answer": qa})
    return {'message':qa}


# ##########################################################


@app.post("/recommend_root")
async def recommen_response(item: AItem):
    import pandas as pd
    connection = pymysql.connect(host = "project-db-cgi.smhrd.com",port=3307,user="ai2_t1",password ='ai2_t111',db='ai2_t1',charset='utf8')
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    sql = 'use ai2_t1'
    cursor.execute(sql)
    datas = cursor.fetchall()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    sql = 'SELECT * FROM tb_allattr_test'
    cursor.execute(sql)
    datas = cursor.fetchall()
    data=pd.DataFrame(datas)

    tourtype_data = data[data['tourtype']== item.tourtype]

    fix_data = data[data['attr_num'] == item.attr_num]
    lat, lng = fix_data[['lat', 'lng']].values[0]

    from haversine import haversine, Unit
    import pandas as pd

    # 가정: 'data'는 음식점 정보가 포함된 DataFrame이며, 'location'은 튜플 (위도, 경도)
    # 이를 실제 DataFrame과 위치 값으로 대체하세요.

    # location을 튜플로 변환
    location = tuple(map(float, [lat, lng]))


    # 리스트 초기화
    rt_places = []
    min_distances = [float('inf')] * 15  # 상위 15개의 가까운 장소를 찾으므로 크기를 3으로 수정

    for index, row in tourtype_data.iterrows():
        if row['attr_num'] == item.attr_num:
               continue 

        # 'lat'와 'lng'이 문자열인 경우에 대비하여 try-except를 사용하여 변환 시도
        try:
            # df_location에서 문자열을 숫자로 변환
            df_location = (float(row['lat']), float(row['lng']))
        except ValueError:
            continue  # 변환 실패 시 해당 행을 건너기.

        # 거리 계산
        distance = haversine(location, df_location, unit=Unit.KILOMETERS)

        for i in range(15):
            if distance < min_distances[i]:
                min_distances[i] = distance
                rt_places.insert(i, {**row.to_dict(), 'distance_km': round(distance, 1)})
                rt_places = rt_places[:10]
                rt_place = sorted(rt_places, key=lambda x: x['distance_km'])
                break

    # 상위 20개의 가까운 음식점 정보 출력
    
        
    return rt_place

# 즐겨찾기 View
@app.post("/favorite/view/{user_id}")
async def read_data(user_id: str):
    data = get_user_favorites(user_id)
    return data

# 즐겨찾기 정렬해서 보여주기 
@app.post("/favorite/sorted/{user_id}/{fav_num}") 
async def select_fav_data(user_id: str ,fav_num: int):
    data = get_user_favorites(user_id)
    df = pd.DataFrame(data)
    selected_point = df[df['fav_num'] == fav_num].copy()
    sorted_result = sort_by_distance(selected_point, df)

    
    return JSONResponse(content=sorted_result.to_dict(orient='records'))




    

