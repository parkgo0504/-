# fastapi
fastapi + openai 나중에 백엔드와 react연결할 예정


#1. 가상환경을 만듦
python -m venv fastenv


#2. 가상환경으로 이동
.\fastenv\Scripts\activate

#3. 필요한 설치 
pip install -r .\requirements.txt

ex) npm install fastapi

#4. 실행
uvicorn main:app --reload

#5. 안되면
python uvicorn main:app --reload
# -
