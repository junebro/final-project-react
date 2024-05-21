import React, { useState, useEffect, useRef } from 'react';
import "./css/Products.css";
import Modal from './Modal'; 
import cartClickImg from './../images/cart_click.png';
import cartImg from './../images/cart.png';
import { ItemProvider, useItem } from '../common/contexts/ProductsContext';
import { useParams } from 'react-router-dom';
import { useAuth } from '../common/contexts/AuthContext'; // 로그인 

function App({ selectedMenu }) {
  return (
      <ItemProvider>
          <ItemDisplay selectedMenu={selectedMenu}/>
      </ItemProvider>
  );
}

const ItemDisplay = ({ selectedMenu }) => {

  const { user } = useAuth(); // useAuth 훅에서 user ID 가져오기

  const { tp } = useParams(); // URL에서 tp 파라미터를 추출합니다.
  const products = useItem().item; // 전체 제품 목록을 가져옵니다.
  const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 제품 목록을 상태로 관리합니다.

  /* 상품 구분 */
  useEffect(() => {
    const targetTp = selectedMenu || tp; // selectedMenu가 주어지면 사용하고, 없으면 tp 값을 사용합니다.
    if (targetTp && products) {
      const updatedProducts = products.filter(product => product.protp === targetTp);
      setFilteredProducts(updatedProducts);
    } else {
      setFilteredProducts([]); // 조건에 맞는 제품이 없으면 빈 배열을 설정합니다.
    }
  }, [selectedMenu, tp, products]); // 의존성 배열에 selectedMenu, tp, products를 포함시켜 상태 변화를 감지합니다.


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

  

  /* 장바구니 */
  // useRef 훅을 사용하여 각 상품 이미지의 ref를 생성
  const imageRefs = useRef({});

  const cartClick = (procd) => {
    const imgRef = imageRefs.current[procd];
    if (imgRef) {
      imgRef.src = imgRef.src === cartImg ? cartClickImg : cartImg;
      
      const cartData = {
        mbrno: user,
        crtcd: procd,
        crtqt: 1
      };

      if ( imgRef.src === cartClickImg ) {

        fetch(`/cart/cartinsert/`, {
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

      } else {
        
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

      }
    }
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
                ref={(el) => (imageRefs.current[product.procd] = el)}
                className="img_cart"
                src={product.crtck === '1' ? cartClickImg : cartImg}
                alt="Cart"
                style={{ cursor: 'pointer' }}
                onClick={() => cartClick(product.procd)}
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