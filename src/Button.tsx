import React from "react";
import './Button.css';

interface ButtonProps {
    onClick: () => void;
    content: string;
}
export default function Button(props: ButtonProps) {
    return <button onClick={props.onClick} className={"Button"}>{props.content}</button>;
}