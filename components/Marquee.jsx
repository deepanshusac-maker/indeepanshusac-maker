export default function Marquee() {
    const items = [
        "Advanced Skin Treatments", "Laser Therapy", "Chemical Peels",
        "Anti-Aging Solutions", "Acne & Scar Treatment", "Skin Brightening",
        "Hair Restoration", "IV Wellness Drips",
    ];
    const doubled = [...items, ...items];

    return (
        <div className="marquee-section overflow-hidden border-y border-line py-3 bg-warm-white">
            <div className="marquee-track flex gap-12 w-max">
                {doubled.map((item, i) => (
                    <div
                        key={i}
                        className="font-[var(--font-cormorant)] text-[0.9rem] italic text-mid whitespace-nowrap flex items-center gap-5 hover:text-rose-gold transition-colors"
                    >
                        <span className="w-1 h-1 rounded-full bg-rose-gold shrink-0 animate-[dot-pulse_2s_ease-in-out_infinite]" />
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
