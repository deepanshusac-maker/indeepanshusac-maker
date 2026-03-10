"use client";

import { motion } from "framer-motion";

export default function Marquee() {
    const items = [
        "Advanced Skin Treatments", "Laser Therapy", "Chemical Peels",
        "Anti-Aging Solutions", "Acne & Scar Treatment", "Skin Brightening",
        "Hair Restoration", "IV Wellness Drips",
    ];
    // Double the items so it can loop seamlessly
    const doubled = [...items, ...items];

    return (
        <div className="overflow-hidden border-y border-line py-3 bg-warm-white">
            <motion.div
                className="flex gap-12 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity
                }}
            >
                {doubled.map((item, i) => (
                    <div
                        key={i}
                        className="font-[var(--font-cormorant)] text-[0.9rem] italic text-mid whitespace-nowrap flex items-center gap-5 hover:text-rose-gold transition-colors"
                    >
                        <motion.span
                            className="w-1 h-1 rounded-full bg-rose-gold shrink-0"
                            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                        />
                        {item}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
