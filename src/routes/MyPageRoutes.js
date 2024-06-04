import React from "react";
import { Routes, Route } from "react-router-dom";

import ChangePw from "../mypage/changePw";
import EditProfile from "../mypage/editProfile";
import Nutrition from "../mypage/nutrition";
import MyCommunity from "../mypage/myCommunity";
import HealthDiary from "../mypage/healthDiary";
import DiaryDetail from "../mypage/diaryDetail";
import OrderList from "../mypage/orderList";
import Nutrient from "../mypage/nutritionNutrient";

const MainRoutes = () => {
  return (
    <Routes> {/* Route 컴포넌트를 Routes 컴포넌트로 감싸주어야 합니다 */}
        <Route path="/Nutrition" element={<Nutrition />} /> 
        <Route path="/MyCommunity" element={<MyCommunity />} /> 
        <Route path="/HealthDiary" element={<HealthDiary />} /> 
        <Route path="/DiaryDetail" element={<DiaryDetail />} /> 
        <Route path="/OrderList" element={<OrderList />} /> 
        <Route path="/Nutrient" element={<Nutrient />} /> 

        <Route path="/EditProfile" element={<EditProfile />} /> 
        <Route path="/ChangePw" element={<ChangePw />} />
    </Routes>
  );
};

export default MainRoutes;