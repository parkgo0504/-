import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBoardApi } from '../apis';
import { webStorages } from '../constants';
import './AiTest.css';


const LoadingBar = () => (
  <div className="loading-bar">
    <div className="bar"></div>
  </div>
);

export default function AiTest() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [inputdisplay, setInputDisplay] = useState(false)


  useEffect(() => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'bot', content: '안녕하세요! 무엇을 도와드릴까요?' },
    ]);

    console.log(localStorage.getItem(webStorages.user));
    getBoardApi();
  }, []);

  const sendMessage = async () => {
    setInputDisplay(true);
    setLoading(true); 

    const result = await axios.post(
      'https://fastapi-service-s26rn5fmbq-du.a.run.app/post-response',
      { content: input }
    );

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: input },
      { role: 'bot', content: result.data.message },
    ]);

    setInput('');
    setLoading(false); 
    setInputDisplay(false)
  };

  return (
    <div className="chat-room-container">
      <div className="chat-header">제주 ChatBot</div>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div style={{ fontSize: '17px' }} key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>


      {loading && <LoadingBar />}

      <div className="input-container">
        <input
          style={{ fontSize: '17px', borderRadius: '5px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !inputdisplay) {
              sendMessage();
            }
          }}
          placeholder="메시지를 입력하세요."
          disabled={inputdisplay}
        />
        <button className={inputdisplay ? "disableSend-button" : "send-button"} onClick={sendMessage} 
        disabled = {inputdisplay}>
          전송
        </button>
      </div>
    </div>
  );
}
