import React, { useState, useContext } from "react";
import "./../css/drag_css.css";
import { Link } from "react-router-dom";
import { NutriContext } from "../Nutri_Context";

function App() {
  const [error, setError] = useState(null); // 에러상태
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
    setResponseData,
    userName,
    setUserName,
  } = useContext(NutriContext);

  const maps = new Map();

  const handleInputChange = (event) => {
    setUserName(event.target.value); // 입력 필드 값이 변경될 때 상태 업데이트
  };

  const sendDataToServer = () => {
    const data01 = {
      nutriGenderState,
      nutriAge,
      nutriHeight,
      nutriWeight,
      selectedDisease,
      selectedAllergies,
      exerciseRate,
      soup,
      alcoholRate,
    };
    const data02 = {
      drag1Items,
      drag2Items,
      drag3Items,
      drag4Items,
      drag5Items,
      drag6Items,
    };

    Object.keys(data02).forEach((dragKey) => {
      const dropItems = data02[dragKey];

      Object.keys(dropItems).forEach((dropKey) => {
        const items = dropItems[dropKey];

        if (Array.isArray(items)) {
          const uniqueItems = [...new Set(items.map((item) => item.id))];

          uniqueItems.forEach((itemId) => {
            console.log(`${dragKey} - ${dropKey}`, itemId);
            if (!maps.has(dragKey)) {
              maps.set(dragKey, new Map());
            }

            const dragMap = maps.get(dragKey);

            if (!dragMap.has(dropKey)) {
              dragMap.set(dropKey, []);
            }

            dragMap.get(dropKey).push(itemId);
          });
        } else {
          console.warn(
            `Expected array but got ${typeof items} for key ${dropKey}`
          );
        }
      });
    });

    function mapToJson(map) {
      const obj = {};
      map.forEach((value, key) => {
        obj[key] = Array.from(value.entries()).reduce((acc, [k, v]) => {
          acc[k] = v;
          return acc;
        }, {});
      });
      return obj;
    }

    const dataAccess = {
      nutriGenderState,
      nutriAge,
      nutriHeight,
      nutriWeight,
      selectedDisease,
      selectedAllergies,
      exerciseRate,
      soup,
      alcoholRate,
      drop: mapToJson(maps),
    };

    fetch("/nutri/sendData01", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataAccess),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setResponseData(data); // 응답 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error); // 에러를 상태에 저장
      });
  };

  return (
    <div className="center_container_1">
      <div>설문이 끝났습니다</div>
      <div>고객님의 이름 또는 닉네임을 적어주세요!</div>
      <input
        className="input_name"
        type="text"
        value={userName}
        onChange={handleInputChange}
      ></input>
      <div className="button_name">
        <Link
          to="/nutri/nutri/content15"
          className="next_button "
          onClick={sendDataToServer}
        >
          <span>제출</span>
        </Link>
      </div>
    </div>
  );
}

export default App;
