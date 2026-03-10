import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClientAnimations from "@/components/ClientAnimations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollToTop from "@/components/ScrollToTop";

// Shared data representing clinic's treatments
const treatmentsDb = {
    "skin-brightening": {
        title: "Skin Brightening & Glow",
        icon: "✨",
        heroImage: "/images/hero-bg.png", // Using hero image as fallback
        description: "Advanced facials, HydraFacials, and vitamin infusions tailored to clear pigmentation, hydrate deeply, and restore your skin's natural luminous glow.",
        benefits: [
            "Evens out skin tone and reduces pigmentation",
            "Deeply hydrates and nourishes skin cells",
            "Removes dead skin and unclogs pores",
            "Stimulates collagen production for a firmer look"
        ],
        duration: "45–60 Minutes",
        sessions: "3–6 Sessions Recommended",
        downtime: "None"
    },
    "acne-scar-treatment": {
        title: "Acne & Scar Treatment",
        icon: "🩹",
        heroImage: "/images/before-after/acne-after.jpg",
        description: "Targeted medical solutions including microneedling, fractional laser, and chemical peels designed to eliminate active acne and permanently reduce scarring.",
        benefits: [
            "Clears active breakouts and prevents future ones",
            "Significantly reduces acne scarring and pitting",
            "Smoothes skin texture and minimizes pores",
            "Regulates excess sebum (oil) production"
        ],
        duration: "45–90 Minutes",
        sessions: "4–8 Sessions Recommended",
        downtime: "1–3 Days (Depending on treatment)"
    },
    "laser-light-therapy": {
        title: "Laser & Light Therapy",
        icon: "💡",
        heroImage: "/images/hero-bg.png",
        description: "State-of-the-art laser treatments for permanent hair reduction, tattoo removal, pigmentation correction, and overall skin rejuvenation.",
        benefits: [
            "Safe, effective, and permanent hair growth reduction",
            "Targets deep pigmentation and sun damage",
            "Stimulates deep collagen for anti-aging effects",
            "Precision technology ensures surrounding skin is unharmed"
        ],
        duration: "30–60 Minutes",
        sessions: "6–8 Sessions Recommended",
        downtime: "Minimal to None"
    },
    "anti-aging-solutions": {
        title: "Anti-Aging Solutions",
        icon: "💉",
        heroImage: "/images/before-after/antiaging-after.jpg",
        description: "Expertly administered dermal fillers, botulinum toxin, skin boosters, and collagen-stimulating treatments to restore youthful volume, smooth wrinkles, and lift facial contours.",
        benefits: [
            "Instantly restores lost facial volume",
            "Softens fine lines, wrinkles, and folds",
            "Non-surgical alternative to a facelift",
            "Results can last anywhere from 6 to 18 months"
        ],
        duration: "30–45 Minutes",
        sessions: "1 Session (Maintenance required)",
        downtime: "Minimal (Possible slight swelling/bruising)"
    },
    "chemical-peels": {
        title: "Chemical Peels",
        icon: "🧪",
        heroImage: "/images/hero-bg.png",
        description: "Medical-grade chemical peels customized specifically for your skin type and concerns—ranging from gentle glow peels to deep resurfacing treatments for severe damage.",
        benefits: [
            "Accelerates cellular turnover for fresh skin",
            "Effectively treats melasma and hyperpigmentation",
            "Improves active acne and superficial scarring",
            "Reveals a smoother, brighter complexion"
        ],
        duration: "30 Minutes",
        sessions: "3–6 Sessions Recommended",
        downtime: "2–7 Days (Depending on peel depth)"
    },
    "hair-restoration": {
        title: "Hair Restoration",
        icon: "💆",
        heroImage: "/images/before-after/hair-after.jpg",
        description: "Advanced PRP (Platelet-Rich Plasma) therapy, mesotherapy, and customized medical hair growth solutions to combat thinning hair, stop hair fall, and stimulate dense regrowth.",
        benefits: [
            "Uses your body's natural growth factors (PRP)",
            "Strengthens existing hair follicles",
            "Stimulates new, thicker hair growth",
            "Safe, natural, and highly effective for both men and women"
        ],
        duration: "60 Minutes",
        sessions: "4–6 Sessions Recommended",
        downtime: "None"
    }
};

export default function TreatmentPage({ params }) {
    const t = treatmentsDb[params.id];

    if (!t) {
        notFound();
    }

    const waMessage = encodeURIComponent(`Hi Dr. Gazaelle, I'm interested in the ${t.title} treatment and would like to know more.`);

    return (
        <>
            <Navbar />
            <ClientAnimations />

            <main className="min-h-screen pt-[80px]">
                {/* Treatment Hero */}
                <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                    <Image
                        src={t.heroImage}
                        alt={t.title}
                        fill
                        className="object-cover object-center filter grayscale-[30%] brightness-[0.7]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

                    <div className="relative z-10 text-center px-8 reveal-up">
                        <Link
                            href="/#services"
                            className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-white/50 hover:text-rose-gold transition-colors mb-6"
                        >
                            ← Back to Services
                        </Link>
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl mx-auto mb-6">
                            {t.icon}
                        </div>
                        <h1 className="font-[var(--font-cormorant)] text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none text-white mb-4">
                            {t.title}
                        </h1>
                    </div>
                </section>

                {/* Treatment Content */}
                <section className="py-24 px-8 md:px-16 bg-cream">
                    <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Left Col: Details */}
                        <div className="lg:col-span-8">
                            <h2 className="font-[var(--font-cormorant)] text-3xl font-light text-charcoal mb-6">Overview</h2>
                            <p className="text-[1.05rem] font-light leading-[1.9] text-mid/80 mb-12">
                                {t.description}
                            </p>

                            <h2 className="font-[var(--font-cormorant)] text-3xl font-light text-charcoal mb-6">Key Benefits</h2>
                            <ul className="space-y-4 mb-16">
                                {t.benefits.map((b, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <span className="shrink-0 w-6 h-6 rounded-full bg-rose-gold/10 text-rose-gold flex items-center justify-center text-sm mt-0.5">
                                            ✓
                                        </span>
                                        <span className="text-[0.95rem] font-light text-mid/90 leading-relaxed">{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Col: Info Card */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 bg-warm-white p-8 border border-line rounded-sm shadow-[0_10px_40px_rgba(42,35,32,0.05)]">
                                <h3 className="font-[var(--font-cormorant)] text-2xl text-charcoal mb-6 text-center border-b border-line pb-4">Treatment Info</h3>

                                <div className="space-y-6 mb-8">
                                    <div>
                                        <div className="text-[0.65rem] tracking-[0.2em] uppercase text-mid/50 mb-1">Duration</div>
                                        <div className="text-[0.95rem] text-charcoal">{t.duration}</div>
                                    </div>
                                    <div>
                                        <div className="text-[0.65rem] tracking-[0.2em] uppercase text-mid/50 mb-1">Recommended Sessions</div>
                                        <div className="text-[0.95rem] text-charcoal">{t.sessions}</div>
                                    </div>
                                    <div>
                                        <div className="text-[0.65rem] tracking-[0.2em] uppercase text-mid/50 mb-1">Downtime</div>
                                        <div className="text-[0.95rem] text-charcoal">{t.downtime}</div>
                                    </div>
                                </div>

                                <a
                                    href={`https://wa.me/919927965666?text=${waMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full block text-center py-4 bg-charcoal text-white text-[0.75rem] tracking-[0.2em] uppercase font-medium hover:bg-rose-gold transition-colors duration-400 rounded-sm"
                                >
                                    Book Consultation
                                </a>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
            <WhatsAppFloat />
            <ScrollToTop />
        </>
    );
}
