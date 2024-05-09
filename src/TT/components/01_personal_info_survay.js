import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./../css/content_css.css";
import "swiper/css/effect-flip";

// 성별 선택 스와이퍼
const Swiper_Gender = () => {
  return (
    <>
      <Swiper
        className="gender-swiper-container"
        modules={[EffectFlip]}
        // direction="vertical"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        effect="flip" // 플립 효과
        flipEffect={{
          slideShadows: false,
        }}
      >
        <SwiperSlide>남자</SwiperSlide>
        <SwiperSlide>여자</SwiperSlide>
      </Swiper>
    </>
  );
};

const App = () => {
  const [numberChecker, setNumberChecker] = useState(1);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // 숫자 이외의 값이 입력되면 빈 문자열로 변경
    if (!/^[0-9]*$/.test(value)) {
      alert("숫자만 입력하세요.");
      e.target.value = ""; // 빈 문자열로 변경
      return;
    }
  };

  return (
    <>
      <div className="main_alert">
        <p>개인 별 영양 정보 측정을 위해</p>
        <p>성별, 나이, 키, 몸무게를 입력해주세요</p>
      </div>

      <div className="box-container">
        <div className="swiper_box">
          <Swiper_Gender />
        </div>
        <div className="swiper_box">
          나이{" "}
          <input
            type="text"
            className="input_info_01"
            maxLength={"2"}
            onChange={handleInputChange}
          />
          세
        </div>
        <div className="swiper_box">
          키{" "}
          <input
            type="text"
            className="input_info"
            maxLength={"3"}
            onChange={handleInputChange}
          />
          cm
        </div>
        <div className="swiper_box">
          몸무게{" "}
          <input
            type="text"
            className="input_info"
            maxLength={"3"}
            onChange={handleInputChange}
          />
          kg
        </div>
      </div>
    </>
  );
};

export default App;
