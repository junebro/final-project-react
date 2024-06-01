import './../App.css';
import './adminProduct.css';
import React from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

function App() {

    // 폼 제출 핸들러
    const fn_pro_submit = async (event) => {
        event.preventDefault(); // 폼 기본 제출 이벤트 방지

        // FormData 객체를 사용하여 폼 데이터를 관리
        const formData = new FormData(event.target); 

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log("상품이 성공적으로 등록되었습니다.");
            } else {
                throw new Error('상품 등록 실패');
            }
        } catch (error) {
            console.error('상품 등록 에러:', error);
        }
    }

    return (
        <div>
            <Navi />
            <Menu />
            <div className="section-admin">
                <div className='adminProduct-section'>
                    <nav className="mypage-nav">
                        <p className="nav-nickName">관리자님, 안녕하세요!</p>
                        <hr className="h1" />
                        <ul className="mypage-ul">
                            <li><Link to="/mypage/EditProfile" className='mypage-menu-active'>대시보드</Link></li>
                            <li><Link to="/mypage/Nutrition">상품 등록</Link></li>
                            <li><Link to="/mypage/MyCommunity">회원 관리</Link></li>
                            <li><Link to="/mypage/HealthDiary"  >회원 주문내역</Link></li>
                            <li><Link to="/mypage/OrderList">얍</Link></li>
                        </ul>
                    </nav>

                    <div className="contents">
                        <h1 className="mypage-title">상품 등록</h1>
                        <hr className="title-line" />

                        <div className="changePw-box">
                            <form className="changePw-form" onSubmit={fn_pro_submit} method='post'>
                                <p>상품 이름</p>
                                <input placeholder="상품 이름을 입력해주세요" />

                                <p>상품 타입</p>
                                <select>
                                    <option>1 저당 식단</option>
                                    <option>2 칼로리 식단</option>
                                    <option>3 장수마을 식단</option>
                                    <option>4 단백질 식단</option>
                                </select>

                                <p>상품 코드</p>
                                <input placeholder="상품 코드를 입력해 주세요" />

                                <p>상품 가격</p>
                                <input placeholder="상품 가격을 입력해 주세요" />

                                <p>상품 이미지</p>
                                <input type='file' />

                                <p>상품 성분 카테고리?</p>
                                <input placeholder="이게 뭐지" />

                                <button type="submit" className="changePw-btn">등록하기</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default App;