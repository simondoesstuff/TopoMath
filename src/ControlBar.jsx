import React, {useState} from "react";
import {EditableMathField} from "react-mathquill";
import SettingsGear from "./SettingsGear";

// todo stretchable?

export default function ControlBar() {
    const defaultHeight = 100;
    const [height, setHeight] = useState();

    function onResize(mouseEvent, dir, el, delta) {
        setHeight(el.offsetHeight)
    }

    const bar = (
        <nav
            className="control-bar"
            style={{
                height: height
            }}>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0
                }}>
                <SettingsGear/>
            </div>

            <EditableMQField
                fontSize={20}
            />
        </nav>
    )

    return bar

    // return (
    //     <Resizable
    //     onResize={onResize}
    //     size={{
    //         height: height
    //     }}>
    //         {bar}
    //     </Resizable>
    // )
}

function EditableMQField(props) {
    const {fontSize} = props;
    const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2^2')

    return (
        <div style={{
            fontSize: fontSize
        }}>
            <EditableMathField
                latex={latex}
                onChange={(mathField) => {
                    setLatex(mathField.latex())
                }}
            />
        </div>
    )
}