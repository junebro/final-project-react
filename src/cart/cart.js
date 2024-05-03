import Navi from './../common/navigation';
import Menu from './../common/menu';
import Footer from './../common/footer';

import React, { useState } from 'react';
import './cart.css'; // 스타일 시트 임포트


function CartItem({ item, onUpdateCart, onRemoveItem }) {
  const increment = () => onUpdateCart(item.id, item.quantity + 1);
  const decrement = () => {
    if (item.quantity > 1) {
      onUpdateCart(item.id, item.quantity - 1);
    } else {
      alert("수량은 1 이하로 설정할 수 없습니다.");
    }
  };

  const removeItem = () => onRemoveItem(item.id);

  return (
    <div>    
      <ul className="cart-item">
        <li><img className='cart-product-image' src={item.image} alt={item.name} /></li>
        <li>  
          <div className='cart-item-name'>
            <div className='cart-product-name'>{item.name}</div>
            <div className='cart-product-price'>{item.price.toLocaleString()}원</div>
          </div>
        </li>
        <li>
          <div className='cart-button'>
            <div className='cart-minus-button' onClick={decrement}>-</div>
            <span className='cart-count-button'>{item.quantity}</span>
            <div className='cart-plus-button' onClick={increment}>+</div>
          </div>
        </li>
        <li>
          <div className='cart-calculate'>
            <div className='cart-item-price'>{(item.price * item.quantity).toLocaleString()}원</div>
            <div className='cart-remove' onClick={removeItem} style={{ float: 'right' }}>X</div>
          </div>
        </li>
      </ul>
      <div className='line'></div>
    </div>
  );
}

function Cart() {

  const [items, setItems] = useState(
    Array.from({ length: 20 }, (v, i) => ({
      id: i + 1,
      name: '올리브 리코타 샐러드&발사믹 글레이즈 드레싱',
      price: '10500',
      quantity: 1,
      image: require(`./../images/products/product${(i % 3) + 1}.jpg`), // 상품 이미지 (경로는 예시이므로 실제 경로에 맞게 조정 필요)
      cartState: 'cart' // 제품별 카트 상태 초기화
    }))
  );

  const updateCart = (itemId, quantity) => {
    setItems(items.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const removeItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Navi />
      <Menu />
      <div className='cart-body'>
        <div className="cart-container">
          <h1 style={{textAlign:'center'}}>장바구니</h1>
          <div className='line-bold'></div>
          <div className='cart-table-head'>
            <ul className='cart-container-ul'>
              <li style={{width:"200px"}}></li>
              <li style={{width:"900px"}}>제품정보</li>
              <li style={{width:"100px"}}>수량</li>
              <li style={{width:"300px"}}>구매금액</li>
              <li style={{width:"30px"}}></li>
            </ul>
          </div>
          {items.map(item => (
            <CartItem key={item.id} item={item} onUpdateCart={updateCart} onRemoveItem={removeItem} />
          ))}
          <div className='line-bold'></div>
          <div className='cart-total-area'>
            <div className='total-text'>총 합계금액</div> 
            <div className='total-price'>{totalPrice.toLocaleString()}원</div>
            <div className="total-button">구 매 하 기</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}

export default Cart;