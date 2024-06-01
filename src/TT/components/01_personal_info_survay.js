import React, { useContext, useState, useEffect } from "react";
import "./../css/personal_survey_css.css";
import "./../css/content_css.css";
import { NutriContext } from "../Nutri_Context";
import { Link } from "react-router-dom";
import { useAuth } from "../../common/contexts/AuthContext";

function App() {
  const { user } = useAuth(); // useAuth 훅에서 user ID 가져오기
  console.log("로그인한새끼" + user);
  // Context
  const {
    nutriGenderState,
    setNutriGenderState,
    nutriAge,
    setNutriAge,
    nutriHeight,
    setNutriHeight,
    nutriWeight,
    setNutriWeight,
  } = useContext(NutriContext);

  // 텍스트 입력 상자 정보를 담은 배열
  const checkboxes = [
    { id: "1", name: "남성" },
    { id: "2", name: "여성" },
  ];

  const [selectedCheckbox, setSelectedCheckbox] = useState(
    nutriGenderState || null
  );
  const [age, setAge] = useState(nutriAge || "");
  const [height, setHeight] = useState(nutriHeight || "");
  const [weight, setWeight] = useState(nutriWeight || "");
  const [isValid, setIsValid] = useState(false);

  // 체크박스 상태 업데이트 함수
  const CheckOnlyOne = (id) => {
    setSelectedCheckbox(id);
    setNutriGenderState(id);
  };

  const ContextUpdate = () => {
    setNutriAge(age);
    setNutriHeight(height);
    setNutriWeight(weight);
    console.log(
      "저장된 정보\n나이 : " +
        age +
        "\n키 : " +
        height +
        "\n몸무게 : " +
        weight +
        "\n성별 : " +
        selectedCheckbox
    );
  };

  useEffect(() => {
    const validateForm = () => {
      if (
        selectedCheckbox !== null &&
        age.length >= 2 &&
        age.length <= 3 &&
        height.length >= 2 &&
        height.length <= 3 &&
        weight.length >= 2 &&
        weight.length <= 3
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };

    validateForm();
  }, [selectedCheckbox, age, height, weight]);

  return (
    <>
      <div className="main_alert">
        <p>개인 별 영양 정보 측정을 위해</p>
        <p>성별, 나이, 키, 몸무게를 입력해주세요</p>
      </div>
      <div className="center_container">
        <div className="input_container">
          <div className="gender_container">
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
          <div className="input_group">
            <label htmlFor="age">나이</label>
            <input
              type="text"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              minLength={2}
              maxLength={3}
            />
          </div>
          <div className="input_group">
            <label htmlFor="height">키(cm)</label>
            <input
              type="text"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              minLength={2}
              maxLength={3}
            />
          </div>
          <div className="input_group">
            <label htmlFor="weight">몸무게(kg)</label>
            <input
              type="text"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              minLength={2}
              maxLength={3}
            />
          </div>
        </div>
      </div>
      <div>
        {isValid ? (
          <Link
            to="http://localhost:3000/nutri/nutri/content02"
            onClick={ContextUpdate}
            className="next_button"
          >
            <span>다음</span>
          </Link>
        ) : (
          <button className="button_none">
            <span>항목을 입력해주세요</span>
          </button>
        )}
      </div>
    </>
  );
}

export default App;
