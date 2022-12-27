import React, { useEffect, useState } from 'react';
import "./Game.css";
import Board from "./Board";
import Display from "./Display";
import Button from "./Button";

function Game(props: { increment: () => void }) {
    const emptyBoard = Array(9).fill(Array(9).fill("."));

    const [board, setBoard] = useState(Array(9).fill(Array(9).fill(".")));
    const [visibleBoard, setVisibleBoard] = useState(Array(9).fill(Array(9).fill(".")));
    const [minesLocations, setMinesLocations] = useState(new Set());
    const [remainingMines, setRemainingMines] = useState(10);

    const determineNumber = (field: string) => {
        if (field === ".") {
            return "1";
        } else if (field !== "X") {
            return (parseInt(field) + 1).toString();
        }
        return "X";
    }
    const markNumbers = (board: string[][], x: number, y:number) => {
        let newBoard = JSON.parse(JSON.stringify(board)); //deep copy of nested array
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
        const newBoard = prepareBoard(board) //deep copy of nested array
        setBoard(newBoard);
    }, []);

    const prepareBoard = (board: string[][]) => {
        let newBoard = JSON.parse(JSON.stringify(board)); //deep copy of nested array
        while (minesLocations.size < 10) {
            let x = Math.floor(Math.random() * 9);
            let y = Math.floor(Math.random() * 9);
            if (newBoard[x][y] === ".") {
                newBoard[x][y] = "X";
                minesLocations.add(x * 9 + y);
                newBoard = markNumbers(newBoard, x, y);
            }
        }
        return newBoard;
    }

    const handleClick = (x: number, y: number) => {
        let newVisibleBoard = JSON.parse(JSON.stringify(visibleBoard)); //deep copy of nested array
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
            setVisibleBoard(newVisibleBoard);
            return;
        } else if (board[x][y] !== ".") {
            newVisibleBoard[x][y] = board[x][y];
        } else {
            newVisibleBoard = revealEmptyFields(board, x, y, newVisibleBoard);
        }
        setVisibleBoard(newVisibleBoard);
        checkVictory(newVisibleBoard);
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

    const setMarked = (x: number, y: number) => {
        let newVisibleBoard = JSON.parse(JSON.stringify(visibleBoard));
        if (newVisibleBoard[x][y] === ".") {
            if (remainingMines === 0) {
                alert("You can't mark more fields!");
                return;
            }
            newVisibleBoard[x][y] = "?";
            setRemainingMines(remainingMines - 1);
        }  else if (newVisibleBoard[x][y] === "?") {
            newVisibleBoard[x][y] = ".";
            setRemainingMines(remainingMines + 1);
        }
        setVisibleBoard(newVisibleBoard);
        checkVictoryMarked(newVisibleBoard);
    }

    const checkVictory = (currentVisibleBoard: string[][]) => {
        let victory = true;
        currentVisibleBoard.forEach((row: string[], i: number) => (
            row.forEach((field, j) => {
                if (field === "." && board[i][j] !== "X") {
                    victory = false;
                }
            })
        ));
        if (victory) {
            alert("You won!");
        }
    }

    const checkVictoryMarked = (currentVisibleBoard: string[][]) => {
        let victory = true;
        let counter = 0;
        currentVisibleBoard.forEach((row: string[], i: number) => (
            row.forEach((field, j) => {
                if (field === "?") {
                    counter++;
                    if (!minesLocations.has(i * 9 + j)) {
                        victory = false;
                    }
                }
            })
        ));
        if (counter !== 10) {
            victory = false;
        }
        if (victory) {
            alert("You won!");
            let newVisibleBoard = board;
            newVisibleBoard.map((row: string[], i: number) => (
                row.map((field, j) => {
                    if (field === ".") {
                        newVisibleBoard[i][j] = "/";
                    }
                })
            ));
            setVisibleBoard(newVisibleBoard);
        }
    }

    const newGame = () => {
        props.increment();
        /*
        setBoard(JSON.parse(JSON.stringify(emptyBoard)));
        setVisibleBoard(JSON.parse(JSON.stringify(emptyBoard)));
        setMinesLocations(new Set());
        setRemainingMines(10);
        const newBoard = prepareBoard(board);
        setBoard(newBoard);
        */
    }

    return (
        <div className="Game">
            <Display total={10} remaining={remainingMines} />
            <Board click={handleClick} contextMenu={setMarked} board={visibleBoard}/>
            <Button onClick={newGame} content={"New Game"} />
        </div>
    );
}

export default Game;