import React, { Component, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// 상단 bar css
import Top from "./components/top01.js";
//  추가할 페이지 임포트 구간
import Content01 from "./components/01_personal_info_survay.js";
import Content02 from "./components/02_disease_survey.js";
import Content03 from "./components/03_allergy_foods.js";
import Content04 from "./components/04_exercise_rate.js";
import Content05 from "./components/05_soup_qa.js";
import Content06 from "./components/06_alcohol_qa.js";
import Content07 from "./components/07_drag_foods.js";
import Content08 from "./components/08_drag_foods_01.js";
import Content09 from "./components/09_drag_foods_02.js";
import Content10 from "./components/10_drag_foods_03.js";
import Content11 from "./components/11_drag_foods_04.js";
import Content12 from "./components/12_drag_foods_05.js";
import Content13 from "./components/13_drag_foods_06.js";
import Content14 from "./components/14_conclusion.js";
import Nutrient from "./components/15_Nutrient.js";
//  추가할 페이지 임포트 구간
import { useState, useEffect } from "react";
import { NutriProvider } from "./Nutri_Context.js";
import Nav from "./../common/navigation.js";

const App = () => {
  const components = [
    Content01,
    Content02,
    Content03,
    Content04,
    Content05,
    Content06,
    Content07,
    Content08,
    Content09,
    Content10,
    Content11,
    Content12,
    Content13,
    Content14,
    Nutrient,
  ];
  const paths = [
    "/nutri/nutri",
    "/nutri/nutri/content02",
    "/nutri/nutri/content03",
    "/nutri/nutri/content04",
    "/nutri/nutri/content05",
    "/nutri/nutri/content06",
    "/nutri/nutri/content07",
    "/nutri/nutri/content08",
    "/nutri/nutri/content09",
    "/nutri/nutri/content10",
    "/nutri/nutri/content11",
    "/nutri/nutri/content12",
    "/nutri/nutri/content13",
    "/nutri/nutri/content14",
    "/nutri/nutri/content15",
  ];

  return (
    <NutriProvider>
      <div>
        <br />
        <Top />
        <Routes>
          <Route path="/" element={<Content01 />} />
          {/* Add other Route components here */}
          {/* 나머지 컴포넌트에 대한 Route를 설정합니다. */}
          <Route path="/content02" element={<Content02 />} />
          <Route path="/content03" element={<Content03 />} />
          <Route path="/content04" element={<Content04 />} />
          <Route path="/content05" element={<Content05 />} />
          <Route path="/content06" element={<Content06 />} />
          <Route path="/content07" element={<Content07 />} />
          <Route path="/content08" element={<Content08 />} />
          <Route path="/content09" element={<Content09 />} />
          <Route path="/content10" element={<Content10 />} />
          <Route path="/content11" element={<Content11 />} />
          <Route path="/content12" element={<Content12 />} />
          <Route path="/content13" element={<Content13 />} />
          <Route path="/content14" element={<Content14 />} />
          <Route path="/content15" element={<Nutrient />} />
        </Routes>
      </div>
    </NutriProvider>
  );
};

export default App;
