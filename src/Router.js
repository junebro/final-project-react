// Router.js
import React from 'react';
import { Routes, Route } from "react-router-dom";

import NutriRoutes from "./routes/NutriRoutes";
import MainRoutes from "./routes/MainRoutes";
import MyPageRoutes from "./routes/MyPageRoutes";
import BoardRoutes from "./routes/BoardRoutes";
import ProductsRoutes from "./routes/ProductsRoutes";
import CartRoutes from "./routes/CartRoutes";
import MemberRoutes from "./routes/MemberRoutes";

import DietRoutes from "./routes/DietRoutes";
import OrderRoutes from "./routes/OrderRoutes";

function App() {
  return (
    <Routes>
      <Route path="/nutri/*" element={<NutriRoutes />} />
      <Route path="/" element={<MainRoutes />} />
      <Route path="/board/*" element={<BoardRoutes />} /> 
      <Route path="/mypage/*" element={<MyPageRoutes />} />
      <Route path="/products/*" element={<ProductsRoutes />} />
      <Route path="/cart/*" element={<CartRoutes />} />
      <Route path="/member/*" element={<MemberRoutes />} />

      <Route path="/diet/*" element={<DietRoutes />} />
      <Route path="/order/*" element={<OrderRoutes />} />
      
    </Routes>
  );
}

export default App;