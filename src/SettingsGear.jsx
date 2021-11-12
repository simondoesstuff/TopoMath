import React, {useEffect, useState} from "react";
import {Fit, Layout, useRive, useStateMachineInput} from "rive-react";
import SettingsDropdownMenu from "./SettingsDropdown";

export default function SettingsGear() {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <a
                // href="#!"
                className="settings-gear"
                onClick={ () => setOpen(!open) }
            >
                <GearIcon open={open}/>
            </a>

            <SettingsDropdownMenu open={open}/>
        </div>

    )
}

function GearIcon(props) {
    const {open} = props;

    const {rive, RiveComponent} = useRive({
        src: "./riveAssets/settings_gear_morph.riv",
        stateMachines: "State Machine",
        autoplay: true,
        layout: new Layout({
            fit: Fit.ScaleDown,
        })
    })

    const stateMachine = useStateMachineInput(rive, "State Machine", "open");

    useEffect(() => {
        if (stateMachine) {
            stateMachine.value = open;
        }
    })

    return (
        <RiveComponent/>
    )
}