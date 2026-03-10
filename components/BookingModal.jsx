"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

export default function BookingModal() {
    const { isOpen, closeBookingModal, prefillTreatment } = useBooking();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", treatment: "", message: "" });

    // Update treatment if pre-filled
    useEffect(() => {
        if (prefillTreatment) {
            setForm(prev => ({ ...prev, treatment: prefillTreatment }));
        }
    }, [prefillTreatment]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") closeBookingModal();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, closeBookingModal]);

    function handleSubmit(e) {
        e.preventDefault();

        // Build WhatsApp message
        const phone = "919927965666";
        let msg = `Hi Dr. Gazaelle, I'd like to book an appointment.\n\n`;
        msg += `*Name:* ${form.name}\n`;
        msg += `*Phone:* ${form.phone}\n`;
        if (form.treatment) msg += `*Treatment:* ${form.treatment}\n`;
        if (form.message) msg += `*Message:* ${form.message}\n`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

        setSubmitted(true);
        setTimeout(() => {
            window.open(url, "_blank");
            setSubmitted(false);
            setForm({ name: "", phone: "", treatment: "", message: "" });
            closeBookingModal();
        }, 1200);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeBookingModal}
                        className="fixed inset-0 bg-charcoal/60 backdrop-blur-md z-[200]"
                    />

                    {/* Modal Content - Toast style from right */}
                    <motion.div
                        initial={{ x: "100%", opacity: 0.5 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0.5 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-[450px] bg-charcoal text-cream z-[201] shadow-[-20px_0_60px_rgba(0,0,0,0.4)] flex flex-col border-l border-white/10"
                    >
                        {/* Header */}
                        <div className="p-8 flex items-center justify-between border-b border-white/5">
                            <div>
                                <h2 className="font-[var(--font-cormorant)] text-2xl font-light text-rose-gold">
                                    Book <em className="italic">Appointment</em>
                                </h2>
                                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40 mt-1">
                                    Secure your session
                                </p>
                            </div>
                            <button
                                onClick={closeBookingModal}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-rose-gold/70">
                                        Your Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Dr. Gazaelle's Guest"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 py-4 px-5 text-[0.85rem] text-white placeholder:text-white/10 outline-none focus:border-rose-gold transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-rose-gold/70">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+91"
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 py-4 px-5 text-[0.85rem] text-white placeholder:text-white/10 outline-none focus:border-rose-gold transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-rose-gold/70">
                                        Treatment Interest
                                    </label>
                                    <select
                                        value={form.treatment}
                                        onChange={e => setForm({ ...form, treatment: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 py-4 px-5 text-[0.85rem] text-white/60 outline-none focus:border-rose-gold transition-all appearance-none"
                                    >
                                        <option value="" className="bg-charcoal">Select a treatment...</option>
                                        <option className="bg-charcoal">Skin Brightening & Glow</option>
                                        <option className="bg-charcoal">Acne & Scar Treatment</option>
                                        <option className="bg-charcoal">Laser & Light Therapy</option>
                                        <option className="bg-charcoal">Anti-Aging Solutions</option>
                                        <option className="bg-charcoal">Chemical Peels</option>
                                        <option className="bg-charcoal">Hair Restoration</option>
                                        <option className="bg-charcoal">General Consultation</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-rose-gold/70">
                                        Any specific concerns?
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Optional message..."
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 py-4 px-5 text-[0.85rem] text-white placeholder:text-white/10 outline-none focus:border-rose-gold transition-all resize-none"
                                    />
                                </div>

                                <div className="pt-4">
                                    <motion.button
                                        type="submit"
                                        disabled={submitted}
                                        whileHover={!submitted ? { scale: 1.01 } : {}}
                                        whileTap={!submitted ? { scale: 0.98 } : {}}
                                        className={`w-full py-4 rounded-full text-[0.7rem] tracking-[0.25em] uppercase font-semibold transition-all duration-500 shadow-lg ${submitted
                                            ? "bg-[#25D366] text-white shadow-[#25D366]/20"
                                            : "bg-gradient-to-r from-rose-gold to-rose-deep text-white shadow-rose-gold/20"
                                            }`}
                                    >
                                        {submitted ? "✓ Redirecting to WhatsApp" : "Confirm Appointment"}
                                    </motion.button>
                                </div>

                                <p className="text-[0.6rem] leading-relaxed text-white/30 text-center uppercase tracking-widest px-8">
                                    A clinic representative will confirm your timings via WhatsApp shortly.
                                </p>
                            </form>
                        </div>

                        {/* Footer Info */}
                        <div className="p-8 border-t border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-4 text-white/50">
                                <div className="w-10 h-10 rounded-full bg-rose-gold/10 flex items-center justify-center text-rose-gold">
                                    📞
                                </div>
                                <div>
                                    <p className="text-[0.65rem] tracking-wider uppercase font-medium">Emergency Call</p>
                                    <p className="text-sm">099279 65666</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
