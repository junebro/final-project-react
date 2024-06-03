import React, { useState, useEffect } from 'react';
import './css/ChatPopup.css';
import { connect, disconnect, sendMessage, getIsConnected } from '../common/ChatService';

const ChatPopup = ({ isOpen, onClose }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState('');

  useEffect(() => {
    if (isOpen) {
      console.log("Attempting to connect to WebSocket...");
      connect((msg) => {
        console.log("Message received:", msg);
        setMessages(prevMessages => [...prevMessages, msg.messageText]);
      });
      // 예를 들어 로컬 스토리지에서 사용자 ID를 가져옵니다.
      const storedSenderId = localStorage.getItem('senderId');
      setSenderId(storedSenderId);
    }
    return () => {
      console.log("Disconnecting from WebSocket...");
      disconnect();
    };
  }, [isOpen]);

  const handleSendMessage = () => {
    if (messageText && getIsConnected()) {
      // 메시지 전송 시 senderId도 함께 전송
      sendMessage(messageText, senderId);
      setMessageText('');
    } else {
      console.error("메세지를 보낼 수 없습니다. Socket이 연결되지 않았습니다.");
      alert("메시지를 보낼 수 없습니다. 서버와의 연결이 끊어졌습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-popup">
      <div className="chat-header">
        <button onClick={onClose}>닫기</button>
      </div>
      <ul className="messages-list">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <div className="message-input">
        <input
          type="text"
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>보내기</button>
      </div>
    </div>
  );
};

export default ChatPopup;