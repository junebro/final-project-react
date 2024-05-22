//index.js
import { createRoot } from "react-dom/client";
import App from "./Router"; // App 컴포넌트, 실제 경로에 맞게 조정 필요
import { BrowserRouter } from "react-router-dom";
import { ItemProvider } from "./common/contexts/ProductsContext"; // ItemProvider import, 실제 경로에 맞게 조정 필요

import { MemberProvider } from "./common/contexts/MemberContext";
import { BoardProvider } from "./common/contexts/BoardContext";
import { AuthProvider } from "./common/contexts/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ItemProvider>
        <MemberProvider>
          <BoardProvider>
            <App />
          </BoardProvider>
        </MemberProvider>
      </ItemProvider>
    </AuthProvider>
  </BrowserRouter>
);
