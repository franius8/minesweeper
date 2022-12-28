import React from "react";
import { useNavigate} from "react-router-dom";
import './Info.css';
import "./Header.css";
import Button from "./Button";
import Header from "./Header";

export default function Info() {
    const navigate = useNavigate();
    const routeChange = () =>{
        navigate(-1);
    }
    return (
        <div className={"Info"}>
        <Header />
            <h2>What is Minesweeper?</h2>
            <p className={"info"}>Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular
                board containing hidden "mines" or bombs without detonating any of them, with help from clues about
                the number of neighboring mines in each field.</p>
            <h2>How to play?</h2>
            <p className={"info"}>The game consists of a grid of squares. Some squares contain mines (bombs), others don't. If you
                click on a square containing a bomb, you lose. If you manage to click all the squares (without clicking on any bombs)
                you win.</p>
            <h2>Attributions</h2>
            <p className={"info"}>Font<br/> <span className={"minesweeper"}>MINESWEEPER</span><br/> by Gangetsha Lyx is
                licensed under and used in accordance with a Creative Commons Attribution Share Alike
                license (http://creativecommons.org/licenses/by-sa/3.0/)</p>
            <Button onClick={routeChange} content={"Back"}/>
        </div>
    );
}