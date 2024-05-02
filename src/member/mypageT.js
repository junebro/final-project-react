import './../App.css';
import './mypageT.css';
import React from 'react';
import Navi from './../common/navigation';
import Menu from './../common/menu';
import Footer from './../common/footer';

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
        <h1>내 정보 수정</h1>
        <hr className="title-line" />
      </div>
    </section>
    </div>
        <Footer />
    </div>
    );    
}
export default App;