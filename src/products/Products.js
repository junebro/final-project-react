import React, { useState } from 'react';
import "./css/Products.css";
import Modal from './Modal'; // 모달 컴포넌트 임포트  
import cartClick from './../images/cart_click.png';
import cart from './../images/cart.png';

// 제품 데이터 생성
const products = Array.from({ length: 20 }, (v, i) => ({
  id: i + 1,
  name: `올리브 리코타 샐러드&발사믹 글레이즈 드레싱`,
  price: '10,500원',
  image: require(`./../images/products/product${(i % 3) + 1}.jpg`), 
  cartState: 'cart' // 제품별 카트 상태 초기화
}));

const Products = () => {
  const [cartImages, setCartImages] = useState(products.map(product => ({
    id: product.id,
    state: product.cartState
  })));

  // 상태를 사용하여 각 제품의 카트 이미지 상태를 추적
  const [selectedProduct, setSelectedProduct] = useState(null); // 모달에 표시될 제품

  // 카트 이미지 토글 기능
  const toggleImage = (productId) => {
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
      {products.map(product => (
        <div key={product.id} className="product">
          <div className="image-container" onClick={() => openModal(product)}>
            <img className='img_product' src={product.image} alt={product.name} style={{ cursor: 'pointer' }} />
          </div>
          <div className="text-container">
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-price">
                {product.price}
                <img
                  className="img_cart"
                  src={cartImages.find(img => img.id === product.id).state === 'cart' ? cart : cartClick}
                  alt="Cart"
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중단
                    toggleImage(product.id);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
    </div>
    </>
  );
};

export default Products;