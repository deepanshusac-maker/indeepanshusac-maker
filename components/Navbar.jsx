"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60);

            const sections = document.querySelectorAll("section[id]");
            sections.forEach((s) => {
                const rect = s.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom > 150) {
                    setActive(s.id);
                }
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close menu on scroll
    useEffect(() => {
        if (menuOpen) {
            const close = () => setMenuOpen(false);
            window.addEventListener("scroll", close, { passive: true });
            return () => window.removeEventListener("scroll", close);
        }
    }, [menuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const links = [
        { href: "#about", label: "About" },
        { href: "#services", label: "Services" },
        { href: "#gallery", label: "Results" },
        { href: "#reviews", label: "Reviews" },
        { href: "#faq", label: "FAQ" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between border-b border-line backdrop-blur-[18px] transition-all duration-400 ${scrolled
                    ? "py-3 px-5 md:px-16 bg-cream/92 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
                    : "py-4 px-5 md:px-16 bg-cream/70"
                    }`}
            >
                <Link
                    href="#"
                    className="font-[var(--font-cormorant)] text-[1.15rem] font-light tracking-wider text-charcoal no-underline leading-tight hover:opacity-80 transition-opacity"
                >
                    Dr. Gazaelle&apos;s
                    <span className="block text-[0.6rem] tracking-[0.22em] text-rose-gold font-[var(--font-jost)] font-light uppercase">
                        Aesthetic Clinic · Moradabad
                    </span>
                </Link>

                {/* Desktop nav */}
                <ul className="hidden lg:flex gap-9 list-none">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                className={`text-[0.72rem] tracking-[0.2em] uppercase no-underline font-normal transition-colors duration-300 relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:bg-rose-gold after:transition-all after:duration-400 ${active === l.href.replace("#", "")
                                    ? "text-rose-gold after:w-full"
                                    : "text-mid hover:text-rose-gold after:w-0 hover:after:w-full"
                                    }`}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3 md:gap-4">
                    <Link
                        href="tel:09927965666"
                        className="hidden xl:flex items-center gap-2 text-[0.75rem] tracking-wide text-mid hover:text-rose-gold transition-colors"
                    >
                        <span className="w-8 h-8 rounded-full bg-rose-gold/10 flex items-center justify-center text-rose-gold text-sm">
                            📞
                        </span>
                        099279 65666
                    </Link>
                    <Link
                        href="#contact"
                        className="hidden md:inline-block text-[0.7rem] tracking-[0.2em] uppercase py-2.5 px-6 border border-rose-gold text-rose-gold no-underline transition-all duration-400 relative overflow-hidden group"
                    >
                        <span className="absolute inset-0 bg-rose-gold transform scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-400 -z-10" />
                        <span className="relative group-hover:text-white transition-colors duration-400">
                            Book Now
                        </span>
                    </Link>

                    {/* Hamburger button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                        <span className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                        <span className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[99] transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 right-0 bottom-0 w-[280px] bg-cream z-[101] shadow-[-8px_0_40px_rgba(0,0,0,0.1)] transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] lg:hidden flex flex-col ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close button */}
                <div className="flex justify-end p-5">
                    <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-charcoal/60 hover:text-rose-gold transition-colors cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Links */}
                <nav className="flex flex-col gap-1 px-8 flex-1">
                    {links.map((l, i) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            onClick={() => setMenuOpen(false)}
                            className={`text-[0.82rem] tracking-[0.2em] uppercase py-3 border-b border-line/50 no-underline font-light transition-all duration-300 ${active === l.href.replace("#", "")
                                ? "text-rose-gold"
                                : "text-charcoal/70 hover:text-rose-gold hover:pl-2"
                                }`}
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom CTA */}
                <div className="p-8 border-t border-line/50">
                    <a
                        href="https://wa.me/919927965666?text=Hi%20Dr.%20Gazaelle%2C%20I%20would%20like%20to%20book%20an%20appointment."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-full text-[0.78rem] font-medium tracking-wide hover:bg-[#1fb855] transition-colors"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.301-.18-3.126.82.834-3.047-.197-.314A7.963 7.963 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z" />
                        </svg>
                        WhatsApp Us
                    </a>
                    <a
                        href="tel:09927965666"
                        className="flex items-center justify-center gap-2 mt-3 border border-rose-gold text-rose-gold py-3 rounded-full text-[0.78rem] font-medium tracking-wide hover:bg-rose-gold hover:text-white transition-all"
                    >
                        📞 Call Now
                    </a>
                </div>
            </div >
        </>
    );
}
