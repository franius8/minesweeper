import React from "react";
import "./Field.css";


interface FieldProps {
    content: string;
    x: number;
    y: number;
}
export default function Field(props: FieldProps) {
    const inner = props.content === "." ? "" : props.content;
    return (
        <div className="Field">
            {inner}
        </div>
    );
}