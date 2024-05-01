import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./../content_css.css";
import AgeSwiper from "./age_swiper.js";
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
        effect="flip" // fade 효과 설정
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
    <div className="box-container">
      <Swiper_Gender />
      <AgeSwiper />
    </div>
  );
};

export default All_Swiper;
