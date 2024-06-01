import './../App.css';
import './login.css';
import React, { useState, useEffect } from 'react';
import Navi from './../common/navigation';
import Footer from './../common/footer';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/contexts/AuthContext'; // 로그인 

function App() {

// 로그인 시 토큰
const [jwtToken, setJwtToken] = useState(null);
const { login, logout, setAuthState } = useAuth(); // 컴포넌트 내에서 useAuth 호출
const navigate = useNavigate();

// 폼 제출 핸들러
 const login_submit = async (event) => {

    event.preventDefault(); // 폼 기본 제출 이벤트 방지

    const loginData = {
        memEmail: event.target.memberEmail.value,
        memPw: event.target.memberPw.value,
    };
    try {
        // 백엔드로 POST 요청 전송
        const response = await axios.post('/join/member/login', JSON.stringify(loginData), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 응답 처리
        if (response.status === 200) {
            alert('로그인이 완료되었습니다.');
            const { accessToken } = response.data; // accessToken 추출
            localStorage.setItem('authToken', accessToken); // 로컬 스토리지에 accessToken 저장
            login(accessToken); // Context에 로그인 정보 업데이트
            navigate('/'); // 페이지 리디렉션

        } else {
            alert('로그인 실패');
        }
    } catch (error) {
        console.error('로그인 에러', error);
        alert('로그인 중 오류 발생');
    }
};


// // 이메일 중복 검사
// const [email, setEmail] = React.useState('');
// const [emailError, setEmailError] = React.useState('');
// const [emailAvailable, setEmailAvailable] = React.useState(true);

// const handleEmailChange = (event) => {
//     const newEmail = event.target.value;
//     setEmail(newEmail);

//     // 이메일 유효성 검사
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(newEmail)) {
//         setEmailError('올바른 이메일 주소를 입력하세요.');
//         setEmailAvailable('red');
//         return;
//     } else {
//         // setEmailError('사용 가능한 이메일입니다');
//         // setEmailAvailable('green');
//     }

//     // 서버로 이메일 중복 확인 요청 보내기
//     checkEmailAvailability(newEmail);
// }

<<<<<<< HEAD
// const checkEmailAvailability = (newEmail) => {
//     const encodedEmail = encodeURIComponent(newEmail);
//     fetch(`/join/check/email?newEmail=${encodedEmail}`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         if (data) {
//             setEmailAvailable(true);
//             setEmailError('존재하지 않는 이메일입니다.');
//             setEmailAvailable('red');
//         } else {
//             setEmailAvailable(false);
//             setEmailError('존재하는 이메일입니다.');
//             setEmailAvailable('green');
//         }
//     })
//     .catch(error => console.error('Error:', error));
// }
=======
const checkEmailAvailability = (newEmail) => {
    const encodedEmail = encodeURIComponent(newEmail);
    fetch(`/join/check/email?newEmail=${encodedEmail}`)
    .then(response => response.json())
    .then(data => {
        if (data) {
            setEmailAvailable(true);
            setEmailError('존재하지 않는 이메일입니다.');
            setEmailAvailable('red');
        } else {
            setEmailAvailable(false);
            setEmailError('존재하는 이메일입니다.');
            setEmailAvailable('green');
        }
    })
    .catch(error => console.error('Error:', error));
}
>>>>>>> c2c2e2932823cd22238a6440274c7c9b1bdfe87e
    return (
        <div>
            <Navi />
        <section>
            <div className="login-box">
                <form onSubmit={login_submit} method='post' login-form>
                    <h1 className="login-title">로그인</h1>

                    <hr />

                    <span className="sub-title">이메일</span>
                    {/* <span className="email-message" style={{ color: emailAvailable }}>{emailError}</span> */}
                    <input
                        type="email"
                        id="memberEmail"
                        // value={email}
                        // onChange={handleEmailChange}
                        className="input-login"
                        name="memberEmail"
                        placeholder="이메일을 입력해주세요!"
                    />

                    <span className="sub-title">비밀번호</span>
                    <span className="pw-message"></span>
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