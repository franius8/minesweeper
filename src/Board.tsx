import React, {MouseEventHandler} from "react";
import "./Board.css";
import Field from "./Field";

interface BoardProps {
    gameState: string;
    board: string[][];
    click: (x: number, y: number) => void;
    contextMenu: (x: number, y: number) => void;
    boardSide: number;
    difficulty: string;
    boardColumns: number;
}

export default function Board(props: BoardProps) {
    const style = {
        gridTemplateColumns: `repeat(${props.boardColumns}, 1fr)`,
        gridTemplateRows: `repeat(${props.boardSide}, 1fr)`,
    }
    let className
    switch (props.difficulty) {
        case "Beginner":
            className = "Board Board-beginner";
            break;
        case "Intermediate":
            className = "Board Board-intermediate";
            break;
        case "Expert":
            className = "Board Board-expert";
            break;
        default:
            className = "Board Board-beginner";
            break;
    }
    className += props.gameState === "playing" ? "" : " Board-revealed";
    return (
        <div style={style} className={className}>
            {props.board.map((row, i) => (
                row.map((field, j) => (
                    <Field content={field}
                           click={props.click} contextMenu={props.contextMenu}
                           x={i} y={j} key={i * props.boardColumns + j}/>
                ))
            ))}
        </div>
    );
}