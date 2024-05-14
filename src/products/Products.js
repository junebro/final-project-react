import React, { useState } from 'react';
import "./css/Products.css";
import Modal from './Modal'; // 모달 컴포넌트 임포트  
import cartClick from './../images/cart_click.png';
import cart from './../images/cart.png';

import { ItemProvider, useItem } from '../common/contexts/ItemContext';  // 경로 수정

function App() {
    return (
        <ItemProvider>
            <ItemDisplay />
        </ItemProvider>
    );
}

const ItemDisplay = () => {

  const products = useItem().item;

  const [cartImages, setCartImages] = useState(products ? products.map(product => ({
    id: product.procd,
    state: 'cart'
  })):[]);

  // 상태를 사용하여 각 제품의 카트 이미지 상태를 추적
  const [selectedProduct, setSelectedProduct] = useState(null); // 모달에 표시될 제품

  // 카트 이미지 토글 기능
  const toggleImage = (productId) => {
    console.log(productId);
    setCartImages(cartImages.map(img => 
      img.id === productId ? { ...img, state: img.state === 'cart' ? 'cart_click' : 'cart' } : img
    ));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
    <h3 className='low-carb-diet'>저당 식단</h3>
    <div className="products-container">
      {products ? products.map(product => (
        <div key={product.procd} className="product">
          <div className="image-container" onClick={() => openModal(product)}>
            <img className='img_product' src={`../images/products/${product.proimg}`} alt={product.pronm} style={{ cursor: 'pointer' }} />
          </div>                              
          <div className="text-container">
            <div className="product-info">
              <div className="product-name">{product.pronm}</div>
              <div className="product-price">
                {product.propr}
                <img
                  className="img_cart"
                  src={cartImages.find(img => img.id === product.procd).state === 'cart' ? cart : cartClick}
                  alt="Cart"
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중단
                    toggleImage(product.procd);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </div>
      )) : []}
      {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
    </div>
    </>
  );
};

export default App;