//index.js
import React, { useState } from 'react';
import { createRoot } from "react-dom/client";
import App from "./Router"; // App 컴포넌트, 실제 경로에 맞게 조정 필요
import { BrowserRouter } from "react-router-dom";
import { ItemProvider } from "./common/contexts/ProductsContext"; // ItemProvider import, 실제 경로에 맞게 조정 필요

import { MemberProvider } from "./common/contexts/MemberContext";
import { BoardProvider } from "./common/contexts/BoardContext";
import { AuthProvider } from "./common/contexts/AuthContext";
import ChatButton from "./common/chatbutton"; // ChatButton 컴포넌트 임포트
import ChatPopup from './common/ChatPopup';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <AuthProvider>
      
        <MemberProvider>
          <BoardProvider>
            <App />
            <ChatComponents /> {/* 모든 페이지에서 접근 가능하도록 추가 */}
          </BoardProvider>
        </MemberProvider>
     
    </AuthProvider>
  </BrowserRouter>
);

// 별도의 컴포넌트로 채팅 버튼과 팝업을 관리
function ChatComponents() {
  const [isChatOpen, setChatOpen] = useState(false); // 채팅 팝업 상태 관리

  return (
    <>
      <ChatButton onClick={() => setChatOpen(true)} />
      <ChatPopup isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
