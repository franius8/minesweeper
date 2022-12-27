import React, {MouseEventHandler} from "react";
import "./Board.css";
import Field from "./Field";

interface BoardProps {
    board: string[][];
    click: (x: number, y: number) => void;
    contextMenu: (x: number, y: number) => void;
}

export default function Board(props: BoardProps) {
    return (
        <div className="Board">
            {props.board.map((row, i) => (
                row.map((field, j) => (
                    <Field content={field} click={props.click} contextMenu={props.contextMenu} x={i} y={j} key={i * 9 + j}/>
                ))
            ))}
        </div>
    );
}