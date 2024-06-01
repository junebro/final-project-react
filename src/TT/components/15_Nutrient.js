import React, { useContext } from "react";
import { NutriContext } from "../Nutri_Context";
import "./../css/Nutrient_css.css";
import Chart from "./chart.js";

function App() {
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
    responseData,
    userName,
  } = useContext(NutriContext);
  var gender = "";
  if (!responseData) {
    return <div className="customerInfo">Loading...</div>;
  }
  // 성별판독
  if (nutriGenderState == 1) {
    gender = "남성";
  } else {
    gender = "여성";
  }
  // 현재 날짜
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  // 탄단지 비율 계산
  const calc =
    responseData.carbohydrateRate +
    responseData.proteinRate +
    responseData.fatRate;
  const carbohydrateRate = Math.floor(
    (responseData.carbohydrateRate / calc) * 100
  );
  const proteinRate = Math.floor((responseData.proteinRate / calc) * 100);
  const fatRate = Math.floor((responseData.fatRate / calc) * 100);
  // 나트륨 비율 계산
  const Sodium_calc = () => {
    let sodium_indicator = (responseData.sodium / 5) * 100;
    if (sodium_indicator > 100) {
      sodium_indicator = 95;
    }
    return sodium_indicator;
  };
  const sodium_indicator = Math.floor((responseData.sodium / 5) * 100);
  const Sodium_message = () => {
    let message = "";
    let html = "";
    let sl = responseData.sodium;

    if (sl > 2.5) {
      message =
        "나트륨 과다 섭취는 고혈압, 심장 질환, 뇌졸중과 같은 심각한 건강 문제를 유발할 수 있습니다. 과다한 나트륨 섭취는 혈압을 높일 뿐만 아니라 신장에 부담을 주고 체액이 늘어나는 문제를 일으키며, 이는 심장 및 혈관 건강을 해칠 수 있습니다. 또한, 과다한 나트륨은 식품 중독 및 소화 장애를 유발할 수 있으며, 뼈 건강과 치아 건강에도 부정적인 영향을 줄 수 있습니다. 따라서 건강한 식습관을 유지하고 나트륨 섭취를 제한하여 건강을 유지하는 것이 중요합니다.";
      html = <div style={{ fontSize: "24px", color: "red" }}>&nbsp;과다</div>;
    } else if (sl > 1.5 && sl < 2.5) {
      message =
        "나트륨을 적정량으로 섭취하여 건강에 주의를 기울이는 당신은 정말 멋지세요! 균형 잡힌 식습관을 유지하고, 식이섬유와 식이지방 등의 영양소도 적절하게 섭취하는 것은 건강한 삶을 살아가는 데 중요한 요소입니다. 적정량의 나트륨 섭취는 혈압을 유지하고 심혈관 건강을 지키는 데 도움을 줄 뿐만 아니라 신체의 수분 균형을 유지하여 건강한 생활을 뒷받침합니다. 지속적으로 이러한 건강한 습관을 유지하고 자신의 건강에 관심을 가지는 당신의 노력과 의지를 칭찬합니다! 계속해서 건강한 선택을 이어가며 더 나은 삶을 살아가길 응원합니다.";
      html = <div style={{ fontSize: "24px", color: "Green" }}>&nbsp;적정</div>;
    } else if (sl < 1.5) {
      message =
        "나트륨 부족은 신체의 전해질 균형을 무너뜨려 어지럼증, 피로, 근육 경련, 저혈압 등의 증상을 초래할 수 있습니다. 심할 경우, 혼란, 발작 등의 심각한 문제를 유발할 수 있습니다. 균형 잡힌 식단으로 적절한 나트륨을 섭취하여 건강을 유지하세요.";
      html = <div style={{ fontSize: "24px", color: "Green" }}>&nbsp;부족</div>;
    }

    return { message, html };
  };

  // 식이섬유 비율 계산
  const dietaryFiber_calc = () => {
    let dietaryFiber_indicator = 0;
    if (nutriGenderState == 1) {
      dietaryFiber_indicator = ((responseData.dietaryFiber * 1) / 55) * 100;
    } else if (nutriGenderState == 2) {
      dietaryFiber_indicator = ((responseData.dietaryFiber * 1) / 50) * 100;
    }
    return dietaryFiber_indicator;
  };

  const dietaryFiber_message = () => {
    let message = "";
    let html = "";
    let dl = responseData.dietaryFiber;

    if (dl > 55) {
      message =
        "식이섬유를 과다하게 섭취하면 소화 문제를 유발할 수 있습니다. 소화기 건강을 유지하기 위해 매일 권장 섭취량을 초과하지 않도록 주의하세요. 과다한 섬유는 변비, 복통, 가스 등을 유발할 수 있습니다. 균형 잡힌 식단을 유지하고 적당량의 섬유를 섭취하세요.";
      html = <div style={{ fontSize: "24px", color: "red" }}>&nbsp;과다</div>;
    } else if (dl > 20 && dl < 55) {
      message =
        "식이섬유를 적정량 섭취하셨군요! 멋진 선택입니다. 식이섬유는 소화에 도움을 주고, 혈당 조절과 콜레스테롤 감소에 도움이 됩니다. 건강한 소화와 올바른 영양 공급에 이바지하고 있어요. 계속해서 다양한 채소, 과일, 견과류를 섭취하여 건강을 유지해보세요!";
      html = <div style={{ fontSize: "24px", color: "Green" }}>&nbsp;적정</div>;
    } else if (dl < 20) {
      message =
        "식이섬유가 부족하면 소화 문제가 발생할 수 있으며 변비, 소화불량, 체중증가 등의 위험이 증가할 수 있습니다. 부족한 식이섬유는 심장 질환, 당뇨병, 대장암 등의 만성질환 발병 위험도 증가시킬 수 있습니다. 채소, 과일, 곡물 등 다양한 식품을 섭취하여 하루에 적어도 25g 이상의 식이섬유를 섭취하도록 노력하세요. 건강한 식단으로 소화 건강을 유지하고 심장과 전반적인 건강을 지키세요.";
      html = <div style={{ fontSize: "24px", color: "Green" }}>&nbsp;부족</div>;
    }

    return { message, html };
  };

  // 콜레스테롤 비율 계산
  let cholesterol_indicator = Math.floor(
    (responseData.cholesterol / 0.6) * 100
  );
  if (cholesterol_indicator > 100) {
    cholesterol_indicator = 95;
  }
  const cholesterol_message = () => {
    let message = "";
    let html = "";
    let cl = responseData.cholesterol;

    if (cl > 0.3) {
      message =
        "콜레스테롤을 과다 섭취하면 심혈관 질환과 관련된 위험이 증가할 수 있습니다. 지방 함량이 높은 식품을 줄이고, 트랜스 지방과 포화 지방을 피하며, 채식 식단을 채택해보세요. 건강한 지방을 위해 엑스트라 버진 올리브 오일이나 아보카도 같은 단일 불포화 지방을 선택하고, 콜레스테롤을 낮추는 음식인 옥수수 식이섬유와 오메가-3 지방산이 풍부한 생선을 섭취하세요. 건강한 식습관과 꾸준한 운동은 콜레스테롤 수치를 개선할 수 있습니다. 이러한 조치를 통해 심혈관 건강을 챙기세요!";
      html = <div style={{ fontSize: "24px", color: "red" }}>&nbsp;과다</div>;
    } else if (cl < 0.3) {
      message =
        "콜레스테롤을 적정량으로 섭취하셨군요! 건강한 심혈관을 유지하는 데 중요한 역할을 합니다. 식이섬유와 단일 불포화 지방을 공급하는 채소, 과일, 견과류, 양식 생선 등 다양한 식품을 섭취하시면서 콜레스테롤을 조절하세요. 이는 심혈관 질환 예방과 혈중 콜레스테롤 수치를 적정하게 유지하는 데 도움이 됩니다. 계속해서 건강한 식습관을 유지하고, 꾸준한 운동을 통해 심혈관 건강을 지켜나가세요!";
      html = <div style={{ fontSize: "24px", color: "Green" }}>&nbsp;적정</div>;
    }

    return { message, html };
  };
  // 단백질 비율 계산
  let Protein_indicator = Math.floor((responseData.protein / 100) * 100);
  if (Protein_indicator > 100) {
    Protein_indicator = 95;
  }
  const Protein_info = Math.floor(
    (responseData.protein / responseData.requiredProtein) * 100
  );
  // 단백질 과다 섭취 메세지
  const Protein_message = () => {
    let message = "";
    let html = "";
    if (responseData.protein > responseData.requiredProtein) {
      message =
        "과다한 단백질 섭취는 신장에 부담을 주고, 신장 질환을 유발할 수 있으며, 체내 칼슘 손실을 증가시켜 골다공증의 위험을 높일 수 있습니다. 또한, 소화 문제와 관련된 부작용을 초래할 수 있습니다.";
      html = <div style={{ fontSize: "24px", color: "red" }}>&nbsp;과다</div>;
    } else if (responseData.protein < responseData.minProtein) {
      message =
        "단백질 부족은 근육 손실, 면역력 저하, 상처 치유 지연, 피로감 증가 등을 초래할 수 있습니다. 균형 잡힌 식단으로 충분한 단백질 섭취가 필요합니다.";
      html = <div style={{ fontSize: "24px", color: "Green" }}>&nbsp;적정</div>;
    } else {
      message =
        "적정 단백질 섭취로 건강을 지키는 당신, 정말 멋져요! 계속 유지하세요!";
      html = (
        <div style={{ fontSize: "24px", color: "yellow" }}>&nbsp;부족</div>
      );
    }
    return { message, html };
  };
  return (
    <div className="center_container_1">
      <div className="customerName">
        <div>{userName}</div>
        <div>{getCurrentDate()}</div>
      </div>
      <div className="customerInfo">
        <div>
          <p className="pt_1">고객 정보</p>
          <p>
            {userName} / {gender}
          </p>
        </div>
        <div>
          <p className="pt_1">키/몸무게</p>
          <p>
            {nutriHeight}cm / {nutriWeight}kg
          </p>
        </div>
        <div>
          <p className="pt_1">질병</p>
          <p>{selectedDisease}</p>
        </div>
        <div>
          <p className="pt_1">고객 정보</p>
          <p>해당없는색</p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div style={{ fontSize: "30px" }}>{userName}님 의 영양소 비율</div>
      <div className="chart_div">
        <Chart />
      </div>
      <div style={{ fontSize: `12px`, opacity: `0.8` }}>
        추천 섭취 비율 : 탄수화물 55~65% , 단백질 7~20% , 지방 20~30%
      </div>
      <br />
      <div>
        {userName} 님의 섭취 비율은 탄수화물 {carbohydrateRate}% , 단백질{" "}
        {proteinRate}%, 지방 {fatRate}% 입니다.
      </div>
      <br />
      <br />
      <br />
      <div style={{ fontSize: "30px" }}>{userName}님의 영양소 섭취 상태</div>
      <div style={{ marginLeft: "10%" }}>
        <ul>
          <li>
            <div className="wrapper-1">
              <div className="left">나트륨 {Sodium_message().html} </div>
              <div className="right">
                <div className="bar_info">
                  <div style={{ height: "100%", width: "15%" }}></div>
                  <div
                    style={{ height: "100%", width: "20%", textAlign: "left" }}
                  >
                    1500mg
                  </div>
                  <div
                    style={{ height: "100%", width: "65%", textAlign: "left" }}
                  >
                    2500mg
                  </div>
                </div>
                <div className="bar_container">
                  <div className="bar yellow">부족</div>
                  <div className="bar green">적정</div>
                  <div className="bar red">과다</div>
                  <div
                    className="bar_indicator"
                    style={{
                      left: `${Sodium_calc()}%`,
                    }}
                  ></div>
                  <div className="bar_text">나트륨 적정 섭취량</div>
                </div>
              </div>
            </div>
            <div className="nutri_guide">
              {userName}님의 나트륨 섭취량은{" "}
              {Math.floor(responseData.sodium * 1000)}g, 일일 최대 섭취 권장량의{" "}
              {sodium_indicator}% 입니다.
              <br />
              {Sodium_message().message}
            </div>
          </li>
          <li>
            <div className="wrapper">
              <div className="left">식이섬유 {dietaryFiber_message().html}</div>
              <div className="right">
                <div className="bar_info">
                  <div style={{ height: "100%", width: "15%" }}></div>
                  <div
                    style={{ height: "100%", width: "20%", textAlign: "left" }}
                  >
                    20g
                  </div>
                  <div
                    style={{ height: "100%", width: "65%", textAlign: "left" }}
                  >
                    50g
                  </div>
                </div>
                <div className="bar_container">
                  <div className="bar yellow">부족</div>
                  <div className="bar green">적정</div>
                  <div className="bar red">과다</div>
                  <div
                    className="bar_indicator"
                    style={{
                      left: `${dietaryFiber_calc()}%`,
                    }}
                  ></div>
                  <div className="bar_text">식이섬유 적정 섭취량</div>
                </div>
              </div>
            </div>
            <div className="nutri_guide">{dietaryFiber_message().message}</div>
          </li>
          <li>
            <div className="wrapper">
              <div className="left">
                콜레스테롤 {cholesterol_message().html}
              </div>
              <div className="right">
                <div className="bar_info">
                  <div style={{ height: "100%", width: "15%" }}></div>
                  <div
                    style={{ height: "100%", width: "20%", textAlign: "right" }}
                  >
                    300mg
                  </div>
                  <div
                    style={{ height: "100%", width: "65%", textAlign: "left" }}
                  ></div>
                </div>
                <div className="bar_container">
                  <div className="bar yellow cholesterol">적정</div>
                  <div className="bar red">과다</div>
                  <div
                    className="bar_indicator"
                    style={{
                      left: `${cholesterol_indicator}%`,
                    }}
                  ></div>
                  <div className="bar_text">콜레스테롤 적정 섭취량</div>
                </div>
              </div>
            </div>
            <div className="nutri_guide">
              {userName}님의 콜레스테롤 섭취량은 일일 권장량의{" "}
              {cholesterol_indicator}% 입니다.
              <br />
              {cholesterol_message().message}
            </div>
          </li>
          <li>
            <div className="wrapper-1">
              <div className="left">단백질 {Protein_message().html}</div>
              <div className="right">
                <div className="bar_info">
                  <div style={{ height: "100%", width: "15%" }}></div>
                  <div
                    style={{ height: "100%", width: "20%", textAlign: "left" }}
                  >
                    {responseData.minProtein}g
                  </div>
                  <div
                    style={{ height: "100%", width: "65%", textAlign: "left" }}
                  >
                    {responseData.requiredProtein}g
                  </div>
                </div>
                <div className="bar_container">
                  <div className="bar yellow">부족</div>
                  <div className="bar green">적정</div>
                  <div className="bar red">과다</div>
                  <div
                    className="bar_indicator"
                    style={{
                      left: `${Protein_indicator}%`,
                    }}
                  ></div>
                  <div className="bar_text">단백질 적정 섭취량</div>
                </div>
              </div>
            </div>
            <div className="nutri_guide">
              {userName}님의 적정 단백질 섭취량은 일일 권장량{" "}
              {responseData.requiredProtein}g의 {Protein_info}% 입니다.
              <br />
              단백질은 근육 형성과 유지, 면역 기능 강화, 상처 치유에 중요한
              역할을 합니다. 또한, 효소와 호르몬 생산을 돕고 체내 세포와 조직의
              재생을 지원합니다. 식사 후 포만감을 높여 체중 관리에 유리하며,
              신체 에너지를 제공하고 근육 손실을 예방하는 데 도움이 됩니다.
              특히, 운동 후 단백질 섭취는 근육 회복과 성장에 필수적입니다.
              다양한 식단에서 균형 잡힌 단백질 섭취는 전반적인 건강과 활력을
              증진합니다.
              <br></br>
              {Protein_message().message}
            </div>
          </li>
        </ul>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
