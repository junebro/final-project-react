import React, { useState } from 'react';
import './cart.css';

const productsData = [
  {
    id: 1,
    name: "비빔국수 세트",
    calories: "355Kcal",
    carb: "18g",
    protein: "17g",
    fat: "24.0g",
    price: "10,500원",
    image: "/path/to/image1.jpg"
  },
  { 
    id: 2,
    name: "한정식 세트",
    calories: "355Kcal",
    carb: "18g",
    protein: "17g",
    fat: "24.0g",
    price: "10,500원",
    image: "/path/to/image2.jpg"
  },
  {
    id: 3,
    name: "죽 세트",
    calories: "355Kcal",
    carb: "18g",
    protein: "17g", 
    fat: "24.0g",
    price: "10,500원",
    image: "/path/to/image3.jpg"
  }
];

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>칼로리: {product.calories}</p>
        <p>탄수화물: {product.carb}</p>
        <p>단백질: {product.protein}</p>
        <p>지방: {product.fat}</p>
        <div className="price">{product.price}</div>
      </div>
    </div>
  );
}

function CartSummary({ items, total }) {
  return (
    <div className="cart-summary">
      <h3>주문 요약</h3>
      <p>항목 수: {items}</p>
      <p>총 금액: {total}원</p>
      <button>구매하기</button>
    </div>
  );
}

function Products() {
  const [cartItems, setCartItems] = useState(3);
  const [totalPrice, setTotalPrice] = useState(31500);

  return (
    <div className="products-container">
      <div className="products-grid">
        {productsData.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
      <CartSummary items={cartItems} total={totalPrice} />
    </div>
  );
}

export default Products;