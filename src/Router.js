// Router.js
import { Routes, Route } from "react-router-dom";
import Main from "./main/main";
import Products from "./products/App";
import Cart from "./cart/cart";


function App() {
  return (
    <Routes>
      {/* 웹 서비스 소개 페이지 */}
      <Route path="/" element={<Main />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
    </Routes>
  );
}

export default App;