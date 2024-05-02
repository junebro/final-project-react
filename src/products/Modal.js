import React from 'react';

const Modal = ({ product, onClose }) => {
  if (!product) return null;

  // 백그라운드 클릭을 처리하는 함수
  const handleBackgroundClick = (e) => {
    onClose(); // 모달 닫기
  };

  // 모달 콘텐츠 클릭 시 이벤트 전파 중지
  const handleContentClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 중지
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }} onClick={handleBackgroundClick}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: 'white', borderRadius: '10px', width: 'auto', maxWidth: '600px' }} onClick={handleContentClick}>
        <h1>{product.name}</h1>
        <p>{product.price}</p>
        <img src={product.image} alt={product.name} style={{ width: '100%' }} />
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;