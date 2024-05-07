import './../App.css';
import './nutrition.css';
import React from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';


function App() {
    // active 상태를 useState 훅을 통해 선언
    const [activeItem, setActiveItem] = React.useState(null);
 
    // 메뉴 클릭 시 실행될 함수
    const handleItemClick = (index) => {
      // 클릭된 메뉴 항목의 인덱스로 active 상태 업데이트
      setActiveItem(index);
    };
  
    
    const menuItems = [
        { name: '내 정보 수정', path: '/join' },
        { name: '영양 진단 결과', path: '/Nutrition' },
        { name: '커뮤니티 활동', path: '/MyCommunity' },
        { name: '건강 일기', path: '/join' },
        { name: '주문 내역', path: '/orderList' },
        { name: '회원 탈퇴', path: '/join' }
    ];
 
     return (
         <div>
             <Navi />
             <Menu />
             <div class="section-p">
             <div className='nutrition-section'>
       <nav className="mypage-nav">
         <div className="nav-profile-img"></div>
         <p className="nav-nickName">닉네임</p>
         <hr className="h1" />
            <ul className="mypage-ul">
       {/* 메뉴 항목들을 매핑하여 렌더링 */}
       {menuItems.map((menuItem, index) => (
         <li
           key={index}
           className={`menu-item ${activeItem === index ? 'active' : ''}`}
           onClick={() => handleItemClick(index)}
         >
           <Link to={menuItem.path}>{menuItem.name}</Link>
         </li>
       ))}
     </ul>
       </nav>
 
       <div className="contents">
                 <h1 className="title">영양 진단 결과</h1>
                 <hr className="title-line" />
 
                 <div className="nutrition-box">
                     <div className="left-box">
                         <p>영양소 섭취량으로 파악하는 나의 식습관</p>
                         <p>??? 영양 진단 서비스</p>
                         <p className="nutrition-a"><a href="#">나의 식이습관 파헤치기 →</a></p>
                     </div>
                     <div className="right-box">
                         <img src={require("./../images/member/survey-people.png")} alt="survey-people" />
                     </div>
                 </div>
 
                 <p className="sub-title">진단 설문 내역</p>
                 <hr className="sub-title-line" />
                 <div className="survey-list">
 
                     <div className="survey-one">
                         <div className="text">
                             <span>3차</span>
                             <span>2024.04.19 검사</span>
                         </div>
                         <button type="button" className="survey-result">진단결과 보기</button>
                     </div>
 
                     <div className="survey-one">
                         <div className="text">
                             <span>2차</span>
                             <span>2024.04.19 검사</span>
                         </div>
                         <button type="button" className="survey-result">진단결과 보기</button>
                     </div>
 
                     <div className="survey-one">
                         <div className="text">
                             <span>1차</span>
                             <span>2024.04.19 검사</span>
                         </div>
                         <button type="button" className="survey-result">진단결과 보기</button>
                     </div>
                 </div>
             </div>
 
     </div>
     </div>
         <Footer />
    </div>
    );    
}
export default App;