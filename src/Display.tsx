import React from "react";
import { useNavigate } from "react-router-dom";
import "./Display.css";
import Button from "./Button";

interface DisplayProps {
    total: number
    remaining: number
    onClick: () => void
    gameState: string
    clicks: number
    threeBV: number
}

export default function Display(props: DisplayProps) {
    const navigate = useNavigate();
    const routeChange = () =>{
        navigate("/info");
    }
    if (props.gameState === "playing") {
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
                <Button onClick={props.onClick} content={"New Game"}/>
                <Button onClick={routeChange} content={"Info"}/>
            </div>
        );
    } else if (props.gameState === "victory") {
        return (
            <div className="Display-won">
                <h2 className={"endgame-heading won"}>You won!</h2>
                <div className="Display-clicks">
                    <h2>Your clicks:</h2>
                    <p>{props.clicks}</p>
                </div>
                <div className="Display-threebv">
                    <h2>Board's 3BV:</h2>
                    <p>{props.threeBV}</p>
                </div>
                <div className="Display-efficiency">
                    <h2>Efficiency:</h2>
                    <p>{Math.round(props.threeBV / props.clicks * 100)}%</p>
                </div>
                <Button onClick={props.onClick} content={"New Game"}/>
                <Button onClick={routeChange} content={"Info"}/>
            </div>
        );
    } else {
        return (
            <div className="Display-lost">
                <h2 className={"endgame-heading lost"}>You lost!</h2>
                <Button onClick={props.onClick} content={"New Game"}/>
                <Button onClick={routeChange} content={"Info"}/>
            </div>
        );
    }
}