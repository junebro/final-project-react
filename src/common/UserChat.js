import React, { useState } from 'react';
import ChatButton from './chatbutton';
import ChatPopup from './ChatPopup';

const UserChat = () => {
  const [isUserChatOpen, setUserChatOpen] = useState(false);

  const handleUserChatOpen = () => {
    setUserChatOpen(true);
  };

  const handleUserChatClose = () => {
    setUserChatOpen(false);
  };

  return (
    <div>
      <ChatButton onClick={handleUserChatOpen} />
      <ChatPopup isOpen={isUserChatOpen} onClose={handleUserChatClose} endpoint="userchat" />
    </div>
  );
};

export default UserChat;
