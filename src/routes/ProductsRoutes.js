import React from "react";
import { Routes, Route } from "react-router-dom";

import Products from "../products/App";

const MainRoutes = () => {
  return (
    <Routes> {/* Route 컴포넌트를 Routes 컴포넌트로 감싸주어야 합니다 */}
        <Route path="/Products/:tp" element={<Products />} />
    </Routes>
  );
};

export default MainRoutes;