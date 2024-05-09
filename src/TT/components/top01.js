import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./../css/top_css.css";

function App() {
  const [progress, setProgress] = useState(40); // 초기 진행도 설정
  const [pageNumber, setPageNumber] = useState(1); // 초기 페이지 번호 설정

  useEffect(() => {
    // URL이 변경될 때 실행되는 부분
    // 예를 들어, URL에 따라 progress 상태를 업데이트하는 작업을 수행할 수 있습니다.
    // 이 부분은 실제로 URL에 따라 어떤 동작을 수행할지에 따라 다릅니다.
    // 여기에는 간단한 예시를 작성하겠습니다.

    // URL에서 필요한 정보를 추출하고 그에 따른 상태를 업데이트합니다.
    const currentURL = window.location.href;
    // 예시: URL에 "/example"이 포함되어 있으면 progress를 50으로 업데이트합니다.
    if (currentURL.includes("/content14")) {
      setProgress(100);
      setPageNumber(14);
    } else if (currentURL.includes("/content13")) {
      setProgress(92.8);
      setPageNumber(13);
    } else if (currentURL.includes("/content12")) {
      setProgress(85.6);
      setPageNumber(12);
    } else if (currentURL.includes("/content11")) {
      setProgress(79);
      setPageNumber(11);
    } else if (currentURL.includes("/content10")) {
      setProgress(71);
      setPageNumber(10);
    } else if (currentURL.includes("/content09")) {
      setProgress(64);
      setPageNumber(9);
    } else if (currentURL.includes("/content08")) {
      setProgress(57);
      setPageNumber(8);
    } else if (currentURL.includes("/content07")) {
      setProgress(50);
      setPageNumber(7);
    } else if (currentURL.includes("/content06")) {
      setProgress(43);
      setPageNumber(6);
    } else if (currentURL.includes("/content05")) {
      setProgress(36);
      setPageNumber(5);
    } else if (currentURL.includes("/content04")) {
      setProgress(29);
      setPageNumber(4);
    } else if (currentURL.includes("/content03")) {
      setProgress(21);
      setPageNumber(3);
    } else if (currentURL.includes("/content02")) {
      setProgress(14);
      setPageNumber(2);
    } else {
      setProgress(7);
      setPageNumber(1);
    }
  }, [window.location.href]); //  url 변화에 따라 렌더링
  return (
    <div className="top_css">
      <div className="top_ment">너한텐 안파는 서비스</div>
      <ProgressBar variant="success" now={progress} />
      <p>{pageNumber}/14</p>
    </div>
  );
}

export default App;
