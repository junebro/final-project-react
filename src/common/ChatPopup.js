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
        setMessages(prevMessages => {
          const exists = prevMessages.some(m => m.uid === msg.uid);
          if (!exists) {
            return [...prevMessages, { ...msg, isSender: msg.senderId === senderId }];
          }
          return prevMessages;
        });
      });

      const storedSenderId = localStorage.getItem('senderId');
      setSenderId(storedSenderId);
    } else {
      console.log("Disconnecting from WebSocket...");
      disconnect();
    }

    return () => {
      console.log("Cleanup on component unmount...");
      disconnect();
    };
  }, [isOpen]);

  const handleSendMessage = () => {
    if (messageText && getIsConnected()) {
      const uid = generateUID(); // 고유 식별자 생성
      const messageToSend = { messageText, senderId, uid, isSender: true };
      sendMessage(messageToSend); // 메시지 전송
      setMessages(prevMessages => [...prevMessages, messageToSend]);
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
          <li key={index} className={msg.isSender ? "message-sent" : "message-received"}>
            {msg.messageText}
          </li>
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

function generateUID() {
    let timeStamp = new Date().getTime();
    let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (timeStamp + Math.random() * 16) % 16 | 0;
        timeStamp = Math.floor(timeStamp / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uid;
}
