import React, {MouseEventHandler} from "react";

interface StartbuttonProps {
    difficulty: string;
    onClick: (difficulty: string) => void;
    boardSize: string;
    mineCount: number;
}

export default function Startbutton(props: StartbuttonProps) {
    const clickHandler: MouseEventHandler = () => {
        props.onClick(props.difficulty);
    }

    return (
        <button onClick={clickHandler} className={"Start-button"}>
            <h3>{props.difficulty}</h3>
            <p>{props.boardSize} board</p>
            <p>{props.mineCount} mines</p>
        </button>
    )
}