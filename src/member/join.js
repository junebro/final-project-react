import './../App.css';
import './join.css';

import React from 'react';
import Navi from './../common/navigation';
import Footer from './../common/footer';

function App() {
    return (
        <div>
            <Navi />
            <section>
            <div className="signUp-box">
                <form className="signUp-form">
                    <h1 className="signUp-title">회원가입</h1>

                    <hr />

                    <span className="sub-title">이메일</span>
                    <span className="email-message">이미 존재하는 이메일 입니다!</span>
                    <input
                        type="email"
                        id="memberEmail"
                        className="input-signUp"
                        name="memberEmail"
                        placeholder="이메일을 입력해주세요!"
                    />

                    <span className="sub-title">비밀번호</span>
                    <span className="pw-message">8자리 이상, 대소문자 포함</span>
                    <input
                        type="password"
                        id="memberPw"
                        className="input-signUp"
                        name="memberPw"
                        placeholder="비밀번호를 입력해주세요!"
                    />

                    <span className="sub-title">비밀번호 확인</span>
                    <span className="pwCheck-message">비밀번호가 일치하지 않습니다</span>
                    <input
                        type="password"
                        id="memberPwCheck"
                        className="input-signUp"
                        name="memberPwCheck"
                        placeholder="비밀번호를 한번 더 입력해주세요!"
                    />

                    <span className="sub-title">닉네임</span>
                    <span className="email-message">이미 존재하는 닉네임입니다</span>
                    <input
                        type="text"
                        id="memberNickName"
                        className="input-signUp"
                        name="memberNickName"
                        placeholder="닉네임을 입력해주세요!"
                    />

                    <span className="sub-title">휴대폰 번호</span>
                    <div className="phone">
                        <input className="phone-number" placeholder="010" /> - 
                        <input className="phone-number" placeholder="0000" /> -
                        <input className="phone-number" placeholder="0000" />

                        <button className="send-number" type="button">인증번호 받기</button>

                        <input className="cert-number" placeholder="4자리 숫자" />
                        <button className="complete-number" type="button">인증하기</button>
                    </div>
                    
                    <span className="sub-title">주소</span>

                    <p>주소 끼워넣기</p>

                    <div className="btn-box">
                        <button type="submit" className="signUp-submit">가입완료</button>
                    </div>
                </form>
            </div>
        </section>
            <Footer />
        </div>
    );    
}
export default App;