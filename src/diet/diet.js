import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './diet.css';
import parseCSV from '../ai/nutritionData';

import { ItemProvider, useItem } from '../common/contexts/DietContext';
import Navi from './../common/navigation';
import Menu from './../common/menu';
import Footer from './../common/footer';
import axios from 'axios';
import { useAuth } from '../common/contexts/AuthContext'; // 로그인 
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Modal from '../products/Modal'; 

function App() {
  return (
      <ItemProvider>
          <ItemDisplay/>
      </ItemProvider>
  );
}

const ItemDisplay = () => {

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState([]);
  const dietData = useItem().item; // 전체 제품 목록을 가져옵니다.
  const { user } = useAuth(); // useAuth 훅에서 user ID 가져오기
  const [userInfo, setUserInfo] = useState('');
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`http://localhost:8989/diet/dailyUser/${user}`, {
        method: 'GET', // HTTP 메소드 지정
        headers: {
            'Content-Type': 'application/json', // 콘텐츠 타입 지정
            'Authorization': `Bearer ${token}` // JWT 토큰을 Bearer 토큰으로 포함
        }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.message == 'null'){
        alert("진단한 데이터가 없습니다. 영양진단 페이지로 이동합니다.");
        navigate('/nutri/nutri');
      }
      setUserInfo(data);
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);
  
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const resultData = response.data;
  
      // 상위 5개의 항목 추출
      const topFiveItems = resultData.slice(0, 5);
  
      setResult(topFiveItems);
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  useEffect(() => {
    const fetchNutritionData = async () => {
      const data = await parseCSV();
      setNutritionInfo(data);
    };
    fetchNutritionData();
  }, []);

  const getNutritionInfo = (category) => {
    return nutritionInfo.find(item => item.name === category);
  };


  const [currentSlide, setCurrentSlide] = useState(0);  // 현재 화면
  const episode = ['1일차', '2일차', '3일차', '4일차', '5일차', '6일차'];

  // 애니메이션 속성 설정: 슬라이드 전환 속도를 빠르게 조절
  const props = useSpring({
    to: { transform: `translateX(-${currentSlide * 100}%)` },
    from: { transform: 'translateX(0%)' },
    config: { duration: 0 }  // 빠른 전환을 위한 짧은 지속 시간, 높을수록 넘길때 약간 텀이 생긴다
  });

  /* 날짜 변환 */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

  /* 구매하기 버튼 클릭 이벤트 */
  const foodBuyClick = () => {
      
    // cartData 배열을 생성
    const cartData = dietData.flat().map(item => ({
      mbrno: user,
      crtcd: item.procd,
      crtqt: 1
    }));
 
    fetch(`/diet/foodcartinsert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(cartData)
    })
    .then(response => {
      if (response.ok) { // 상태 코드가 200-299 범위인지 확인
        return response.text(); // 변경할 수 있는 부분
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
    .then(data => {
      navigate('/cart/cart');
    })
    .catch(error => {
      console.error('Error:', error);
      // 에러 메시지를 사용자에게 보여줄 수 있는 UI 처리 추가
    });
  }

  /* 카테고리 */
  // const images = [
  //   require('./../images/dietTest/1.png'),
  //   require('./../images/dietTest/2.png'),
  //   require('./../images/dietTest/3.png'),
  //   require('./../images/dietTest/4.png'),
  //   require('./../images/dietTest/5.png'),
  //   require('./../images/dietTest/6.png'),
  //   require('./../images/dietTest/7.png'),
  //   require('./../images/dietTest/8.png'),
  //   require('./../images/dietTest/9.png'),
  //   require('./../images/dietTest/10.png'),
  //   require('./../images/dietTest/11.png'),
  //   require('./../images/dietTest/12.png'),
  //   require('./../images/dietTest/13.png'),
  //   require('./../images/dietTest/14.png'),
  //   require('./../images/dietTest/15.png'),
  //   require('./../images/dietTest/16.png'),
  //   require('./../images/dietTest/17.png'),
  //   require('./../images/dietTest/18.png'),
  //   require('./../images/dietTest/19.png'),
  //   require('./../images/dietTest/20.png'),
  //   // 이하 이미지들을 추가해주세요
  // ];

  
  // const [glows, setGlows] = useState(new Array(20).fill(false)); // 20개 이미지의 상태 초기화

  // const toggleGlow = index => {
  //   const newGlows = [...glows];
  //   newGlows[index] = !newGlows[index];
  //   setGlows(newGlows);
  // };
  
  // const renderImages = () => {
  //   return glows.map((glow, index) => (
  //     <div key={index} className="image-container" onClick={() => toggleGlow(index)}>
  //       <img
  //         src={images[index]} // 이미지 URL 적절히 설정
  //         className={glow ? 'glow' : ''}
  //       />
  //     </div>
  //   ));
  // };

    /* 모달 */
  // selectedProduct 상태는 현재 선택된 제품 객체를 저장하며, 모달에 표시될 데이터를 관리합니다. 
  const [selectedProduct, setSelectedProduct] = useState(null);

  // openModal 함수는 클릭된 제품 객체를 인자로 받아 selectedProduct 상태를 업데이트하여 모달에 표시합니다.
  const openModal = (slide) => {
    setSelectedProduct(slide);
  };

  // closeModal 함수는 모달을 닫을 때 사용되며, selectedProduct 상태를 null로 설정하여 모달을 숨깁니다.
  const closeModal = () => {
    setSelectedProduct(null);
  };
  

  return (
    <>
      <Navi />
      <Menu />
        
        <div className="diet-container">
        <h1 style={{textAlign:'center', margin:'30px 0'}}>식단 주문</h1>
          <div className='diet-top-content'>
            <p className='diet-diagnose-date'>{formatDate(userInfo.creation_date)} 진단 기준</p>
            <Link to={"/nutri/nutri"}><div className='button'>새로 진단</div></Link>
          </div>
          <div className='diet-user-text'>
            <p className='diet-kcal-text'>{userInfo.membernick} 님은 최대 <span style={{color:'red'}}>{Math.floor(userInfo.requiredCalories)}kcal</span>의</p>
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
            {dietData?.map((slideGroup, index) => (
              <div key={index} className="slide-group">
                {slideGroup.map((slide, subIndex) => (
                   <div className='diet-first-food'>
                      <img className='diet-product-image' src={require(`../images/products/${slide.proimg}.jpg`)} alt={slide.title} onClick={() => openModal(slide)}/>
                      <div style={{width:'100%'}}>
                        <p className='diet-product-name'>{slide.pronm}</p>
                        <div style={{paddingTop:'15px', paddingBottom:'10px'}}>
                          {slide.prostp.split(',').map((imgCode, imgIndex) => (
                            <img style={{width:'30px'}} src={require(`../images/tpyeIcon/${imgCode}.png`)}/>
                          ))}
                        </div>
                        <p className='diet-product-data' style={{marginBottom:'10px'}}>칼로리 {slide.pifcal}Kcal</p>
                        <div className="diet-product-data-section">
                          <p className='diet-product-data'>탄수화물 {slide.piftan}g</p>
                          <p className='diet-product-data'>단백질 {slide.pifprt}g</p>
                        </div>
                        <p className='diet-product-data'>지방 {slide.piffat}g</p>
                      </div>
                   </div>
                ))}
              </div>
            ))||[]}
            
          </animated.div>
          {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
          <div className='diet-category'>
            {/* <h2>카테고리</h2>
            <div className="image-grid">
              {renderImages()}
            </div> */}
          </div>
          <div className='diet-buy-button' onClick={foodBuyClick}>구매하러 가기</div>

          <div className='line'></div>
          <div style={{marginTop:'50px'}}>
            <h1 style={{textAlign:'center', margin:'20px 0'}}>음식 이미지 분석</h1>
            <div style={{textAlign:'center'}}>
              <input type="file" onChange={handleImageChange} className='file-choose'/>
              {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '300px', marginBottom:'20px' }} />}
            </div>
            <div onClick={handleImageUpload} className='diet-buy-button'>내가 먹은 음식은?</div>
            {result && (
              <div style={{textAlign:'center'}}>
                <h2 className='diet-kcal-text'>결과</h2>
                <div style={{marginBottom:'20px'}}>
                  {result.slice(0, 5).map((item, index) => (
                    <div key={index}>
                      <p className='diet-product-data'>음식명 : {item.category}, 확률 : {(item.probability * 100).toFixed(2)}%</p>
                    </div>
                  ))}
                </div>
                {result.length > 0 && (
                  <div style={{textAlign:'center'}}>
                    <h3 className='diet-kcal-text'>영양 성분</h3>
                    <p className='diet-product-data'>음식명 : {getNutritionInfo(result[0].category).name}</p>
                    <p className='diet-product-data'>제공량 : {getNutritionInfo(result[0].category).serving}</p>
                    <p className='diet-product-data'>칼로리 : {getNutritionInfo(result[0].category).calorie} kcal</p>
                    <p className='diet-product-data'>탄수화물 : {getNutritionInfo(result[0].category).carbohydrate} g</p>
                    <p className='diet-product-data'>당류 : {getNutritionInfo(result[0].category).sugar} g</p>
                    <p className='diet-product-data'>단백질 : {getNutritionInfo(result[0].category).protein} g</p>
                    <p className='diet-product-data'>지방 : {getNutritionInfo(result[0].category).fat} g</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      <Footer />
    </>
  );
};

export default App;



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