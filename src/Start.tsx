import React from "react";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import Startbutton from "./Startbutton";
import "./Start.css";

export default function Start() {
    const navigate = useNavigate();
    const startGame = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
               navigate("/game-beginner");
                break;
            case "Intermediate":
                navigate("/game-intermediate");
                break;
            case "Expert":
                navigate("/game-expert");
                break;
        }
    }
    return (
        <div className={"Start"}>
            <Header />
            <div className={"main-container"}>
                <h2>Select difficulty level:</h2>
                <div className={"start-buttons"}>
                    <Startbutton difficulty={"Beginner"} boardSize={"9x9"} mineCount={10} onClick={startGame}/>
                    <Startbutton difficulty={"Intermediate"} boardSize={"16x16"} mineCount={40} onClick={startGame}/>
                    <Startbutton difficulty={"Expert"} boardSize={"16x30"} mineCount={99} onClick={startGame}/>
                </div>
            </div>
        </div>
    );
}