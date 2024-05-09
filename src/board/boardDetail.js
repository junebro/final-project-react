import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import InputEmoji from 'react-input-emoji';

import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

// import { useParams } from 'react-router-dom'; // React Router의 useParams 훅

import './boardDetail.css';

import test01 from './../images/board/board_test01.png'
import test02 from './../images/board/board_test02.png'
import test03 from './../images/board/board_test03.png'
import likeButtonDefault from './../images/board/like-button.png';
import likeButtonOn from './../images/board/like-on-button.png';
import commnetButtonDefault from './../images/board/comment-button.png';
import commentButtonOn from './../images/board/comment-on-button.png';
import shareButtonDefault from './../images/board/share-button.png';
import shareButtonOn from './../images/board/share-on-button.png';
import submitButtonDefault from './../images/board/plus-button.png';
import submitButtonOn from './../images/board/plus-on-button.png';
import updateButton from './../images/board/update-button.png';
import deleteButton from './../images/board/delete-button.png';

// import '@joeattardi/emoji-button';



const images = [
    { src: test01, alt: 'test01' },
    { src: test02, alt: 'test02' },
    { src: test03, alt: 'test03' }
];

function App({ currentUser, postAuthor }) {

    

    // 사용자 확인
    const isAuthor = (currentUser, postAuthor) => {
        return currentUser === postAuthor;
    };

    const handleEdit = () => {
        // 수정 기능 구현
    };

    const handleDelete = () => {
        // 삭제 기능 구현
    };

    // 확대된 이미지를 상태로 관리합니다.
    const [expandedImage, setExpandedImage] = useState(images[0]);

    // 이미지를 클릭했을 때 실행되는 함수입니다.
    const handleImageClick = (img) => {
        setExpandedImage(img); // 확대된 이미지를 설정합니다.
    };

    // 팝업 열기
    const openPopup = () => {
        const popup = document.getElementById('memberPopup');
        popup.style.display = 'block';
    };

    // 팝업 닫기
    const closePopup = () => {
        const popup = document.getElementById('memberPopup');
        popup.style.display = 'none';
    };

    // 팝업 외부 클릭 시 팝업 닫기
    useEffect(() => {
        function handleClickOutside(event) {
            const popup = document.getElementById('memberPopup');
            if (popup && !popup.contains(event.target)) {
                closePopup();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 좋아요 상태를 관리하는 상태 변수
    const [liked, setLiked] = useState(false);

    // 좋아요 버튼 클릭 이벤트 핸들러
    const handleLikeClick = () => {
        setLiked(!liked); // 상태를 토글합니다.
    };

    // 댓글 작성 모드인지 여부를 나타내는 상태
    const [isCommenting, setIsCommenting] = useState(
        sessionStorage.getItem('isCommenting') === 'true' || false
    ); // 세션 스토리지에서 댓글 작성 모드 상태 가져오기
    const inputRef = useRef(null); // input 요소의 ref

    // 댓글 버튼 클릭 이벤트 핸들러
    const handleCommentButtonClick = () => {
        setIsCommenting(true); // 댓글 작성 모드로 변경
        // input 요소에 포커스를 줌
        if (inputRef.current) {
            inputRef.current.focus();
        }
        // 세션 스토리지에 댓글 작성 모드 상태 저장
        sessionStorage.setItem('isCommenting', 'true');
    };


    
    // 댓글 입력을 위한 상태
    const [commentText, setCommentText] = useState('');
    const emojiInputRef = useRef(null);

    const handleEmojiInput = (text) => {
        setCommentText(text);
    };

     // 댓글 목록을 관리하는 상태 변수
     const [comments, setComments] = useState([]);

     // 댓글 제출 핸들러
    const handleSubmitComment = (event) => {
        event.preventDefault(); // 폼 제출 기본 이벤트 방지
        if (commentText.trim()) { // 공백만 있는 문자열은 제외
            // 새 댓글을 댓글 목록에 추가
            setComments([...comments, commentText]);
            setCommentText(''); // 입력 필드 초기화
        }
    };



    return (
        <>
            <Navi />
            <Menu />

            
            <div className='sec-bdetail'>
                <div className='board-box'>
                    <div className='board-detail'>
                        <div className='board-detail-top'>
                        <div className='write-title' name='writeTitle'>
                            이번에 진단받은 식단이에요! </div>
                            {isAuthor(currentUser, postAuthor) && (
                                <>
                                    <button className='update-btn' onClick={handleEdit}>
                                        <img src={updateButton}
                                            alt="Udate Button"
                                            className="update-btn-img" />
                                        수정하기</button>
                                    <button className='delete-btn' onClick={handleDelete}
                                    >
                                        <img src={deleteButton}
                                            alt="Delete Button"
                                            className="delete-btn-img" />
                                        삭제하기</button>
                                </>
                            )}
                       </div>
                        <div className='board_line_d'></div>

                        <div className='main-content'>
                            <div className='box-left'>
                                <div className='tap-gallery'>
                                    {expandedImage && (
                                        <div className="container">

                                            <img
                                                id="expandedImg"
                                                src={expandedImage.src}
                                                alt={expandedImage.alt}

                                            />

                                        </div>
                                    )}


                                    <div className="row">
                                        {images.map((img, index) => (
                                            <div className="column" key={index}>
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    onClick={() => handleImageClick(img)}
                                                />
                                            </div>
                                        ))}
                                    </div>


                                </div>
                            </div>

                            <div className='view_center_d'></div>

                            <div className='box-right'>

                                <div className='content'>
                                    <div className='content-writer'>
                                        <span>
                                            <img alt="냠냠님의 프로필사진" className='profile-photo' src={require('./../images/board/profile.png')}></img>
                                        </span>
                                        <div className='member-name' onClick={openPopup}>글쓴이냠냠
                                            {/* 닉네임 클릭시 리스트 팝업 */}
                                            <div className='popup' data-role="popup" id="memberPopup">
                                                <ul data-role="listview" data-inset="true">
                                                    <li><a href="#">게시글 보기</a></li>
                                                    <li><a href="#">1:1 채팅</a></li>
                                                    <li><a href="#">친구 추가</a></li>
                                                    <li><a href="#">신고하기</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='description'>비타민이 부족해서 사과도 추가해봤습니다
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        비타민이 부족해서 사과도 추가해봤습니다
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        비타민이 부족해서 사과도 추가해봤습니다
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        비타민이 부족해서 사과도 추가해봤습니다
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        비타민이 부족해서 사과도 추가해봤습니다
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        비타민이 부족해서 사과도 추가해봤습니다
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        비타민이 부족해서 사과도 추가해봤습니다
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        비타민이 부족해서 사과도 추가해봤습니다
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        비타민이 부족해서 사과도 추가해봤습니다
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                        맛이 어떨지 궁금해요
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저렴한 과일 뭐가 있을까요?
                                        로즈힙차가 레몬보다 비타민이 20배라던데
                                    </div>

                                </div>

                                <div className='board_line_d'></div>

                                <div className='right-middle'>
                                    <div className='middle-bar'>
                                        <div className='btn-container'>
                                            {/* 좋아요 버튼 */}
                                            <button className='like-button' onClick={handleLikeClick}>
                                                <img
                                                    src={liked ? likeButtonOn : likeButtonDefault}
                                                    alt="Like Button"
                                                    className="like-btn"
                                                />
                                            </button>
                                            {/* 댓글 버튼 */}
                                            <button className="comment-btn" onClick={handleCommentButtonClick}>
                                                <img src={commnetButtonDefault} className='btn-default' />
                                                <img src={commentButtonOn} className='btn-on' />
                                            </button>
                                            {/* 공유하기 버튼 */}
                                            <button className="share-btn">
                                                <img src={shareButtonDefault} className='btn-default' />
                                                <img src={shareButtonOn} className='btn-on' />
                                            </button>
                                        </div>
                                        <div className='board-date'>2024-04-28 00:00:00</div>
                                    </div>
                                    {/* 댓글 목록 표시 */}
                                    <div className='comments'>
                                        <div className='comment-detail'>
                                            <span>
                                                <img alt="dd님의 프로필사진" className='profile-photo' src={require('./../images/board/profile.png')}></img>
                                            </span>
                                            <div>
                                                <div className='comment-nickname' onClick={openPopup}>댓글쓴사람  {/* 닉네임 클릭시 리스트 팝업 */}
                                                    <div className='popup' data-role="popup" id="memberPopup">
                                                        <ul data-role="listview" data-inset="true">
                                                            <li><a href="#">게시글 보기</a></li>
                                                            <li><a href="#">1:1 채팅</a></li>
                                                            <li><a href="#">친구 추가</a></li>
                                                            <li><a href="#">신고하기</a></li>
                                                        </ul>
                                                    </div></div>
                                                <div className='comment-description'>댓글내용ㅇ입니당</div>
                                            </div>
                                        </div>                                   
                                    </div>
                                </div>
                                <div className='board_line_d'></div>

                                <div className='input-comments'>

                                    <div role='button'>
                                        {/* 이모지 버튼 */}

                                    </div>
                                    {/* 댓글 입력창 */}
                                    <form className='comment-form' onSubmit={handleSubmitComment} method='POST'>
                                        {isCommenting && (
                                            <InputEmoji
                                                ref={emojiInputRef}
                                                value={commentText}
                                                onChange={handleEmojiInput}
                                                cleanOnEnter
                                                placeholder='댓글 달기'
                                            />
                                        )}

                                        <button type='submit' className='comment-submit-btn'>
                                            <img src={submitButtonDefault} className='btn-default' />
                                            <img src={submitButtonOn} className='btn-on' />
                                        </button>
                                    </form>

                                </div>
                            </div>

                        </div>
                        <div className='board_line_d'></div>
                    </div>


                </div>
                <Link to="/boardList" className='link'>
                    <div className='submit-btn'>
                        <button className='out'>나가기</button>
                    </div>
                </Link>





            </div>
            <Footer />
        </>
    );

}

export default App;