import './../App.css';
import './diaryDetail.css';
import './diary.css';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect, createRef  } from 'react';
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import { useAuth } from '../common/contexts/AuthContext';

function App() {

    const { user, logout } = useAuth(); 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const date = searchParams.get('date');
    const [selectedValue, setSelectedValue] = useState('');
    
    const originalDate = new Date(date);

    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    // 다이어리 번호
    const location2 = useLocation();
    const searchParams2 = new URLSearchParams(location2.search);
    const nourl = searchParams2.get('diaryno');
    // String으로 넘어와서 형변환 해줌
    const diaryno = parseInt(nourl, 10); // 10진수로 파싱

    
    const diaryDetailRef = useRef(null);
    const moodCodeRef = useRef(null);

    const { updateItems } = location.state || {}; // state가 undefined일 경우를 대비한 기본값 설정

    /* 동적 라디오 버튼 */
    const radioButtons = [
        { id: 1, label: '살빠짐', imgSrc: require("./../images/member/status/weightloss.png"), value: "weightloss"},
        { id: 2, label: '유지어터', imgSrc: require("./../images/member/status/flexitarian.png"), value: "weight_gain" },
        { id: 3, label: '살쪘어', imgSrc: require("./../images/member/status/weight_gain.png"), value: "flexitarian" },
        { id: 4, label: '오운완', imgSrc: require("./../images/member/status/exercise.png"), value: "exercise" },
        { id: 5, label: '목표달성', imgSrc: require("./../images/member/status/goal.png"), value: "5" },
        { id: 6, label: '단식성공', imgSrc: require("./../images/member/status/Fasting.png"), value: "6" },
        { id: 7, label: '치팅데이', imgSrc: require("./../images/member/status/cheat_day.png"), value: "7" },
        { id: 8, label: '폭식함', imgSrc: require("./../images/member/status/voracity.png"), value: "8" },
    ];

    // 라디오 버튼의 ref 배열 생성
    const moodCodeRefs = useRef(radioButtons.map(() => createRef()));

    useEffect(() => {
        if (updateItems) {
            moodCodeRefs.current.forEach((ref) => {
                if (updateItems.moodRef === ref.current.value) {
                    ref.current.checked = true; // 선택된 라디오 버튼을 체크
                } else {
                    ref.current.checked = false; // 선택되지 않은 라디오 버튼을 언체크
                }
            });
        
            diaryDetailRef.current.innerText = updateItems.detailRef;
            //moodCodeRef.current.value = updateItems.moodRef;
        }
    }, [updateItems]); // updateItems가 변경될 때만 실행됨

// 폼 제출 핸들러
const fn_submit = async (event) => {
   
};

const handleChange = (event) => {
    setSelectedValue(event.target.id);
    console.log(event.target.id);
};

const updateItem = async (event) => {

    if (!selectedValue){
        alert("아이콘 눌러라");
        return;
    } 
    

    event.preventDefault(); // 기본 제출 이벤트 방지

    const diarydetail = diaryDetailRef.current.value; // ref를 사용하여 입력값 가져오기
    
    if (updateItems) {

        let moodcode = "";
        
        if (selectedValue === "") {
            moodcode = updateItems.moodRef;
        } else {
            moodcode = selectedValue;
        }

        try {
            const postData = {
                diaryno: updateItems.diaryno,
                diarydetail: diarydetail,
                moodcode: moodcode
            };

            console.log(postData)

            const response = await axios.post('http://localhost:8989/diary/diaryUpdate', postData);
            window.location.href = '/mypage/healthDiary'; // 업데이트 후 페이지 이동
        } catch (error) {
            console.error('Update error:', error);
            alert('업데이트 중 오류 발생');
        }

    } else {

        const postData = {
            memno : user,
            diarydetail: diarydetail,
            moodcode: selectedValue,
            diarydate: formattedDate
        };
        console.log(postData);
        try {
            // 백엔드로 POST 요청 전송
            const response = await axios.post('http://localhost:3000/diary/diaryInsert', postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // 응답 처리
            if (response.status === 200) {
                alert('게시글이 정상적으로 등록되었습니다.');
                window.location.href = '/mypage/healthDiary'; // 성공 후 페이지 리디렉션
            } else {
                alert('등록 실패');
            }
        } catch (error) {
            console.error('등록 에러', error);
            alert('등록 중 오류 발생');
        }
    }
};

    return (
        <div>
            <Navi />
            <Menu />
            <div className="section-p">
            <div className="diaryDetail-section">
      <nav className="mypage-nav">
        <div className="nav-profile-img"></div>
        <p className="nav-nickName">닉네임</p>
        <hr className="h1" />
        <ul className="mypage-ul">
        <li><Link to="/mypage/EditProfile">내 정보 수정</Link></li>
          <li><Link to="/mypage/Nutrition">영양 진단 결과</Link></li>
          <li><Link to="/mypage/MyCommunity">커뮤니티 활동</Link></li>
          <li><Link to="/mypage/HealthDiary"  className='mypage-menu-active'>건강 일기</Link></li>
          <li><Link to="/mypage/OrderList">주문 내역</Link></li>
          <li><a href="#">회원 탈퇴</a></li>
        </ul>
      </nav>

      <div className="diaryDetail-contents">
            <h1 className="mypage-title">건강일기</h1>
            <hr className="title-line" />
            <div className='title-margin'>
            <p className="sticker-title">다양한 스티커로</p>
            <p className="sticker-title">하루를 표현해 보세요!</p>
            </div>
            {/* 상태 스티커 박스 */}
            <form onSubmit={fn_submit} method='post' className="diary-form">
                <div className="status-box scrollbar">
                    
                        {/* 동적으로 생성된 라디오 버튼 */}
                        {radioButtons.map((button, index) => (
                            <div key={button.id} className="sticker-item-box">
                                <input
                                    type="radio"
                                    id={button.id}
                                    className="sticker-item"
                                    name="moodcode"
                                    ref={moodCodeRefs.current[index]} // ref 설정 
                                    checked={selectedValue == button.id}
                                    value={button.value}
                                    onChange={handleChange}
                                />
                                <label htmlFor={button.id}><img src={button.imgSrc} alt={`sticker${button.id}`} /></label>
                                <p>{button.label}</p>
                            </div>
                        ))}
                    
                </div>

                <p className="sticker-title">조금 더 자세히 기록해 볼까요?</p>
                <textarea className="diary-detail" placeholder="내용 입력(최대 1000자)" name='diarydetail' ref={diaryDetailRef}/>

                <div className="diaryBtn-box">
                <Link to="/HealthDiary"><button type="button" className="date-select">날짜 다시 선택</button></Link>
                    <button type="button" className="diary-submit"  onClick={updateItem}>작성완료</button>
                </div>
            </form>
        </div>
    </div>
    </div>
        <Footer />
    </div>
    );    
}
export default App;