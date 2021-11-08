import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";

function SettingsGear() {
    // todo placeholder icon

    const [open, setOpen] = useState(false)

    return (
        <div>
            <a
                href="#!"
                className="settings-gear"
                onClick={ () => setOpen(!open) }>
                ⚙
            </a>

            <DropdownMenu open={open}/>
        </div>

    )
}

// todo placeholder items
function DropdownMenu(props) {
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
            </div>
        </CSSTransition>
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

export default SettingsGear