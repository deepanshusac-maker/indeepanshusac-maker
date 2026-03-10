"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
    {
        q: "What treatments do you offer?",
        a: "We offer a comprehensive range of aesthetic and dermatological treatments including skin brightening, acne & scar treatment, laser therapy, chemical peels, anti-aging solutions (fillers & boosters), hair restoration (PRP therapy), and custom IV wellness drips.",
    },
    {
        q: "Is there a consultation fee?",
        a: "Yes, there is a nominal consultation fee for your first visit. This allows Dr. Gazaelle to thoroughly assess your skin and recommend the most effective treatment plan. The fee is often adjusted against your first treatment.",
    },
    {
        q: "How do I book an appointment?",
        a: "You can book through our website by filling out the contact form, calling us directly at 099279 65666, or messaging us on WhatsApp. We'll confirm your appointment within a few hours.",
    },
    {
        q: "Are the treatments painful?",
        a: "Most of our treatments involve minimal to no discomfort. For procedures like laser therapy or chemical peels, we apply topical numbing cream beforehand. Dr. Gazaelle always explains the process and ensures your comfort throughout.",
    },
    {
        q: "How many sessions are typically needed?",
        a: "This varies by treatment and individual skin condition. For example, acne scar treatment may need 4–8 sessions, while skin brightening can show results in 3–6 sessions. Dr. Gazaelle will provide a tailored plan during your consultation.",
    },
    {
        q: "What are the clinic hours?",
        a: "We are open Monday through Saturday until 6:00 PM. Sunday appointments are available by special request. We recommend calling ahead to book a convenient time slot.",
    },
];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function FAQ() {
    const [open, setOpen] = useState(null);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    function toggle(idx) {
        setOpen(open === idx ? null : idx);
    }

    return (
        <section id="faq" ref={ref} className="py-32 px-8 md:px-16 bg-warm-white">
            <div className="max-w-[800px] mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div className="text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold font-light flex items-center justify-center gap-3 mb-5 section-eyebrow">
                        Common Questions
                    </div>
                    <h2 className="font-[var(--font-cormorant)] text-[clamp(2.2rem,4vw,3.4rem)] font-light leading-[1.15]">
                        Frequently <em className="italic text-rose-gold">Asked</em>
                    </h2>
                </motion.div>

                {/* Accordion */}
                <motion.div
                    className="space-y-3"
                    variants={container}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            className="border border-line rounded-sm overflow-hidden bg-cream transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(42,35,32,0.05)]"
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
                            >
                                <span className="font-[var(--font-cormorant)] text-[1.15rem] text-charcoal group-hover:text-rose-gold transition-colors pr-4">
                                    {faq.q}
                                </span>
                                <span
                                    className={`w-8 h-8 rounded-full border border-line flex items-center justify-center shrink-0 transition-all duration-300 ${open === i ? "bg-rose-gold border-rose-gold rotate-45" : "group-hover:border-rose-gold"
                                        }`}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        className={`transition-colors ${open === i ? "stroke-white" : "stroke-mid group-hover:stroke-rose-gold"}`}
                                    >
                                        <path d="M7 2v10M2 7h10" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </button>

                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-6 text-[0.88rem] text-mid font-light leading-[1.9]">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <p className="text-[0.85rem] text-mid font-light mb-4">
                        Still have questions?
                    </p>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://wa.me/919927965666?text=Hi%20Dr.%20Gazaelle%2C%20I%20have%20a%20question%20about%20your%20treatments."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase text-rose-gold border border-rose-gold rounded-full py-3 px-7 hover:bg-rose-gold hover:text-white transition-colors duration-400"
                    >
                        Ask on WhatsApp →
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
