import './../App.css';
import './myCommunity.css';
// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import { ItemProvider } from '../common/contexts/myCommuContext';
import { useAuth } from '../common/contexts/AuthContext';
function App() {
    return (
        <ItemProvider>
            <ItemDisplay/>
        </ItemProvider>
    );
  }

 
  function ItemDisplay() {
    const [items, setItems] = useState([]);
    const { user } = useAuth();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        // API 호출 함수
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:8989/mypage/writeList/${user}`, { // user.id가 userNo라 가정
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
                 // 날짜 부분만 추출하여 새로운 배열에 저장
                 const formattedData = data.writeList.map(item => ({
                    ...item,
                    bo_create_at: item.bo_create_at.split(' ')[0] // '2024-05-27 14:40:37' -> '2024-05-27'
                }));
                setItems(formattedData); // 받아온 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchItems();
    }, [user, token]);

    
    
     return (
        <div>
        <Navi />
        <Menu />
        <div className="section-p">
        <div className="community-section">
  <nav className="mypage-nav">
    <div className="nav-profile-img"></div>
    <p className="nav-nickName">닉네임</p>
    <hr className="h1" />
    <ul className="mypage-ul">
        <li><Link to="/mypage/EditProfile">내 정보 수정</Link></li>
        <li><Link to="/mypage/Nutrition" >영양 진단 결과</Link></li>
        <li><Link to="/mypage/MyCommunity" className='mypage-menu-active'>커뮤니티 활동</Link></li>
        <li><Link to="/mypage/HealthDiary"  >건강 일기</Link></li>
        <li><Link to="/mypage/OrderList">주문 내역</Link></li>
        <li><a href="#">회원 탈퇴</a></li>
    </ul>
  </nav>

            <div className="contents">
                <h1 className='mypage-title'>커뮤니티 활동</h1>
                <hr className="title-line" />
                <div className="community-category">
                    <div className="write">
                        <p className='writeCount'>3</p>
                        <p>작성한 글</p>
                    </div>
                    <div className="like">
                        <p>3</p>
                        <p>좋아요 목록</p>
                    </div>
                </div>
                <div className="contents-list">
                {items.map((item, index) => (
                    <div className="list-one">
                        <p>{item.botitle}</p>
                        <span>{item.memberNick}</span>
                        <span>{item.bo_create_at}</span>
                        <span>조회수 {item.viewCount}</span>
                    </div>
                     ))}
                </div>
            </div>
        </div>
    </div>
        <Footer />
    </div>
    );    
}
export default App;