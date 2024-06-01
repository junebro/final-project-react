import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  // 서버 요청을 한 번만 실행
  useEffect(() => {
    console.log("333333333333333")
    const loadedCartDetails = localStorage.getItem('cartDetails');
    const loadedOrderDetails = localStorage.getItem('orderDetails');

    const orderDetails = JSON.parse(loadedOrderDetails);
    const CartDetails = JSON.parse(loadedCartDetails);

    console.log(orderDetails);
    console.log(CartDetails);

    const query = new URLSearchParams(window.location.search);
    const paymentKey = query.get('paymentKey');
    // const cartDetails = JSON.parse(query.get('cartDetails'));
    // const orderDetails = JSON.parse(query.get('orderDetails'));
       
    const memno = orderDetails.memno;
    console.log("memno")
    console.log(memno)
    const detailData = CartDetails.map(item => ({
      ordno: orderDetails.ordno,
      procd: item.crtcd,
      crtqt: item.crtqt,
      propr: item.propr
    }));

    const token = localStorage.getItem('authToken');

    if (paymentKey) {

      fetch('/orders/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify({ paymentKey, detailData, memno })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Payment success:', data);
        } else {
          console.error('Payment failed:', data);
        }
      })
      .catch(error => {
        console.error('Error completing payment:', error);
      });
    } else {
      console.error('Missing payment parameters');
    }
  }, []); // 빈 배열을 두어 한 번만 실행되도록 설정

  // 타이머 관리
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      navigate('/');
    }

    return () => clearInterval(timer);
  }, [counter, navigate]);

  return (
    <div className="container">
      <div className="card">
        <h1 className="header">결제 성공!</h1>
        <p className="message">{counter}초 뒤에 메인페이지로 이동합니다.</p>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;