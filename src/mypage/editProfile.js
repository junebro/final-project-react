import './../App.css';
import './editProfile.css';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

import PopupDom from './../member/popupDom';
import PopupPostCode from './../member/PopupPostCode';
import { addressData } from './../member/PopupPostCode';
import { ItemProvider, useItem } from '../common/contexts/EditProfileContext';
import { useAuth } from '../common/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function App() {

    return (
        <ItemProvider>
            <ItemDisplay />
        </ItemProvider>
    );
}


function ItemDisplay() {
    const memInfo = useItem().item;

    const [items, setItems] = useState([]);
    const token = localStorage.getItem('authToken');
    const { user, logout } = useAuth(); // useAuth 훅에서 user ID 가져오기

    /* 우편번호, 주소  */
    let [data, setData] = useState("");
    let [imageName, setImageName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);  // 파일 자체를 상태로 저장
    const [aa, setAa] = useState(null);
    const [userMemberNick, setUserMemberNick] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (aa) {
            return;
        }
        if (memInfo?.memImage || '') {
            setSelectedImage(require(`./../images/profileImage/${memInfo.memImage}`));
        }
    }, [memInfo, aa]); // memInfo가 변경될 때마다 이 효과 실행

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // 미리보기를 위해 이미지 데이터를 상태로 저장
            };
            reader.readAsDataURL(file); // 데이터 URL로 이미지 읽기
            setImageFile(file); // 파일 자체를 저장

            /* 파일 저장 */
            const formData = new FormData();
            formData.append('profileImage', file);  // 서버의 파라미터 이름과 일치해야 합니다.

            axios.post(`http://localhost:8989/join/upload-profile-image/${user}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}` // JWT 토큰을 Bearer 토큰으로 포함
                }
            }).then(response => {
                console.log('File uploaded successfully', response.data);
                setAa(response.data);
            }).catch(error => {
                console.error('Error uploading file', error);
            });
        }
    };

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
                setUserMemberNick(data.memberNick);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchItems();
    }, [user, token]);



    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = React.useState(false)

    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }

    // 팝업창 닫기`
    const closePostCode = () => {
        if (addressData) {
            setData(addressData);
        }
        setIsPopupOpen(false)
    }

    // 유저 정보 수정

    const MemberName = useRef(null);
    const MemberAge = useRef(null);
    const MemberHeight = useRef(null);
    const MemberWeight = useRef(null);
    const MemberZone = useRef(null);
    const MemberAddress = useRef(null);
    const MemberDetailAddr = useRef(null);
    const maleRadioRef = useRef(null);
    const femaleRadioRef = useRef(null);
    if (memInfo) {
        MemberName.current.value = memInfo && memInfo.memberNick ? memInfo.memberNick : '';
        MemberAge.current.value = memInfo && memInfo.memage ? memInfo.memage : '';
        MemberHeight.current.value = memInfo && memInfo.memheight ? memInfo.memheight : '';
        MemberWeight.current.value = memInfo && memInfo.memweight ? memInfo.memweight : '';
        MemberZone.current.value = memInfo && memInfo.zonecode ? memInfo.zonecode : '';
        MemberAddress.current.value = memInfo && memInfo.memAddress ? memInfo.memAddress : '';
        MemberDetailAddr.current.value = memInfo && memInfo.detailAddress ? memInfo.detailAddress : '';
    }

    useEffect(() => {
        if (memInfo) {
            if (memInfo.gender === 'm') {
                maleRadioRef.current.checked = true;
            } else if (memInfo.gender === 'f') {
                femaleRadioRef.current.checked = true;
            }
        }
    }, [memInfo]);



    // 폼 제출 핸들러
    const update_submit = async (event) => {

        event.preventDefault(); // 폼 기본 제출 이벤트 방지

        let gender = "f";

        if (maleRadioRef.current.checked == true) {
            gender = "m";
        }


        const formData = new FormData();
        formData.append('memImage', imageName); // 파일 객체 추가
        formData.append('memberNick', MemberName.current.value);
        formData.append('gender', gender);
        formData.append('memage', MemberAge.current.value);
        formData.append('memheight', MemberHeight.current.value);
        formData.append('memweight', MemberWeight.current.value);
        formData.append('zonecode', MemberZone.current.value);
        formData.append('memAddress', MemberAddress.current.value);
        formData.append('detailAddress', MemberDetailAddr.current.value);
        formData.append('memNo', memInfo.memNo);

        fetch(`/join/editProfile/`, {
            method: 'POST',
            body: formData // JSON 대신 formData 사용
        })
        .then(response => response.json())
        .then(data => {
            alert("수정이 완료되었습니다");
        })
        .catch(error => {
            console.error('Error:', error);
            alert("수정 실패: " + error.message);
        });
    };

    /* 회원 탈퇴 */
    const deleteUser = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:8989/mypage/deletemem/${user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // 콘텐츠 타입 지정
                    'Authorization': `Bearer ${token}` // JWT 토큰을 Bearer 토큰으로 포함
                }
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
            const message = await response.text(); // 문자열 응답 처리
            alert(message);
            navigate('/');
            logout(); // 로그아웃 함수 호출
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <Navi />
            <Menu />
            <div className="section-p">
                <div className="profile-section">
                    <nav className="mypage-nav">
                        <img className="nav-profile-img"
                            id="profile-img"
                            src={selectedImage || require("./../images/member/profileImg.jpg")}
                            alt="프로필 사진"
                        />
                        <p className="nav-nickName">{userMemberNick}</p>
                        <hr className="h1" />
                        <ul className="mypage-ul">
                            <li><Link to="/mypage/EditProfile" className='mypage-menu-active'>내 정보 수정</Link></li>
                            <li><Link to="/mypage/Nutrition">영양 진단 결과</Link></li>
                            <li><Link to="/mypage/MyCommunity">커뮤니티 활동</Link></li>
                            <li><Link to="/mypage/HealthDiary" >건강 일기</Link></li>
                            <li><Link to="/mypage/OrderList">주문 내역</Link></li>
                            <li onClick={deleteUser}>회원 탈퇴</li>
                        </ul>
                    </nav>


                    <form className="profile-contents" onSubmit={update_submit} method='post' update-form>

                        <h1 className="mypage-title">내 정보 수정</h1>
                        <hr className="title-line" />

                        {/* 프로필 사진, 이메일, 닉네임, 비밀번호 변경 */}
                        <div className="img-nick-pw">
                            {/* 프로필 사진 */}
                            <label htmlFor="input-file">
                                <div className="profile-img-box">
                                    <img
                                        id="profile-img"
                                        className="profile-img"
                                        src={selectedImage || require("./../images/member/profileImg.jpg")}
                                        alt="프로필 사진"
                                    />
                                    <div className="edit-icon"></div>
                                </div>
                            </label>
                            <input type="file" id="input-file" onChange={handleImageChange} />

                            {/* 이메일, 닉네임 */}
                            <div className="email-nick-pw">
                                <p className="sub-title">이메일 (수정불가)</p>
                                <input className="profile-input" value={memInfo ? memInfo.memEmail : ""} disabled />
                                <p className="sub-title">닉네임</p>
                                <input className="profile-input" ref={MemberName} />
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
                                    <input type="radio" className="gender-radio" name="gender" value="m" ref={maleRadioRef} />남&nbsp;&nbsp;
                                    <input type="radio" className="gender-radio" name="gender" value="f" ref={femaleRadioRef} />여
                                </div>
                                <div>
                                    <p className="sub-title">나이</p>
                                    만<input className="input-age" name="age" placeholder="20" ref={MemberAge} />살
                                </div>
                            </div>

                            {/* 키, 몸무게 */}
                            <div className="height-weight">
                                <div>
                                    <p className="sub-title">키</p>
                                    <input className="input-height" name="memberHeight" placeholder="170" ref={MemberHeight} />cm
                                </div>
                                <div>
                                    <p className="sub-title">몸무게</p>
                                    <input className="input-weight" name="memberWeight" placeholder="60" ref={MemberWeight} />kg
                                </div>
                            </div>
                        </div>

                        {/* 주소 */}
                        <span className="sub-title">주소</span>
                        <div className="mypage-address-box">
                            <input className="post" placeholder="우편번호"
                                value={data?.zonecode ?? memInfo?.zonecode ?? null} ref={MemberZone} />
                            <button type="button" className="post-btn" onClick={openPostCode}>우편번호 찾기</button>

                            {/* // 팝업 생성 기준 div */}
                            <div id='popupDom'>
                                {isPopupOpen && (
                                    <PopupDom>
                                        <PopupPostCode onClose={closePostCode} />
                                    </PopupDom>
                                )}
                            </div>

                            <input className="road-name" placeholder="도로명주소"
                                value={data?.address ?? memInfo?.address ?? null}
                                ref={MemberAddress} />
                            <input className="address-detail" placeholder="상세주소" ref={MemberDetailAddr} />
                        </div>
                        <div className='submit-box'>
                            <button className='edit-submit' type='submit'>수정 완료</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default App;