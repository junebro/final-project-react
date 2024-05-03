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
            <span className="checkbox_span">난 술을 안먹어</span>
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
            <span className="checkbox_span">두 세달에 한번?</span>
          </label>

          {/* 체크박스 3*/}
          <input
            type="checkbox"
            id="checkbox3"
            value={3}
            checked={selectedCheckbox === 3}
            onChange={() => CheckOnlyOne(3)}
          />
          <label htmlFor="checkbox3">
            <span className="checkbox_span">1달에한번</span>
          </label>

          {/* 체크박스 4*/}
          <input
            type="checkbox"
            id="checkbox4"
            value={4}
            checked={selectedCheckbox === 4}
            onChange={() => CheckOnlyOne(4)}
          />
          <label htmlFor="checkbox4">
            <span className="checkbox_span">한달에서너번</span>
          </label>

          {/* 체크박스 5*/}
          <input
            type="checkbox"
            id="checkbox5"
            value={5}
            checked={selectedCheckbox === 5}
            onChange={() => CheckOnlyOne(5)}
          />
          <label htmlFor="checkbox5">
            <span className="checkbox_span">일주일에 두세번</span>
          </label>

          {/* 체크박스 6*/}
          <input
            type="checkbox"
            id="checkbox6"
            value={6}
            checked={selectedCheckbox === 6}
            onChange={() => CheckOnlyOne(6)}
          />
          <label htmlFor="checkbox6">
            <span className="checkbox_span">거의 항상 만취상태</span>
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
