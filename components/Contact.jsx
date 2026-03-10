"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", treatment: "", message: "" });

    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

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
        }, 1000);
    }

    return (
        <section id="contact" ref={ref} className="bg-gradient-to-b from-charcoal to-[#1a1815] text-cream scroll-mt-20 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 px-8 md:px-16 py-24 md:py-32 max-w-[1400px] mx-auto">
                {/* Left column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div className="text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold font-light flex items-center gap-3 mb-5 section-eyebrow">
                        <span className="w-7 h-px bg-rose-gold" />
                        Get in Touch
                    </div>
                    <h2 className="font-[var(--font-cormorant)] text-[clamp(2.2rem,4vw,3.4rem)] font-light leading-[1.15] text-cream mb-6">
                        Book Your<br /><em className="italic text-rose-gold">Consultation</em>
                    </h2>
                    <p className="text-[0.9rem] leading-[2] text-cream/50 font-light mb-10 max-w-md">
                        Take the first step towards the skin you deserve. Reach out to us and
                        we&apos;ll create a personalised plan just for you.
                    </p>

                    {/* Contact details */}
                    <div className="space-y-6 mb-10">
                        {[
                            { label: "📍 Location", content: "Rampur Rd, Shivpuri,\nMoradabad, Uttar Pradesh 244001" },
                            { label: "📞 Phone / WhatsApp", content: <a href="tel:09927965666" className="hover:text-rose-gold transition-colors">099279 65666</a> },
                            { label: "🕐 Clinic Hours", content: "Mon — Sat: Open until 6:00 PM\nSunday: By appointment" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="border-b border-white/10 pb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                            >
                                <div className="text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold/70 mb-2 flex items-center gap-2">
                                    {item.label}
                                </div>
                                <p className="text-[0.9rem] text-cream/60 font-light leading-relaxed whitespace-pre-line">
                                    {item.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Google Maps */}
                    <motion.div
                        className="rounded overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3487.3!2d78.77!3d28.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQ5JzQ4LjAiTiA3OMKwNDYnMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="220"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Dr. Gazaelle's Clinic - Moradabad"
                            className="grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>
                </motion.div>

                {/* Right column — Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                >
                    <div className="bg-rose-gold/10 border border-rose-gold/20 rounded p-4 mb-2">
                        <p className="text-[0.78rem] text-rose-gold font-light flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#25D366]">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.301-.18-3.126.82.834-3.047-.197-.314A7.963 7.963 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z" />
                            </svg>
                            Your inquiry will be sent directly via WhatsApp for fastest response
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-[0.68rem] tracking-[0.2em] uppercase text-cream/40 mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-transparent border border-white/10 rounded-none py-4 px-5 text-[0.88rem] text-cream placeholder:text-cream/20 font-light outline-none focus:border-rose-gold transition-all duration-300 focus:-translate-y-0.5"
                            />
                        </div>
                        <div>
                            <label className="block text-[0.68rem] tracking-[0.2em] uppercase text-cream/40 mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                placeholder="Your phone number"
                                required
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className="w-full bg-transparent border border-white/10 rounded-none py-4 px-5 text-[0.88rem] text-cream placeholder:text-cream/20 font-light outline-none focus:border-rose-gold transition-all duration-300 focus:-translate-y-0.5"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[0.68rem] tracking-[0.2em] uppercase text-cream/40 mb-2">
                            Treatment Interest
                        </label>
                        <select
                            value={form.treatment}
                            onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                            className="w-full bg-transparent border border-white/10 rounded-none py-4 px-5 text-[0.88rem] text-cream/50 font-light outline-none focus:border-rose-gold transition-all duration-300 focus:-translate-y-0.5 appearance-none"
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

                    <div>
                        <label className="block text-[0.68rem] tracking-[0.2em] uppercase text-cream/40 mb-2">
                            Message (Optional)
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Tell us about your concerns..."
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full bg-transparent border border-white/10 rounded-none py-4 px-5 text-[0.88rem] text-cream placeholder:text-cream/20 font-light outline-none focus:border-rose-gold transition-all duration-300 focus:-translate-y-0.5 resize-y"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={submitted}
                        whileHover={!submitted ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!submitted ? { scale: 0.98 } : {}}
                        className={`w-full py-4 text-[0.72rem] tracking-[0.2em] uppercase font-medium transition-colors duration-500 relative overflow-hidden cursor-pointer rounded-sm ${submitted
                                ? "bg-[#25D366] text-white cursor-default shadow-[0_4px_15px_rgba(37,211,102,0.3)]"
                                : "bg-rose-gold text-white shadow-[0_4px_15px_rgba(200,149,108,0.3)] hover:shadow-[0_8px_25px_rgba(200,149,108,0.4)]"
                            }`}
                    >
                        {submitted ? "✓ Opening WhatsApp..." : "Send via WhatsApp →"}
                    </motion.button>

                    <p className="text-[0.7rem] text-cream/30 text-center mt-2">
                        Or call directly: <a href="tel:09927965666" className="text-rose-gold/70 hover:text-rose-gold">099279 65666</a>
                    </p>
                </motion.form>
            </div>
        </section>
    );
}
