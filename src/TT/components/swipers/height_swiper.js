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
      className="height-swiper-container"
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
      <SwiperSlide>150cm</SwiperSlide>
      <SwiperSlide>151cm</SwiperSlide>
      <SwiperSlide>152cm</SwiperSlide>
      <SwiperSlide>153cm</SwiperSlide>
      <SwiperSlide>154cm</SwiperSlide>
      <SwiperSlide>155cm</SwiperSlide>
      <SwiperSlide>156cm</SwiperSlide>
      <SwiperSlide>157cm</SwiperSlide>
      <SwiperSlide>158cm</SwiperSlide>
      <SwiperSlide>159cm</SwiperSlide>
      <SwiperSlide>160cm</SwiperSlide>
      <SwiperSlide>161cm</SwiperSlide>
      <SwiperSlide>162cm</SwiperSlide>
      <SwiperSlide>163cm</SwiperSlide>
      <SwiperSlide>164cm</SwiperSlide>
      <SwiperSlide>165cm</SwiperSlide>
      <SwiperSlide>166cm</SwiperSlide>
      <SwiperSlide>167cm</SwiperSlide>
      <SwiperSlide>168cm</SwiperSlide>
      <SwiperSlide>169cm</SwiperSlide>
      <SwiperSlide>170cm</SwiperSlide>
      <SwiperSlide>171cm</SwiperSlide>
      <SwiperSlide>172cm</SwiperSlide>
      <SwiperSlide>173cm</SwiperSlide>
      <SwiperSlide>174cm</SwiperSlide>
      <SwiperSlide>175cm</SwiperSlide>
      <SwiperSlide>176cm</SwiperSlide>
      <SwiperSlide>177cm</SwiperSlide>
      <SwiperSlide>178cm</SwiperSlide>
      <SwiperSlide>179cm</SwiperSlide>
      <SwiperSlide>180cm</SwiperSlide>
      <SwiperSlide>181cm</SwiperSlide>
      <SwiperSlide>182cm</SwiperSlide>
      <SwiperSlide>183cm</SwiperSlide>
      <SwiperSlide>184cm</SwiperSlide>
      <SwiperSlide>185cm</SwiperSlide>
      <SwiperSlide>186cm</SwiperSlide>
      <SwiperSlide>187cm</SwiperSlide>
      <SwiperSlide>188cm</SwiperSlide>
      <SwiperSlide>189cm</SwiperSlide>
      <SwiperSlide>190cm</SwiperSlide>
      <SwiperSlide>135cm</SwiperSlide>
      <SwiperSlide>136cm</SwiperSlide>
      <SwiperSlide>137cm</SwiperSlide>
      <SwiperSlide>138cm</SwiperSlide>
      <SwiperSlide>139cm</SwiperSlide>
      <SwiperSlide>140cm</SwiperSlide>
      <SwiperSlide>141cm</SwiperSlide>
      <SwiperSlide>142cm</SwiperSlide>
      <SwiperSlide>143cm</SwiperSlide>
      <SwiperSlide>144cm</SwiperSlide>
      <SwiperSlide>145cm</SwiperSlide>
      <SwiperSlide>146cm</SwiperSlide>
      <SwiperSlide>147cm</SwiperSlide>
      <SwiperSlide>148cm</SwiperSlide>
      <SwiperSlide>149cm</SwiperSlide>
    </Swiper>
  );
};

export default Swiper_Age;
