import React from "react";

export default function Field(props: { content: string }) {
    return (
        <div className="Field">
            {props.content}
        </div>
    );
}