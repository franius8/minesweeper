import React, { useEffect, useState } from 'react';
import "./Game.css";
import Board from "./Board";
import Display from "./Display";

function Game(props: { increment: () => void }) {

    const [boardSide, setBoardSide] = useState(9);
    const [board, setBoard] = useState(Array.from({length: boardSide}, e => Array(boardSide).fill(".")));
    const [visibleBoard, setVisibleBoard] = useState(Array.from({length: boardSide}, e => Array(boardSide).fill(".")));
    const [minesLocations, setMinesLocations] = useState(new Set<number>());
    const [initialMines, setInitialMines] = useState(10);
    const [remainingMines, setRemainingMines] = useState(initialMines);
    const [gameState, setGameState] = useState("playing");
    const [clicks, setClicks] = useState(0);
    const [threeBV, setThreeBV] = useState(0);

    const determineNumber = (field: string) => {
        if (field === ".") {
            return "1";
        } else if (field !== "X") {
            return (parseInt(field) + 1).toString();
        }
        return "X";
    }

    const markNumbers = (board: string[][], x: number, y:number) => {
        let newBoard = board; //deep copy of nested array
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(x + i >= 0 && x + i < boardSide && y + j >= 0 && y + j < boardSide){
                    newBoard[x + i][y + j] = determineNumber(newBoard[x + i][y + j]);
                }
            }
        }
        return newBoard;
    }

    useEffect(() => {
        const newBoard = prepareBoard(board)
        setBoard(newBoard);
    }, []);

    const prepareBoard = (board: string[][]) => {
        let newBoard = board;
        while (minesLocations.size < remainingMines) {
            let x = Math.floor(Math.random() * boardSide);
            let y = Math.floor(Math.random() * boardSide);
            if (newBoard[x][y] === ".") {
                newBoard[x][y] = "X";
                minesLocations.add(x * boardSide + y);
                newBoard = markNumbers(newBoard, x, y);
            }
        }
        setThreeBV(calculate3BV(newBoard));
        return newBoard;
    }

    const handleClick = (x: number, y: number) => {
        let newVisibleBoard = JSON.parse(JSON.stringify(visibleBoard));
        let currentBoard = JSON.parse(JSON.stringify(board));
        if (currentBoard[x][y] === "X" && clicks === 0) {
            alert("You clicked on a mine! Try again!");
            currentBoard = Array.from({length: boardSide}, e => Array(boardSide).fill("."));
            while(minesLocations.has(x * boardSide + y)){
                minesLocations.delete(x * boardSide + y);
                minesLocations.add(Math.floor(Math.random() * boardSide) * boardSide + Math.floor(Math.random() * boardSide));
            }
            minesLocations.forEach((mine: number) => {
                let x = Math.floor(mine / boardSide);
                let y = mine % boardSide;
                currentBoard[x][y] = "X";
                currentBoard = markNumbers(currentBoard, x, y);
            });
            setBoard(currentBoard);
        }
        if (currentBoard[x][y] === "X") {
                setGameState("lost");
                newVisibleBoard = currentBoard;
                newVisibleBoard.map((row: string[], i: number) => (
                    row.forEach((field, j) => {
                        if (field === ".") {
                            newVisibleBoard[i][j] = "/";
                        }
                    })
                ));
                setVisibleBoard(newVisibleBoard);
                return;
        } else if (currentBoard[x][y] !== ".") {
            newVisibleBoard[x][y] = currentBoard[x][y];
        } else {
            newVisibleBoard = revealEmptyFields(currentBoard, x, y, newVisibleBoard);
        }
        setVisibleBoard(newVisibleBoard);
        checkVictory(newVisibleBoard);
        setClicks(clicks + 1);
    }

    const revealEmptyFields = (board: string[][], x: number, y: number, visibleBoard: string[][], for3BV:boolean = false) => {
        let queue = [[x, y]];
        let used = new Set();
        while (queue.length > 0) {
            let [x, y] = queue.shift() as number[];
            if (used.has(x * boardSide + y)) {
                continue;
            }
            used.add(x * boardSide + y);
            if (visibleBoard[x][y] === ".") {
                if (for3BV) {
                    visibleBoard[x][y] = "/";
                } else {
                    visibleBoard[x][y] = board[x][y];
                }
                if (board[x][y] === ".") {
                    visibleBoard[x][y] = "/";
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (x + i >= 0 && x + i < boardSide && y + j >= 0 && y + j < boardSide) {
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
        let newVisibleBoard = visibleBoard;
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
            setGameState("victory");
            let newVisibleBoard = board;
            newVisibleBoard.map((row: string[], i: number) => (
                row.forEach((field, j) => {
                    if (field === ".") {
                        newVisibleBoard[i][j] = "/";
                    }
                })
            ));
            setVisibleBoard(newVisibleBoard);
        }
    }

    const checkVictoryMarked = (currentVisibleBoard: string[][]) => {
        let victory = true;
        let counter = 0;
        currentVisibleBoard.forEach((row: string[], i: number) => (
            row.forEach((field, j) => {
                if (field === "?") {
                    counter++;
                    if (!minesLocations.has(i * boardSide + j)) {
                        victory = false;
                    }
                }
            })
        ));
        if (counter !== initialMines) {
            victory = false;
        }
        if (victory) {
            setGameState("victory");
            let newVisibleBoard = board;
            newVisibleBoard.map((row: string[], i: number) => (
                row.forEach((field, j) => {
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
    }

    const calculate3BV = (board: string[][]) => {
        let counter = 0;
        let markedFields = Array.from({length: boardSide}, e => Array(boardSide).fill("."))
        board.forEach((row: string[], i: number) => (
            row.forEach((field, j) => {
                if (markedFields[i][j] !== ".") {
                    return;
                }
                if (board[i][j] === ".") {
                    counter++;
                    markedFields = revealEmptyFields(board, i, j, markedFields, true);
                }
            })));
        markedFields.forEach((row: string[], i: number) => (
            row.forEach((field, j) => {
                if (field === "." && board[i][j] !== "X") {
                    counter++;
                }
            })));
        return counter;
    }

    return (
        <div className="Game">
            <Display gameState={gameState} onClick={newGame} total={initialMines} remaining={remainingMines}
                    threeBV={threeBV} clicks={clicks}/>
            <Board gameState={gameState} click={handleClick} contextMenu={setMarked}
                   board={visibleBoard} boardSide={boardSide}/>
        </div>
    );
}

export default Game;