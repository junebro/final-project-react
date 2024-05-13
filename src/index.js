//index.js
import { createRoot } from "react-dom/client";
import App from "./Router";  // App 컴포넌트, 실제 경로에 맞게 조정 필요
import { BrowserRouter } from "react-router-dom";
import { ItemProvider } from './ItemContext';  // ItemProvider import, 실제 경로에 맞게 조정 필요

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <ItemProvider>
      <App />
    </ItemProvider>
  </BrowserRouter>
);