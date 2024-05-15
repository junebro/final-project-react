import React, { useState } from 'react';
import './css/TopBar.css'; // 스타일 시트 임포트

const TopBar = ({ onMenuClick }) => {

  return (
    <div className="top-bar">
      {/* 각 메뉴를 클릭할 때 해당 메뉴의 처리 함수를 호출하도록 설정 */}
      <a className="top-bar-link" onClick={() => onMenuClick("1") }>저당 식단</a>
      <a className="top-bar-link" onClick={() => onMenuClick("2")}>칼로리 식단</a>
      <a className="top-bar-link" onClick={() => onMenuClick("3")}>장수마을 식단</a>
      <a className="top-bar-link" onClick={() => onMenuClick("4")}>단백질 식단</a>
      
      {/* 선택된 메뉴가 있을 경우 해당 메뉴 정보를 출력 */}
      {/* {selectedMenu && <div>선택된 메뉴: {selectedMenu}</div>} */}
    </div>
  );
};

export default TopBar;