import React, {useEffect, useState} from "react";
import {Fit, Layout, useRive, useStateMachineInput} from "rive-react";
import SettingsDropdownMenu from "./SettingsDropdown";
import {motion} from "framer-motion";
import './settings-dropdown.sass' // styling


export default function SettingsGear() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <motion.button
                className='settings-gear'
                onClick={ () => setOpen(!open) }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <GearIcon open={open}/>
            </motion.button>

            <SettingsDropdownMenu open={open}/>
        </>
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