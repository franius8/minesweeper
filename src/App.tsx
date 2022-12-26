import React from 'react';
import "./App.css";
import Board from "./Board";

function App() {
    const [board, setBoard] = React.useState(Array(9).fill(Array(9).fill(".")));

  return (
    <div className="App">
        <h1>MINESWEEPER</h1>
        <Board board={board}/>
    </div>
  );
}

export default App;
