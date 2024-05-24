import React, { useState, useEffect } from 'react';
import './css/ChatPopup.css';
import { connect, disconnect, sendMessage, isConnected } from '../common/ChatService';

const ChatPopup = ({ isOpen, onClose }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isOpen) {
      connect((msg) => {
        const receivedMsg = JSON.parse(msg.body);
        setMessages(prevMessages => [...prevMessages, receivedMsg.messageText]);
      }, (error) => {
        console.error('Connection failed: ', error);
        alert('서버와의 연결에 실패했습니다. 다시 시도해 주세요.');
      });
    }
    return () => {
      disconnect();
    };
  }, [isOpen]);

  const handleSendMessage = () => {
    if (messageText  && isConnected) {
      sendMessage(messageText);
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
