import React, { useState } from "react";
import "./../css/exercise_rate_css.css";
import "./../css/content_css.css";
import { Link } from "react-router-dom";
import { NutriContext } from "../Nutri_Context";
import { useContext } from "react";

function App() {
  const [selectedCheckbox, setSelectedCheckbox] = useState(1);
  //  체크박스 상태 -> 한개만 체크
  const CheckOnlyOne = (value) => {
    setSelectedCheckbox(value);
    setExerciseRate(value);
  };

  const { exerciseRate, setExerciseRate } = useContext(NutriContext);

  const ContextUpdate = () => {
    console.log(exerciseRate);
  };

  return (
    <>
      <div className="main_alert">
        평소 활동량에 대해서
        <br />
        체크해주세요
      </div>
      <div className="center_container">
        <div className="exercise_QA_container">
          {/* 체크박스 1 */}
          <input
            type="checkbox"
            id="checkbox1"
            value={1}
            checked={selectedCheckbox === 1}
            onChange={() => CheckOnlyOne(1)}
          />
          <label htmlFor="checkbox1">
            <span className="checkbox_span">대부분 앉아서 생활합니다</span>
          </label>

          {/* 체크박스 2 */}
          <input
            type="checkbox"
            id="checkbox2"
            value={2}
            checked={selectedCheckbox === 2}
            onChange={() => CheckOnlyOne(2)}
          />
          <label htmlFor="checkbox2">
            <span className="checkbox_span">가벼운 활동을 주로 합니다</span>
          </label>

          {/* 체크박스 3 */}
          <input
            type="checkbox"
            id="checkbox3"
            value={3}
            checked={selectedCheckbox === 3}
            onChange={() => CheckOnlyOne(3)}
          />
          <label htmlFor="checkbox3">
            <span className="checkbox_span">
              자전거, 조깅 등 약간 숨이 가쁜 정도 운동을 합니다(주 3회 이상)
            </span>
          </label>

          {/* 체크박스 4 */}
          <input
            type="checkbox"
            id="checkbox4"
            value={4}
            checked={selectedCheckbox === 4}
            onChange={() => CheckOnlyOne(4)}
          />
          <label htmlFor="checkbox4">
            <span className="checkbox_span">
              수영, 테니스 등의 격렬한 운동을 합니다(주 3회 이상)
            </span>
          </label>
        </div>
      </div>
      {/* 컨텍스트 저장 / 다음 링크로 넘어가는 버튼 */}
      <div>
        <Link
          to="http://localhost:3000/nutri/nutri/content05"
          onClick={ContextUpdate()}
          className="next_button"
        >
          <span>다음</span>
        </Link>
      </div>
    </>
  );
}

export default App;
