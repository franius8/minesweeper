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
    time: number
}

export default function Display(props: DisplayProps) {
    const navigate = useNavigate();
    const routeChange = () =>{
        navigate("/info");
    }
    const difficultyChange = () => {
        navigate("/");
    }

    if (props.gameState === "playing") {
        return (
            <div className="Display">
                <div className="Display-time">
                    <h2>Time</h2>
                    <p>{Math.floor(props.time / 60)}:{String(props.time % 60).padStart(2, "0")}</p>
                </div>
                <div className="Display-total">
                    <h2>Total mines:</h2>
                    <p>{props.total}</p>
                </div>
                <div className="Display-remaining">
                    <h2>Remaining mines:</h2>
                    <p>{String(props.remaining).padStart(2, "0")}</p>
                </div>
                <Button onClick={props.onClick} content={"New Game"}/>
                <Button onClick={difficultyChange} content={"Change difficulty"}/>
                <Button onClick={routeChange} content={"Info"}/>
            </div>
        );
    } else if (props.gameState === "victory") {
        return (
            <div className="Display-won">
                <h2 className={"endgame-heading won"}>You won!</h2>
                <div className={"Display-timeclickscontainer"}>
                    <div className="Display-time">
                        <h2>Time</h2>
                        <p>{props.time}</p>
                    </div>
                    <div className="Display-clicks">
                        <h2>Clicks:</h2>
                        <p>{props.clicks}</p>
                    </div>
                </div>
                <div className="Display-threebv">
                    <h2>Board's 3BV:</h2>
                    <p>{props.threeBV}</p>
                </div>
                <div className={"Display-efficiencycontainer"}>
                    <div className="Display-efficiency">
                        <h2>Efficiency:</h2>
                        <p>{Math.round(props.threeBV / props.clicks * 100)}%</p>
                    </div>
                    <div className="Display-threebvpersecond">
                        <h2>3BV/s:</h2>
                        <p>{(props.threeBV / props.time).toFixed(2)}</p>
                    </div>
                </div>
                <Button onClick={props.onClick} content={"New Game"}/>
                <Button onClick={difficultyChange} content={"Change difficulty"}/>
                <Button onClick={routeChange} content={"Info"}/>
            </div>
        );
    } else {
        return (
            <div className="Display-lost">
                <h2 className={"endgame-heading lost"}>You lost!</h2>
                <Button onClick={props.onClick} content={"New Game"}/>
                <Button onClick={difficultyChange} content={"Change difficulty"}/>
                <Button onClick={routeChange} content={"Info"}/>
            </div>
        );
    }
}