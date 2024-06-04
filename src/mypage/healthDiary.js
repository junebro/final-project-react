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

    const detailRef = useRef(null);
    const moodRef = useRef(null);
    const moodimgRef = useRef(null);
    const data = useItem().item;

    // 옵셔널 체이닝을 사용하여 data가 null이거나 undefined인 경우를 처리합니다.
    const diaryData = data?.diaryList || [];
    const diaryDate = data?.diaryDate || [];

    const [diarydate, setDiarydate] = useState(new Date());
    const [diaryno, setDiaryno] = useState(0);

    const [buttonHidden, setButtonHidden] = useState(true); // 상태 초기값을 true로 설정

    // diaryData가 변경될 때마다 수정/삭제 버튼 숨김
    useEffect(() => {
        if (diaryData.length > 0) {
            setButtonHidden(false); // diaryData가 있으면 버튼을 보이게 함
        }
    }, [diaryData]); // diaryData가 변경될 때만 효과가 실행되도록 함

    // 날짜 선택 상태와 일기 데이터를 위한 상태를 설정합니다.
    //const [value, setValue] = useState(new Date());
    const [diaryContents, setDiaryContents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const [diary, setDiary] = useState({ diarydate: '', dayOfWeek: '', diarydetail: '', moodimg: '', mood: '' });
    const { user, logout } = useAuth();

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
            memno: user
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

        setDiarydate(date); // 선택한 날짜를 상태에 저장 (달력 날짜)
        setSelectedDate(date); // 선택한 날짜를 상태에 저장 (일기 날짜)
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

            setButtonHidden(false); // 데이터가 있으면 버튼을 보이게 함
            setDiaryno(data[0].diaryno);

            detailRef.current.innerText = data[0].diarydetail;
            moodRef.current.innerText = data[0].mood;
            moodimgRef.current.src = require(`../images/member/status/${data[0].moodimg}.png`);
            moodimgRef.current.alt = data[0].moodcode;
            moodimgRef.current.style.display = 'inline-block';
        } else {

            setButtonHidden(true); // 데이터가 없으면 버튼을 숨김

            detailRef.current.innerText = '작성된 일기가 없습니다';
            moodRef.current.innerText = '';
            moodimgRef.current.src = ''; // 이미지 경로 초기화
            moodimgRef.current.alt = '';
            moodimgRef.current.style.display = 'none'; // 이미지 숨김
        }
    }

    /* 이미지 */
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


    useEffect(() => {

    }, [diaryno]); // 의존성 배열에 aa를 넣어서 aa가 변경될 때만 이 effect를 실행하도록 합니다.


    const removeItem = () => {
        fetch(`http://localhost:8989/diary/diarydelete/${diaryno}`, {
            method: 'DELETE'  // DELETE 메소드 지정
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();  // JSON 대신 텍스트로 응답 처리
            })
            .then(data => {
                window.location.reload();
                console.log('Delete successful:', data);
            })
            .catch(error => console.error('Error:', error));
    }


    const url = `/mypage/diarydetail?date=${diarydate}`;
    const nourl = `/mypage/diarydetail?diaryno=${diaryno}`;

    /* 초기 데이터가 아무것도 없을때 설정 값 */
    const defaultDetail = {
        diarydetail: "작성된 일기가 없습니다.",
        mood: "",
        // 다른 기본 값들 추가
    };

    const currentDetail = diaryData.length > 0 ? diaryData[0] : defaultDetail;

    /* 수정 버튼 클릭 시 데이터 전송 */
    const changeItem = () => {
        console.log(moodimgRef.current.alt);
        const updateData = {
            detailRef: detailRef.current.innerText,
            moodRef: moodimgRef.current.alt,
            diaryno: diaryno,
            // 다른 기본 값들 추가
        };

        navigate('/mypage/diarydetail', { state: { updateItems: updateData } });
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
                <div className="diary-section">
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
                            <li><Link to="/mypage/Nutrition">영양 진단 결과</Link></li>
                            <li><Link to="/mypage/MyCommunity">커뮤니티 활동</Link></li>
                            <li><Link to="/mypage/HealthDiary" className='mypage-menu-active'>건강 일기</Link></li>
                            <li><Link to="/mypage/OrderList">주문 내역</Link></li>
                            <li onClick={deleteUser}>회원 탈퇴</li>
                        </ul>
                    </nav>

                    <div className="contents">
                        <h1 className="mypage-title">건강일기</h1>
                        <hr className="title-line" />
                        <form>
                            {/* 달력 */}
                            <div className="calendar-box">
                                <Calendar onChange={handleDateChange} value={diarydate} tileContent={addContent} />
                            </div>

                            <div className="diary-box" name='diaryno'>

                                {!buttonHidden &&
                                    <div className='edit-box'>
                                        <button type='button' onClick={changeItem}>수정</button>
                                        <button type='button' onClick={removeItem}>삭제</button>
                                    </div>
                                }
                                <span>{diarydate.getMonth() + 1}.{diarydate.getDate()}</span><span>{diarydate.toLocaleString('ko-KR', { weekday: 'long' })}</span>
                                <div className="icon-box">
                                    {/* 8개의 표정 아이콘 */}
                                    <div className="icon">

                                        {diaryData.length > 0 && ( // moodimg가 null이 아닌 경우에만 이미지 렌더링
                                            <img
                                                ref={moodimgRef}
                                                src={require(`../images/member/status/${currentDetail.moodimg}.png`)}
                                                alt={currentDetail.moodcode}
                                            />
                                        )}

                                    </div>
                                    <span ref={moodRef}>{currentDetail.mood}</span>
                                </div>
                                {/* 하루 상태 */}
                                <div ref={detailRef} className="diary-contents">
                                    {currentDetail.diarydetail}
                                </div>
                            </div>


                            {/* Null : 일기쓰기, Not Null : 일기 수정 */}
                            <div className="diary-btn-box">
                                <Link className='link' to={url}><button type="button" className="write-btn">일기 쓰기</button></Link>
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