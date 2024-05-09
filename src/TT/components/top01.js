import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./../css/top_css.css";

function ContextualExample() {
  const [progress, setProgress] = useState(40); // 초기 상태 설정

  return (
    <div className="top_css">
      <div className="top_ment">너한텐 안파는 서비스</div>
      <ProgressBar variant="success" now={progress} />
      <p>1/1</p>
    </div>
  );
}

export default ContextualExample;
