"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

export default function WhatsAppFloat() {
    const { openBookingModal } = useBooking();
    const phone = "919927965666";
    const message = encodeURIComponent("Hi Dr. Gazaelle, I would like to book an appointment.");
    const url = `https://wa.me/${phone}?text=${message}`;
    const [showTooltip, setShowTooltip] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Framer Motion highly-optimized scroll tracking
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 150);
    });

    // Pulse the tooltip after 5 seconds
    useEffect(() => {
        const t = setTimeout(() => setShowTooltip(true), 5000);
        const hide = setTimeout(() => setShowTooltip(false), 12000);
        return () => { clearTimeout(t); clearTimeout(hide); };
    }, []);

    return (
        <>
            {/* Desktop WhatsApp Float */}
            <div className="hidden md:block fixed bottom-8 right-8 z-[90]">
                {/* Tooltip */}
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className="absolute -top-14 right-0 bg-charcoal text-white text-[0.75rem] py-2 px-4 rounded-lg shadow-lg whitespace-nowrap"
                        >
                            💬 Need help? Chat with us!
                            <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-charcoal" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#25D366] text-white py-3.5 pl-5 pr-6 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] transition-shadow"
                    title="Chat on WhatsApp"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 0.6, ease: "easeOut" }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.301-.18-3.126.82.834-3.047-.197-.314A7.963 7.963 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z" />
                    </svg>
                    <span className="text-[0.82rem] font-medium tracking-wide">Chat with us</span>
                </motion.a>
            </div>

            {/* Mobile Sticky Bottom Bar — Always Mounted, Visually Hidden Until Scrolled */}
            <motion.div
                className="md:hidden fixed bottom-0 left-0 right-0 z-[110] glass-cta shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-stretch"
                initial={{ y: "100%" }}
                animate={{ y: scrolled ? 0 : "100%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <a
                    href="tel:09927965666"
                    className="flex-1 flex flex-col items-center justify-center gap-1 py-3.5 text-[0.65rem] font-medium tracking-[0.15em] uppercase text-charcoal/80 border-r border-line/30 active:bg-rose-gold/5 transition-colors"
                >
                    <span className="text-lg">📞</span> Call
                </a>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col items-center justify-center gap-1 py-3.5 text-[0.65rem] font-medium tracking-[0.15em] uppercase text-charcoal/80 border-r border-line/30 active:bg-rose-gold/5 transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#25D366]">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    WhatsApp
                </a>
                <button
                    onClick={() => openBookingModal()}
                    className="flex-[1.2] flex items-center justify-center gap-2 py-3.5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-white bg-rose-gold active:bg-rose-deep transition-all shadow-inner cursor-pointer"
                >
                    ✨ Book Now
                </button>
            </motion.div>
        </>
    );
}
