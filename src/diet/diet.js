import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './diet.css';

import Navi from './../common/navigation';
import Menu from './../common/menu';
import Footer from './../common/footer';

const Slider = () => {

  const [currentSlide, setCurrentSlide] = useState(0);  // 현재 화면
  
  const slides = [
    [
      { id: 1, name: "안녕하세요", kcal : 234, image: require(`./../images/products/product1.jpg`) },
      { id: 2, name: "후이바오는 귀여워", kcal : 355, image: require(`./../images/products/product1.jpg`) },
      { id: 3, name: "푸바오도 귀여워", kcal : 193, image: require(`./../images/products/product1.jpg`) },
    ],
    [
      { id: 4, name: "두번째 슬라이드의 첫번째 데이터", kcal : 234, image: require(`./../images/products/product2.jpg`) },
      { id: 5, name: "두번째 슬라이드의 두번째 데이터", kcal : 355, image: require(`./../images/products/product2.jpg`) },
      { id: 6, name: "두번째 슬라이드의 세번째 데이터", kcal : 193, image: require(`./../images/products/product2.jpg`) },
    ],
    [
      { id: 7, name: "세번째 슬라이드의 첫번째 데이터", kcal : 234, image: require(`./../images/products/product3.jpg`) },
      { id: 8, name: "세번째 슬라이드의 두번째 데이터", kcal : 355, image: require(`./../images/products/product3.jpg`) },
      { id: 9, name: "두번째 슬라이드의 세번째 데이터", kcal : 193, image: require(`./../images/products/product3.jpg`) },
    ],
    [
      { id: 10, name: "네번째 슬라이드의 첫번째 데이터", kcal : 234, image: require(`./../images/products/product1.jpg`) },
      { id: 11, name: "네번째 슬라이드의 두번째 데이터", kcal : 355, image: require(`./../images/products/product2.jpg`) },
      { id: 12, name: "네번째 슬라이드의 세번째 데이터", kcal : 193, image: require(`./../images/products/product3.jpg`) },
    ],
    [
      { id: 13, name: "다섯번째 슬라이드의 첫번째 데이터", kcal : 234, image: require(`./../images/products/product1.jpg`) },
      { id: 14, name: "다섯번째 슬라이드의 두번째 데이터", kcal : 355, image: require(`./../images/products/product2.jpg`) },
      { id: 15, name: "다섯번째 슬라이드의 세번째 데이터", kcal : 193, image: require(`./../images/products/product3.jpg`) },
    ],
    [
      { id: 16, name: "여섯번째 슬라이드의 첫번째 데이터", kcal : 234, image: require(`./../images/products/product1.jpg`) },
      { id: 17, name: "여섯번째 슬라이드의 두번째 데이터", kcal : 355, image: require(`./../images/products/product2.jpg`) },
      { id: 18, name: "여섯번째 슬라이드의 세번째 데이터", kcal : 193, image: require(`./../images/products/product3.jpg`) },
    ],
  ];

  const episode = ['1일차', '2일차', '3일차', '4일차', '5일차', '6일차'];

  // 애니메이션 속성 설정: 슬라이드 전환 속도를 빠르게 조절
  const props = useSpring({
    to: { transform: `translateX(-${currentSlide * 100}%)` },
    from: { transform: 'translateX(0%)' },
    config: { duration: 0 }  // 빠른 전환을 위한 짧은 지속 시간, 높을수록 넘길때 약간 텀이 생긴다
  });


  const images = [
    require('./../images/dietTest/1.png'),
    require('./../images/dietTest/2.png'),
    require('./../images/dietTest/3.png'),
    require('./../images/dietTest/4.png'),
    require('./../images/dietTest/5.png'),
    require('./../images/dietTest/6.png'),
    require('./../images/dietTest/7.png'),
    require('./../images/dietTest/8.png'),
    require('./../images/dietTest/9.png'),
    require('./../images/dietTest/10.png'),
    require('./../images/dietTest/11.png'),
    require('./../images/dietTest/12.png'),
    require('./../images/dietTest/13.png'),
    require('./../images/dietTest/14.png'),
    require('./../images/dietTest/15.png'),
    require('./../images/dietTest/16.png'),
    require('./../images/dietTest/17.png'),
    require('./../images/dietTest/18.png'),
    require('./../images/dietTest/19.png'),
    require('./../images/dietTest/20.png'),
    // 이하 이미지들을 추가해주세요
  ];

  
  const [glows, setGlows] = useState(new Array(20).fill(false)); // 20개 이미지의 상태 초기화

  const toggleGlow = index => {
    const newGlows = [...glows];
    newGlows[index] = !newGlows[index];
    setGlows(newGlows);
  };
  
  const renderImages = () => {
    return glows.map((glow, index) => (
      <div key={index} className="image-container" onClick={() => toggleGlow(index)}>
        <img
          src={images[index]} // 이미지 URL 적절히 설정
          className={glow ? 'glow' : ''}
        />
      </div>
    ));
  };
  

  return (
    <>
      <Navi />
      <Menu />
        
        <div className="diet-container">
        <h1 style={{textAlign:'center', margin:'30px 0'}}>식단 주문</h1>
          <div className='diet-top-content'>
            <p className='diet-diagnose-date'>24.04.30 진단 기준</p>
            <div className='button'>새로 진단</div>
          </div>
          <div className='diet-user-text'>
            <p className='diet-kcal-text'>푸바오 님은 최대 <span style={{color:'red'}}>2,483kcal</span>의</p>
            <p className='diet-kcal-text'>일일 섭취를 권장해요.</p>
          </div>
          <div className="diet-episode">
            {episode.map((epi, index) => (
              <div 
                key={index} 
                onClick={() => setCurrentSlide(index)}
                className={`diet-episode-button ${currentSlide === index ? 'active' : ''}`}
              >
                {epi}
              </div>
            ))}
          </div>
          <animated.div className="slides-container" style={props}>
            {slides.map((slideGroup, index) => (
              <div key={index} className="slide-group">
               
                {slideGroup.map((slide, subIndex) => (
                   <div className='diet-first-food'>
                      <img className='diet-product-image' src={slide.image} alt={slide.title} />
                      <div style={{width:'100%'}}>
                        <p className='diet-product-name'>{slide.name}</p>
                        <div style={{paddingTop:'15px', paddingBottom:'10px'}}>
                            <img style={{width:'30px'}} src={images[subIndex]}/>
                            <img style={{width:'30px'}} src={images[subIndex+3]}/>
                            <img style={{width:'30px'}} src={images[subIndex+5]}/>
                          </div>
                        <p className='diet-product-data' style={{marginBottom:'10px'}}>칼로리 {slide.kcal}Kcal</p>
                        <div className="diet-product-data-section">
                          <p className='diet-product-data'>탄수화물 18g</p>
                          <p className='diet-product-data'>단백질 17g</p>
                        </div>
                        <p className='diet-product-data'>지방 24.0g</p>
                      </div>
                   </div>
                ))}
              </div>
            ))}
          </animated.div>
            
          <div className='diet-category'>
            <h2>카테고리</h2>
            <div className="image-grid">
              {renderImages()}
            </div>
          </div>
          <div className='diet-buy-button'>구매하러 가기</div>
        </div>
      <Footer />
    </>
  );
};

export default Slider;



/*
// 내보내기
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default class MyComponent extends React.Component {
    render() {
        return <div>Hello, World!</div>;
    }
}

// 가져오기
// 다른 파일에서 mathFunctions.js의 함수를 가져오기
import { add, subtract } from './mathFunctions';

// MyComponent.js에서 기본 내보내기된 컴포넌트 가져오기
import MyComponent from './MyComponent';
*/