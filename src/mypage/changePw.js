import './../App.css';
import './changePw.css';
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
            <div className='changePw-section'>
      <nav className="mypage-nav">
        <div className="nav-profile-img"></div>
        <p className="nav-nickName">닉네임</p>
        <hr className="h1" />
        <ul class="mypage-ul">
    <li><Link to="/EditProfile" className='mypage-menu-active'>내 정보 수정</Link></li>
      <li><Link to="/Nutrition">영양 진단 결과</Link></li>
      <li><Link to="/MyCommunity">커뮤니티 활동</Link></li>
      <li><Link to="/HealthDiary"  >건강 일기</Link></li>
      <li><Link to="/OrderList">주문 내역</Link></li>
      <li><a href="#">회원 탈퇴</a></li>
    </ul>
      </nav>

      <div className="contents">
            <h1 className="mypage-title">비밀번호 변경</h1>
            <hr className="title-line" />

            <div className="changePw-box">
                <form className="changePw-form">
                    <p>현재 비밀번호</p>
                    <input placeholder="현재 비밀번호를 입력해주세요!" />
                    <p>변경 비밀번호</p>
                    <input placeholder="변경할 비밀번호를 입력해주세요!" />
                    <p>변경 비밀번호 확인</p>
                    <input placeholder="변경할 비밀번호를 다시 입력해주세요!" />

                    <button type="submit" className="changePw-btn">완료</button>
                </form>
            </div>
        </div>
    </div>
    </div>
        <Footer />
    </div>
    );    
}
export default App;