import './../App.css';
import './healthDiary.css';
import './diary.css';
import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import Calendar from 'react-calendar';




function App() {
    
    const [value, onChange] = useState(new Date());

    console.log(value); // value 값 확인


    return (
        <div>
            <Navi />
            <Menu />
            <div className="section-p">
            <div className="diary-section">
      <nav className="nav">
        <div className="nav-profile-img"></div>
        <p className="nav-nickName">닉네임</p>
        <hr className="h1" />
        <ul class="mypage-ul">
        <li><Link to="/EditProfile">내 정보 수정</Link></li>
          <li><Link to="/Nutrition">영양 진단 결과</Link></li>
          <li><Link to="/MyCommunity">커뮤니티 활동</Link></li>
          <li><Link to="/HealthDiary"  className='mypage-menu-active'>건강 일기</Link></li>
          <li><Link to="/OrderList">주문 내역</Link></li>
          <li><a href="#">회원 탈퇴</a></li>
        </ul>
      </nav>

      <div className="contents">
            <h1 className="title">건강일기</h1>
            <hr className="title-line" />
            <form>
            {/* 달력 */}
            <div className="calendar-box">
            <Calendar onChange={onChange} value={value} />
            </div>

            <div className="diary-box">
                <span>5.3</span><span>금요일</span>
                <div className="icon-box">
                    {/* 8개의 표정 아이콘 */}
                    <div className="icon"></div>
                <span>살쪘어</span>
                </div>
                {/* 하루 상태 */}
            <div className="diary-contents">
                어쩌고 저쩌고 도레미파솔라시도 가나다라마바사아차카타파하 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad dolore eius ab eaque molestiae tempore. Ab, earum animi, ipsa tempore ut minus voluptatibus aliquid culpa, fuga eaque labore ipsam officiis.
            </div>
            </div>


            {/* Null : 일기쓰기, Not Null : 일기 수정 */}
            <div className="diary-btn-box">
                <button type="button" className="write-btn">일기 쓰기</button>
            </div>
            </form>
        </div>
    </div>
    </div>
        <Footer />
    </div>
    );    
}
export default App;