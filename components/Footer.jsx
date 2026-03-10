import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#1a1815] border-t border-white/5 py-8 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
                <span className="font-[var(--font-cormorant)] text-[1.05rem] font-light text-cream/70">
                    Dr. Gazaelle&apos;s Aesthetic Clinic
                </span>
                <span className="block text-[0.6rem] tracking-[0.18em] uppercase text-cream/30 mt-0.5">
                    Moradabad, Uttar Pradesh
                </span>
            </div>

            <div className="flex gap-8 footer-links">
                {["About", "Services", "Reviews", "Contact"].map((l) => (
                    <Link
                        key={l}
                        href={`#${l.toLowerCase()}`}
                        className="text-[0.68rem] tracking-[0.2em] uppercase text-cream/35 hover:text-rose-gold transition-all duration-300 hover:-translate-y-0.5"
                    >
                        {l}
                    </Link>
                ))}
            </div>

            <div className="text-[0.68rem] text-cream/25">
                © 2025 Dr. Gazaelle&apos;s Aesthetic Clinic. All rights reserved.
            </div>
        </footer>
    );
}
