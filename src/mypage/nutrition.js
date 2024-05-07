import './../App.css';
import './nutrition.css';
import React from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';


function App() {
   
     return (
        <div>
        <Navi />
        <Menu />
        <div className="section-p">
        <div className="nutrition-section">
  <nav className="nav">
    <div className="nav-profile-img"></div>
    <p className="nav-nickName">닉네임</p>
    <hr className="h1" />
    <ul class="mypage-ul">
    <li><Link to="/EditProfile">내 정보 수정</Link></li>
      <li><Link to="/Nutrition" className='active'>영양 진단 결과</Link></li>
      <li><Link to="/MyCommunity">커뮤니티 활동</Link></li>
      <li><Link to="/HealthDiary"  >건강 일기</Link></li>
      <li><Link to="/OrderList">주문 내역</Link></li>
      <li><a href="#">회원 탈퇴</a></li>
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