// Router.js

import Nutri from "./TT/App_nutri";
import { Routes, Route } from "react-router-dom";
import Main from "./main/main";
import Products from "./products/App";
import Cart from "./cart/cart";
import Diet from "./diet/diet";
import Join from "./member/join";
import ChangePw from "./mypage/changePw";
import EditProfile from "./mypage/editProfile";
import Nutrition from "./mypage/nutrition";
import MyCommunity from "./mypage/myCommunity";
import HealthDiary from "./mypage/healthDiary";
import DiaryDetail from "./mypage/diaryDetail";

import Order from "./order/order";

import OrderList from "./mypage/orderList";

import Board from "./board/boardList";
import BoardList from "./board/boardList";
import BoardInsert from "./board/boardInsert";
import BoardDetail from "./board/boardDetail";
// import Diary from "./mypage/diary";

function App() {
  return (
    <Routes>
      {/* 웹 서비스 소개 페이지 */}
      <Route path="/" element={<Main />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Order" element={<Order />} />

      <Route path="/Join" element={<Join />} />
      <Route path="/Nutrition" element={<Nutrition />} />
      <Route path="/MyCommunity" element={<MyCommunity />} />
      <Route path="/HealthDiary" element={<HealthDiary />} />
      <Route path="/DiaryDetail" element={<DiaryDetail />} />
      <Route path="/OrderList" element={<OrderList />} />

      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/ChangePw" element={<ChangePw />} />

      <Route path="/board" element={<Board />} />
      <Route path="/boardList" element={<BoardList />} />
      <Route path="/boardInsert" element={<BoardInsert />} />
      <Route path="/boardDetail" element={<BoardDetail />} />

      <Route path="/Diet" element={<Diet />} />
      <Route path="/Nutri/*" element={<Nutri />} />
    </Routes>
  );
}

export default App;
