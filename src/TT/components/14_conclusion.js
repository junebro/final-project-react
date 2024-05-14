import React, { useState, useEffect } from "react";
import "./../css/drag_css.css";
import { Link } from "react-router-dom";
import { NutriContext } from "../Nutri_Context";
import { useContext } from "react";

function App() {
  const [message, setMessage] = useState("");
  // Context 정보
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
    drag1Items,
    drag2Items,
    drag3Items,
    drag4Items,
    drag5Items,
    drag6Items,
  } = useContext(NutriContext);

  // 테스트
  const test = () => {
    console.log(
      nutriGenderState,
      nutriAge,
      nutriHeight,
      nutriWeight,
      selectedDisease,
      selectedAllergies,
      exerciseRate,
      soup,
      alcoholRate,
      drag1Items,
      drag2Items,
      drag3Items,
      drag4Items,
      drag5Items,
      drag6Items
    );
  };

  useEffect(() => {
    fetch("/test/nu")
      .then((response) => response.text())
      .then((message) => {
        setMessage(message);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <button onClick={test()}>
          테스트버튼테스트버튼테스트버튼테스트버튼테스트버튼테스트버튼테스트버튼테스트버튼
        </button>
      </div>
      {message}
      {/* 컨텍스트 저장 / 다음 링크로 넘어가는 버튼 */}
      <div>
        <Link
          to="http://localhost:3000/nutri/nutri/"
          onClick={""}
          className="next_button"
        >
          <span>제출</span>
        </Link>
      </div>
    </div>
  );
}

export default App;
