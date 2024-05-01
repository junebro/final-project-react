import { Component } from "react";
import Top from "./components/top01.js";
import Main from "./components/main.js";
import Content from "./components/content01.js";
import Bottom from "./components/bottom01.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./content_css.css";

class App extends Component {
  render() {
    return (
      <>
        <div className="full-screen-container">
          <br></br>
          <Top />
          <Main />
          <Content />
          <Bottom />
        </div>
      </>
    );
  }
}

export default App;
