import React, { useState } from 'react';
import './css/TopBar.css'; // 스타일 시트 임포트

const TopBar = () => {
  // 클릭한 메뉴에 대한 상태 설정
  const [selectedMenu, setSelectedMenu] = useState(null);

  // 클릭한 메뉴에 대한 처리 함수
  const handleMenuClick = (menu) => {
    // 여기서는 간단히 메뉴를 설정하고, DB 조회 등의 작업을 수행할 수 있습니다.
    setSelectedMenu(menu);
  };s

  return (
    <div className="top-bar">
      {/* 각 메뉴를 클릭할 때 해당 메뉴의 처리 함수를 호출하도록 설정 */}
      <a className="top-bar-link" onClick={() => handleMenuClick("저당 식단")}>저당 식단</a>
      <a className="top-bar-link" onClick={() => handleMenuClick("칼로리 식단")}>칼로리 식단</a>
      <a className="top-bar-link" onClick={() => handleMenuClick("장수마을 식단")}>장수마을 식단</a>
      <a className="top-bar-link" onClick={() => handleMenuClick("단백질 식단")}>단백질 식단</a>
      
      {/* 선택된 메뉴가 있을 경우 해당 메뉴 정보를 출력 */}
      {/* {selectedMenu && <div>선택된 메뉴: {selectedMenu}</div>} */}
    </div>
  );
};

export default TopBar;