import React, { useState } from 'react';
import "./App.css";
import Game from "./Game";

function App() {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1);
    }

  return (
    <div className="App">
        <h1>MINESWEEPER</h1>
        <Game key={counter} increment={increment}/>
    </div>
  );
}

export default App;
