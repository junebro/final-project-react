import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function ContextualExample() {
  const [progress, setProgress] = useState(40); // 초기 상태 설정

  useEffect(() => {
    const interval = setInterval(() => {
      // 1에서 100 사이의 랜덤한 정수 생성
      const randomValue = Math.floor(Math.random() * 100) + 1;
      setProgress(randomValue); // 상태 업데이트
    }, 200); // 0.1초마다 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 clearInterval
  }, []); // useEffect를 한 번만 실행하도록 빈 배열 전달

  return (
    <div className="top_css">
      <ProgressBar variant="success" now={progress} />
    </div>
  );
}

export default ContextualExample;
