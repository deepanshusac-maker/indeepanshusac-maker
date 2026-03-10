"use client";

import { useState } from "react";
import Image from "next/image";

const cases = [
    {
        before: "/images/before-treatment.png",
        after: "/images/after-treatment.png",
        treatment: "Acne & Scar Treatment",
        duration: "8 weeks",
        sessions: "6 sessions",
    },
    {
        before: "/images/before-treatment.png",
        after: "/images/after-treatment.png",
        treatment: "Skin Brightening & Glow",
        duration: "12 weeks",
        sessions: "10 sessions",
    },
    {
        before: "/images/before-treatment.png",
        after: "/images/after-treatment.png",
        treatment: "Chemical Peel Series",
        duration: "6 weeks",
        sessions: "4 sessions",
    },
];

export default function BeforeAfter() {
    const [sliderPos, setSliderPos] = useState(Array(cases.length).fill(50));

    function handleMove(e, idx) {
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        setSliderPos((prev) => {
            const next = [...prev];
            next[idx] = x;
            return next;
        });
    }

    return (
        <section id="gallery" className="relative py-32 px-8 md:px-16 bg-warm-white">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="text-center mb-20 reveal-up">
                    <div className="text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold font-light flex items-center justify-center gap-3 mb-5 section-eyebrow">
                        Real Results
                    </div>
                    <h2 className="font-[var(--font-cormorant)] text-[clamp(2.2rem,4vw,3.4rem)] font-light leading-[1.15]">
                        Before & <em className="italic text-rose-gold">After</em>
                    </h2>
                    <p className="text-[0.85rem] text-mid font-light mt-4 max-w-md mx-auto leading-relaxed">
                        See the transformative results our patients have experienced across various treatments.
                    </p>
                </div>

                {/* Gallery grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cases.map((c, i) => (
                        <div key={i} className="reveal-scale" style={{ transitionDelay: `${i * 0.15}s` }}>
                            {/* Slider container */}
                            <div
                                className="relative aspect-[4/5] rounded overflow-hidden cursor-col-resize select-none group shadow-[0_8px_32px_rgba(42,35,32,0.08)]"
                                onMouseMove={(e) => handleMove(e, i)}
                                onTouchMove={(e) => handleMove(e, i)}
                            >
                                {/* After (full) */}
                                <Image
                                    src={c.after}
                                    alt={`After ${c.treatment}`}
                                    fill
                                    className="object-cover"
                                />

                                {/* Before (clipped) */}
                                <div
                                    className="absolute inset-0 overflow-hidden"
                                    style={{ width: `${sliderPos[i]}%` }}
                                >
                                    <Image
                                        src={c.before}
                                        alt={`Before ${c.treatment}`}
                                        fill
                                        className="object-cover"
                                        style={{ minWidth: `${(100 / sliderPos[i]) * 100}%`, maxWidth: `${(100 / sliderPos[i]) * 100}%` }}
                                    />
                                </div>

                                {/* Slider line */}
                                <div
                                    className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)] z-10"
                                    style={{ left: `${sliderPos[i]}%`, transform: "translateX(-50%)" }}
                                >
                                    {/* Handle */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M5 3L2 8l3 5M11 3l3 5-3 5" stroke="#c8956c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Labels */}
                                <span className="absolute top-4 left-4 text-[0.6rem] tracking-[0.2em] uppercase bg-charcoal/70 text-white py-1 px-3 rounded-full backdrop-blur-sm z-10">
                                    Before
                                </span>
                                <span className="absolute top-4 right-4 text-[0.6rem] tracking-[0.2em] uppercase bg-rose-gold/80 text-white py-1 px-3 rounded-full backdrop-blur-sm z-10">
                                    After
                                </span>
                            </div>

                            {/* Info */}
                            <div className="mt-4">
                                <h3 className="font-[var(--font-cormorant)] text-[1.2rem] text-charcoal font-light">
                                    {c.treatment}
                                </h3>
                                <div className="flex gap-4 mt-2">
                                    <span className="text-[0.7rem] text-mid font-light tracking-wide">
                                        ⏱ {c.duration}
                                    </span>
                                    <span className="text-[0.7rem] text-mid font-light tracking-wide">
                                        💆 {c.sessions}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Disclaimer */}
                <p className="text-center text-[0.7rem] text-mid/60 font-light mt-12 max-w-lg mx-auto">
                    * Individual results may vary. Images shown are representative and for illustrative purposes only.
                    Consult Dr. Gazaelle for a personalised treatment plan.
                </p>
            </div>
        </section>
    );
}
