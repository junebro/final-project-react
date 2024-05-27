import React, { useContext } from "react";
import { NutriContext } from "../Nutri_Context";
import "./../css/Nutrient_css.css";
import Chart from "./chart.js";

function App() {
  const {
    nutriGenderState,
    nutriAge,
    nutriHeight,
    nutriWeight,
    selectedDisease,
    selectedAllergies,
    exerciseRate,
    soup,
    alcoholRate,
    responseData,
    userName,
  } = useContext(NutriContext);
  var gender = "";
  if (!responseData) {
    return <div className="customerInfo">Loading...</div>;
  }
  // 성별판독
  if (nutriGenderState == 1) {
    gender = "남성";
  } else {
    gender = "여성";
  }
  // 현재 날짜
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  return (
    <div className="center_container">
      <div className="customerName">
        <div>{userName}</div>
        <div>{getCurrentDate()}</div>
      </div>
      <div className="customerInfo">
        <div>
          <p className="pt_1">고객 정보</p>
          <p>
            {userName} / {gender}
          </p>
        </div>
        <div>
          <p className="pt_1">키/몸무게</p>
          <p>
            {nutriHeight}cm / {nutriWeight}kg
          </p>
        </div>
        <div>
          <p className="pt_1">질병</p>
          <p>{selectedDisease}</p>
        </div>
        <div>
          <p className="pt_1">고객 정보</p>
          <p>해당없는색</p>
        </div>
      </div>
      <div>{userName}님 의 영양소 비율</div>
      <div className="chart_div">
        <Chart />
      </div>
    </div>
  );
}

export default App;
