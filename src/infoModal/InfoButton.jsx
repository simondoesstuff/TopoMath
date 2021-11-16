import {ReactComponent as Icon} from "../svgFiles/info-button.svg";
import {motion, AnimatePresence} from "framer-motion";
import './info-modal.sass'
import {useState} from "react";
import InfoPageModal from "./InfoPageModal";

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
                {open && <InfoPageModal onClose={() => setOpen(false)}>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                    Hello there! What are you doing?! <br/>
                </InfoPageModal>
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