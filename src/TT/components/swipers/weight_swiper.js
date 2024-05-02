import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "./../../content_css.css";

// 나이 선택 스와이퍼
const Swiper_Age = () => {
  return (
    <Swiper
      className="weight-swiper-container"
      modules={[EffectFade, Mousewheel]}
      // direction="vertical" // 진행 방향
      spaceBetween={1} // 슬라이드 간의 마진
      slidesPerView={1} // 한 슬라이드 당 보여줄 화면
      mousewheel={{
        enabled: true, // 마우스 휠 사용 가능
        sensitivity: 500, // 마우스 휠 민감도
      }}
      loop={true}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>61kg</SwiperSlide>
      <SwiperSlide>62kg</SwiperSlide>
      <SwiperSlide>63kg</SwiperSlide>
      <SwiperSlide>64kg</SwiperSlide>
      <SwiperSlide>65kg</SwiperSlide>
      <SwiperSlide>66kg</SwiperSlide>
      <SwiperSlide>67kg</SwiperSlide>
      <SwiperSlide>68kg</SwiperSlide>
      <SwiperSlide>69kg</SwiperSlide>
      <SwiperSlide>70kg</SwiperSlide>
      <SwiperSlide>71kg</SwiperSlide>
      <SwiperSlide>72kg</SwiperSlide>
      <SwiperSlide>73kg</SwiperSlide>
      <SwiperSlide>74kg</SwiperSlide>
      <SwiperSlide>75kg</SwiperSlide>
      <SwiperSlide>76kg</SwiperSlide>
      <SwiperSlide>77kg</SwiperSlide>
      <SwiperSlide>78kg</SwiperSlide>
      <SwiperSlide>79kg</SwiperSlide>
      <SwiperSlide>80kg</SwiperSlide>
      <SwiperSlide>81kg</SwiperSlide>
      <SwiperSlide>82kg</SwiperSlide>
      <SwiperSlide>83kg</SwiperSlide>
      <SwiperSlide>84kg</SwiperSlide>
      <SwiperSlide>85kg</SwiperSlide>
      <SwiperSlide>86kg</SwiperSlide>
      <SwiperSlide>87kg</SwiperSlide>
      <SwiperSlide>88kg</SwiperSlide>
      <SwiperSlide>89kg</SwiperSlide>
      <SwiperSlide>90kg</SwiperSlide>
      <SwiperSlide>91kg</SwiperSlide>
      <SwiperSlide>92kg</SwiperSlide>
      <SwiperSlide>93kg</SwiperSlide>
      <SwiperSlide>94kg</SwiperSlide>
      <SwiperSlide>95kg</SwiperSlide>
      <SwiperSlide>96kg</SwiperSlide>
      <SwiperSlide>97kg</SwiperSlide>
      <SwiperSlide>98kg</SwiperSlide>
      <SwiperSlide>99kg</SwiperSlide>
      <SwiperSlide>100kg</SwiperSlide>
      <SwiperSlide>101kg</SwiperSlide>
      <SwiperSlide>102kg</SwiperSlide>
      <SwiperSlide>103kg</SwiperSlide>
      <SwiperSlide>104kg</SwiperSlide>
      <SwiperSlide>105kg</SwiperSlide>
      <SwiperSlide>106kg</SwiperSlide>
      <SwiperSlide>107kg</SwiperSlide>
      <SwiperSlide>108kg</SwiperSlide>
      <SwiperSlide>109kg</SwiperSlide>
      <SwiperSlide>110kg</SwiperSlide>
      <SwiperSlide>40kg</SwiperSlide>
      <SwiperSlide>41kg</SwiperSlide>
      <SwiperSlide>42kg</SwiperSlide>
      <SwiperSlide>43kg</SwiperSlide>
      <SwiperSlide>44kg</SwiperSlide>
      <SwiperSlide>45kg</SwiperSlide>
      <SwiperSlide>46kg</SwiperSlide>
      <SwiperSlide>47kg</SwiperSlide>
      <SwiperSlide>48kg</SwiperSlide>
      <SwiperSlide>49kg</SwiperSlide>
      <SwiperSlide>50kg</SwiperSlide>
      <SwiperSlide>51kg</SwiperSlide>
      <SwiperSlide>52kg</SwiperSlide>
      <SwiperSlide>53kg</SwiperSlide>
      <SwiperSlide>54kg</SwiperSlide>
      <SwiperSlide>55kg</SwiperSlide>
      <SwiperSlide>56kg</SwiperSlide>
      <SwiperSlide>57kg</SwiperSlide>
      <SwiperSlide>58kg</SwiperSlide>
      <SwiperSlide>59kg</SwiperSlide>
      <SwiperSlide>60kg</SwiperSlide>
    </Swiper>
  );
};

export default Swiper_Age;
