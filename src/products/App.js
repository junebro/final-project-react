import React from 'react';
import TopBar from './TopBar';
import Products from './Products';
import Navi from './../common/navigation';
import Menu from './../common/menu';
import Footer from './../common/footer';

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