import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminProduct from "../admin/adminProduct";


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminProduct />} />
    </Routes>
  );
};
export default MainRoutes;