import React, { useState } from "react";
import "./../button.css";
import "./../content_css.css";

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
        <div className="button_container">
          {/* 체크박스 1 */}
          <input
            type="checkbox"
            id="checkbox1"
            value={1}
            checked={selectedCheckbox === 1}
            onChange={() => CheckOnlyOne(1)}
          />
          <label htmlFor="checkbox1">
            <span className="checkbox_span">해당 없음</span>
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
            <span className="checkbox_span">비만</span>
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
            <span className="checkbox_span">당뇨</span>
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
            <span className="checkbox_span">고혈압</span>
          </label>

          {/* 체크박스 5 */}
          <input
            type="checkbox"
            id="checkbox5"
            value={5}
            checked={selectedCheckbox === 5}
            onChange={() => CheckOnlyOne(5)}
          />
          <label htmlFor="checkbox5">
            <span className="checkbox_span">골다공증</span>
          </label>

          {/* 체크박스 6 */}
          <input
            type="checkbox"
            id="checkbox6"
            value={6}
            checked={selectedCheckbox === 6}
            onChange={() => CheckOnlyOne(6)}
          />
          <label htmlFor="checkbox6">
            <span className="checkbox_span">고콜레스테</span>
          </label>

          {/* 체크박스 7 */}
          <input
            type="checkbox"
            id="checkbox7"
            value={7}
            checked={selectedCheckbox === 7}
            onChange={() => CheckOnlyOne(7)}
          />
          <label htmlFor="checkbox7">
            <span className="checkbox_span">고중성지방</span>
          </label>

          {/* 체크박스 8 */}
          <input
            type="checkbox"
            id="checkbox8"
            value={8}
            checked={selectedCheckbox === 8}
            onChange={() => CheckOnlyOne(8)}
          />
          <label htmlFor="checkbox8">
            <span className="checkbox_span">지방간</span>
          </label>

          {/* 체크박스 9 */}
          <input
            type="checkbox"
            id="checkbox9"
            value={9}
            checked={selectedCheckbox === 9}
            onChange={() => CheckOnlyOne(9)}
          />
          <label htmlFor="checkbox9">
            <span className="checkbox_span">암</span>
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
