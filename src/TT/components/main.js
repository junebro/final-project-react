import React, { useState, useEffect } from "react";

function App() {
  const [fontSize, setFontSize] = useState(getRandomFontSize());

  // 15부터 30 사이의 랜덤한 값 반환
  function getRandomFontSize() {
    return Math.floor(Math.random() * 16) + 15;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // 15부터 30 사이의 랜덤한 폰트 크기로 업데이트
      setFontSize(getRandomFontSize());
    }, 1000000);

    // 컴포넌트가 언마운트될 때 interval 정리
    return () => clearInterval(interval);
  }, []); // useEffect를 한 번만 실행하기 위해 빈 배열 전달

  return (
    <div className="main_alert" style={{ fontSize: `${fontSize}px` }}>
      <p>개인 별 영양 정보를 알기 위해</p>
      <p>정보를 입력해 주세요</p>
    </div>
  );
}

export default App;
