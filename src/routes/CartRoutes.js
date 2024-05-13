import React from "react";
import { Routes, Route } from "react-router-dom";

import Cart from "../cart/cart";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default MainRoutes;