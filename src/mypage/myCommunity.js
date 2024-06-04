import './../App.css';
import './myCommunity.css';
// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import { ItemProvider, useItem } from '../common/contexts/myCommuContext';
import { useAuth } from '../common/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function App() {
    return (
        <ItemProvider>
            <ItemDisplay />
        </ItemProvider>
    );
}

function ItemDisplay() {

    const { user, logout } = useAuth(); // useAuth 훅에서 user ID 가져오기
    const token = localStorage.getItem('authToken');
    const items = useItem().item;
    const [activeCategory, setActiveCategory] = useState(null);
    const [communityData, setCommunityData] = useState([]);
    const [communityLikeCount, setCommunityLikeCount] = useState([]);
    const [communityWriteCount, setCommunityWriteCount] = useState([]);
    
    /* 프로필 사진 */
    const [selectedImage, setSelectedImage] = useState(null);
    const [userMemberNick, setUserMemberNick] = useState(null);

    const navigate = useNavigate();

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

    useEffect(() => {

        fetch(`/mypage/likeList/${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // 콘텐츠 타입 지정
                'Authorization': `Bearer ${token}` // JWT 토큰을 Bearer 토큰으로 포함
            }
        })
            .then(response => response.json())
            .then(data => {
                setCommunityLikeCount(data.length);
            })
            .catch(error => console.error('Error:', error));

        setActiveCategory("W");
        setCommunityData(items);
        setCommunityWriteCount(items?.length || 0);
    }, [items]); // items가 변경되면 useEffect 내부의 코드 실행

    const categoryClick = (e) => {
        setActiveCategory(e);
        if (e === "L") {

            fetch(`/mypage/likeList/${user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // 콘텐츠 타입 지정
                    'Authorization': `Bearer ${token}` // JWT 토큰을 Bearer 토큰으로 포함
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCommunityData(data);
                    setCommunityLikeCount(data.length);
                })
                .catch(error => console.error('Error:', error));

        } else {

            fetch(`/mypage/writeList/${user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // 콘텐츠 타입 지정
                    'Authorization': `Bearer ${token}` // JWT 토큰을 Bearer 토큰으로 포함
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCommunityData(data);
                    setCommunityWriteCount(data.length);
                })
                .catch(error => console.error('Error:', error));
        }
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
                <div className="community-section">
                    <nav className="mypage-nav">
                        <img className="nav-profile-img"
                            id="profile-img"
                            src={selectedImage || require("./../images/member/profileImg.jpg")}
                            alt="프로필 사진"
                        />
                        <p className="nav-nickName">{userMemberNick}</p>
                        <hr className="h1" />
                        <ul className="mypage-ul">
                            <li><Link to="/mypage/EditProfile">내 정보 수정</Link></li>
                            <li><Link to="/mypage/Nutrition" >영양 진단 결과</Link></li>
                            <li><Link to="/mypage/MyCommunity" className='mypage-menu-active'>커뮤니티 활동</Link></li>
                            <li><Link to="/mypage/HealthDiary"  >건강 일기</Link></li>
                            <li><Link to="/mypage/OrderList">주문 내역</Link></li>
                            <li onClick={deleteUser}>회원 탈퇴</li>
                        </ul>
                    </nav>

                    <div className="contents">
                        <h1 className='mypage-title'>커뮤니티 활동</h1>
                        <hr className="title-line" />
                        <div className="community-category">
                            <div className={`write ${activeCategory === "W" ? "contents-active" : ""}`} onClick={() => categoryClick("W")}>
                                <p className='writeCount'>{communityWriteCount}</p>
                                <p>작성한 글</p>
                            </div>
                            <div className={`like ${activeCategory === "L" ? "contents-active" : ""}`} onClick={() => categoryClick("L")}>
                                <p>{communityLikeCount}</p>
                                <p>좋아요 목록</p>
                            </div>
                        </div>
                        <div className="contents-list">
                            {communityData?.map((item, index) => (
                                <div className="list-one">
                                    <p>{item.botitle}</p>
                                    <span>{item.memberNick}</span>
                                    <span>{item.bo_create_at}</span>
                                    <span>조회수 {item.viewCount}</span>
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