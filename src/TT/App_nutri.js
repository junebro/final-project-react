import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Top from "./components/top01.js";
//  추가할 페이지 임포트 구간
import Content01 from "./components/01_personal_info_survay.js";
import Content02 from "./components/02_disease_survey.js";
import Content03 from "./components/03_allergy_foods.js";
import Content04 from "./components/04_exercise_rate.js";
import Content05 from "./components/05_soup_qa.js";
import Content06 from "./components/06_alcohol_qa.js";
import Content07 from "./components/07_drag_foods.js";
//  추가할 페이지 임포트 구간
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/content_css.css";
import { Switch } from "react-router-dom/cjs/react-router-dom.min.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComponentIndex: 0, // 초기에는 Content 컴포넌트를 렌더링
      components: [
        Content01,
        Content02,
        Content03,
        Content04,
        Content05,
        Content06,
        Content07,
      ], // 렌더링할 컴포넌트 목록
      paths: [
        "/content01",
        "/content02",
        "/content03",
        "/content04",
        "/content05",
        "/content06",
        "/content07",
      ], // 컴포넌트에 해당하는 경로 목록
    };
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
      <Router>
        <div className="full-screen-container">
          <br />
          <Top />
          {/* 각 컴포넌트에 대한 Route를 설정 */}
          <Route path="/content01" exact component={CurrentComponent} />
          <Route path="/content02" component={CurrentComponent} />
          <Route path="/content03" component={CurrentComponent} />
          <Route path="/content04" component={CurrentComponent} />
          <Route path="/content05" component={CurrentComponent} />
          <Route path="/content06" component={CurrentComponent} />
          <Route path="/content07" component={CurrentComponent} />

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
      </Router>
    );
  }
}

export default App;
