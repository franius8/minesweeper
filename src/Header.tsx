import React from "react";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const routeChange = () =>{
        navigate("/");
    }
    return (
        <div className={"Header"}>
            <h1 onClick={routeChange}>MINESWEEPER</h1>
        </div>
    );
}