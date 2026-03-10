"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
}
