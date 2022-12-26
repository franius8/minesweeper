import React, {MouseEventHandler, useEffect, useState} from 'react';
import "./App.css";
import Board from "./Board";

function App() {
    const [board, setBoard] = useState(Array(9).fill(Array(9).fill(".")));
    const [visibleBoard, setVisibleBoard] = useState(Array(9).fill(Array(9).fill(".")));
    const [minesLocations, setMinesLocations] = useState(new Set());

    const determineNumber = (field: string) => {
        if (field === ".") {
            return "1";
        } else if (field !== "X") {
            return (parseInt(field) + 1).toString();
        }
        return "X";
    }
    const markNumbers = (board: string[][], x: number, y:number) => {
        let newBoard = JSON.parse(JSON.stringify(board));
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(x + i >= 0 && x + i < 9 && y + j >= 0 && y + j < 9){
                    newBoard[x + i][y + j] = determineNumber(newBoard[x + i][y + j]);
                }
                }
            }
        return newBoard;
    }

    useEffect(() => {
        let newBoard:string[][] = JSON.parse(JSON.stringify(board)); //deep copy of nested array
        while (minesLocations.size < 10) {
            let x = Math.floor(Math.random() * 9);
            let y = Math.floor(Math.random() * 9);
            if (newBoard[x][y] === ".") {
                newBoard[x][y] = "X";
                minesLocations.add(x * 9 + y);
                newBoard = markNumbers(newBoard, x, y);
            }
        }
        setBoard(newBoard);
        console.log(minesLocations);
    }, []);

    const handleClick = (x: number, y: number) => {
        let newVisibleBoard = JSON.parse(JSON.stringify(visibleBoard));
        if (minesLocations.has(x * 9 + y)) {
            alert("You lost!");
            newVisibleBoard = board;
        } else {
            newVisibleBoard[x][y] = board[x][y];
        }
        setVisibleBoard(newVisibleBoard);
    }

  return (
    <div className="App">
        <h1>MINESWEEPER</h1>
        <Board click={handleClick} board={visibleBoard}/>
    </div>
  );
}

export default App;
