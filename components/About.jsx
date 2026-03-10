"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

export default function About() {
    const { openBookingModal } = useBooking();
    const containerRef = useRef(null);
    const textRef = useRef(null);

    const inView = useInView(textRef, { once: true, margin: "-100px" });

    // Parallax effect for the image
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section id="about" ref={containerRef} className="relative py-24 md:py-32 px-8 md:px-16 max-w-[1400px] mx-auto overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                {/* Left: Image with Parallax */}
                <div className="w-full lg:w-1/2 relative">
                    <motion.div
                        className="relative aspect-[4/5] max-w-md mx-auto z-10"
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {/* Accent frame behind image */}
                        <div className="absolute -inset-4 md:-inset-6 border border-rose-gold/30 translate-x-4 translate-y-4 -z-10 rounded-sm" />

                        <div className="relative w-full h-full overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(42,35,32,0.15)] group">
                            <motion.div style={{ y, width: '100%', height: '120%' }} className="relative -top-[10%]">
                                <Image
                                    src="/images/doctor-portrait.png"
                                    alt="Dr. Gazaelle"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                />
                            </motion.div>

                            {/* Image overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-60 mix-blend-multiply pointer-events-none" />
                        </div>

                        {/* Pill badge overlapping image */}
                        <motion.div
                            className="absolute -bottom-6 -left-4 md:-left-8 bg-white border border-line py-3 px-6 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-4 z-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="w-10 h-10 rounded-full bg-rose-gold/10 flex items-center justify-center text-rose-gold text-xl">
                                ✦
                            </div>
                            <div className="flex flex-col">
                                <span className="font-[var(--font-cormorant)] text-[1.4rem] leading-none text-charcoal">10+ Years</span>
                                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-mid/70 mt-1">Experience</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right: Content */}
                <div ref={textRef} className="w-full lg:w-1/2">
                    {/* Eyebrow */}
                    <motion.div
                        className="text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold font-light flex items-center gap-3 mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.span
                            className="h-px bg-rose-gold block"
                            initial={{ width: 0 }}
                            animate={inView ? { width: 36 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        />
                        Meet the Expert
                    </motion.div>

                    <motion.h2
                        className="font-[var(--font-cormorant)] text-[clamp(2.4rem,4vw,3.8rem)] font-light leading-[1.1] text-charcoal mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        Elevating Your Natural <em className="italic text-rose-gold">Beauty</em>
                    </motion.h2>

                    <motion.div
                        className="space-y-6 text-[0.95rem] font-light leading-[1.9] text-mid/80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <p>
                            Dr. Gazaelle is a leading aesthetic physician and dermatologist based in Moradabad,
                            dedicated to providing state-of-the-art skincare and aesthetic treatments. With over
                            a decade of clinical excellence, she blends medical expertise with an artistic eye.
                        </p>
                        <p>
                            Every face tells a unique story. Our philosophy is not to change how you look, but to
                            enhance your features, restore skin health deeply, and bring forth a glowing confidence
                            that radiates from within.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <h4 className="font-[var(--font-cormorant)] text-[1.4rem] italic text-rose-gold mb-2">Qualifications</h4>
                        <ul className="text-[0.85rem] font-light text-mid space-y-2 relative pl-6">
                            {[
                                "MD in Dermatology, Venereology & Leprosy",
                                "Fellowship in Aesthetic Medicine (FAM)",
                                "Member of Indian Association of Dermatologists",
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    className="relative before:content-[''] before:absolute before:left-[-24px] before:top-[8px] before:w-[4px] before:h-[4px] before:rounded-full before:bg-rose-gold"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Signature & CTA */}
                    <div className="mt-12 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 1, duration: 1 }}
                        >
                            <div className="font-[var(--font-cormorant)] text-4xl italic text-mid/30 transform -rotate-2 origin-left blur-[0.3px]">
                                Dr. Gazaelle
                            </div>
                        </motion.div>

                        <motion.button
                            onClick={() => openBookingModal()}
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="bg-rose-gold text-white text-[0.7rem] tracking-[0.2em] uppercase py-4 px-10 rounded-full hover:bg-rose-deep transition-all shadow-lg hover:shadow-rose-gold/20 cursor-pointer"
                        >
                            Book a Consultation
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
