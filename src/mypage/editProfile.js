import './../App.css';
import './editProfile.css';

import React from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

import PopupDom from './../member/popupDom';
import PopupPostCode from './../member/PopupPostCode';
import { addressData } from './../member/PopupPostCode';

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
                    <input className="profile-input" value="green_life@gmail.com" disabled />
                    <p className="sub-title">닉네임</p>
                    <input className="profile-input" value="김종민" />
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
                        <input type="radio" className="gender-radio" name="gender" value="1" />남&nbsp;&nbsp;
                        <input type="radio" name="gender" value="2" />여
                    </div>
                    <div>
                        <p className="sub-title">나이</p>
                        만<input className="input-age" name="age" value="24" placeholder="20" />살
                    </div>
                </div>

                {/* 키, 몸무게 */}
                <div className="height-weight">
                    <div>
                        <p className="sub-title">키</p>
                        <input className="input-height" name="memberHeight" value="165" placeholder="170" />cm
                    </div>
                    <div>
                        <p className="sub-title">몸무게</p>
                        <input className="input-weight" name="memberWeight" value="55.2" placeholder="60" />kg
                    </div>
                </div>
            </div>

            {/* 주소 */}
            <span className="sub-title">주소</span>
            <div className="mypage-address-box">
                <input className="post" placeholder="우편번호" value={inputAddress.zonecode}/>
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
                <input className="address-detail" placeholder="상세주소" />
            </div>
            <hr className="address-hr" />
            <h2>관리가 필요한 질환 (1개 선택)</h2>
            <div className="disease-box">
                {/* 라디오 버튼 1개 단위 */}
                <div className="disease-radio">
                    <input type="radio" id="disease1" className="disease-item" name="disease" value="1" />
                    <label htmlFor="disease1" className='disease-label'>해당없음</label>
                </div>
                <div className="disease-radio">
                    <input type="radio" id="disease2" className="disease-item" name="disease" value="2" />
                    <label htmlFor="disease2" className='disease-label'>비만</label>
                </div>
                <div className="disease-radio">
                    <input type="radio" id="disease3" className="disease-item" name="disease" value="3" />
                    <label htmlFor="disease3" className='disease-label'>지방간</label>
                </div>
                <div className="disease-radio">
                    <input type="radio" id="disease4" className="disease-item" name="disease" value="4" />
                    <label htmlFor="disease4" className='disease-label'>당뇨</label>
                </div>
                <div className="disease-radio">
                    <input type="radio" id="disease5" className="disease-item" name="disease" value="5" />
                    <label htmlFor="disease5" className='disease-label'>고혈압</label>
                </div>
                <div className="disease-radio">
                    <input type="radio" id="disease6" className="disease-item" name="disease" value="6" />
                    <label htmlFor="disease6" className='disease-label'>골다공증</label>
                </div>
                <div className="disease-radio">
                    <input type="radio" id="disease7" className="disease-item" name="disease" value="7" />
                    <label htmlFor="disease7" className='disease-label'>고콜레스테롤혈증</label>
                </div>
                <div className="disease-radio">
                    <input type="radio" id="disease8" className="disease-item" name="disease" value="8" />
                    <label htmlFor="disease8" className='disease-label'>고중성지방혈증</label>
                </div>
                <div className="disease-radio">
                    <input type="radio" id="disease9" className="disease-item" name="disease" value="1" />
                    <label htmlFor="disease9" className='disease-label'>암</label>
                </div>
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