import React, { Component } from "react";
import Top from "./components/top01.js";
import Content from "./components/personal_info_survay.js";
import Content1 from "./components/disease_survey.js"; // 다음에 렌더링할 컴포넌트 추가
import "bootstrap/dist/css/bootstrap.min.css";
import "./content_css.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComponent: "Content", // 초기에는 Content 컴포넌트를 렌더링
    };
  }

  // 다음 버튼 클릭 시 호출될 함수
  handleClickNext = () => {
    // 현재 렌더링 중인 컴포넌트에 따라 다음에 렌더링할 컴포넌트 결정
    const nextComponent =
      this.state.currentComponent === "Content" ? "Content1" : "Content";

    // state 업데이트하여 다음에 렌더링할 컴포넌트 설정
    this.setState({
      currentComponent: nextComponent,
    });
  };

  render() {
    // 현재 렌더링할 컴포넌트 타입에 따라 해당하는 컴포넌트를 렌더링
    const CurrentComponent =
      this.state.currentComponent === "Content" ? Content : Content1;

    return (
      <>
        <div className="full-screen-container">
          <br></br>
          <Top />
          {/* 현재 렌더링할 컴포넌트 렌더링 */}
          <CurrentComponent />
          <div>
            {/* 다음 버튼에 onClick 이벤트 핸들러 등록 */}
            <button className="next_button" onClick={this.handleClickNext}>
              다음
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default App;
