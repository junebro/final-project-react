import React, { useState } from "react";
import "./../css/soup_alcohol_qa_css.css";
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
        <div className="soup_alchol_qa">
          {/* 체크박스 1 */}
          <input
            type="checkbox"
            id="checkbox1"
            value={1}
            checked={selectedCheckbox === 1}
            onChange={() => CheckOnlyOne(1)}
          />
          <label htmlFor="checkbox1">
            <span className="checkbox_span">
              국물요리 처먹을 때 건더기도 처먹니?
            </span>
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
            <span className="checkbox_span">안처먹니?</span>
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
