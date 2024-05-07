// Router.js
import { Routes, Route } from "react-router-dom";
import Main from "./main/main";
import Products from "./products/App";
import Cart from "./cart/cart";
import Member from "./member/join";
import Mypage from "./mypage/nutrition";


function App() {
  return (
    <Routes>
      {/* 웹 서비스 소개 페이지 */}
      <Route path="/" element={<Main />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Member" element={<Member />} />
      <Route path="/Mypage" element={<Mypage />} />
    </Routes>
  );
}

export default App;