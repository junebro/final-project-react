import React, { useEffect } from 'react';
import "./css/Modal.css";

const Modal = ({ product, onClose }) => {

  console.log(product);

  useEffect(() => {
    if (product) {
      // 모달이 열릴 때 body 스크롤을 막음
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 body 스크롤을 다시 활성화
      document.body.style.overflow = 'auto';
    }
    // 컴포넌트가 언마운트될 때 스크롤을 다시 활성화 (모달이 닫힐 때)
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [product]); // product 변화를 감지

  if (!product) return null;

  const handleBackgroundClick = (e) => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="pro-modal-background" onClick={handleBackgroundClick}>
      <div className="pro-modal-container" onClick={handleContentClick}>
        <div className="pro-modal-header">
          <h1 style={{fontSize:'30px'}}>{product.pronm}</h1>
          <div className='pro-modal-close-btn' onClick={onClose}>
            <img src={require(`../images/member/xBtn.png`)} alt="Close" />
          </div>
        </div>
        <div className="pro-modal-body">
          {/* 나머지 모달 내용 */}
          {/* <p>{product.propr}</p> */}
          {/* <img className='pro-modal-img' src={require(`../images/products/detail/${product.pifimg1}`)} alt={product.name} /> */}
          <img className='pro-modal-img' src={require(`../images/products/detail/${product.pifimg2}`)} alt={product.name} />
          <br />
          <br />
          <br />
          <br />
          <img className='pro-modal-img' src={require(`../images/products/detail/${product.pifimg3}`)} alt={product.name} />
        </div>
      </div>
    </div>
  );
};

export default Modal;