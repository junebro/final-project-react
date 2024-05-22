import React, { useEffect } from 'react';
import Modal from 'react-modal';

// Modal 컴포넌트에 대한 접근성 설정
// React Modal 라이브러리를 사용할 때는 앱의 Root 요소를 설정해야 함
Modal.setAppElement('#root');

const PaymentModal = ({ orderDetails, closeModal }) => {
  useEffect(() => {
    // 토스페이먼츠 SDK 스크립트를 동적으로 페이지에 추가하는 부분
    const script = document.createElement('script');
    script.src = "https://js.tosspayments.com/v1/payment";
    script.async = true; // 스크립트 비동기 로드 설정
    document.body.appendChild(script);

    // 모달이 열릴 때 뒤에 있는 내용을 스크롤하지 못하게 하기 위해 body의 스크롤을 비활성화
    document.body.style.overflow = 'hidden';

    // 스크립트 로드가 완료되면 결제 처리 함수를 자동으로 호출
    script.onload = () => {
      handlePayment(); // 결제 처리 함수 호출
    };

    // 컴포넌트가 언마운트되거나 업데이트 되기 전에 실행될 정리(clean-up) 함수
    return () => {
      document.body.removeChild(script); // 스크립트 태그 제거
      document.body.style.overflow = 'auto'; // 스크롤 활성화
    };
  }, []); // useEffect가 컴포넌트의 수명 동안 한 번만 실행되도록 빈 배열을 의존성 목록으로 설정

  const handlePayment = () => {
    const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
    const tossPayments = new window.TossPayments(clientKey);

    // 토스페이먼츠 결제창을 요청하는 함수
    tossPayments.requestPayment('카드', {
      amount: orderDetails.amount, // 결제 금액
      orderId: orderDetails.orderId, // 주문 ID
      orderName: orderDetails.orderName, // 주문명
      customerName: orderDetails.customerName, // 고객 이름
      successUrl: 'https://docs.tosspayments.com/guides/payment/test-success', // 결제 성공 시 이동할 URL
      failUrl: 'https://docs.tosspayments.com/guides/payment/test-fail', // 결제 실패 시 이동할 URL
    }).catch(function (error) {
      console.error(error);
      closeModal(); // 에러 발생 시 모달 닫기 함수 호출
    });
  };

  // Modal 컴포넌트로 결제 정보 표시 및 관리
  return (
    <Modal
      isOpen={true} // 모달이 항상 열려있음
      onRequestClose={() => {
        closeModal(); // 사용자가 모달 외부를 클릭하거나 ESC 키를 누를 때 모달을 닫음
        document.body.style.overflow = 'auto'; // 스크롤 활성화
      }}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)', // 모달 배경 색상
          zIndex: 1000 // 모달 레이어 순서
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)', // 모달을 화면 중앙에 배치
          width: '90%',
          maxWidth: '640px' // 모달의 최대 너비 설정
        }
      }}
    >
      <h2>결제 준비 중...</h2> // 헤더 타이틀
      <button onClick={() => {
        closeModal(); // 모달 닫기 함수 호출
        document.body.style.overflow = 'auto'; // 스크롤 활성화
      }}>닫기</button> // 닫기 버튼
    </Modal>
  );
};

export default PaymentModal; // 컴포넌트 내보내기