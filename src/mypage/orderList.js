import './../App.css';
import './orderList.css';
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
            <div class="section-p">
            <div className='order-section'>
            <nav className="nav">
    <div className="nav-profile-img"></div>
    <p className="nav-nickName">닉네임</p>
    <hr className="h1" />
    <ul class="mypage-ul">
      <li><a href="#">내 정보 수정</a></li>
      <li><Link to="/Nutrition" >영양 진단 결과</Link></li>
      <li><Link to="/MyCommunity">커뮤니티 활동</Link></li>
      <li><Link to="/HealthDiary"  >건강 일기</Link></li>
      <li><Link to="/OrderList" className='mypage-menu-active'>주문 내역</Link></li>
      <li><a href="#">회원 탈퇴</a></li>
    </ul>
  </nav>

      <div className="contents">
      <h1 className="title">주문 내역</h1>
            <hr className="title-line" />

            <div className="order-box">
                <div className="delivery-info">
                    <p className="order-date">2024.05.02</p>
                    <p className="delivery-status">배송 준비</p>
                </div>

                <div className="product-box">
                    <div className="product-img">
                        <img src="./assets/프사.jpg" alt="프로필 사진" />
                    </div>
                    <div className="order-info">
                        <p>리코타치즈 샐러드 | 1 개</p>
                        <p>20,000원</p>
                        <p>서울특별시 마포구 어디동 300번지 어쩌고 102호 </p>
                    </div>
                </div>

                <div className="order-result">
                    <span className="payment">총 결제금액 : 20,000원</span>
                    <button type="button" className="delivery-btn">주문 취소</button>
                </div>
            </div>

            <div className="order-box">
                <div className="delivery-info">
                    <p className="order-date">2024.05.02</p>
                    <p className="delivery-status">배송 완료</p>
                </div>

                <div className="product-box">
                    <div className="product-img">
                        <img src="./assets/프사.jpg" alt="프로필 사진" />
                    </div>
                    <div className="order-info">
                        <p>리코타치즈 샐러드 | 1 개</p>
                        <p>20,000원</p>
                        <p>서울특별시 마포구 어디동 300번지 어쩌고 102호 </p>
                    </div>
                </div>

                <div className="product-box">
                    <div className="product-img">
                        <img src="./assets/프사.jpg" alt="프로필 사진" />
                    </div>
                    <div className="order-info">
                        <p>리코타치즈 샐러드 | 1 개</p>
                        <p>20,000원</p>
                        <p>서울특별시 마포구 어디동 300번지 어쩌고 102호 </p>
                    </div>
                </div>

                <div className="order-result">
                    <span className="payment">총 결제금액 : 20,000원</span>
                    <button type="button" className="delivery-btn">반품 신청</button>
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