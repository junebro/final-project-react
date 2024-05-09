import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Top from "./components/top01.js";
//  추가할 페이지 임포트 구간
import Content01 from "./components/01_personal_info_survay.js";
import Content02 from "./components/02_disease_survey.js";
import Content03 from "./components/03_allergy_foods.js";
import Content04 from "./components/04_exercise_rate.js";
import Content05 from "./components/05_soup_qa.js";
import Content06 from "./components/06_alcohol_qa.js";
import Content07 from "./components/07_drag_foods.js";
import Content08 from "./components/08_drag_foods_01.js";
import Content09 from "./components/09_drag_foods_02.js";
import Content10 from "./components/10_drag_foods_03.js";
import Content11 from "./components/11_drag_foods_04.js";
import Content12 from "./components/12_drag_foods_05.js";
import Content13 from "./components/13_drag_foods_06.js";
//  추가할 페이지 임포트 구간

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComponentIndex: 0, // 초기에는 Content01 컴포넌트를 렌더링
      components: [
        Content01,
        Content02,
        Content03,
        Content04,
        Content05,
        Content06,
        Content07,
        Content08,
        Content09,
        Content10,
        Content11,
        Content12,
        Content13,
      ], // 렌더링할 컴포넌트 목록
      paths: [
        "/nutri/nutri",
        "/nutri/nutri/content02",
        "/nutri/nutri/content03",
        "/nutri/nutri/content04",
        "/nutri/nutri/content05",
        "/nutri/nutri/content06",
        "/nutri/nutri/content07",
        "/nutri/nutri/content08",
        "/nutri/nutri/content09",
        "/nutri/nutri/content10",
        "/nutri/nutri/content11",
        "/nutri/nutri/content12",
        "/nutri/nutri/content13",
      ], // 컴포넌트에 해당하는 경로 목록
    };
  }

  componentDidMount() {
    // 컴포넌트가 마운트된 후에 handleClickNext 호출하여 첫 번째 컴포넌트를 렌더링
    this.handleClickNext();
  }

  // 다음 버튼 클릭 시 호출될 함수
  handleClickNext = () => {
    this.setState((prevState) => ({
      currentComponentIndex:
        (prevState.currentComponentIndex + 1) % prevState.components.length,
    }));
  };

  render() {
    // 현재 렌더링할 컴포넌트와 그에 해당하는 경로를 가져옴
    const CurrentComponent =
      this.state.components[this.state.currentComponentIndex];
    const currentPath = this.state.paths[this.state.currentComponentIndex];

    return (
      <div className="full-screen-container">
        <br />
        <Top />
        <Routes>
          {/* 기본 경로인 "/Nutri"에 대한 라우트 설정 */}
          <Route path="/" element={<Content01 />} />

          {/* 나머지 컴포넌트에 대한 Route를 설정합니다. */}
          <Route path="/content02" element={<Content02 />} />
          <Route path="/content03" element={<Content03 />} />
          <Route path="/content04" element={<Content04 />} />
          <Route path="/content05" element={<Content05 />} />
          <Route path="/content06" element={<Content06 />} />
          <Route path="/content07" element={<Content07 />} />
          <Route path="/content08" element={<Content08 />} />
          <Route path="/content09" element={<Content09 />} />
          <Route path="/content10" element={<Content10 />} />
          <Route path="/content11" element={<Content11 />} />
          <Route path="/content12" element={<Content12 />} />
          <Route path="/content13" element={<Content13 />} />
        </Routes>
        <div>
          {/* 다음 버튼에 Link를 사용하여 다음 페이지로 이동 */}
          <Link
            to={currentPath}
            onClick={this.handleClickNext}
            className="next_button"
          >
            <span>다음</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default App;
