import './../App.css';
import './nutrition.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import { ItemProvider, useItem } from '../common/contexts/NutritionContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/contexts/AuthContext';

function App() {
    return (
        <ItemProvider>
            <ItemDisplay />
        </ItemProvider>
    );
}


function ItemDisplay() {
    const navigate = useNavigate();
    const data = useItem().item; // 전체 제품 목록을 가져옵니다.
    const { user, logout } = useAuth(); // useAuth 훅에서 user ID 가져오기
    
    /* 프로필 사진 */
    const [selectedImage, setSelectedImage] = useState(null);
    const [userMemberNick, setUserMemberNick] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        fetch(`/join/memInfo/${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // 콘텐츠 타입 지정
                'Authorization': `Bearer ${token}` // JWT 토큰을 Bearer 토큰으로 포함
            }
        })
        .then(response => response.json())
        .then(data => {
            setSelectedImage(require(`./../images/profileImage/${data.memImage}`));
            setUserMemberNick(data.memberNick);
        })
        .catch(error => console.error('Error:', error));
    }, []); 

    /* 날짜 변환 */
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
    }

    const NutClick = (e) => {
        navigate('/mypage/Nutrient');
    }

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
                <div className="nutrition-section">
                    <nav className="mypage-nav">
                        <img className="nav-profile-img"
                            id="profile-img"
                            src={selectedImage || require("./../images/member/profileImg.jpg")}
                            alt="프로필 사진"
                        />
                        <p className="nav-nickName">{userMemberNick}</p>
                        <hr className="h1" />
                        <ul className="mypage-ul">
                            <li><Link to="/mypage/EditProfile" className='mypage-ul-Link'>내 정보 수정</Link></li>
                            <li><Link to="/mypage/Nutrition" className='mypage-menu-active'>영양 진단 결과</Link></li>
                            <li><Link to="/mypage/MyCommunity">커뮤니티 활동</Link></li>
                            <li><Link to="/mypage/HealthDiary"  >건강 일기</Link></li>
                            <li><Link to="/mypage/OrderList">주문 내역</Link></li>
                            <li onClick={deleteUser}>회원 탈퇴</li>
                        </ul>
                    </nav>

                    <div className="contents">
                        <h1 className="mypage-title">영양 진단 결과</h1>
                        <hr className="title-line" />

                        <div className="nutrition-box">
                            <div className="left-box">
                                <p>영양소 섭취량으로 파악하는 나의 식습관</p>
                                <p>Happy Green Life 영양 진단 서비스</p>
                                <p className="nutrition-a"><a href="#">나의 식이습관 파헤치기 →</a></p>
                            </div>
                            <div className="right-box">
                                <img src={require("./../images/member/survey-people.png")} alt="survey-people" />
                            </div>
                        </div>

                        <p className="sub-title">진단 설문 내역</p>
                        <hr className="sub-title-line" />
                        <div className="survey-list">

                            {data?.map(nutData => (
                                <div className="survey-one">
                                    <div className="text">
                                        <span>{nutData.seq}차</span>
                                        <span>{formatDate(nutData.creation_date)} 검사</span>
                                    </div>
                                    <button type="button" className="survey-result" onClick={() => NutClick(nutData.n_no)}>진단결과 보기</button>
                                </div>
                            )) || []}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
export default App;