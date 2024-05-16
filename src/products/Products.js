import React, { useState, useEffect } from 'react';
import "./css/Products.css";
import Modal from './Modal'; 
import cartClick from './../images/cart_click.png';
import cart from './../images/cart.png';
import { ItemProvider, useItem } from '../common/contexts/ItemContext';
import { useParams } from 'react-router-dom';

function App({ selectedMenu }) {
  return (
      <ItemProvider>
          <ItemDisplay selectedMenu={selectedMenu}/>
      </ItemProvider>
  );
}

const ItemDisplay = ({ selectedMenu }) => {

  const { tp } = useParams(); // URL에서 tp 파라미터를 추출합니다.
  const products = useItem().item; // 전체 제품 목록을 가져옵니다.
  const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 제품 목록을 상태로 관리합니다.

  useEffect(() => {
    const targetTp = selectedMenu || tp; // selectedMenu가 주어지면 사용하고, 없으면 tp 값을 사용합니다.
    if (targetTp && products) {
      const updatedProducts = products.filter(product => product.protp === targetTp);
      setFilteredProducts(updatedProducts);
    } else {
      setFilteredProducts([]); // 조건에 맞는 제품이 없으면 빈 배열을 설정합니다.
    }
  }, [selectedMenu, tp, products]); // 의존성 배열에 selectedMenu, tp, products를 포함시켜 상태 변화를 감지합니다.

  // cartImages 상태는 제품과 그 제품의 카트 이미지 상태('cart' 또는 'cart_click')를 관리합니다.
  const [cartImages, setCartImages] = useState(filteredProducts.map(product => ({
    id: product.procd,  // 제품 ID
    state: 'cart'       // 초기 카트 이미지 상태 설정
  })));

  // selectedProduct 상태는 현재 선택된 제품 객체를 저장하며, 모달에 표시될 데이터를 관리합니다. 
  const [selectedProduct, setSelectedProduct] = useState(null);

  // toggleImage 함수는 제품 ID를 인자로 받아 해당 제품의 카트 이미지 상태를 토글합니다.
  const toggleImage = (productId) => {
    setCartImages(cartImages.map(img => 
      img.id === productId ? { ...img, state: img.state === 'cart' ? 'cart_click' : 'cart' } : img
    ));
  };

  // openModal 함수는 클릭된 제품 객체를 인자로 받아 selectedProduct 상태를 업데이트하여 모달에 표시합니다.
  const openModal = (products) => {
    setSelectedProduct(products);
  };

  // closeModal 함수는 모달을 닫을 때 사용되며, selectedProduct 상태를 null로 설정하여 모달을 숨깁니다.
  const closeModal = () => {
    setSelectedProduct(null);
  };

  const tpTexts = {
    "1": "저당 식단",
    "2": "칼로리 식단",
    "3": "장수마을 식단",
    "4": "단백질 식단",
  };

  return (
    <>
      <h3 className='low-carb-diet'>{selectedMenu ? tpTexts[selectedMenu] : "저당 식단"}</h3>
      <div className="products-container">
        {filteredProducts.map(product => (
          <div key={product.procd} className="product">
            <div className='product-image-container'>
            <img className='img_product' src={require(`../images/products/${product.proimg}.jpg`)} alt={product.pronm} onClick={() => openModal(product)}/>
            </div>
            <div className="text-container">
              <div className="product-name">{product.pronm}</div>
              <div className="product-price">
              ￦{product.propr.toLocaleString()}
                <img
                  className="img_cart"
                  src={(cartImages.find(img => img.id === product.procd) || {}).state === 'cart' ? cart : cartClick}
                  alt="Cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleImage(product.procd);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        ))}
        {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
      </div>
    </>
  );
};

export default App;