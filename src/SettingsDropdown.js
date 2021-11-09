import {CSSTransition} from "react-transition-group";
import React, {useEffect} from "react";
import Grapick from "grapick/src/Grapick";


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
                <DropdownItem text="Hello"/>
                <DropdownItem text="There"/>
                <DropdownItem text="How"/>
                <DropdownItem text="Are"/>
                <DropdownItem text="You"/>
                <DropdownItem text="Doing"/>
                <DropdownItem text="Today,"/>
                <DropdownItem text="Brendan?"/>
                <SpecialDropdownItem/>
            </div>
        </CSSTransition>
    )
}

// todo WIP
function SpecialDropdownItem() {
    const el = React.createRef();

    useEffect(() => {
        if (!el.current) return;

        const gp = new Grapick({el: el.current});
        gp.addHandler(0, 'red');
        gp.addHandler(100, 'blue');
    }, [])

    return (
        <div ref={el}>
            Hello America
        </div>
    )
}

function DropdownItem(props) {
    return (
        <div className="dropdown-menu-item">
            { props.text }
            <br/>
        </div>
    )
}