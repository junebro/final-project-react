import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/top_css.css";
import logo from "./../../images/logo.svg"; // 이미지 파일을 import

function App() {
  const [progress, setProgress] = useState(40); // 초기 진행도 설정
  const [pageNumber, setPageNumber] = useState(1); // 초기 페이지 번호 설정
  const location = useLocation();

  useEffect(() => {
    const currentURL = location.pathname;

    if (currentURL.includes("/content15")) {
      setProgress(100);
      setPageNumber(15);
    } else if (currentURL.includes("/content14")) {
      setProgress(93.3);
      setPageNumber(14);
    } else if (currentURL.includes("/content13")) {
      setProgress(86.6);
      setPageNumber(13);
    } else if (currentURL.includes("/content12")) {
      setProgress(80);
      setPageNumber(12);
    } else if (currentURL.includes("/content11")) {
      setProgress(73.3);
      setPageNumber(11);
    } else if (currentURL.includes("/content10")) {
      setProgress(66.6);
      setPageNumber(10);
    } else if (currentURL.includes("/content09")) {
      setProgress(60);
      setPageNumber(9);
    } else if (currentURL.includes("/content08")) {
      setProgress(53.3);
      setPageNumber(8);
    } else if (currentURL.includes("/content07")) {
      setProgress(46.6);
      setPageNumber(7);
    } else if (currentURL.includes("/content06")) {
      setProgress(40);
      setPageNumber(6);
    } else if (currentURL.includes("/content05")) {
      setProgress(33.3);
      setPageNumber(5);
    } else if (currentURL.includes("/content04")) {
      setProgress(26.6);
      setPageNumber(4);
    } else if (currentURL.includes("/content03")) {
      setProgress(20);
      setPageNumber(3);
    } else if (currentURL.includes("/content02")) {
      setProgress(13.3);
      setPageNumber(2);
    } else {
      setProgress(6.6);
      setPageNumber(1);
    }
  }, [location.pathname]); // location.pathname의 변화에 따라 실행

  return (
    <div className="top_css">
      <div className="top_ment">
        <Link to="/">
          <img className="img_logo_1" src={logo} alt="로고"></img>
        </Link>
        영양 진단 서비스
      </div>
      <ProgressBar variant="success" now={progress} />
      <p>{pageNumber}/15</p>
    </div>
  );
}

export default App;
