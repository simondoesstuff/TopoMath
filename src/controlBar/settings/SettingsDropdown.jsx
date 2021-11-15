import {CSSTransition} from "react-transition-group";
import React, {useRef} from "react";
import GrapickBar from "reGrapick/ReGrapick";
import './settings-dropdown.sass' // styling


export default function DropdownMenu(props) {
    const {open} = props;

    const grapickRef = useRef();
    const defaultGPHandlers = [
        {
            position: 20,
            color: "cyan"
        },
        {
            position: 75,
            color: "black"
        },
        {
            position: 90,
            color: "gray"
        },
    ]

    return (
        <CSSTransition
            in={open}
            unmountOnExit
            timeout={500}
            classNames={{
                enter: "dropdown-shrink",
                enterActive: "dropdown-stretch",
                exitActive: "dropdown-shrink"
            }}
        >
            <div className="dropdown">
                <div className="grapick-bar">
                    <GrapickBar
                        grapickRef={grapickRef}
                        defaultHandlers={defaultGPHandlers}
                    />
                </div>
            </div>
        </CSSTransition>
    )
}