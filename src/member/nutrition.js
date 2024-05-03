import './../App.css';
import './nutrition.css';
import React from 'react';
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

function App() {
    return (
        <div>
            <Navi />
            <Menu />
            <div class="section-p">
            <section>
      <nav className="nav">
        <div className="nav-profile-img"></div>
        <p className="nav-nickName">닉네임</p>
        <hr className="h1" />
        <ul class="mypage-ul">
          <li className="active"><a href="#">내 정보 수정</a></li>
          <li><a href="#">영양 진단 결과</a></li>
          <li><a href="#">커뮤니티 활동</a></li>
          <li><a href="#">건강 일기</a></li>
          <li><a href="#">주문 내역</a></li>
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

    </section>
    </div>
        <Footer />
    </div>
    );    
}
export default App;