import './boardDetail.css';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import UserNicknameModal from './UserNicknameModal';
import InputEmoji from 'react-input-emoji';

import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

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
import commentupdateButton from './../images/board/comment-update-button.png';
import commentdeleteButton from './../images/board/comment-delete-button.png';

function App({ }) { // currentUser
    const { bono } = useParams(); // URL에서 bono 파라미터를 가져옴
    const [post, setPost] = useState(null);
    const [images, setImages] = useState([]);
    const [expandedImage, setExpandedImage] = useState(null); // 확대된 이미지를 상태로 관리합니다.
    const [comments, setComments] = useState([]); // 댓글 목록을 저장하고 관리하는 상태
    // const [isEditing, setIsEditing] = useState({});
    // const [editedContent, setEditedContent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8989/board/boardDetail/${bono}`) // API 호출
            .then(response => {
                console.log("Data fetched:", response.data);  // 콘솔 로그 추가
                setPost({...response.data,
                    liked: false // 초기 좋아요 상태를 false로 설정
            }); // 상태 업데이트

                // 이미지 배열을 생성하고 상태에 설정
                const postImages = [];
                if (response.data.boimage01) postImages.push({ src: `http://localhost:8989/uploads/${response.data.boimage01}`, alt: 'image1' });
                if (response.data.boimage02) postImages.push({ src: `http://localhost:8989/uploads/${response.data.boimage02}`, alt: 'image2' });
                if (response.data.boimage03) postImages.push({ src: `http://localhost:8989/uploads/${response.data.boimage03}`, alt: 'image3' });
                setImages(postImages);
                setExpandedImage(postImages[0] || null); // 첫 번째 이미지를 기본 확대로 설정

                // 댓글 데이터 불러오기
                return axios.get(`http://localhost:8989/board/comments/${bono}`);
            })
            .then(response => {
                console.log("Comments fetched:", response.data);
                setComments(response.data); // 댓글 상태 업데이트
            })
            .catch(error => {
                console.error('Error fetching post', error); // 오류 처리
            });
    }, [bono]);


    // // 사용자 확인 //임시
    // const isAuthor = (currentUser, postAuthor) => {
    //     return currentUser === postAuthor;
    // };


    // // 가정: post 상태가 게시글 데이터를 로드하는 로직을 통해 설정됨
    // const postId = post.id;  // 이 값을 Link 컴포넌트의 to 속성에 사용

    // 수정하기
    const handleEdit = () => {
        navigate(`/board/boardUpdate/${bono}`); // 수정 페이지로 이동
    };

    // 삭제하기
    const handleDelete = () => {
        axios.delete(`http://localhost:8989/board/boardDelete/${bono}`)
            .then(response => {
                if (response.status === 200) {
                    alert('게시글이 삭제되었습니다.');
                    navigate('/board/boardList');
                } else {
                    alert('삭제 실패');
                }
            })
            .catch(error => {
                console.error('Error deleting post', error);
                alert('삭제 중 오류가 발생했습니다.');
            });
    };

    // 이미지를 클릭했을 때 실행되는 함수
    const handleImageClick = (img) => {
        setExpandedImage(img); // 확대된 이미지를 설정
    };

    // 좋아요 상태를 관리하는 상태 변수
    const [liked, setLiked] = useState(false);

    // 좋아요 버튼 클릭 이벤트 핸들러
    const handleLikeClick = () => {
        const newLikedState = !post.liked;
        axios.post(`http://localhost:8989/board/likes/${bono}`, { liked: newLikedState })
            .then(response => {
                if(response.status === 200) {
                    setPost({...post, liked: newLikedState, likeCount: post.likeCount + (newLikedState ? 1 : -1)});
                }
            })
            .catch(error => {
                console.error('Error updating like', error);
            });
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

    // 댓글 추가 기능 
    const handleAddComment = () => {
        if (commentText.trim() !== '') {
            axios.post('http://localhost:8989/board/comments', {
                bono: bono,
                // mbrno: mbrno, // 현재 로그인한 사용자 ID를 사용할 수 있는지 확인 필요 currentUser.id
                comContent: commentText
            }).then(response => {
                console.log("Comment added:", response.data);
                setComments(prevComments => [...prevComments, response.data]); // 댓글 배열에 새 객체 추가
                setCommentText(''); // 입력 필드 초기화
            }).catch(error => {
                console.error('Error adding comment', error);
                alert('댓글 추가 중 오류가 발생했습니다.');
            });
        }
    };

    // 댓글 수정 기능
    const handleUpdateComment = (comment) => {
        const updatedCommentText = prompt("댓글을 수정하세요:", comment.comContent);
        if (updatedCommentText !== null && updatedCommentText !== comment.comContent) {
            axios.put(`http://localhost:8989/board/comments`, {
                comno: comment.comno,
                comContent: updatedCommentText
            })
            .then(response => {
                setComments(comments.map(c => c.comno === comment.comno ? { ...c, comContent: updatedCommentText } : c));
                alert('댓글이 수정되었습니다.');
            })
            .catch(error => {
                console.error('Error updating comment', error);
                alert('댓글 수정 중 오류가 발생했습니다.');
            });
        }
    };

    // 댓글 삭제 기능
    const handleDeleteComment = (comno) => {
        axios.delete(`http://localhost:8989/board/comments/${comno}`)
            .then(() => {
                setComments(prevComments => prevComments.filter(comment => comment.comno !== comno)); // 삭제된 댓글 제거
                alert('댓글이 삭제되었습니다.');
            })
            .catch(error => {
                console.error('Error deleting comment', error);
                alert('댓글 삭제 중 오류가 발생했습니다.');
            });
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
                    {post ? (
                        <div className='board-detail'>
                            <div className='board-detail-top'>
                                <div className='write-title' name='writeTitle'>
                                    {post.botitle}</div>
                                {/* {currentUser === post.author && ( */}
                                    <>

                                        <button className='update-btn' onClick={handleEdit}>
                                            <img src={updateButton} alt="Update Button" className="update-btn-img" />
                                            수정하기
                                        </button>

                                        <button className='delete-btn' onClick={handleDelete}>
                                            <img src={deleteButton} alt="Delete Button" className="delete-btn-img" />
                                            삭제하기
                                        </button>
                                    </>
                                {/* )}  */}
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
                                            <div className='member-name' onClick={(e) => handleNicknameClick(e)}>글쓴이 냠냠{post.author}
                                            </div>

                                        </div>
                                        <div className='description'>{post.bocontent}
                                        </div>

                                    </div>

                                    <div className='board_line_d'></div>

                                    <div className='right-middle'>
                                        <div className='middle-bar'>
                                            <div className='btn-container'>
                                                {/* 좋아요 버튼 */}
                                                <button className='like-button' onClick={handleLikeClick}>
                                                    <img
                                                        src={post.liked ? likeButtonOn : likeButtonDefault}
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
                                            <div className='board-date'>{post.bo_CREATE_AT}</div>
                                        </div>
                                        {/* 댓글 목록 표시 */}
                                        <div className='comments'>
                                            {comments.map((comment, index) => (
                                                <div className='comment-detail' key={comment.comno} >
                                                    <span>
                                                        <img alt="프로필 사진" className='profile-photo' src={require('./../images/board/profile.png')}></img>
                                                    </span>
                                                    <div>
                                                        <div className='comment-nickname' onClick={(e) => handleNicknameClick(e, comment)}>
                                                            {`댓글쓴사람 ${index + 1}`}
                                                        </div>

                                                        <div className='comment-description'>{comment.comContent}</div>
                                                    </div>
                                                    <span className='mycomment-btn'>
                                                        <button className="comment-btn"  onClick={() => handleUpdateComment(comment)}>
                                                            <img src={commentupdateButton} className='btn-default' alt='수정하기' />
                                                        </button>
                                                        <button className="comment-btn" onClick={() => handleDeleteComment(comment.comno)}>
                                                            <img src={commentdeleteButton} className='btn-default' alt='삭제하기' />
                                                        </button>
                                                    </span>
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
                            {/* {showModal && activeModalType === 'comment' && (
                                <UserNicknameModal
                                    comment={activeComment}
                                    isCurrentUser={currentUser === activeComment.author}
                                    position={modalPosition}
                                    onClose={() => setShowModal(false)}
                                />
                            )} */}
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}

                </div>
                <Link to="/board/boardList">
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