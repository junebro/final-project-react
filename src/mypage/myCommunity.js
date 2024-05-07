import './../App.css';
import './myCommunity.css';
import React from 'react';
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

function App() {
    const [activeItem, setActiveItem] = React.useState(null);
 
    // 메뉴 클릭 시 실행될 함수
    const handleItemClick = (index) => {
      // 클릭된 메뉴 항목의 인덱스로 active 상태 업데이트
      setActiveItem(index);
    };
  
    
    const menuItems = [
        { name: '내 정보 수정', path: '/join' },
        { name: '영양 진단 결과', path: '/nutrition' },
        { name: '커뮤니티 활동', path: '/myCommunity' },
        { name: '건강 일기', path: '/join' },
        { name: '주문 내역', path: '/orderList' },
        { name: '회원 탈퇴', path: '/join' }
    ];
 
     return (
         <div>
             <Navi />
             <Menu />
             <div class="section-p">
             <section>
       <nav className="nav">
         <div className="nav-profile-img"></div>
         <p className="nav-nickName">닉네임</p>
         <hr className="h1" />
            <ul className="mypage-ul">
       {/* 메뉴 항목들을 매핑하여 렌더링 */}
       {menuItems.map((menuItem, index) => (
         <li
           key={index}
           className={`menu-item ${activeItem === index ? 'active' : ''}`}
           onClick={() => handleItemClick(index)}
         >
           <a href={menuItem.path}>{menuItem.name}</a>
         </li>
       ))}
     </ul>
       </nav>
       
            <div className="contents">
                <h1 className='title'>커뮤니티 활동</h1>
                <hr className="title-line" />
                <div className="community-category">
                    <div className="write contents-active">
                        <p>3</p>
                        <p>작성한 글</p>
                    </div>
                    <div className="like">
                        <p>3</p>
                        <p>좋아요 목록</p>
                    </div>
                </div>
                <div className="contents-list">
                    <div className="list-one">
                        <p>제목제목제목</p>
                        <span>작성자</span>
                        <span>2024.04.25</span>
                        <span>조회수 135</span>
                    </div>
                </div>
                <div className="contents-list">
                    <div className="list-one">
                        <p>제목제목제목</p>
                        <span>작성자</span>
                        <span>2024.04.25</span>
                        <span>조회수 135</span>
                    </div>
                </div>
                <div className="contents-list">
                    <div className="list-one">
                        <p>제목제목제목</p>
                        <span>작성자</span>
                        <span>2024.04.25</span>
                        <span>조회수 135</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
        <Footer />
    </div>
    );    
}
export default App;