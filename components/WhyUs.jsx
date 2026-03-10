"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { num: "10+", label: "Years Experience" },
    { num: "5k+", label: "Happy Patients" },
    { num: "15+", label: "Premium Services" },
    { num: "100%", label: "Safe Protocols" }
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export default function WhyUs() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative py-24 md:py-32 px-8 md:px-16 bg-gradient-to-br from-charcoal to-[#1f1a18] text-cream overflow-hidden">
            {/* Decorative large background text */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(15rem,30vw,25rem)] font-[var(--font-cormorant)] font-light italic text-white/[0.02] leading-none pointer-events-none select-none whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                Excellence
            </motion.div>

            <div className="relative z-10 max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">

                    {/* Left Text */}
                    <div className="w-full md:w-[45%]">
                        <motion.div
                            className="text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold font-light flex items-center gap-3 mb-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.span
                                className="w-12 h-px bg-rose-gold block"
                                initial={{ width: 0 }}
                                animate={inView ? { width: 48 } : {}}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            />
                            Why Choose Us
                        </motion.div>

                        <motion.h2
                            className="font-[var(--font-cormorant)] text-[clamp(2.4rem,4vw,3.8rem)] font-light leading-[1.1] mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            The Standard of <br />
                            <em className="italic text-rose-gold">Care You Deserve</em>
                        </motion.h2>

                        <motion.p
                            className="text-[0.95rem] font-light leading-[1.9] text-cream/60 max-w-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            We combine advanced medical technology with a patient-first approach.
                            Every treatment plan is bespoke, ensuring safe, effective, and natural-looking
                            results in an environment of absolute comfort and privacy.
                        </motion.p>
                    </div>

                    {/* Right Stats Grid */}
                    <motion.div
                        ref={ref}
                        className="w-full md:w-[55%] grid grid-cols-2 gap-px bg-white/10 p-px rounded-sm"
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                className="group relative bg-[#241e1b] hover:bg-[#2a2320] transition-colors duration-500 p-10 flex flex-col justify-center items-center text-center overflow-hidden"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, zIndex: 10, backgroundColor: "#2d2522" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Accent glow line inside box */}
                                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-gold to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0" />

                                <div className="font-[var(--font-cormorant)] text-[2.8rem] font-light text-cream mb-2 group-hover:text-rose-gold transition-colors duration-400">
                                    {s.num}
                                </div>
                                <div className="text-[0.65rem] tracking-[0.2em] uppercase text-cream/40 group-hover:text-cream/70 transition-colors duration-400">
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
