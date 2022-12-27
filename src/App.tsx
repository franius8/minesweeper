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
        if (board[x][y] === "X") {
            alert("You lost!");
            newVisibleBoard = board;
            newVisibleBoard.map((row: string[], i: number) => (
                row.map((field, j) => {
                    if (field === ".") {
                        newVisibleBoard[i][j] = "/";
                    }
                })
            ));
        } else if (board[x][y] !== ".") {
            newVisibleBoard[x][y] = board[x][y];
        } else {
            newVisibleBoard = revealEmptyFields(board, x, y, newVisibleBoard);
        }
        setVisibleBoard(newVisibleBoard);
    }

    const revealEmptyFields = (board: string[][], x: number, y: number, visibleBoard: string[][]) => {
        let queue = [[x, y]];
        let used = new Set();
        while (queue.length > 0) {
            let [x, y] = queue.shift() as number[];
            if (used.has(x * 9 + y)) {
                continue;
            }
            used.add(x * 9 + y);
            if (visibleBoard[x][y] === ".") {
                visibleBoard[x][y] = board[x][y];
                if (board[x][y] === ".") {
                    visibleBoard[x][y] = "/";
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (x + i >= 0 && x + i < 9 && y + j >= 0 && y + j < 9) {
                                queue.push([x + i, y + j]);
                            }
                        }
                    }
                }
            }
        }
        return visibleBoard;
    }

  return (
    <div className="App">
        <h1>MINESWEEPER</h1>
        <Board click={handleClick} board={visibleBoard}/>
    </div>
  );
}

export default App;
