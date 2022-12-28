import React, { useEffect, useState } from 'react';
import "./Game.css";
import Board from "./Board";
import Display from "./Display";

interface GameProps {
    difficulty: string;
    increment: () => void;
}

function Game(props: GameProps) {
    let mines: number, rows: number, columns: number

    switch (props.difficulty) {
        case "Beginner":
            mines = 10;
            rows = 9;
            columns = 9;
            break;
        case "Intermediate":
            mines = 40;
            rows = 16;
            columns = 16;
            break;
        case "Expert":
            mines = 95;
            rows = 16;
            columns = 30;
            break;
        default:
            mines = 10;
            rows = 9;
            columns = 9;
            break;
    }

    const [boardSide] = useState(rows);
    const [boardColumns] = useState(columns);
    const [board, setBoard] = useState(Array.from({length: boardSide}, e => Array(columns).fill(".")));
    const [visibleBoard, setVisibleBoard] = useState(Array.from({length: boardSide}, e => Array(columns).fill(".")));
    const [minesLocations] = useState(new Set<number>());
    const [initialMines] = useState(mines);
    const [remainingMines, setRemainingMines] = useState(initialMines);
    const [gameState, setGameState] = useState("playing");
    const [clicks, setClicks] = useState(0);
    const [threeBV, setThreeBV] = useState(0);
    const [time, setTime] = useState(0);

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
                if(x + i >= 0 && x + i < boardSide && y + j >= 0 && y + j < boardColumns){
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

    useEffect(() => {
        if (gameState === "playing") {
            const interval = setInterval(() => {
                setTime(time + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameState, time]);

    const prepareBoard = (board: string[][]) => {
        let newBoard = board;
        if (props.difficulty !== "Expert") {
            while (minesLocations.size < remainingMines) {
                let x = Math.floor(Math.random() * boardSide);
                let y = Math.floor(Math.random() * boardColumns);
                if (newBoard[x][y] !== "X") {
                    newBoard[x][y] = "X";
                    minesLocations.add(x * boardColumns + y);
                    newBoard = markNumbers(newBoard, x, y);
                }
            }
        } else {
            while (minesLocations.size < remainingMines) {
                let x = Math.floor(Math.random() * boardSide);
                let y = Math.floor(Math.random() * boardColumns);
                if (newBoard[x][y] !== "X") {
                    newBoard[x][y] = "X";
                    minesLocations.add(x * boardColumns + y);
                    newBoard = markNumbers(newBoard, x, y);
                    /*if (Math.random() > 0.5 && minesLocations.size < remainingMines - 1) {
                        console.log("double");
                        let newMine = Math.floor(Math.random() * 8);
                        let xOffset = Math.floor(newMine / 3) - 1;
                        let yOffset = newMine % 3 - 1;
                        if (xOffset === 0 && yOffset === 0) {
                            Math.random() > 0.5 ? yOffset = 1 : yOffset = -1;
                        }
                        if (x + xOffset >= 0 && x + xOffset < boardSide &&
                            y + yOffset >= 0 && y + yOffset < boardColumns &&
                            newBoard[x + xOffset][y + yOffset] !== "X") {
                            newBoard[x + xOffset][y + yOffset] = "X";
                            minesLocations.add((x + xOffset) * boardColumns + y + yOffset);
                            newBoard = markNumbers(newBoard, x + xOffset, y + yOffset);
                        }
                    }*/

                }
            }
        }

        setThreeBV(calculate3BV(newBoard));
        return newBoard;
    }

    //function to handle click on field
    const handleClick = (x: number, y: number) => {
        let newVisibleBoard = JSON.parse(JSON.stringify(visibleBoard));
        let currentBoard = JSON.parse(JSON.stringify(board));
        // path if the first field clicked is a mine
        if (currentBoard[x][y] === "X" && clicks === 0) {
            currentBoard = Array.from({length: boardSide}, e => Array(boardColumns).fill("."));
            while(minesLocations.has(x * boardColumns + y)){
                minesLocations.delete(x * boardColumns + y);
                minesLocations.add(Math.floor(Math.random() * boardSide) * boardColumns + Math.floor(Math.random() * boardColumns));
            }
            minesLocations.forEach((mine: number) => {
                let x = Math.floor(mine / boardColumns);
                let y = mine % boardSide;
                currentBoard[x][y] = "X";
                currentBoard = markNumbers(currentBoard, x, y);
            });
            setBoard(currentBoard);
        }
        if (currentBoard[x][y] === newVisibleBoard[x][y] && currentBoard[x][y].match(/[1-8]/)) {
            let counter = 0;
            for(let i = -1; i <= 1; i++){
                for(let j = -1; j <= 1; j++){
                    if(x + i >= 0 && x + i < boardSide && y + j >= 0 && y + j < boardColumns){
                        if(newVisibleBoard[x + i][y + j] === "?"){
                            counter++;
                        }
                    }
                }
            }
            if (counter === parseInt(currentBoard[x][y])) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (x + i >= 0 && x + i < boardSide && y + j >= 0 && y + j < boardColumns) {
                            if (newVisibleBoard[x + i][y + j] !== "?") {
                                if (currentBoard[x + i][y + j] === "X") {
                                    setGameState("lost");
                                    setVisibleBoard(revealAfterLoss(currentBoard));
                                    return;
                                } else if (newVisibleBoard[x + i][y + j] === ".") {
                                    newVisibleBoard = revealEmptyFields(currentBoard, x + i, y + j, newVisibleBoard);
                                }
                            }
                        }
                    }
                }
            }
        } else if (currentBoard[x][y] === "X") {
                setGameState("lost");
                setVisibleBoard(revealAfterLoss(currentBoard));
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

    const revealAfterLoss = (board: string[][]) => {
        let newVisibleBoard = board;
        newVisibleBoard.map((row: string[], i: number) => (
            row.forEach((field, j) => {
                if (field === ".") {
                    newVisibleBoard[i][j] = "/";
                }
            }
        )));
        return newVisibleBoard;
    }

    const revealEmptyFields = (board: string[][], x: number, y: number, visibleBoard: string[][], for3BV:boolean = false) => {
        let queue = [[x, y]];
        let used = new Set();
        while (queue.length > 0) {
            let [x, y] = queue.shift() as number[];
            if (used.has(x * boardColumns + y)) {
                continue;
            }
            used.add(x * boardColumns + y);
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
                            if (x + i >= 0 && x + i < boardSide && y + j >= 0 && y + j < boardColumns) {
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
                    if (!minesLocations.has(i * boardColumns + j)) {
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
        let markedFields = Array.from({length: boardSide}, e => Array(boardColumns).fill("."))
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
                    threeBV={threeBV} clicks={clicks} time={time}/>
            <Board gameState={gameState} click={handleClick} contextMenu={setMarked}
                   board={visibleBoard} boardSide={boardSide} boardColumns={boardColumns} difficulty={props.difficulty}/>
        </div>
    );
}

export default Game;