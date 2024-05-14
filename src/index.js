//index.js
import { createRoot } from "react-dom/client";
import App from "./Router";  // App 컴포넌트, 실제 경로에 맞게 조정 필요
import { BrowserRouter } from "react-router-dom";
import { ItemProvider } from './common/contexts/ItemContext';  // ItemProvider import, 실제 경로에 맞게 조정 필요

import { MemberProvider } from './common/contexts/MemberContext'; 
import { BoardProvider } from './common/contexts/BoardContext'; 

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <ItemProvider>
      <MemberProvider> 
        <BoardProvider>
         <App />
        </BoardProvider>
      </MemberProvider>
    </ItemProvider>
  </BrowserRouter>
);