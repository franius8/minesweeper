import React, {MouseEventHandler, useEffect} from "react";
import "./Field.css";

interface FieldProps {
    content: string;
    x: number;
    y: number;
    click: (x: number, y: number) => void;
    contextMenu: (x: number, y: number) => void;
}
export default function Field(props: FieldProps) {

    const [marked, setMarked] = React.useState(false);

    useEffect(() => {
        setMarked(props.content === "?");
    }, [props.content]);

    const inner = (props.content === "." || props.content === "/" || props.content === "?") ? "" : props.content;
    let className: string;
    switch (props.content) {
        case "X":
            className = " Field-mine";
            break;
        case ".":
            className = " Field";
            break;
        case "?":
            className = " Field-marked";
            break;
        default:
            className = " Field-revealed"
        }
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

    const handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        props.contextMenu(props.x, props.y);
    }
    if (props.content === "X") {
        return (
            <div className={"Field-mine"} onClick={handleClick} onContextMenu={handleContextMenu}>
                <img src={"./icons/bomb.svg"} alt={"X"}/>
            </div>
        );
    } else {
        return (
            <div className={className} onClick={handleClick} onContextMenu={handleContextMenu} style={fieldStyle}>
                {inner}
            </div>
        );
    }
}