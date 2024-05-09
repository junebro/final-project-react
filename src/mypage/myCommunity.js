import './../App.css';
import './myCommunity.css';
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
        <div className="community-section">
  <nav className="nav">
    <div className="nav-profile-img"></div>
    <p className="nav-nickName">닉네임</p>
    <hr className="h1" />
    <ul class="mypage-ul">
        <li><Link to="/EditProfile">내 정보 수정</Link></li>
        <li><Link to="/Nutrition" >영양 진단 결과</Link></li>
        <li><Link to="/MyCommunity" className='mypage-menu-active'>커뮤니티 활동</Link></li>
        <li><Link to="/HealthDiary"  >건강 일기</Link></li>
        <li><Link to="/OrderList">주문 내역</Link></li>
        <li><a href="#">회원 탈퇴</a></li>
    </ul>
  </nav>

            <div className="contents">
                <h1 className='title'>커뮤니티 활동</h1>
                <hr className="title-line" />
                <div className="community-category">
                    <div className="write contents-active">
                        <p>3</p>
                        <p>작성한 글</p>
                    </div>
                    <div className="like">
                        <p>3</p>
                        <p>좋아요 목록</p>
                    </div>
                </div>
                <div className="contents-list">
                    <div className="list-one">
                        <p>제목제목제목</p>
                        <span>작성자</span>
                        <span>2024.04.25</span>
                        <span>조회수 135</span>
                    </div>
                </div>
                <div className="contents-list">
                    <div className="list-one">
                        <p>제목제목제목</p>
                        <span>작성자</span>
                        <span>2024.04.25</span>
                        <span>조회수 135</span>
                    </div>
                </div>
                <div className="contents-list">
                    <div className="list-one">
                        <p>제목제목제목</p>
                        <span>작성자</span>
                        <span>2024.04.25</span>
                        <span>조회수 135</span>
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