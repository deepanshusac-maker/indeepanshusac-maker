"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

export default function Hero() {
    const { openBookingModal } = useBooking();
    const [animate, setAnimate] = useState(false);
    const particlesRef = useRef(null);

    useEffect(() => {
        // Trigger reveal after a short delay relative to hydration
        const timer = setTimeout(() => {
            setAnimate(true);
        }, 1700); // Aligned with loader fade-out (1600ms)
        return () => clearTimeout(timer);
    }, []);

    // Helper to split text into spans with staggered delays
    const SplitText = ({ children, startIdx = 0 }) => {
        const text = children.toString();
        return text.split('').map((char, i) => (
            <span
                key={i}
                className="char"
                style={{ transitionDelay: `${(startIdx + i) * 0.035}s` }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    useEffect(() => {
        // Floating particles
        const container = particlesRef.current;
        if (!container) return;

        for (let i = 0; i < 20; i++) {
            const p = document.createElement("div");
            p.className = "particle";
            const left = Math.random() * 100;
            const size = 2 + Math.random() * 5;
            const dur = 6 + Math.random() * 14;
            const delay = Math.random() * 12;
            p.style.cssText = `left:${left}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;`;
            container.appendChild(p);
        }
    }, []);

    return (
        <section id="hero" className="relative min-h-screen overflow-hidden">
            {/* Full-bleed background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-fullbleed.png"
                    alt="Radiant skin care"
                    fill
                    priority
                    className="object-cover object-center scale-[1.05] animate-[hero-zoom_2s_0.4s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]"
                />
                {/* Gradient overlays for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
            </div>

            {/* Particles */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-[1] overflow-hidden" />

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-20 pt-20 md:pt-28 pb-16 max-w-4xl">
                {/* Eyebrow */}
                <div className="text-[0.65rem] md:text-[0.72rem] tracking-[0.3em] uppercase text-rose-gold/90 font-light flex items-center gap-3 mb-6 md:mb-8 opacity-0 animate-[fade-up_0.9s_1.4s_forwards]">
                    <span className="w-0 h-px bg-rose-gold block animate-[line-grow_0.6s_1.8s_forwards]" />
                    Aesthetic & Skin Clinic
                </div>

                {/* Title */}
                <h1
                    className={`char-reveal ${animate ? 'animate' : ''} font-[var(--font-cormorant)] text-[clamp(2.5rem,10vw,5.5rem)] font-light leading-[1.05] text-white overflow-hidden mb-8`}
                >
                    <SplitText>Complete Skin, Face</SplitText><br />
                    <SplitText startIdx={19}>& </SplitText>
                    <em className="italic text-rose-gold">
                        <SplitText startIdx={21}>Hair Care</SplitText>
                    </em>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-[clamp(0.85rem,2.5vw,0.95rem)] font-light leading-[1.8] md:leading-[1.9] text-white/70 max-w-md mb-10"
                >
                    At Dr. Gazaelle&apos;s Clinic, we specialize in acne care, glowing skin treatments,
                    hair restoration, and beauty enhancement procedures designed to bring out your natural confidence.
                </motion.p>

                {/* CTA Button — pill shape like reference */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <button
                        onClick={() => openBookingModal()}
                        className="group inline-flex items-center gap-3 bg-white text-charcoal py-4 px-8 rounded-full text-[0.82rem] font-medium tracking-wide hover:bg-rose-gold hover:text-white transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(200,149,108,0.3)] cursor-pointer"
                    >
                        Book An Appointment
                        <span className="w-9 h-9 rounded-full bg-charcoal text-white group-hover:bg-white group-hover:text-charcoal flex items-center justify-center transition-all duration-500">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </button>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex gap-6 md:gap-10 mt-14 pt-6 border-t border-white/15"
                >
                    {[
                        { num: "4.8", suffix: "★", label: "Google Rating" },
                        { num: "42", suffix: "+", label: "Reviews" },
                        { num: "15", suffix: "+", label: "Treatments" },
                    ].map((s, i) => (
                        <div key={i} className="relative">
                            <div
                                className="font-[var(--font-cormorant)] text-[2rem] md:text-[2.6rem] font-light text-white leading-none stat-counter"
                                data-count={s.num}
                                data-suffix={s.suffix}
                            >
                                0{s.suffix}
                            </div>
                            <div className="text-[0.6rem] md:text-[0.68rem] tracking-[0.15em] uppercase text-white/50 mt-1">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Floating badge */}
            <div className="absolute top-[15%] right-6 md:right-16 w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex flex-col items-center justify-center z-20 opacity-0 animate-[fade-in_1s_2.4s_forwards,badge-float_3s_ease-in-out_infinite] scale-90 md:scale-100">
                <span className="font-[var(--font-cormorant)] text-[1.8rem] md:text-[2.2rem] font-light text-white leading-none">
                    4.8
                </span>
                <span className="text-[0.5rem] md:text-[0.58rem] tracking-[0.15em] uppercase text-white/70 mt-0.5 text-center">
                    ⭐ Google<br />Rated
                </span>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-0 animate-[fade-in_1s_2.8s_forwards]">
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                    <div className="w-1 h-2.5 rounded-full bg-white/60 animate-[scroll-dot_2s_ease-in-out_infinite]" />
                </div>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="animate-bounce text-white/40">
                    <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </section>
    );
}
