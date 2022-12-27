import React from "react";
import "./Display.css";

interface DisplayProps {
    total: number
    remaining: number
}
export default function Display(props: DisplayProps) {
    return (
        <div className="Display">
            <div className="Display-total">
                <h2>Total mines:</h2>
                <p>{props.total}</p>
            </div>
            <div className="Display-remaining">
                <h2>Remaining mines:</h2>
                <p>{String(props.remaining).padStart(2, "0")}</p>
            </div>
        </div>
    );
}