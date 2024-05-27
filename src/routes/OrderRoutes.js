import React from "react";
import { Routes, Route } from "react-router-dom";

import Order from "../order/orders";

const MainRoutes = () => {
  return (
    <Routes> {/* Route 컴포넌트를 Routes 컴포넌트로 감싸주어야 합니다 */}
        <Route path="/orderApp" element={<Order />} />
    </Routes>
  );
};

export default MainRoutes;