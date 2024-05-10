import React from 'react';
import './ModalCSS.css';

function UserNicknameModal({ comment, isCurrentUser, onClose, position  }) {

  // 여기서 comment가 유효하지 않으면 컴포넌트를 렌더링하지 않음
  if (!comment) return null;

  // 백그라운드 클릭 시 팝업 닫기
  const handleBackgroundClick = (e) => {
    onClose(); 
  };

  // 모달 콘텐츠 클릭 시 이벤트 전파 중지
  const handleContentClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 중지
  };

  const modalPosition = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <div className="board-modal-overlay" onClick={handleBackgroundClick}>
      <div className="board-modal" style={modalPosition} onClick={handleContentClick}>
        <p>{comment.text}(임시)</p>
        {isCurrentUser ? (
          <>
            <button onClick={() => console.log('Editing comment')}>수정하기</button>
            <button onClick={() => console.log('Deleting comment')}>삭제하기</button>
          </>
        ) : (
          <>
            <div className='popup-detail' data-role="popup" id="memberPopup">
              <ul className='popup-menu'>
                <li><a href="#" onClick={() => console.log('View profile')}>게시글 보기</a></li>
                <li><a href="#" onClick={() => console.log('Start chat')}>1:1 채팅</a></li>
                <li><a href="#" onClick={() => console.log('Add friend')}>친구 추가</a></li>
                <li><a href="#" onClick={() => console.log('Report')}>신고하기</a></li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default UserNicknameModal;
