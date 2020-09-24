import React, { useState } from "react";
import "./App.css";

import Header from "../src/components/Header";

function App() {
  const [counter, setCounter] = useState(0);

  const handleButtonClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="App">
      <Header title="Hello" />
      <h1>{counter}</h1>
      <button type="button" onClick={handleButtonClick}>
        Teste
      </button>
    </div>
  );
}

export default App;
