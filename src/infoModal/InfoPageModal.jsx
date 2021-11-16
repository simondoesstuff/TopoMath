import {motion} from "framer-motion";
import Backdrop from "./Backdrop";
import './info-modal.sass'


export default function InfoPageModal({onClose, children}) {
    const dropIn = {
        hidden: {
            y: '-100vh',
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 19,
                stiffness: 400
            }
        },
        exit: {
            y: '100vh',
            opacity: 0,
            transition: {
                ease: 'easeIn',
                duration: .5
            }
        }
    }

    return (
        <Backdrop onClick={onClose}>
            <motion.div
                className="infoPage-modal"
                onClick={(e) => e.stopPropagation()}

                variants={dropIn}
                initial="hidden"
                animate="animate"
                exit="exit"
            >
                {children}
                <motion.button
                    className="infoPage-closeModalButton"
                    onClick={onClose}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    CLOSE
                </motion.button>
            </motion.div>
        </Backdrop>
    )
}