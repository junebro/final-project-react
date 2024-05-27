import React from 'react';
import './css/chatbutton.css'; 

const ChatButton = ({ onClick }) => {
  return (
    <button className="chat-button" onClick={onClick}>
      채팅 시작
    </button>
  );
};

export default ChatButton;
