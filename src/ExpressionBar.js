import React, {useState} from "react";
import {EditableMathField} from "react-mathquill";

// todo stretchable?

function ExpressionBar() {
    return (
        <nav className="expression-bar">
            <EditableMQField/>
        </nav>
    )
}

function EditableMQField() {
    const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2')

    return (
        <div>
            <EditableMathField
                latex={latex}
                onChange={(mathField) => {
                    setLatex(mathField.latex())
                }}
            />
        </div>
    )
}

export default ExpressionBar