import React, { useState } from 'react';
import "./App.css";
import Game from "./Game";
import Header from "./Header";

export default function App() {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1);
    }

  return (
    <div className="App">
        <Header />
        <Game key={counter} increment={increment}/>
    </div>
  );
}
