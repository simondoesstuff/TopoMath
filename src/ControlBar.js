import React, {useState} from "react";
import {EditableMathField} from "react-mathquill";
import SettingsGear from "./SettingsGear";

// todo stretchable?

export default function ControlBar() {
    return (
        <nav
            className="control-bar"
            style={{
                display: "flex",
                "justify-content": "space-between"
            }}
        >
            <div
                style={{
                    "align-self": "flex-start"
                }}
            >
                <SettingsGear/>
            </div>
            <div
                style={{
                    "align-self": "center"
                }}
            >
                <EditableMQField/>
            </div>
        </nav>
    )
}

function EditableMQField() {
    const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2')

    return (
        <EditableMathField
            latex={latex}
            onChange={(mathField) => {
                setLatex(mathField.latex())
            }}
        />
    )
}