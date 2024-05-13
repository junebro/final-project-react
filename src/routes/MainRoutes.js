import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../main/main";
import Products from "../products/App";
import Cart from "../cart/cart";
import Diet from "../diet/diet";
import Order from "../order/orders";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/diet" element={<Diet />} />
    </Routes>
  );
};
export default MainRoutes;
