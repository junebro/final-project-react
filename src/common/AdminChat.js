import React, { useState } from 'react';
import ChatButton from './chatbutton';
import ChatPopup from './ChatPopup';

const AdminChat = () => {
  const [isAdminChatOpen, setAdminChatOpen] = useState(false);

  const handleAdminChatOpen = () => {
    setAdminChatOpen(true);
  };

  const handleAdminChatClose = () => {
    setAdminChatOpen(false);
  };

  return (
    <div>
      <ChatButton onClick={handleAdminChatOpen} />
      <ChatPopup isOpen={isAdminChatOpen} onClose={handleAdminChatClose} endpoint="adminchat" />
    </div>
  );
};

export default AdminChat;
