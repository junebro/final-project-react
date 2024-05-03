import './../App.css';
import './resetPw.css';

import React from 'react';
import Navi from './../common/navigation';
import Footer from './../common/footer';

function App() {
    return (
        <div>
            <Navi />
            <section>
            <div className="resetPw-box">
            <form className="resetPw-form">
                <h1>임시 비밀번호 발급</h1>
                <hr />
                <p>비밀번호를 잊으셨나요?</p>
                <p>회원가입시 사용한 이메일을 입력해주세요!</p>

                <span className="sub-title">이메일</span> <span className="email-message">존재하지 않는 이메일입니다</span>
                <input type="email" className="input-email" placeholder="green_life@gmail.com" />
                <button className="resetPw-btn">임시 비밀번호 발송</button>
            </form>
        </div>
        </section>
            <Footer />
        </div>
    );    
}
export default App;