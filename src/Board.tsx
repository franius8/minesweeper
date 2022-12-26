import React from "react";
import "./Board.css";
import Field from "./Field";

export default function Board(props: { board: string[][] }) {
    return (
        <div className="Board">
            {props.board.map((row, i) => (
                row.map((field, j) => (
                    <Field content={field} key={i * j}/>
                ))
            ))}
        </div>
    );
}