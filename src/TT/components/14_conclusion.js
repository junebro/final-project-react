import React, { useState } from "react";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import "./../css/drag_css.css";
import img1 from "./../images/가당음료.png";
import img2 from "./../images/과자류.png";
import img3 from "./../images/사탕.png";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/test/nu")
      .then((response) => response.text())
      .then((message) => {
        setMessage(message);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">{message}</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}

export default App;
