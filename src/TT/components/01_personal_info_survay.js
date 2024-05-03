import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./../css/content_css.css";
import AgeSwiper from "./swipers/age_swiper.js";
import HeightSwiper from "./swipers/height_swiper.js";
import WeightSwiper from "./swipers/weight_swiper.js";
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

const All_Swiper = () => {
  return (
    <>
      <div className="main_alert">
        <p>개인 별 영양 정보 측정을 위해</p>
        <p>성별, 나이, 키, 몸무게를 입력해주세요</p>
      </div>

      <div className="box-container">
        <div className="swiper_box">
          <Swiper_Gender />
          <AgeSwiper />
        </div>
        <div className="swiper_box">
          <HeightSwiper />
          <WeightSwiper />
        </div>
      </div>
    </>
  );
};

export default All_Swiper;
