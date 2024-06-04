import './../App.css';
import './orderList.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import { ItemProvider, useItem } from '../common/contexts/MyOListContext';
import { useAuth } from '../common/contexts/AuthContext'; // 로그인 

function App() {
    return (
        <ItemProvider>
            <ItemDisplay/>
        </ItemProvider>
    );

    function ItemDisplay() {
        const { user } = useAuth(); // useAuth 훅에서 user ID 가져오기
        const token = localStorage.getItem('authToken');
        const data = useItem().item;
        const myOrderData = data?.myOrderList || [];


        const groupedOrders = data?.reduce((acc, order) => {
            acc[order.ordno] = acc[order.ordno] || [];
            acc[order.ordno].push(order);
            return acc;
        }, {})||[];

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

    return (
        <div>
            <Navi />
            <Menu />

            
            <div className="section-p">
                <div className='order-section'>
                    <nav className="mypage-nav">
                    <img className="nav-profile-img"
                            id="profile-img"
                            src={selectedImage || require("./../images/member/profileImg.jpg")}
                            alt="프로필 사진"
                        />
                        <p className="nav-nickName">닉네임</p>
                        <hr className="h1" />
                        <ul className="mypage-ul">
                        <li><a href="#">내 정보 수정</a></li>
                        <li><Link to="/mypage/Nutrition" >영양 진단 결과</Link></li>
                        <li><Link to="/mypage/MyCommunity">커뮤니티 활동</Link></li>
                        <li><Link to="/mypage/HealthDiary"  >건강 일기</Link></li>
                        <li><Link to="/mypage/OrderList" className='mypage-menu-active'>주문 내역</Link></li>
                        <li><a href="#">회원 탈퇴</a></li>
                        </ul>
                    </nav>

                    <div className="contents">
                        <h1 className="mypage-title">주문 내역</h1>
                        <hr className="title-line" />
                    <div>
                        {Object.entries(groupedOrders).map(([ordno, group], index) => (   
                            <div className="order-box" key={ordno}>
                                <div className="delivery-info">
                                    <p className="order-date">{new Date(group[0].orddt).toISOString().slice(0, 10)}</p>
                                    <p className="delivery-status">배송준비</p>
                                </div>
                                    {group.map((item, idx) => (
                                        <div className="product-box">
                                            <div className="product-img">
                                                <img src={require(`./../images/products/${item.proimg}.jpg`)} alt="상품 사진" />
                                            </div>
                                            <div className="order-info">
                                                <p>{item.pronm} | {item.crtqt} 개</p>
                                                <p>{(item.propr * item.crtqt).toLocaleString('ko-KR')}원</p>
                                                <p> </p> 
                                            </div>
                                        </div>
                                    ))}
                                <div className="order-result">
                                    <span className="payment">총 결제금액 : {group[0].ordpr.toLocaleString('ko-KR')}원</span>
                                    {/* <button type="button" className="delivery-btn">주문 취소</button> */}
                                </div>
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
}
export default App;