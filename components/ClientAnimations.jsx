"use client";

import { useEffect, useRef } from "react";

export default function ClientAnimations() {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const progressRef = useRef(null);
    const loaderRef = useRef(null);

    useEffect(() => {
        // ─── PAGE LOADER ───
        const loader = loaderRef.current;
        const hideLoader = () => {
            if (!loader) return;
            loader.classList.add("loaded");
            setTimeout(() => { if (loader) loader.style.display = "none"; }, 600);
        };
        const timer = setTimeout(hideLoader, 1600);
        const fallback = setTimeout(hideLoader, 2500);

        return () => { clearTimeout(timer); clearTimeout(fallback); };
    }, []);

    useEffect(() => {
        // ─── CUSTOM CURSOR ───
        const dot = cursorRef.current;
        const ring = ringRef.current;
        let mx = 0, my = 0, rx = 0, ry = 0;

        function onMove(e) {
            mx = e.clientX; my = e.clientY;
            if (dot) { dot.style.left = mx + "px"; dot.style.top = my + "px"; }
        }
        function loop() {
            rx += (mx - rx) * 0.1;
            ry += (my - ry) * 0.1;
            if (ring) { ring.style.left = rx + "px"; ring.style.top = ry + "px"; }
            requestAnimationFrame(loop);
        }
        document.addEventListener("mousemove", onMove);
        loop();

        // Cursor hover
        const targets = document.querySelectorAll("a, button, .service-card, .review-card, .why-box, input, select, textarea");
        const enter = () => { dot?.classList.add("hovering"); ring?.classList.add("hovering"); };
        const leave = () => { dot?.classList.remove("hovering"); ring?.classList.remove("hovering"); };
        targets.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

        return () => {
            document.removeEventListener("mousemove", onMove);
            targets.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
        };
    }, []);

    useEffect(() => {
        // ─── SCROLL PROGRESS ───
        const bar = progressRef.current;
        function onScroll() {
            if (!bar) return;
            const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            bar.style.transform = `scaleX(${p})`;
            bar.style.width = "100%";
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        // ─── SCROLL REVEAL ───
        const els = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate");
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
            });
        }, { threshold: 0.05, rootMargin: "0px 0px 50px 0px" });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        // ─── STAT COUNTERS ───
        const els = document.querySelectorAll(".stat-counter");
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseFloat(el.dataset.count);
                const suffix = el.dataset.suffix || "";
                const isDecimal = target % 1 !== 0;
                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const p = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    const cur = eased * target;
                    el.textContent = (isDecimal ? cur.toFixed(1) : Math.floor(cur)) + suffix;
                    if (p < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        // ─── 3D TILT ON CARDS ───
        function addTilt(selector, strength = 4) {
            document.querySelectorAll(selector).forEach(card => {
                card.addEventListener("mousemove", function (e) {
                    const r = this.getBoundingClientRect();
                    const x = (e.clientX - r.left) / r.width - 0.5;
                    const y = (e.clientY - r.top) / r.height - 0.5;
                    this.style.transform = `translateY(-4px) perspective(600px) rotateX(${y * -strength}deg) rotateY(${x * strength}deg)`;
                });
                card.addEventListener("mouseleave", function () {
                    this.style.transform = "";
                });
            });
        }
        addTilt(".service-card", 4);
        addTilt(".review-card", 3);
        addTilt(".why-box", 5);
    }, []);

    useEffect(() => {
        // ─── MAGNETIC BUTTONS ───
        document.querySelectorAll(".magnetic-btn").forEach(btn => {
            btn.addEventListener("mousemove", function (e) {
                const r = this.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });
            btn.addEventListener("mouseleave", function () {
                this.style.transform = "";
            });
        });
    }, []);

    useEffect(() => {
        // ─── TEXT SCRAMBLE ON EYEBROWS ───
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const orig = el.textContent.trim();
                let iter = 0;
                const interval = setInterval(() => {
                    el.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            node.textContent = orig.split("").map((c, i) => {
                                if (c === " ") return " ";
                                return i < iter ? orig[i] : chars[Math.floor(Math.random() * chars.length)];
                            }).join("");
                        }
                    });
                    iter += 0.5;
                    if (iter >= orig.length) {
                        clearInterval(interval);
                        el.childNodes.forEach(node => {
                            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) node.textContent = orig;
                        });
                    }
                }, 30);
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });
        document.querySelectorAll(".section-eyebrow").forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        // ─── PARALLAX ON ABOUT IMAGE ───
        const card = document.querySelector(".about-card-img");
        if (!card) return;
        function onScroll() {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const pct = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                card.style.transform = `scale(1.03) translateY(${(pct - 0.5) * 30}px)`;
            }
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* Page Loader */}
            <div
                ref={loaderRef}
                className="fixed inset-0 z-[10000] bg-cream flex items-center justify-center flex-col gap-6 transition-all duration-600"
                style={{ opacity: 1 }}
                id="pageLoader"
            >
                <div className="font-[var(--font-cormorant)] text-[1.6rem] font-light text-charcoal tracking-[0.05em] opacity-0 animate-[fade-up_0.6s_0.2s_forwards]">
                    Dr. Gazaelle&apos;s
                </div>
                <div className="w-[120px] h-[1.5px] bg-line rounded-full overflow-hidden">
                    <div className="h-full bg-rose-gold rounded-full loader-fill" />
                </div>
            </div>

            {/* Custom Cursor */}
            <div ref={cursorRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />

            {/* Scroll Progress */}
            <div ref={progressRef} className="scroll-progress" />

            <style jsx>{`
        .loaded {
          opacity: 0 !important;
          visibility: hidden;
          pointer-events: none;
        }
      `}</style>
        </>
    );
}
