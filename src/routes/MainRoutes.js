import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../main/main";
import Products from "../products/App";
import Cart from "../cart/cart";
import Diet from "../diet/diet";
import Order from "../order/orders";

const MainRoutes = () => {
  return (
    <Routes> {/* Route 컴포넌트를 Routes 컴포넌트로 감싸주어야 합니다 */}
        <Route path="/" element={<Main />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Diet" element={<Diet />} />
    </Routes>
  );
};

export default MainRoutes;