import './../App.css';
import './join.css';

import React, { useRef } from 'react';
import Navi from './../common/navigation';
import Footer from './../common/footer';
import PopupDom from './popupDom';
import PopupPostCode from './PopupPostCode';
import { addressData } from './PopupPostCode';
import Swal from 'sweetalert2';
import axios from 'axios';





function App() {

//   const handleSubmit = () => {
//     const data = { aauserInput: 'aaa' };
//     axios.post('/check/sendSMS', data)
//         .then(response => {
//             console.log('Server response:', response);
//             alert('Data sent successfully');
//         })
//         .catch(error => {
//             console.error('Error sending data:', error);
//         });
// };


  // 주소입력
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

    // 이메일 중복 검사
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [emailAvailable, setEmailAvailable] = React.useState(true);

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        // 이메일 유효성 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(newEmail)) {
            setEmailError('올바른 이메일 주소를 입력하세요.');
            setEmailAvailable('red');
            return;
        } else {
            // setEmailError('사용 가능한 이메일입니다');
            // setEmailAvailable('green');
        }

        // 서버로 이메일 중복 확인 요청 보내기
        checkEmailAvailability(newEmail);
    }

    const checkEmailAvailability = (newEmail) => {
        const encodedEmail = encodeURIComponent(newEmail);
        fetch(`/join/check/email?newEmail=${encodedEmail}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                setEmailAvailable(true);
                setEmailError('사용가능한 이메일입니다.');
                setEmailAvailable('green');
            } else {
                setEmailAvailable(false);
                setEmailError('이미 사용 중인 이메일 주소입니다.');
                setEmailAvailable('red');
            }
        })
        .catch(error => console.error('Error:', error));
    }

//    const handleSubmit = (event) => {
//        event.preventDefault();
//         // 다른 필드들의 유효성 검사 및 서버로의 회원가입 요청 추가
//     }


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

     // 닉네임 중복 검사
     const [nickname, setNick] = React.useState('');
     const [nickError, setNickError] = React.useState('');
     const [nickAvailable, setNickAvailable] = React.useState(true);
 
     const handleNickChange = (event) => {
         const newNick = event.target.value;
         setNick(newNick);
 
         // 서버로 이메일 중복 확인 요청 보내기
         checkNickAvailability(newNick);
     }
 
     const checkNickAvailability = (newNick) => {
        //  const inputNick = encodeURIComponent(newNick);
         fetch(`/join/check/nick?newNick=${newNick}`)
         .then(response => response.json())
         .then(data => {
             console.log(data);
             if (data) {
                setNickAvailable(true);
                 setNickError('사용가능한 닉네임입니다.');
                 setNickAvailable('green');
             } else {
                setNickAvailable(false);
                 setNickError('이미 사용 중인 닉네임입니다.');
                 setNickAvailable('red');
             }
         })
         .catch(error => console.error('Error:', error));
     }
 

 

// 휴대폰 인증
const [phoneNumber, setPhoneNumber] = React.useState('');
const [certifiedNumber, setCertifiedNumber] = React.useState('');

const sendSMS = () => {
  // 서버로 전화번호를 보내는 AJAX 요청
  fetch('/check/sendSMS', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber: phoneNumber })
  })
      .then(response => response.text())
      .then(data => {
          setCertifiedNumber(data);
          Swal.fire('인증번호 발송 완료!');
      })
      .catch(error => console.error('Error:', error));
};

const verifyPhoneNumber = () => {
  if (certifiedNumber === '') {
      Swal.fire('인증번호를 먼저 받아주세요!');
      return;
  }

  if (certifiedNumber === document.getElementById('inputCertifiedNumber').value) {
      Swal.fire(
          '인증성공!',
          '휴대폰 인증이 정상적으로 완료되었습니다.',
          'success'
      );

      // 서버로 전화번호 업데이트 요청
      fetch(`/update/phone`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phoneNumber: phoneNumber })
      })
          .then(response => {
              if (response.ok) {
                  document.location.href = "/home";
              } else {
                  throw new Error('Network response was not ok.');
              }
          })
          .catch(error => console.error('Error:', error));
  } else {
      Swal.fire({
          icon: 'error',
          title: '인증오류',
          text: '인증번호가 올바르지 않습니다!',
          footer: '<a href="/home">다음에 인증하기</a>'
      });
  }
};
  
 // 폼 제출 핸들러
 const join_submit = async (event) => {
    event.preventDefault(); // 폼 기본 제출 이벤트 방지

    const joinData = {
        memtype: '02',
        memEmail: event.target.memberEmail.value,
        memPw: event.target.memberPw.value,
        memberNick: event.target.memberNickName.value,
        memAddress: event.target.mainAddr.value,
        detailAddress: event.target.detailAddr.value,
        zonecode: event.target.zonecode.value,
        gender: event.target.gender.value,
        memheight: event.target.memheight.value,
        memweight: event.target.memweight.value,
        memage: event.target.memage.value
    };


    try {
        // 백엔드로 POST 요청 전송
        const response = await axios.post('/join/member/join', joinData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 응답 처리
        if (response.status === 200) {
            alert('회원가입이 완료되었습니다.');
            window.location.href = '/member/login'; // 성공 후 페이지 리디렉션
        } else {
            alert('회원가입 실패');
        }
    } catch (error) {
        console.error('가입 에러', error);
        alert('가입 중 오류 발생');
    }
};


    return (

        <div>
            <Navi />
            <div className='join-section'>
                <div className="signUp-box">
                    <form onSubmit={join_submit} method='post' className="signUp-form">
                        <h1 className="signUp-title">회원가입</h1>

                        <hr />

                        <span className="sub-title">이메일 <span className='star'>*</span></span>
                        <span className="email-message" style={{ color: emailAvailable }}>{emailError}</span>
                        <input
                            type="email"
                            id="memberEmail"
                            value={email}
                            onChange={handleEmailChange}
                            className="input-signUp"
                            name="memberEmail"
                            placeholder="이메일을 입력해주세요!"
                        />

                        <span className="sub-title">비밀번호 <span className='star'>*</span></span>
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

                        <span className="sub-title">비밀번호 확인 <span className='star'>*</span></span>
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

                        <span className="sub-title">닉네임 <span className='star'>*</span></span>
                        <span className="email-message"style={{ color: nickAvailable }}>{nickError}</span>
                        <input
                            type="text"
                            id="memberNickName"
                            value={nickname}
                            onChange={handleNickChange}
                            className="input-signUp"
                            name="memberNickName"
                            placeholder="닉네임을 입력해주세요!"
                        />

                        <span className="sub-title">휴대폰 번호 <span className='star'>*</span></span>
                        <div className="phone">
                            <input 
                            id="inputPhoneNumber" 
                            type="text" 
                            className="phone-number"
                            placeholder="'-'을 제외하고 입력해주세요"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)} />

                            <button
                            id="sendPhoneNumber"
                            onClick={sendSMS}
                            className="send-number"
                            type="button">인증번호</button>

                            <input
                            id="inputCertifiedNumber" 
                            type="text"
                            className="cert-number" placeholder="4자리 숫자" />
                            <button

                            id="checkBtn"
                            onClick={verifyPhoneNumber}
                            className="complete-number" type="button">인증하기</button>
                        </div>

                        <span className="sub-title">주소 <span className='star'>*</span></span>

                        <div className="address-box">

                            <input id="post" className="post" placeholder="우편번호" name="zonecode" value={inputAddress.zonecode} />
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

                            <input id="road-name" className="road-name" name="mainAddr" placeholder="도로명주소" value={inputAddress.address}/>
                            <input id="address-detail" className="address-detail" name="detailAddr" placeholder="상세주소" />


                        </div>

                        
                          <hr/>
                          
                          
                        <div className='non-essential'>
                        <div className='gender'>
                            <span className="sub-title">성별</span>
                            <input type="radio" className="gender-radio" name="gender" value="m" />남&nbsp;&nbsp;
                            <input type="radio" className="gender-radio" name="gender" value="f" />여
                        </div>
                        <div className='age'>
                            <span className="sub-title">나이</span>
                            <input id="memage" className="join-age" placeholder='20'></input> 세
                        </div>
                        <div className='height'>
                            <span className="sub-title">키</span>
                            <input id='memheight' className="join-height" name="memberHeight" placeholder="170.0" /> cm
                        </div>
                        <div className='weight'>
                            <span className="sub-title">몸무게</span>
                            <input id='memweight' className="join-weight" name="memberWeight" placeholder="65.0" /> kg
                        </div>
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