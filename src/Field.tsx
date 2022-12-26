import React, {MouseEventHandler} from "react";
import "./Field.css";

interface FieldProps {
    content: string;
    x: number;
    y: number;
    click: (x: number, y: number) => void;
}
export default function Field(props: FieldProps) {
    const inner = props.content === "." ? "" : props.content;
    const className = props.content === "." ? "Field" : "Field-revealed";
    let innerColor
    switch (props.content) {
        case "1":
            innerColor = "blue";
            break;
        case "2":
            innerColor = "green";
            break;
        case "3":
            innerColor = "red";
            break;
        case "4":
            innerColor = "purple";
            break;
        case "5":
            innerColor = "maroon";
            break;
        case "6":
            innerColor = "turquoise";
            break;
        case "7":
            innerColor = "black";
            break;
        case "8":
            innerColor = "gray";
            break;
        default:
            innerColor = "black";
    }
    const fieldStyle = {
        color: innerColor
    }
    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
        props.click(props.x, props.y);
    }
    return (
        <div onClick={handleClick} className={className} style={fieldStyle}>
            {inner}
        </div>
    );
}