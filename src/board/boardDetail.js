import React, { useEffect, useState, useRef } from 'react';

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
import emojiButtonDefault from './../images/board/emoji-button.png';
import emojiButtonOn from './../images/board/emoji-on-button.png';
import submitButtonDefault from './../images/board/plus-button.png';
import submitButtonOn from './../images/board/plus-on-button.png';

// import '@joeattardi/emoji-button';

const images = [
    { src: test01, alt: 'test01' },
    { src: test02, alt: 'test02' },
    { src: test03, alt: 'test03' }
];

function App() {

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




    // // 이모지 선택기
    // useEffect(() => {
    //     const button = document.querySelector('.emoji-btn');
    //     const picker = new EmojiButton();

    //     picker.on('emoji', emoji => {
    //         const inputComment = document.querySelector('.input-comment');
    //         inputComment.value += emoji; // 선택한 이모지를 입력란에 추가
    //     });

    //     button.addEventListener('click', () => {
    //         picker.togglePicker(button); // 버튼을 클릭하면 이모지 선택기를 토글합니다.
    //     });
    // }, []); // useEffect 한 번만 실행되어야 함을 나타내는 빈 배열


    function fn_out() {
        alert("나가기");
    }

    return (
        <>
            <Navi />
            <Menu />
            <section>
                <div className='write-box'>
                    <div className='board'>
                        <div className='write-title' name='writeTitle'>이번에 진단받은 식단이에요! </div>
                        <div className='board_line'></div>

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

                            <div className='view_center'></div>

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
                                        혹시 드셔본 회원님들 계시면 댓글로 알려주세요!!!</div>
                                </div>

                                <div className='board_line'></div>

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
                                    <div className='comments'>
                                        <div className='comment'>
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
                                <div className='board_line'></div>

                                <div className='input-comments'>

                                    <div role='button'><path d="#">
                                        {/* 이모지 버튼 */}
                                        <button className="emoji-btn">
                                            <img src={emojiButtonDefault} className='btn-default' />
                                            <img src={emojiButtonOn} className='btn-on' />
                                        </button>
                                    </path></div>
                                    {/* 댓글 입력창 */}
                                    <form className='comment-form' method='POST'>
                                        {isCommenting && (
                                            <input
                                                type='text'
                                                className='input-comment'
                                                name='inputComment'
                                                placeholder='댓글 달기'
                                                ref={inputRef}
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
                        <div className='board_line'></div>
                    </div>
                </div>

                <div className='submit-btn'>
                    <button className='out' onClick={fn_out}>나가기</button>
                </div>
            </section>
            <Footer />
        </>
    );

}

export default App;