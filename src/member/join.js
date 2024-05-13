import './../App.css';
import './join.css';

import React, { useRef } from 'react';
import Navi from './../common/navigation';
import Footer from './../common/footer';
import PopupDom from './popupDom';
import PopupPostCode from './PopupPostCode';
import { addressData } from './PopupPostCode';

function App() {

    let inputAddress = '';

    if (addressData) {
        inputAddress = addressData;
    }

    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = React.useState(false)

    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }

    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    // 비밀번호 유효성 검사
    const [memberPw, setMemberPw] = React.useState('');
  const [memberPwCheck, setMemberPwCheck] = React.useState('');
  const [pwMessage1, setPwMessage1] = React.useState('');
  const [pwMessage2, setPwMessage2] = React.useState('');
  const [pwMessage1Color, setPwMessage1Color] = React.useState(''); 
  const [pwMessage2Color, setPwMessage2Color] = React.useState('');
  
  const handlePwChange = (event) => {
    const { value } = event.target;
    setMemberPw(value);

    if (value.length === 0) {
      setPwMessage1('사용할 비밀번호를 입력해주세요.');
      setPwMessage1Color('gray');
      return;
    }

    const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    if (regExp.test(value)) {
      if (memberPwCheck.length === 0) {
        setPwMessage1('유효한 비밀번호 형식입니다.');
        setPwMessage1Color('green');
      } else {
        checkPw();
      }
    } else {
      setPwMessage1('8자 이상 문자와 숫자 또는 특수문자를 포함해야 합니다.');
      setPwMessage1Color('red');
    }
  };

  const test = useRef(null);

  const handlePwCheckChange = (event) => {
    const { value } = event.target;
    
    if ( value  === test.current.value) {
        setPwMessage2('비밀번호가 일치합니다.');
      setPwMessage2Color('green');
    } else {
        setPwMessage2('비밀번호가 일치하지 않습니다.');
        setPwMessage2Color('red');
    }

    setMemberPwCheck(value);
    
  };

  const checkPw = () => {
    if (memberPw === memberPwCheck) {
      setPwMessage2('비밀번호가 일치하지 않습니다.');
      setPwMessage2Color('red');
    } else {
      setPwMessage2('비밀번호가 일치합니다.');
      setPwMessage2Color('green');
    }
  };


    return (

        <div>
            <Navi />
            <div className='join-section'>
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
                        <span className="pw-message" style={{ color: pwMessage1Color }}>{pwMessage1}</span>
                        <input
                            ref={test}
                            type="password"
                            id="memberPw"
                            value={memberPw}
                            onChange={handlePwChange}
                            className="input-signUp"
                            name="memberPw"
                            placeholder="비밀번호를 입력해주세요!"
                        />

                        <span className="sub-title">비밀번호 확인</span>
                        <span className="pwCheck-message"style={{ color: pwMessage2Color }}>{pwMessage2}</span>
                        <input
                            type="password"
                            id="memberPwCheck"
                            value={memberPwCheck}
                            onChange={handlePwCheckChange}
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

                            <button className="send-number" type="button">인증번호</button>

                            <input className="cert-number" placeholder="4자리 숫자" />
                            <button className="complete-number" type="button">인증하기</button>
                        </div>

                        <span className="sub-title">주소</span>

                        <div className="address-box">




                            <input id="post" className="post" placeholder="우편번호" value={inputAddress.zonecode} />
                            <button type="button" id="post-btn" className="post-btn"
                                onClick={openPostCode}>우편번호 찾기</button>


                            {/* // 팝업 생성 기준 div */}
                            <div id='popupDom'>
                                {isPopupOpen && (
                                    <PopupDom>
                                        <PopupPostCode onClose={closePostCode} />
                                    </PopupDom>
                                )}
                            </div>

                            <input id="road-name" className="road-name" placeholder="도로명주소" value={inputAddress.address} />
                            <input id="address-detail" className="address-detail" placeholder="상세주소" />


                        </div>
                        <div className="btn-box">
                            <button type="submit" className="signUp-submit">가입완료</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default App;