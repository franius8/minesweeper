import React, {MouseEventHandler} from "react";
import "./Board.css";
import Field from "./Field";

interface BoardProps {
    gameState: string;
    board: string[][];
    click: (x: number, y: number) => void;
    contextMenu: (x: number, y: number) => void;
    boardSide: number;
}

export default function Board(props: BoardProps) {
    const style = {
        gridTemplateColumns: `repeat(${props.boardSide}, 1fr)`,
        gridTemplateRows: `repeat(${props.boardSide}, 1fr)`,
    }
    const className = props.gameState === "playing" ? "Board" : "Board-revealed";
    return (
        <div style={style} className={className}>
            {props.board.map((row, i) => (
                row.map((field, j) => (
                    <Field content={field}
                           click={props.click} contextMenu={props.contextMenu}
                           x={i} y={j} key={i * props.boardSide + j}/>
                ))
            ))}
        </div>
    );
}