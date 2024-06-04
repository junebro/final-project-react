import './../App.css';
import './changePw.css';
import React,{ useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import { useAuth } from '../common/contexts/AuthContext'; // 로그인 
import { useNavigate } from 'react-router-dom';

function App() {
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const { user, logout } = useAuth(); // useAuth 훅에서 user ID 가져오기
    const navigate = useNavigate();

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


    const handleChangePassword = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('authToken'); // JWT 토큰이 필요한 경우
        const userId = user; // 실제 사용자 ID를 사용해야 함
    
        const requestBody = {
            userId,
            oldPassword,
            newPassword
        };
        console.log(requestBody);
        try {
        const response = await fetch("http://localhost:8989/user/change-password", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // JWT 토큰을 포함
            },
            body: JSON.stringify(requestBody)
        });
    
        if (!response.ok) {
            alert("비밀번호 변경에 실패하였습니다.");
            //throw new Error("비밀번호 변경에 실패하였습니다.");
        } else {
            alert("비밀번호 변경에 완료되었습니다.");
        }
    
        const data = await response.json();
        setMessage(data.message || "비밀번호 변경이 완료되었습니다.");
        } catch (error) {
            setMessage(error.message);
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
                <div className='changePw-section'>
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
                            <li><Link to="/mypage/HealthDiary"  >건강 일기</Link></li>
                            <li><Link to="/mypage/OrderList">주문 내역</Link></li>
                            <li onClick={deleteUser}>회원 탈퇴</li>
                        </ul>
                    </nav>

                    <div className="contents">
                        <h1 className="mypage-title">비밀번호 변경</h1>
                        <hr className="title-line" />

                        <div className="changePw-box">
                            <form className="changePw-form" onSubmit={handleChangePassword}>
                                <p>현재 비밀번호</p>
                                <input
                                    placeholder="현재 비밀번호를 입력해주세요!"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                                <p>변경 비밀번호</p>
                                <input
                                    placeholder="변경할 비밀번호를 입력해주세요!"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                {/* <p>변경 비밀번호 확인</p>
                                <input placeholder="변경할 비밀번호를 다시 입력해주세요!" /> */}

                                <button type="submit" className="changePw-btn" >완료</button>

                                {/* {message && <p>{message}</p>} */}
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