import React from "react";
import { useNavigate} from "react-router-dom";
import './Info.css';
import "./Header.css";
import Button from "./Button";
import Header from "./Header";

export default function Info() {
    const navigate = useNavigate();
    const routeChange = () =>{
        navigate("/");
    }
    return (
        <div className={"Info"}>
        <Header />
            <h2>Attributions</h2>
            <p className={"info"}>Font<br/> <span className={"minesweeper"}>MINESWEEPER</span><br/> by Gangetsha Lyx is
                licensed under and used in accordance with a Creative Commons Attribution Share Alike
                license (http://creativecommons.org/licenses/by-sa/3.0/)</p>
            <Button onClick={routeChange} content={"Back"}/>
        </div>
    );
}