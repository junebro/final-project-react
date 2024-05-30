// Nutri_Context.js
import React, { createContext, useState } from "react";

export const NutriContext = createContext();

export const NutriProvider = ({ children }) => {
  // 첫 페이지 컨텍스트 : 성별 , 나이, 키, 몸무게
  const [nutriGenderState, setNutriGenderState] = useState("");
  const [nutriAge, setNutriAge] = useState("");
  const [nutriHeight, setNutriHeight] = useState("");
  const [nutriWeight, setNutriWeight] = useState("");
  // 질병 페이지
  const [selectedDisease, setSelectedDisease] = useState(1);
  // 알레르기 페이지
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  // 운동 정도
  const [exerciseRate, setExerciseRate] = useState("1");
  // 국물 여부
  const [soup, setSoup] = useState("1");
  // 음주 정도
  const [alcoholRate, setAlcoholRate] = useState("1");
  // 드래그 첫번째 : 볶음밥류  / 밥류 / 대체식품류
  const [drag1Items, setDrag1Items] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
    drop5: [],
    drop6: [],
    drop7: [],
  });
  // 드래그 두번째 : 볶음밥류  / 밥류 / 대체식품류
  const [drag2Items, setDrag2Items] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
    drop5: [],
    drop6: [],
    drop7: [],
  });
  // 드래그 세번째 : 견과류, 패스트푸드류 , 달콤한간식류
  const [drag3Items, setDrag3Items] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
    drop5: [],
    drop6: [],
    drop7: [],
  });
  // 드래그 네번째 : 찌개류 / 면류
  const [drag4Items, setDrag4Items] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
    drop5: [],
    drop6: [],
    drop7: [],
  });
  // 드래그 다섯번째 : 육류 / 계란류 / 해산물류
  const [drag5Items, setDrag5Items] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
    drop5: [],
    drop6: [],
    drop7: [],
  });
  // 드래그 여섯번째 : 가당음료 / 과자류 / 사탕류
  const [drag6Items, setDrag6Items] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
    drop5: [],
    drop6: [],
    drop7: [],
  });

  const [responseData, setResponseData] = useState(null); // fetch로 받아온 response data 저장용

  const [userName, setUserName] = useState("null"); // fetch로 받아온 response data 저장용

  return (
    <NutriContext.Provider
      value={{
        nutriGenderState,
        setNutriGenderState,
        nutriAge,
        setNutriAge,
        nutriHeight,
        setNutriHeight,
        nutriWeight,
        setNutriWeight,
        selectedDisease,
        setSelectedDisease,
        selectedAllergies,
        setSelectedAllergies,
        exerciseRate,
        setExerciseRate,
        soup,
        setSoup,
        alcoholRate,
        setAlcoholRate,
        drag1Items,
        setDrag1Items,
        drag2Items,
        setDrag2Items,
        drag3Items,
        setDrag3Items,
        drag4Items,
        setDrag4Items,
        drag5Items,
        setDrag5Items,
        drag6Items,
        setDrag6Items,
        responseData,
        setResponseData,
        userName,
        setUserName,
      }}
    >
      {children}
    </NutriContext.Provider>
  );
};
