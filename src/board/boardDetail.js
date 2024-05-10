import './boardDetail.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import UserNicknameModal from './UserNicknameModal';
import InputEmoji from 'react-input-emoji';

import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

// import { useParams } from 'react-router-dom'; // React Router의 useParams 훅

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



function App({ currentUser }) {

    // 임시 이미지 파일
    const images = [
        { src: test01, alt: 'test01' },
        { src: test02, alt: 'test02' },
        { src: test03, alt: 'test03' }
    ];

    // 사용자 확인 //임시
    const isAuthor = (currentUser, postAuthor) => {
        return currentUser === postAuthor;
    };

    const [post, setPost] = useState({
        id: null,
        title: '',
        content: ''
    });

    // 가정: post 상태가 게시글 데이터를 로드하는 로직을 통해 설정됨
    const postId = post.id;  // 이 값을 Link 컴포넌트의 to 속성에 사용

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

    // 댓글 목록 상태와 핸들러 + 댓글 사용자 
    const [comments, setComments] = useState([
        { id: 1, text: "안녕하세요 user123입니다", author: "user123" },
        { id: 2, text: "안녕하세요 user456입니다", author: "user456" }
    ]);

    const handleAddComment = () => {
        if (commentText.trim() !== '') {
            const newComment = {
                id: comments.length + 1, // 간단한 예제로 id 설정
                text: commentText,
                author: "currentUsername" // 현재 사용자 이름 또는 고유 식별자
            };
            setComments(prevComments => [...prevComments, newComment]); // 댓글 배열에 새 객체 추가
            setCommentText(''); // 입력 필드 초기화
        }
    };

    const handleDeleteComment = (index) => {
        setComments(prevComments => prevComments.filter((_, i) => i !== index));
    };

    // 폼 제출 핸들러
    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddComment();
    };

    // 모달 상태를 관리하기 위한 상태 변수
    const [showModal, setShowModal] = useState(false);
    const [activeComment, setActiveComment] = useState(null);
    const [activeModalType, setActiveModalType] = useState(null);

    // 모달 위치 상태
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    // 유저 닉네임 클릭 시 UserNicknameModal 열기
    const handleNicknameClick = (event, comment) => {
        console.log("Nickname clicked, comment: ", comment);
        event.stopPropagation(); // 이벤트 버블링 방지
        const rect = event.target.getBoundingClientRect();
        setModalPosition({ x: rect.left, y: rect.top }); // 클릭한 요소의 위치를 저장
        setActiveComment(comment); // 활성화된 댓글 상태 설정
        setActiveModalType('comment');
        setShowModal(true); // 모달 표시
    };

    return (
        <>
            <Navi />
            <Menu />


            <div className='section-bdetail'>
                <div className='board-box'>
                    <div className='board-detail'>
                        <div className='board-detail-top'>
                            <div className='write-title' name='writeTitle'>
                                이번에 진단받은 식단이에요! </div>
                            {isAuthor(currentUser) && (
                                <>
                                    <Link to={`/board/boardUpdate/${postId}`} className='link'>
                                        <button className='update-btn' onClick={handleEdit}>
                                            <img src={updateButton}
                                                alt="Udate Button"
                                                className="update-btn-img" />
                                            수정하기</button>
                                    </Link>
                                    <Link>
                                        {/* 삭제하기 버튼 링크 임시니까 나중에 지워 */}
                                        <button className='delete-btn' onClick={handleDelete}
                                        >
                                            <img src={deleteButton}
                                                alt="Delete Button"
                                                className="delete-btn-img" />
                                            삭제하기</button>
                                    </Link>
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
                                        <div className='member-name' onClick={(e) => handleNicknameClick(e)}>글쓴이 냠냠
                                        </div>

                                    </div>
                                    <div className='description'>비타민이 부족해서 사과도 추가해봤습니다
                                        요즘 사과값이 많이 비싸던데
                                        사과 대신에 저?
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
                                        {comments.map((comment, index) => (
                                            <div className='comment-detail' key={comment.id} >
                                                <span>
                                                    <img alt="프로필 사진" className='profile-photo' src={require('./../images/board/profile.png')}></img>
                                                </span>
                                                <div>
                                                    <div className='comment-nickname' onClick={(e) => handleNicknameClick(e, comment)}>
                                                        {`댓글쓴사람 ${index + 1}`}
                                                    </div>

                                                    <div className='comment-description'>{comment.text}</div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                <div className='board_line_d'></div>

                                <div className='input-comments'>

                                    <div role='button'>
                                        {/* 이모지 버튼 */}

                                    </div>
                                    {/* 댓글 입력창 */}
                                    {/* db 연결후엔 onSubmit으로 변경하기 / method='POST' 추가하기*/}
                                    <form className='comment-form' onSubmit={handleSubmit} >
                                        {isCommenting && (
                                            <InputEmoji
                                                ref={emojiInputRef}
                                                value={commentText}
                                                onChange={handleEmojiInput}
                                                cleanOnEnter
                                                placeholder='댓글 달기'
                                            />
                                        )}

                                        <button type='submit' className='comment-submit-btn' >
                                            <img src={submitButtonDefault} className='btn-default' />
                                            <img src={submitButtonOn} className='btn-on' />
                                        </button>
                                    </form>

                                </div>
                            </div>

                        </div>
                        <div className='board_line_d'></div>
                        {showModal && activeModalType === 'comment' && (
                            <UserNicknameModal
                                comment={activeComment}
                                isCurrentUser={currentUser === activeComment.author}
                                position={modalPosition}
                                onClose={() => setShowModal(false)}
                            />
                        )}
                    </div>


                </div>
                <Link to="/board/boardList" className='link'>
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