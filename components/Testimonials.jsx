"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reviews = [
    {
        name: "Priya Sharma",
        rating: 5,
        text: "Dr. Gazaelle completely transformed my skin. After years of struggling with acne scars, the laser treatment gave me clear, glowing skin. The clinic is so clean and professional!",
        treatment: "Acne & Scar Treatment",
        ago: "2 weeks ago",
    },
    {
        name: "Ankit Verma",
        rating: 5,
        text: "Amazing results with the PRP hair therapy! After just 4 sessions, I can see significant new growth. Dr. Gazaelle explained the entire process and made me feel comfortable.",
        treatment: "Hair Restoration",
        ago: "1 month ago",
    },
    {
        name: "Meera Gupta",
        rating: 5,
        text: "The skin brightening treatment was worth every penny. My skin feels so fresh and radiant. The staff is very friendly and the ambiance of the clinic is truly premium.",
        treatment: "Skin Brightening",
        ago: "3 weeks ago",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 5 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export default function Testimonials() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section className="relative py-24 md:py-32 px-6 md:px-16 lg:px-20 bg-charcoal overflow-hidden group">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="text-center mb-20 reveal-up">
                    <div className="text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold font-light flex items-center justify-center gap-3 mb-5 section-eyebrow">
                        Patient Reviews
                    </div>
                    <h2 className="font-[var(--font-cormorant)] text-[clamp(2.2rem,4vw,3.4rem)] font-light leading-[1.15]">
                        What Our Patients <em className="italic text-rose-gold">Say</em>
                    </h2>
                </div>

                {/* Cards */}
                <motion.div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-3 gap-7"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {reviews.map((r, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            className="review-card group relative bg-warm-white p-8 rounded-sm transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Gradient border glow on hover */}
                            <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-rose-gold/20 via-transparent to-rose-gold/10 -z-10 blur-sm scale-[1.02]" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: r.rating }).map((_, j) => (
                                    <motion.span
                                        key={j}
                                        className="text-rose-gold text-sm"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: i * 0.15 + j * 0.08 + 0.3, duration: 0.3, type: "spring" }}
                                    >
                                        ★
                                    </motion.span>
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-[0.88rem] text-mid/70 font-light leading-[1.85] mb-6">
                                &ldquo;{r.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-line">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold/30 to-rose-gold/10 flex items-center justify-center text-[0.75rem] font-medium text-rose-gold">
                                    {r.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <div className="text-[0.85rem] font-medium text-charcoal">{r.name}</div>
                                    <div className="text-[0.68rem] text-mid/50 font-light">{r.treatment} · {r.ago}</div>
                                </div>
                            </div>

                            {/* Google badge */}
                            <div className="absolute top-6 right-6 text-[0.6rem] tracking-wider uppercase text-mid/30 font-light">
                                Google Review
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Google Rating summary */}
                <motion.div
                    className="flex items-center justify-center gap-6 mt-16 pt-8 border-t border-line"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-rose-gold text-lg">★</span>
                        ))}
                    </div>
                    <span className="text-[0.85rem] text-mid font-light">
                        <strong className="text-charcoal">4.8</strong> out of 5 · Based on <strong className="text-charcoal">42+ Reviews</strong>
                    </span>
                    <a
                        href="https://www.google.com/search?q=dr+gazaelle+aesthetic+clinic+moradabad+reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.7rem] text-rose-gold tracking-wider uppercase hover:underline"
                    >
                        View on Google →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
