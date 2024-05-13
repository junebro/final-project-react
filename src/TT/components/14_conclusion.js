import React, { useState, useEffect } from "react";
import "./../css/drag_css.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/test/nu")
      .then((response) => response.text())
      .then((message) => {
        setMessage(message);
      });
  }, []);
  return <div className="App">{message}</div>;
}

export default App;
