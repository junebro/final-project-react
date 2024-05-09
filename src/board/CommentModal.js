import React from 'react';
// import './ModalCSS.css';

function CommentModal({ isCurrentUser }) {
    return (
        <div className="modal">
            <div className="modal-content">
                {isCurrentUser ? (
                    <>
                        <button onClick={() => console.log('Editing comment')}>수정하기</button>
                        <button onClick={() => console.log('Deleting comment')}>삭제하기</button>
                    </>
                ) : (
                    <div className='popup' data-role="popup" id="memberPopup" >
                    <ul className='popup-menu'>
                        <li><a href="#" onClick={() => console.log('View profile')}>게시글 보기</a></li>
                        <li><a href="#" onClick={() => console.log('Start chat')}>1:1 채팅</a></li>
                        <li><a href="#" onClick={() => console.log('Add friend')}>친구 추가</a></li>
                        <li><a href="#" onClick={() => console.log('Report')}>신고하기</a></li>
                    </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentModal;