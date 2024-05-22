import './../App.css';
import './healthDiary.css';
import './diary.css';
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import Calendar from 'react-calendar';

import { ItemProvider, useItem } from '../common/contexts/DiaryContext';

function App() {
    return (
        <ItemProvider>
            <ItemDisplay/>
        </ItemProvider>
    );
  }

function ItemDisplay() {

    const detailRef = useRef(null);
    const moodRef = useRef(null);
    const moodimgRef = useRef(null);

    const data = useItem().item;

    // 옵셔널 체이닝을 사용하여 data가 null이거나 undefined인 경우를 처리합니다.
    const diaryData = data?.diaryList || [];
    const diaryDate = data?.diaryDate || [];


    // 다른 이름의 변수를 사용하여 diarydate만 추출하여 새 배열 생성
    const updateddateList = diaryDate.map(entry => entry.diarydate);
    const updatedimageList = diaryDate.map(entry => entry.moodimg);

    const [diarydate, setDiarydate] = useState(new Date());
    // console.log(value); // value(날짜) 값 확인

    

    // 날짜 선택 상태와 일기 데이터를 위한 상태를 설정합니다.
    //const [value, setValue] = useState(new Date());
    const [diaryContents, setDiaryContents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const [diary, setDiary] = useState({ diarydate: '', dayOfWeek: '', diarydetail: '', moodimg: '', mood: '' });
   
     // 날짜 변경 핸들러 함수
    const handleDateChange = (date) => {

        const date_1 = date;
        const year = date_1.getFullYear();
        const month = String(date_1.getMonth() + 1).padStart(2, '0'); // 1월은 0부터 시작하므로 +1을 해줍니다.
        const day = String(date_1.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        /* 날짜 클릭 시 데이터 조회 */


        const cartData = {
            diarydate: formattedDate,
            memno: 27
        };

        

        fetch(`/diary/diaryselect/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData)
        })
        .then(response => response.json())
        .then(data => {
            diaryHandleData(data);
        })
        .catch(error => console.error('Error:', error));
        
        setDiarydate(date); // 선택한 날짜를 상태에 저장
        setSelectedDate(date); // 선택한 날짜를 상태에 저장
        const foundDiary = diaryContents.find(d => d.date === formattedDate); // 선택한 날짜의 일기 찾기

        if (foundDiary) {
            setDiary(foundDiary); // 선택한 날짜에 일기가 있으면 일기 데이터를 상태에 저장
        } else {
            setDiary({
                date: formattedDate,
                dayOfWeek: date.toLocaleString('ko-KR', { weekday: 'long' }), // 요일을 설정
                mood: '',
                moodimg: '',
                diarydetail: '일기가 없습니다.' // 일기가 없으면 기본 메시지 설정
            });
        }
    };

    function diaryHandleData(data) {
        if (data.length > 0) {
            detailRef.current.innerText = data[0].diarydetail;
            moodRef.current.innerText = data[0].mood;
            moodimgRef.current.src = require(`../images/member/status/${data[0].moodimg}.png`);
            moodimgRef.current.style.display = 'inline-block';
        } else {
            detailRef.current.innerText = '작성된 일기가 없습니다';
            moodRef.current.innerText = '';
            moodimgRef.current.src = ''; // 이미지 경로 초기화
            moodimgRef.current.style.display = 'none'; // 이미지 숨김
        }
    }

    /* 이미지 */
    // 일기 작성 날짜 리스트
    const dayList = [
        { day: '2024-05-10', img: 'aa' },
        { day: '2024-05-21', img: 'bb' },
        { day: '2024-05-02', img: 'cc' },
        { day: '2024-05-14', img: 'dd' },
        { day: '2024-05-27', img: 'ee' },
    ];

    // 'diarydate'와 'memno'만 포함하는 새 배열 생성
    const extractedData = diaryDate.map(item => ({
        diarydate: item.diarydate,
        moodimg: item.moodimg
    }));

    // 각 날짜 타일에 컨텐츠 추가
    const addContent = ({ date }) => {
        const date_1 = date;
        const year = date_1.getFullYear();
        const month = String(date_1.getMonth() + 1).padStart(2, '0'); // 1월은 0부터 시작하므로 +1을 해줍니다.
        const day = String(date_1.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const contents = [];

        const matchingDay = extractedData.find(item => item.diarydate === formattedDate);
        if (matchingDay) { 
            contents.push(
                <img src={require(`../images/member/status/${matchingDay.moodimg}.png`)} />
            );
        }

        return <>{contents}</>; // 각 날짜마다 해당 요소가 들어감
    }; 

    return (    
        <div>
            <Navi />
            <Menu />
            <div className="section-p">
            <div className="diary-section">
            <nav className="mypage-nav">
                <div className="nav-profile-img"></div>
                <p className="nav-nickName">닉네임</p>
                <hr className="h1" />
                <ul class="mypage-ul">
                <li><Link to="/mypage/EditProfile">내 정보 수정</Link></li>
                <li><Link to="/mypage/Nutrition">영양 진단 결과</Link></li>
                <li><Link to="/mypage/MyCommunity">커뮤니티 활동</Link></li>
                <li><Link to="/mypage/HealthDiary"  className='mypage-menu-active'>건강 일기</Link></li>
                <li><Link to="/mypage/OrderList">주문 내역</Link></li>
                <li><a href="#">회원 탈퇴</a></li>
                </ul>
            </nav>
            {diaryData ? diaryData.length > 0 && (
                <div className="contents">
                    <h1 className="mypage-title">건강일기</h1>
                    <hr className="title-line" />
                    <form>
                    {/* 달력 */}
                    <div className="calendar-box">
                    <Calendar onChange={handleDateChange} value={diarydate} tileContent={addContent} />
                    </div>

                    <div className="diary-box">
                        <span>{diarydate.getMonth() + 1}.{diarydate.getDate()}</span><span>{diarydate.toLocaleString('ko-KR', { weekday: 'long' })}</span>
                        <div className="icon-box">
                            {/* 8개의 표정 아이콘 */}
                            <div className="icon">
                            <img
                                ref={moodimgRef}
                                src={require(`../images/member/status/${diaryData[0].moodimg}.png`)}
                                alt={diaryData[0].moodimg}
                            />
                            </div>
                        <span ref={moodRef}>{diaryData[0].mood}</span>
                        </div>
                        {/* 하루 상태 */}
                    <div ref={detailRef} className="diary-contents">
                        {diaryData[0].diarydetail}
                    </div>
                    </div>


                    {/* Null : 일기쓰기, Not Null : 일기 수정 */}
                    <div className="diary-btn-box">
                        <button type="button" className="write-btn">일기 쓰기</button>
                    </div>
                    </form>
                </div>
            ) :[]}
            </div>
            </div>
            <Footer />
        </div>
    );    
}
export default App;