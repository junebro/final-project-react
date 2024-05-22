import React, { useState } from "react";
import "./../css/allergy_foods_css.css";
import "./../css/content_css.css";
import { Link } from "react-router-dom";
import { NutriContext } from "../Nutri_Context";
import { useContext } from "react";

function App() {
  const { selectedAllergies, setSelectedAllergies } = useContext(NutriContext);

  // 각 체크박스의 이름을 저장하는 배열
  const checkboxes = [
    "돼지고기",
    "소고기",
    "닭고기",
    "오징어",
    "조개류",
    "고등어",
    "새우",
    "게",
    "복숭아",
    "토마토",
    "잣",
    "땅콩",
    "호두",
    "우유",
    "아황산류",
    "난류",
    "대두",
    "밀",
    "메밀",
  ];

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    Array(checkboxes.length).fill(false) // 체크박스 개수만큼 false로 초기화
  );

  // 체크박스 상태 업데이트
  const handleCheckboxChange = (index) => {
    setSelectedCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((isChecked, i) =>
        i === index ? !isChecked : isChecked
      )
    );
  };

  // 선택된 체크박스의 이름을 반환하는 함수
  const getSelectedParameters = () => {
    const selectedParameters = checkboxes
      .filter((_, index) => selectedCheckboxes[index]) // 선택된 체크박스의 이름 반환
      .join(", "); // 선택된 체크박스 이름을 쉼표로 구분하여 문자열로 반환

    return selectedParameters;
  };

  // 선택된 알러지 음식을 Context에 저장하는 함수
  const ContextUpdate = () => {
    setSelectedAllergies(getSelectedParameters());
    console.log(selectedAllergies);
  };

  return (
    <>
      <div className="main_alert">
        알러지가 있거나
        <br />
        드실 수 없는 음식을
        <br />
        모두 체크해주세요
      </div>
      <div className="center_container">
        <div className="allergy_check_container">
          {checkboxes.map((checkbox, index) => (
            <React.Fragment key={index}>
              {/* 각 체크박스 렌더링 */}
              <input
                type="checkbox"
                id={`checkbox${index + 1}`}
                checked={selectedCheckboxes[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`checkbox${index + 1}`}>
                <span className="checkbox_span">{checkbox}</span>
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* 컨텍스트 저장 / 다음 링크로 넘어가는 버튼 */}
      <div>
        <Link
          to="http://localhost:3000/nutri/nutri/content04"
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
