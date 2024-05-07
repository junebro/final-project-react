// Router.js
import { Routes, Route } from "react-router-dom";
import Main from "./main/main";
import Products from "./products/App";
import Cart from "./cart/cart";
import Diet from "./diet/diet";
import Member from "./member/join";
import Order from "./order/order";

function App() {
  return (
    <Routes>
      {/* 웹 서비스 소개 페이지 */}
      <Route path="/" element={<Main />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Diet" element={<Diet />} />
      <Route path="/Member" element={<Member />} />
      <Route path="/Order" element={<Order />} />
    </Routes>
  );
}

export default App;