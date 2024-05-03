import './../App.css';
import './login.css';
import React from 'react';
import Navi from './../common/navigation';
import Footer from './../common/footer';

function App() {
    return (
        <div>
            <Navi />
        <section>
            <div className="login-box">
                <form login-form>
                    <h1 className="login-title">로그인</h1>

                    <hr />

                    <span className="sub-title">이메일</span>
                    <span className="email-message">존재하지않는 이메일 입니다!</span>
                    <input
                        type="email"
                        id="memberEmail"
                        className="input-login"
                        name="memberEmail"
                        placeholder="이메일을 입력해주세요!"
                    />

                    <span className="sub-title">비밀번호</span>
                    <span className="pw-message">비밀번호를 다시 입력해주세요!</span>
                    <input
                        type="password"
                        id="memberPw"
                        className="input-login"
                        name="memberPw"
                        placeholder="비밀번호를 입력해주세요!"
                    />

                    <div className="saveId-searchPw">
                        <div>
                            <label className="saveId">
                                <input
                                    type="checkbox"
                                    name="saveId"
                                    id="saveId"
                                /><label htmlFor="saveId"></label>
                                자동 로그인
                            </label>

                        </div>
                        <a href="#">비밀번호를 잊으셨나요?</a>
                    </div>

                    <button type="submit" id="btn-submit" className="btn-submit">로그인</button>
                </form>

                <div className="or">OR</div>

                <div className="sns-login">
                    <div className="kakao"></div>
                    <div className="google"></div>
                    <div className="naver"></div>
                </div>
            </div>
        </section>
        <Footer />
    </div>
    );    
}
export default App;