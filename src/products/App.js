import React from 'react';
import TopBar from './TopBar';
import Products from './Products';
import Navi from './../common/navigation';
import Menu from './../common/menu';
import Footer from './../common/footer';

import './css/App.css'; // 스타일 시트 임포트
const App = () => (
  <div>
     <Navi />
    <Menu />
    <TopBar />
    <Products />
    <Footer />
  </div>
);

export default App;