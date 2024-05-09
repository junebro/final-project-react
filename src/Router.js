// Router.js
import React from 'react';
import { Routes, Route } from "react-router-dom";

import MainRoutes from "./routes/MainRoutes";
import MyPageRoutes from "./routes/MyPageRoutes";
import BoardRoutes from "./routes/BoardRoutes";
import ProductsRoutes from "./routes/ProductsRoutes";
import CartRoutes from "./routes/CartRoutes";
import MemberRoutes from "./routes/MemberRoutes";

import DietRoutes from "./routes/DietRoutes";
import OrderRoutes from "./routes/OrderRoutes";

import NutriRoutes from "./routes/NutriRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainRoutes />} />
      <Route path="/board/*" element={<BoardRoutes />} /> 
      <Route path="/mypage/*" element={<MyPageRoutes />} />
      <Route path="/products/*" element={<ProductsRoutes />} />
      <Route path="/cart/*" element={<CartRoutes />} />
      <Route path="/member/*" element={<MemberRoutes />} />

      <Route path="/diet/*" element={<DietRoutes />} />
      <Route path="/order/*" element={<OrderRoutes />} />
      <Route path="/nutri/*" element={<NutriRoutes />} />
    </Routes>
  );
}

export default App;


// import Nutri from "./TT/App_nutri";


// // import Main from "./main/main";
// // import Products from "./products/App";
// import Cart from "./cart/cart";
// import Diet from "./diet/diet";
// import Order from "./order/order";


// import Join from "./member/join";
// import ChangePw from "./mypage/changePw";
// import EditProfile from "./mypage/editProfile";
// import Nutrition from "./mypage/nutrition";
// import MyCommunity from "./mypage/myCommunity";
// import HealthDiary from "./mypage/healthDiary";
// import DiaryDetail from "./mypage/diaryDetail";
// import OrderList from "./mypage/orderList";


// import Board from "./board/boardList";
// import BoardList from "./board/boardList";
// import BoardInsert from "./board/boardInsert";
// import BoardDetail from "./board/boardDetail";

// // import Diary from "./mypage/diary";

// function App() {
//   return (
//     <Routes>
//       {/* 웹 서비스 소개 페이지 */}
//       {/* <Route path="/" element={<Main />} /> */}
//       {/* <Route path="/Products" element={<Products />} /> */}
//       <Route path="/Cart" element={<Cart />} />
//       <Route path="/Order" element={<Order />} />
//       <Route path="/Diet" element={<Diet />} />

//       <Route path="/Join" element={<Join />} /> 
//       <Route path="/Nutrition" element={<Nutrition />} /> 
//       <Route path="/MyCommunity" element={<MyCommunity />} /> 
//       <Route path="/HealthDiary" element={<HealthDiary />} /> 
//       <Route path="/DiaryDetail" element={<DiaryDetail />} /> 
//       <Route path="/OrderList" element={<OrderList />} /> 
      
//       <Route path="/EditProfile" element={<EditProfile />} /> 
//       <Route path="/ChangePw" element={<ChangePw />} /> 

//       <Route path="/board" element={<Board />} />
//       <Route path="/boardList" element={<BoardList />} />
//       <Route path="/boardInsert" element={<BoardInsert />} />
//       <Route path="/boardDetail" element={<BoardDetail />} />


//       <Route path="/Nutri/*" element={<Nutri />} />

  
//     </Routes>
//   );
// }

// export default App;
