import React, { useState } from "react";
import "./../css/exercise_rate_css.css";
import "./../css/content_css.css";

function App() {
  const [selectedCheckbox, setSelectedCheckbox] = useState(1);
  //  체크박스 상태 -> 한개만 체크
  const CheckOnlyOne = (value) => {
    setSelectedCheckbox(value);
  };

  return (
    <>
      <div className="main_alert">
        건강검진에서 진단 받은 요소나
        <br />
        평소 주의 하던 요소 1개만 체크해주세요
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
            <span className="checkbox_span">대부분 앉아</span>
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
            <span className="checkbox_span">
              가벼운 활동 가벼운 활동가벼운 활동가벼운 활동
            </span>
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
              자전거 조깅 등 약간 숨이 가쁜 정도 운동(주3회)
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
              수영, 테니스 등의 격렬한 운동(주 3회 이상)
            </span>
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
