import React, { useState } from 'react';
import TopBar from './TopBar';
import Products from './Products';
import Navi from './../common/navigation';
import Menu from './../common/menu';
import Footer from './../common/footer';

import './css/App.css'; // 스타일 시트 임포트
const App = () => {

  const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 상태

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu); // 선택된 메뉴를 설정
  };

  return(
    <div>
      <Navi />
      <Menu />
      <TopBar selectedMenu={selectedMenu} onMenuClick={handleMenuClick} />  {/* TopBar에 onSelectMenu prop 전달 */}
      <Products selectedMenu={selectedMenu} /> {/* selectedMenu props를 Products 컴포넌트에 전달 */}
      <Footer />
    </div>
  )
};

export default App;