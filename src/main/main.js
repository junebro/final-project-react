import "./main.css";
import React from "react";
import Navi from "./../common/navigation";
import Menu from "./../common/menu";
import Footer from "./../common/footer";
import main from "./../images/main/main.png";
import main_bottom_button_1 from "./../images/main/main_bottom_button_1.png";
import main_bottom_button_2 from "./../images/main/main_bottom_button_2.png";
import main_bottom_button_3 from "./../images/main/main_bottom_button_3.png";
import main_bottom_button_4 from "./../images/main/main_bottom_button_4.png";
import test_image from "./../images/main/test_image.png";
import bottom_image from "./../images/main/bottom_image.webp";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Navi />
      <Menu />
      <div className="main_top">
        <div className="top_div">
          <div className="font_top top_1">EAT</div>
          <div className="font_top top_2 ">HEALTHY</div>
          <div className="font_top top_2 ">BE HEALTHY</div>
          <div className="font_top top_3">고민없는, 나만의 위한 식단</div>
          <Link to="/Nutri">
            <div className="font_top top_4 top_button">영양 진단 받아보기</div>
          </Link>
        </div>
        <img className="img_main" src={main} alt="메인 이미지"></img>
      </div>
      <div className="main_line"></div>
      <div className="main_mid">
        <div className="font_mid mid_1">건강 식단</div>
        <div className="font_mid mid_2">
          건강한 일상을 지키는 가장 쉬운 관리
        </div>

        <div className="mid_area_button">
          <div className="mid_area_1">
            <div className="mid_button">
              <img
                className="main_bottom_button main_bottom_button_1"
                src={main_bottom_button_1}
                alt="버튼1"
              ></img>
            </div>
            <div style={{ margin: "1%" }}></div>
            <div className="mid_button">
              <img
                className="main_bottom_button main_bottom_button_2"
                src={main_bottom_button_2}
                alt="버튼1"
              ></img>
            </div>
          </div>

          <div className="mid_area_2">
            <div className="mid_button">
              <img
                className="main_bottom_button main_bottom_button_3"
                src={main_bottom_button_3}
                alt="버튼3"
              ></img>
            </div>
            <div style={{ margin: "1%" }}></div>
            <div className="mid_button">
              <img
                className="main_bottom_button main_bottom_button_4"
                src={main_bottom_button_4}
                alt="버튼4"
              ></img>
            </div>
          </div>
        </div>
      </div>

      <div className="main_bottom_1">
        <div>
          <img
            className="test_image"
            src={test_image}
            alt="테스트 이미지"
          ></img>
        </div>
        <div style={{ margin: "3%" }}></div>
        <div className="bottom_div">
          <p className="bottom_text_1_1">나만의 식습관 맞춤 리포트 제공</p>
          <p className="bottom_text_1_2">먹은 식단은 기록하고</p>
          <p className="bottom_text_1_2">리포트를 받아보세요</p>
          <p className="bottom_text_1_3  text_top_css">
            먹은 식단을 버튼 하나로 간편하게 기록해
          </p>
          <p className="bottom_text_1_3">
            보세요. 섭취 기록을 한눈에 볼 수 있는
          </p>
          <p className="bottom_text_1_3">
            일, 주, 월간 리포트를 제공해 드려요.
          </p>
        </div>
      </div>

      <div className="main_bottom_2">
        <p className="bottom_text_2_1">식단의 모든 것,</p>
        <p className="bottom_text_2_1">그린 라이프에서 해결하세요.</p>
        <p className="bottom_text_2_2">식단 추천 + 주문 + 기록을 한 곳에서</p>
      </div>
      <div className="bottom_div_img">
        <div>
          <img className="bottom_image" src={bottom_image} alt=""></img>
        </div>
        <div className="bottom_button">맞춤 식단 받아보기</div>
      </div>

      <Footer />
    </div>
  );
}
export default App;
