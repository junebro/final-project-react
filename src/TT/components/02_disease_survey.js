import React, { useContext, useState } from "react";
import "./../css/disease_survey_css.css";
import "./../css/content_css.css";
import { Link } from "react-router-dom";
import { NutriContext } from "../Nutri_Context";

function App() {
  // 체크박스 정보를 담은 배열
  const checkboxes = [
    { id: 1, name: "해당 없음" },
    { id: 2, name: "비만" },
    { id: 3, name: "당뇨" },
    { id: 4, name: "고혈압" },
    { id: 5, name: "골다공증" },
    { id: 6, name: "콜레스테롤" },
    { id: 7, name: "고중성지방" },
    { id: 8, name: "지방간" },
  ];

  const [selectedCheckbox, setSelectedCheckbox] = useState(1);

  // 체크박스 상태 업데이트 함수
  const CheckOnlyOne = (id) => {
    setSelectedCheckbox(id);
    setSelectedDisease(id);
  };

  // 정보 저장 테스트
  const {
    selectedDisease,
    setSelectedDisease,
    nutriGenderState,
    nutriAge,
    nutriHeight,
    nutriWeight,
  } = useContext(NutriContext);

  // 저장 정보 출력 테스트
  const ContextCheck = () => {
    console.log(
      "저장된 정보\n나이 : " +
        nutriAge +
        "\n키 : " +
        nutriHeight +
        "\n몸무게 : " +
        nutriWeight +
        "\n성별 : " +
        nutriGenderState +
        "\n질병 코드 : " +
        selectedDisease
    );
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
          {/* 각 체크박스 렌더링 */}
          {checkboxes.map((checkbox) => (
            <div key={checkbox.id}>
              <input
                type="checkbox"
                id={`checkbox${checkbox.id}`}
                value={checkbox.id}
                checked={selectedCheckbox === checkbox.id}
                onChange={() => CheckOnlyOne(checkbox.id)}
              />
              <label htmlFor={`checkbox${checkbox.id}`}>
                <span className="checkbox_span">{checkbox.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* 컨텍스트 저장 / 다음 링크로 넘어가는 버튼 */}
      <div>
        <Link
          to="http://localhost:3000/nutri/nutri/content03"
          onClick={ContextCheck()}
          className="next_button"
        >
          <span>다음</span>
        </Link>
      </div>
    </>
  );
}

export default App;
