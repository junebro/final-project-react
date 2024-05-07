// Router.js
import { Routes, Route } from "react-router-dom";
import Main from "./main/main";
import Products from "./products/App";
import Cart from "./cart/cart";
import Diet from "./diet/diet";
import Member from "./member/login";

import Board from "./board/boardList";
import BoardList from "./board/boardList";
import BoardInsert from "./board/boardInsert";
import BoardDetail from "./board/boardDetail";



function App() {
  return (
    <Routes>
      {/* 웹 서비스 소개 페이지 */}
      <Route path="/" element={<Main />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />

      <Route path="/Member" element={<Member />} /> 

      <Route path="/board" element={<Board />} />
      <Route path="/boardList" element={<BoardList />} />
      <Route path="/boardInsert" element={<BoardInsert />} />
      <Route path="/boardDetail" element={<BoardDetail />} />

      <Route path="/Diet" element={<Diet />} />
      <Route path="/Member" element={<Member />} />

    </Routes>
  );
}

export default App;