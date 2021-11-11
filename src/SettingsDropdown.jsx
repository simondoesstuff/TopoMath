import {CSSTransition} from "react-transition-group";
import React, {useRef} from "react";
import GrapickBar from "./GrapickBar";


// todo placeholder items
// todo make slightly overlap settings gear?
export default function DropdownMenu(props) {
    const {open} = props;

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
                <MenuItems/>
            </div>
        </CSSTransition>
    )
}

function MenuItems() {
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
        <div className="grapick-bar">
            <GrapickBar
                grapickRef={grapickRef}
                defaultHandlers={defaultGPHandlers}
            />
        </div>
    );
}