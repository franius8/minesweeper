import React, {MouseEventHandler} from "react";
import "./Board.css";
import Field from "./Field";

export default function Board(props: { board: string[][], click: (x: number, y: number) => void }) {
    return (
        <div className="Board">
            {props.board.map((row, i) => (
                row.map((field, j) => (
                    <Field content={field} click={props.click} x={i} y={j} key={i * 9 + j}/>
                ))
            ))}
        </div>
    );
}