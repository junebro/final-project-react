import './../App.css';
import './editProfile.css';

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

import PopupDom from './../member/popupDom';
import PopupPostCode from './../member/PopupPostCode';
import { addressData } from './../member/PopupPostCode';
import { ItemProvider, useItem } from '../common/contexts/EditProfileContext';
import { useAuth } from '../common/contexts/AuthContext';


function App() {
    
    return (
        <ItemProvider>
            <ItemDisplay/>
        </ItemProvider>
    );
  }

 
  function ItemDisplay() {
    const memInfo = useItem().item; 
    const [items, setItems] = useState([]);
    const { user } = useAuth();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        // API 호출 함수
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:8989/join/memInfo/${user}`, { // user.id가 userNo라 가정
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchItems();
    }, [user, token]);


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
    return (
        <div>
            <Navi />
            <Menu />
            <div className="section-p">
            <div className="profile-section">
      <nav className="mypage-nav">
        <div className="nav-profile-img"></div>
        <p className="nav-nickName">닉네임</p>
        <hr className="h1" />
        <ul className="mypage-ul">
          <li><Link to="/mypage/EditProfile" className='mypage-menu-active'>내 정보 수정</Link></li>
          <li><Link to="/mypage/Nutrition">영양 진단 결과</Link></li>
          <li><Link to="/mypage/MyCommunity">커뮤니티 활동</Link></li>
          <li><Link to="/mypage/HealthDiary" >건강 일기</Link></li>
          <li><Link to="/mypage/OrderList">주문 내역</Link></li>
          <li><a href="#">회원 탈퇴</a></li>
        </ul>
      </nav>

      
      <div className="profile-contents">
            <h1 className="mypage-title">내 정보 수정</h1>
            <hr className="title-line" />
    
            {/* 프로필 사진, 이메일, 닉네임, 비밀번호 변경 */}
            <div className="img-nick-pw">
                {/* 프로필 사진 */}
                <label htmlFor="input-file">
                    <div className="profile-img-box">
                        <img className="profile-img" src={require("./../images/member/profileImg.jpg")} alt="프로필 사진" />
                        <div className="edit-icon"></div>
                    </div>
                </label>
                <input type="file" id="input-file" />
    
                {/* 이메일, 닉네임 */}
                <div className="email-nick-pw">
                    <p className="sub-title">이메일 (수정불가)</p>
                    <input className="profile-input" value={memInfo?memInfo.memEmail:""} disabled />
                    <p className="sub-title">닉네임</p>
                    <input className="profile-input" value={memInfo?memInfo.memberNick:""} />
                    <div className="pw-box">
                    <Link to="/mypage/ChangePw"><img src={require("./../images/member/setting.png")} alt="setting" />비밀번호 변경</Link>
                    </div>
                </div>
            </div>

            {/* 성별, 나이 */}
            <div className="gender-age-h-w">
                <div className="gender-age">
                    <div>
                        <p className="sub-title">성별</p>
                        <input type="radio" className="gender-radio" name="gender" value="m" checked={memInfo?.gender === 'm'||""}/>남&nbsp;&nbsp;
                        <input type="radio" className="gender-radio" name="gender" value="f" checked={memInfo?.gender === 'f'||""}/>여
                    </div>
                    <div>
                        <p className="sub-title">나이</p>
                        만<input className="input-age" name="age" value={memInfo?.memage||""} placeholder="20" />살
                    </div>
                </div>

                {/* 키, 몸무게 */}
                <div className="height-weight">
                    <div>
                        <p className="sub-title">키</p>
                        <input className="input-height" name="memberHeight" value={memInfo?.memheight||""} placeholder="170" />cm
                    </div>
                    <div>
                        <p className="sub-title">몸무게</p>
                        <input className="input-weight" name="memberWeight" value={memInfo?.memweight||""} placeholder="60" />kg
                    </div>
                </div>
            </div>

            {/* 주소 */}
            <span className="sub-title">주소</span>
            <div className="mypage-address-box">
                <input className="post" placeholder="우편번호" value={memInfo?.zonecode ?? inputAddress?.zonecode ?? null}/>
                <button type="button" className="post-btn" onClick={openPostCode}>우편번호 찾기</button>

            {/* // 팝업 생성 기준 div */}
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} />
                    </PopupDom>
                )}
            </div>

                <input className="road-name" placeholder="도로명주소" value={inputAddress.address}/>
                <input className="address-detail" placeholder="상세주소" value={memInfo?memInfo.detailAddress:""}/>
            </div>
            
           

            <button type="submit">수정 완료</button>
        </div>
        
    </div>
    </div>
        <Footer />
    </div>
    );    
}
export default App;