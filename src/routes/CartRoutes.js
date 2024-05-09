import React from "react";
import { Routes, Route } from "react-router-dom";

import Cart from "../cart/cart";

const MainRoutes = () => {
  return (
    <Routes> {/* Route 컴포넌트를 Routes 컴포넌트로 감싸주어야 합니다 */}
        <Route path="/Cart" element={<Cart />} />
    </Routes>
  );
};

export default MainRoutes;