import {ReactComponent as Icon} from "../svgFiles/info-button.svg";
import { motion } from "framer-motion";
import './info-modal.sass'

export default function InfoButton() {
    return (
        <motion.button
            className="info-button"
            onClick={() => console.log('do a barrel roll!')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Icon/>
        </motion.button>
    )
}