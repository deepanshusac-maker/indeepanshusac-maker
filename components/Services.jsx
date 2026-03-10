"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";

const serviceData = [
    { slug: "skin-brightening", icon: "✨", title: "Skin Brightening & Glow", desc: "Advanced facial treatments, HydraFacials, and vitamin infusions for a luminous, even-toned complexion." },
    { slug: "acne-scar-treatment", icon: "🩹", title: "Acne & Scar Treatment", desc: "Targeted solutions including microneedling, fractional laser, and chemical peels for clear, smooth skin." },
    { slug: "laser-light-therapy", icon: "💡", title: "Laser & Light Therapy", desc: "State-of-the-art laser treatments for pigmentation, hair removal, tattoo removal, and skin rejuvenation." },
    { slug: "anti-aging-solutions", icon: "💉", title: "Anti-Aging Solutions", desc: "Dermal fillers, skin boosters, and collagen-stimulating treatments to restore youthful volume and firmness." },
    { slug: "chemical-peels", icon: "🧪", title: "Chemical Peels", desc: "Medical-grade peels customised for your skin type — from gentle glow peels to deep resurfacing treatments." },
    { slug: "hair-restoration", icon: "💆", title: "Hair Restoration", desc: "PRP therapy, mesotherapy, and advanced hair growth solutions to combat thinning and promote healthy hair." },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.12,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

export default function Services() {
    const { openBookingModal } = useBooking();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="services" className="relative py-24 md:py-32 px-6 md:px-16 lg:px-20 bg-cream">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="text-center mb-20 reveal-up">
                    <div className="text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold font-light flex items-center justify-center gap-3 mb-5 section-eyebrow">
                        Our Treatments
                    </div>
                    <h2 className="font-[var(--font-cormorant)] text-[clamp(2.2rem,4vw,3.4rem)] font-light leading-[1.15]">
                        Specialist <em className="italic text-rose-gold">Services</em>
                    </h2>
                </div>

                {/* Grid */}
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceData.map((s, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                        >
                            <Link
                                href={`/treatments/${s.slug}`}
                                className="block h-full service-card group relative bg-warm-white p-8 transition-all duration-500 hover:-translate-y-2 cursor-pointer rounded-sm overflow-hidden"
                            >
                                {/* Morphing background */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-gold/5 rounded-full transition-all duration-700 group-hover:scale-[3] group-hover:bg-rose-gold/8" />

                                {/* Icon */}
                                <div className="relative z-10 w-14 h-14 rounded-full bg-rose-gold/10 flex items-center justify-center text-xl mb-5 group-hover:scale-110 group-hover:bg-rose-gold/20 transition-all duration-500">
                                    {s.icon}
                                </div>

                                {/* Content */}
                                <h3 className="relative z-10 font-[var(--font-cormorant)] text-[1.3rem] font-light mb-3 text-charcoal group-hover:text-rose-gold transition-colors duration-400">
                                    {s.title}
                                </h3>
                                <p className="relative z-10 text-[0.82rem] text-mid/70 font-light leading-[1.8] mb-6">
                                    {s.desc}
                                </p>

                                <div className="relative z-10 flex items-center justify-between mt-auto pt-6 border-t border-charcoal/5 group-hover:border-rose-gold/20 transition-colors">
                                    <div className="text-[0.65rem] tracking-[0.22em] uppercase text-mid/60 group-hover:text-rose-gold transition-colors">
                                        View Details →
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            openBookingModal(s.title);
                                        }}
                                        className="bg-charcoal text-white text-[0.6rem] tracking-[0.2em] uppercase py-2 px-5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-rose-gold cursor-pointer"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                {/* Bottom line */}
                                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-rose-gold to-rose-gold/40 group-hover:w-full transition-all duration-700" />

                                {/* Hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(200,149,108,0.08)]" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
