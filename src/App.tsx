import React, { useState } from 'react';
import "./App.css";
import Game from "./Game";
import Header from "./Header";

interface AppProps {
    difficulty: string;
}

export default function App(props: AppProps) {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1);
    }

  return (
    <div className="App">
        <Header />
        <Game key={counter} increment={increment} difficulty={props.difficulty}/>
    </div>
  );
}
