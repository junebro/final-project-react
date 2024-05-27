import Navi from './../common/navigation';
import Menu from './../common/menu';
import Footer from './../common/footer';
import { ItemProvider, useItem } from '../common/contexts/CartContext';
import Modal from '../products/Modal'; 
import { useAuth } from '../common/contexts/AuthContext'; // 로그인 
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import './cart.css'; // 스타일 시트 임포트

function App() {
  return (
      <ItemProvider>
          <Cart/>
      </ItemProvider>
  );
}

function CartItem({ product, onUpdateCart, onRemoveItem }) {

  const { user, logout } = useAuth(); // 현재 로그인한 사용자 정보와 로그아웃 함수를 가져옵니다
  const increment = () => onUpdateCart(product.crtcd, product.crtqt + 1);
  const decrement = () => {
    if (product.crtqt > 1) {
      onUpdateCart(product.crtcd, product.crtqt - 1);
    } else {
      alert("수량은 1 이하로 설정할 수 없습니다.");
    }
  };

  const removeItem = (product) => {

    const cartData = {
      mbrno: user.userId,
      crtcd: product.crtcd
    };

    fetch(`/cart/cartdelete/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error:', error));

    onRemoveItem(product.crtcd);
  }

  /* 모달 */
  // selectedProduct 상태는 현재 선택된 제품 객체를 저장하며, 모달에 표시될 데이터를 관리합니다. 
  const [selectedProduct, setSelectedProduct] = useState(null);

  // openModal 함수는 클릭된 제품 객체를 인자로 받아 selectedProduct 상태를 업데이트하여 모달에 표시합니다.
  const openModal = (products) => {
    setSelectedProduct(products);
  };

  // closeModal 함수는 모달을 닫을 때 사용되며, selectedProduct 상태를 null로 설정하여 모달을 숨깁니다.
  const closeModal = () => {
    setSelectedProduct(null);
  };


  return (
    <div>
      <ul className="cart-item">
        <li><img className='cart-product-image' src={require(`../images/products/${product.proimg}.jpg`)} alt={product.proimg} onClick={() => openModal(product)}/></li>
        <li>  
          <div className='cart-item-name'>
            <div className='cart-product-name'>{product.pronm}</div>
            <div className='cart-product-price'>{product.propr.toLocaleString()}원</div>
          </div>
        </li>
        <li>
          <div className='cart-button'>
            <div className='cart-minus-button' onClick={decrement}>-</div>
            <span className='cart-count-button'>{product.crtqt}</span>
            <div className='cart-plus-button' onClick={increment}>+</div>
          </div>
        </li>
        <li>
          <div className='cart-calculate'>
            <div className='cart-item-price'>{(product.propr * product.crtqt).toLocaleString()} 원</div>
            <div className='cart-remove' onClick={() => removeItem(product)} style={{ float: 'right', cursor: 'pointer' }}>X</div>
          </div>
        </li>
      </ul>
      <div className='line'></div>
      {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
}

function Cart() {

  const cartList = useItem().item; // 전체 카트 목록을 가져옵니다.
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cartList) {
      setCartItems(initializeCartItems(cartList));
    }
  }, [cartList]);

  const initializeCartItems = (cartList) => {
    return cartList.map(item => ({
      crtcd: item.crtcd,
      crtqt: item.crtqt, // 상품 수량
      mbrno: item.mbrno,
      pifimg1: item.pifimg1,
      pifimg2: item.pifimg2,
      pifimg3: item.pifimg3,
      proimg: item.proimg,
      pronm: item.pronm, // 상품 이름
      propr: item.propr, // 상품 가격
      prostp: item.prostp
    }));
  };

  const updateCart = (itemId, crtqt) => {
    setCartItems(cartItems.map(product => product.crtcd === itemId ? { ...product, crtqt } : product));
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(product => product.crtcd !== itemId));
  };

  const totalPrice = cartItems.reduce((acc, product) => acc + product.propr * product.crtqt, 0);

  /* 결제 버튼 클릭 이벤트 */
  const paymentClick = (product) => {
    navigate('/order/orderApp', { state: { cartItems: product.cartItems } });
  }

  return (
    <div>
      <Navi />
      <Menu />
      <div className='cart-body'>
        <div className="cart-container">
          <h1 style={{textAlign:'center', marginBottom:'50px'}}>장바구니</h1>
          <div className='line-bold'></div>
          <div className='cart-table-head'>
            <ul className='cart-container-ul'>
              <li style={{marginLeft:'250px'}}>제품정보</li>
              <li style={{marginLeft:"185px"}}>수량</li>
              <li style={{marginLeft:"80px"}}>구매금액</li>
            </ul>
            <div className='line-bold'></div>
          </div>
         
          {cartItems ? cartItems.map(product => (
            <CartItem key={product.crtcd} product={product} onUpdateCart={updateCart} onRemoveItem={removeItem} />
          )):[]}
          <div style={{marginTop:'20px'}} className='line-bold'></div>
          <div className='cart-total-area'>
            <div className='total-text'>총 합계금액</div> 
            <div className='total-price'>{totalPrice.toLocaleString()} 원</div>
            <div className="total-button" onClick={() => paymentClick({cartItems})}>구 매 하 기</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}

export default App;