import {ReactComponent as Icon} from "../svgFiles/info-button.svg";
import {motion, AnimatePresence} from "framer-motion";
import './info-modal.sass'
import {useState} from "react";
import InfoModalWindow from "./InfoModalWindow";
import InfoPageContents from "./InfoPageContents";

export default function InfoButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AnimatePresence
                // disable any initial animations on children
                // that are present when first rendered
                initial={false}
                // finish animating before unmount
                exitBeforeEnter={true}
            >
                {open && <InfoModalWindow onClose={() => setOpen(false)}>
                    <InfoPageContents/>
                </InfoModalWindow>
                }
            </AnimatePresence>

            <motion.button
                className="infoPage-button"
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                onClick={() => setOpen(!open)}
            >
                <Icon/>
            </motion.button>
        </>
    )
}