import './../App.css';
import './diaryDetail.css';
import './diary.css';
import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';





function App() {
    
    const [value, onChange] = useState(new Date());

    console.log(value); // value 값 확인


    return (
        <div>
            <Navi />
            <Menu />
            <div className="section-p">
            <div className="diaryDetail-section">
      <nav className="mypage-nav">
        <div className="nav-profile-img"></div>
        <p className="nav-nickName">닉네임</p>
        <hr className="h1" />
        <ul class="mypage-ul">
        <li><Link to="/mypage/EditProfile">내 정보 수정</Link></li>
          <li><Link to="/mypage/Nutrition">영양 진단 결과</Link></li>
          <li><Link to="/mypage/MyCommunity">커뮤니티 활동</Link></li>
          <li><Link to="/mypage/HealthDiary"  className='mypage-menu-active'>건강 일기</Link></li>
          <li><Link to="/mypage/OrderList">주문 내역</Link></li>
          <li><a href="#">회원 탈퇴</a></li>
        </ul>
      </nav>

      <div className="diaryDetail-contents">
            <h1 className="mypage-title">건강일기</h1>
            <hr className="title-line" />
            <div className='title-margin'>
            <p className="sticker-title">다양한 스티커로</p>
            <p className="sticker-title">하루를 표현해 보세요!</p>
            </div>
            {/* 상태 스티커 박스 */}
            <form className="diary-form">
                <div className="status-box scrollbar">

                    <div className="sticker-item-box">
                        <input type="radio" id="sticker1" className="sticker-item" name="status" value="1" />
                        <label htmlFor="sticker1"><img src={require("./../images/member/status/weightloss.png")} alt="sticker1" /></label>
                        <p>살빠짐</p>
                    </div>

                    <div className="sticker-item-box">
                        <input type="radio" id="sticker2" className="sticker-item" name="status" value="2" />
                        <label htmlFor="sticker2"><img src={require("./../images/member/status/2.png")} alt="sticker2" /></label>
                        <p>유지어터</p>
                    </div>

                    <div className="sticker-item-box">
                        <input type="radio" id="sticker3" className="sticker-item" name="status" value="3" />
                        <label htmlFor="sticker3"><img src={require("./../images/member/status/3.png")} alt="sticker3" /></label>
                        <p>살쪘어</p>
                    </div>

                    <div className="sticker-item-box">
                        <input type="radio" id="sticker4" className="sticker-item" name="status" value="4" />
                        <label htmlFor="sticker4"><img src={require("./../images/member/status/4.png")} alt="sticker4" /></label>
                        <p>오운완</p>
                    </div>

                    <div className="sticker-item-box">
                        <input type="radio" id="sticker5" className="sticker-item" name="status" value="5" />
                        <label htmlFor="sticker5"><img src={require("./../images/member/status/5.png")} alt="sticker5" /></label>
                        <p>목표달성</p>
                    </div>

                    <div className="sticker-item-box">
                        <input type="radio" id="sticker6" className="sticker-item" name="status" value="6" />
                        <label htmlFor="sticker6"><img src={require("./../images/member/status/6.png")} alt="sticker6" /></label>
                        <p>단식성공</p>
                    </div>

                    <div className="sticker-item-box">
                        <input type="radio" id="sticker7" className="sticker-item" name="status" value="7" />
                        <label htmlFor="sticker7"><img src={require("./../images/member/status/7.png")} alt="sticker7" /></label>
                        <p>치팅데이</p>
                    </div>

                    <div className="sticker-item-box">
                        <input type="radio" id="sticker8" className="sticker-item" name="status" value="8" />
                        <label htmlFor="sticker8"><img src={require("./../images/member/status/8.png")} alt="sticker8" /></label>
                        <p>폭식함</p>
                    </div>
                </div>

                <p className="sticker-title">조금 더 자세히 기록해 볼까요?</p>
                <textarea className="diary-detail" placeholder="내용 입력(최대 1000자)" />

                <div className="diaryBtn-box">
                <Link to="/HealthDiary"><button type="button" className="date-select">날짜 다시 선택</button></Link>
                    <button type="submit" className="diary-submit">작성완료</button>
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