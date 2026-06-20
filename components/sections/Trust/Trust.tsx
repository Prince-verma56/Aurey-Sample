"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloader } from "@/components/providers/PreloaderProvider";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "97%", label: "Clinical Improvement", sub: "Texture refinement", pos: "md:top-[50%] md:translate-y-[-50%] md:-left-28 top-[30%] left-[-6%]" },
  { value: "14", label: "Days Average", sub: "Visible radiance", pos: "md:-bottom-12 md:-right-16 bottom-[-6%] right-[-2%]" },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", loc: "Delhi", text: "My skin barrier completely changed.", dur: "28 Days Using Aurey" },
  { name: "Ananya Patel", loc: "Mumbai", text: "Finally, a formula that understands my skin.", dur: "14 Days Using Aurey" },
  { name: "Meera Reddy", loc: "Bangalore", text: "The glass-like radiance is real.", dur: "2 Months Using Aurey" },
  { name: "Sarah K.", loc: "London", text: "It feels like a luxury spa treatment.", dur: "3 Weeks Using Aurey" },
];

const TRUST_BADGES = [
  "Dermatologist Tested", "Cruelty Free", "Clinically Proven", "Paraben Free", "pH Balanced", "Made In Korea"
];

// ─── HELPER: TEXT SPLITTER ───────────────────────────────────────────────────
const SplitLine = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={`inline-block ${className}`}>
    {text.split("\n").map((line, lineIndex) => (
      <span key={lineIndex} className="block overflow-hidden pb-2">
        <span className="trust-char inline-block will-change-transform opacity-0">
          {line}
        </span>
      </span>
    ))}
  </span>
);

export function Trust() {
  const sectionRef = useRef<HTMLElement>(null);
  const waveRef = useRef<SVGPathElement>(null);
  
  // Interactive Reveal Refs
  const sliderRef = useRef<HTMLDivElement>(null);
  const afterLayerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Animation Refs
  const parallaxTargets = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const meshRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isComplete } = usePreloader();

  useEffect(() => {
    if (!isComplete) return;

    const ctx = gsap.context(() => {
      const sec = sectionRef.current;
      if (!sec) return;

      // 1. Initial Setups (Prevent Flashing)
      gsap.set(sec, { y: 60 }); // Pushed down slightly for entrance rise
      gsap.set(".trust-fade", { autoAlpha: 0, y: 20 });
      gsap.set(".trust-stat", { autoAlpha: 0, y: 30, scale: 0.95 });
      gsap.set(".trust-hero-wrap", { scale: 0.98, autoAlpha: 0, y: 40 });
      gsap.set(".badge-item", { autoAlpha: 0, y: 15 });
      gsap.set(".huge-bg-text", { autoAlpha: 0, yPercent: 10 });
      gsap.set(".prog-bar", { width: "0%" });
      gsap.set(".clinical-card", { autoAlpha: 0, y: 30 });

      // Directly control slider DOM to bypass React renders
      const setSliderPos = (pct: number) => {
        if (afterLayerRef.current) afterLayerRef.current.style.clipPath = `inset(0 0 0 ${pct}%)`;
        if (handleRef.current) handleRef.current.style.left = `${pct}%`;
      };

      // Master Entrance (Just section and BG)
      gsap.to(sec, { y: 0, duration: 1.5, ease: "power3.out", force3D: true, scrollTrigger: { trigger: sec, start: "top 65%", once: true } });
      if (waveRef.current) {
        gsap.fromTo(waveRef.current, { scaleY: 0.8 }, { scaleY: 1, duration: 1.5, ease: "power2.out", transformOrigin: "bottom", scrollTrigger: { trigger: sec, start: "top 65%", once: true } });
      }
      gsap.to(".huge-bg-text", { autoAlpha: 0.02, yPercent: 0, duration: 1.5, stagger: 0.2, ease: "power4.out", scrollTrigger: { trigger: sec, start: "top 65%", once: true } });

      // Header Animation
      const headerTl = gsap.timeline({ scrollTrigger: { trigger: ".trust-header-wrap", start: "top 70%", once: true } });
      headerTl.to(".trust-fade", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" })
              .fromTo(".trust-char", { yPercent: 100 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: "power3.out" }, "<0.2");

      // Hero Interactive Experience
      const heroTl = gsap.timeline({ scrollTrigger: { trigger: ".trust-hero-wrap", start: "top 65%", once: true } });
      heroTl.to(".trust-hero-wrap", { autoAlpha: 1, scale: 1, y: 0, duration: 1.5, ease: "expo.out", force3D: true })
            .to(".trust-stat", { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.5)" }, 0.4)
            .fromTo(".drag-hint", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.0);

      // The "Teach" Wobble
      heroTl.to({ val: 50 }, { val: 53, duration: 0.6, ease: "power2.out", onUpdate: function () { setSliderPos(this.targets()[0].val); } }, 1.5)
            .to({ val: 53 }, { val: 47, duration: 0.8, ease: "power2.inOut", onUpdate: function () { setSliderPos(this.targets()[0].val); } }, 2.1)
            .to({ val: 47 }, { val: 50, duration: 0.6, ease: "power2.out", onUpdate: function () { setSliderPos(this.targets()[0].val); } }, 2.9);

      // Clinical Card Reveal
      gsap.to(".clinical-card", { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".clinical-card", start: "top 85%", once: true } });

      // 3. Clinical Bars
      gsap.to(".prog-bar", {
        width: (i, el) => el.getAttribute("data-width") || "0%",
        duration: 1.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".clinical-card", start: "top 85%", once: true }
      });

      // 4. Badges
      gsap.to(".badge-item", {
        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".trust-strip", start: "top 90%", once: true }
      });

      // 5. Parallax Elements
      const xTo = gsap.quickTo(parallaxTargets.current, "x", { duration: 1.2, ease: "power3.out" });
      const yTo = gsap.quickTo(parallaxTargets.current, "y", { duration: 1.2, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        xTo(x); yTo(y);
        gsap.to(".trust-hero-inner", { rotationY: x * 0.15, rotationX: -y * 0.15, transformPerspective: 1200, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Vertical Label Parallax
      gsap.to(".vertical-label-left", { y: -100, scrollTrigger: { trigger: sec, scrub: true } });
      gsap.to(".vertical-label-right", { y: 100, scrollTrigger: { trigger: sec, scrub: true } });

      // Ambient Mesh Gradients
      meshRefs.current.forEach((mesh, i) => {
        if (!mesh) return;
        gsap.to(mesh, {
          x: "random(-100, 100)", y: "random(-100, 100)", scale: "random(0.9, 1.2)",
          duration: "random(15, 25)", repeat: -1, yoyo: true, ease: "sine.inOut"
        });
      });

      // Marquee
      if (marqueeRef.current) {
        const marqueeTween = gsap.to(marqueeRef.current, { xPercent: -50, repeat: -1, duration: 40, ease: "none" });
        marqueeRef.current.addEventListener("mouseenter", () => gsap.to(marqueeTween, { timeScale: 0.2, duration: 0.8 }));
        marqueeRef.current.addEventListener("mouseleave", () => gsap.to(marqueeTween, { timeScale: 1, duration: 0.8 }));
      }

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, sectionRef);
    return () => ctx.revert();
  }, [isComplete]);

  // ─── INTERACTIVE REVEAL LOGIC ───
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const rect = slider.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const pct = (x / rect.width) * 100;

      if (afterLayerRef.current) afterLayerRef.current.style.clipPath = `inset(0 0 0 ${pct}%)`;
      if (handleRef.current) handleRef.current.style.left = `${pct}%`;

      let feedback = "Beginning Transformation";
      if (pct > 30 && pct <= 70) feedback = "Barrier Recovery in Progress";
      if (pct > 70) feedback = "Visible Radiance Achieved";

      if (feedbackRef.current && feedbackRef.current.innerText !== feedback) {
        feedbackRef.current.innerText = feedback;
      }

      gsap.to(".drag-hint", { autoAlpha: 0, duration: 0.3 }); 
      gsap.to(".handle-glow", { opacity: 1, scale: 1.2, duration: 0.2 }); 
    };

    const onUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
      gsap.to(handleRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(".handle-glow", { opacity: 0.5, scale: 1, duration: 0.6 });
    };

    const onDown = () => {
      isDragging.current = true;
      document.body.style.cursor = "ew-resize";
      gsap.to(handleRef.current, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    };

    slider.addEventListener("mousedown", onDown);
    slider.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      slider.removeEventListener("mousedown", onDown);
      slider.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  // Use transformation imagery
  const beforeImage = "https://res.cloudinary.com/dtslaveid/image/upload/v1781929116/a175ec20-6174-4a4a-80b6-ce5487011e64_j6hwuq.png"; // Placeholder dull/before
  const afterImage = "https://res.cloudinary.com/dtslaveid/image/upload/v1781929157/9153eff1-8e0f-4c91-9001-0d2add37b5da_eyjmbs.png";  // Placeholder radiant/after

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full flex flex-col items-center pb-32 z-20 overflow-visible"
      style={{ paddingTop: 100, marginTop: -60 }}
    >
      {/* ── Parallax Overlap Background ── */}
      <div className="absolute inset-0 bg-[#F8F4EF] z-0 rounded-t-[40px] md:rounded-t-[60px] shadow-[0_-30px_60px_rgba(44,36,22,0.05)]" style={{ top: 0 }} />

      {/* ── ATMOSPHERIC LAYERS ── */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Mesh Gradients */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-40 mix-blend-multiply">
        <div ref={el => { meshRefs.current[0] = el; }} className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] bg-[#E8D2BB]/30" />
        <div ref={el => { meshRefs.current[1] = el; }} className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] rounded-full blur-[140px] bg-[#D4C3A3]/20" />
      </div>

      {/* Massive Faded Typography */}
      <div className="absolute top-[15%] left-0 w-full flex justify-between pointer-events-none z-[1] select-none px-[4vw] overflow-hidden">
        <span className="huge-bg-text font-serif font-bold text-[#2C2416] tracking-[-0.04em] opacity-0" style={{ fontSize: "16vw", lineHeight: 0.8 }}>CLINICAL</span>
        <span className="huge-bg-text font-serif font-bold text-[#2C2416] tracking-[-0.04em] opacity-0" style={{ fontSize: "16vw", lineHeight: 0.8 }}>RADIANCE</span>
      </div>

      {/* Vertical Editorial Labels */}
      <div className="vertical-label-left absolute left-6 top-1/3 -rotate-90 origin-center z-10 opacity-30 pointer-events-none hidden md:block">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#2C2416] font-bold whitespace-nowrap">Since 2021 &mdash; Seoul</span>
      </div>
      <div className="vertical-label-right absolute right-6 top-2/3 -rotate-90 origin-center z-10 opacity-30 pointer-events-none hidden md:block">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#2C2416] font-bold whitespace-nowrap">Clinically Verified Formula</span>
      </div>

      {/* ── 1. PREMIUM HEADER ── */}
      <div className="trust-header-wrap relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center mb-24 mt-12">
        <div className="trust-fade flex items-center gap-6 mb-8 invisible">
          <div className="w-16 h-[1px] bg-gradient-to-l from-[#C89B6D]/60 to-transparent" />
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#8B6A50] font-semibold">Clinical Results</span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#C89B6D]/60 to-transparent" />
        </div>
        
        <h2 className="font-orange text-[clamp(48px,6vw,84px)] leading-[1.05] tracking-[-0.02em] text-[#2C2416] mb-8">
          <SplitLine text="Results You Can See." /><br />
          <em className="italic text-[#8B6A50] font-light"><SplitLine text="Trust You Can Feel." /></em>
        </h2>

        <p className="trust-fade font-sans text-[15px] leading-[1.8] text-[#6B5B48] max-w-xl invisible">
          Every Aurey formula is clinically tested and inspired by centuries of Korean ritual, delivering visible transformation without compromising skin integrity.
        </p>
      </div>

      {/* ── 2. HERO INTERACTIVE EXPERIENCE ── */}
      <div className="trust-hero-wrap relative z-20 w-full max-w-[1200px] px-6 lg:px-12 mb-32 will-change-transform">
        
        {/* Floating Clinical Statistics (Only 2, Premium) */}
        {STATS.map((stat, i) => (
          <div 
            key={i} 
            ref={el => { parallaxTargets.current[i] = el; }}
            className={`trust-stat absolute z-30 ${stat.pos} bg-white/60 backdrop-blur-3xl border border-white/60 px-6 py-5 rounded-[24px] shadow-[0_30px_60px_rgba(44,36,22,0.12)] invisible will-change-transform flex flex-col`}
          >
            <h4 className="font-serif text-[48px] leading-none text-[#2C2416] mb-3">{stat.value}</h4>
            <div className="w-8 h-[1px] bg-[#C89B6D] mb-3" />
            <p className="font-sans text-[11px] font-bold text-[#2C2416] uppercase tracking-[0.15em] mb-1">{stat.label}</p>
            <p className="font-sans text-[10px] text-[#6B5B48] tracking-wide">{stat.sub}</p>
          </div>
        ))}

        {/* Editorial Annotations (Subtle lines) */}
        <div className="absolute top-[25%] -left-4 md:-left-12 flex flex-col items-end gap-1 opacity-60 z-10">
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] font-bold text-[#2C2416]">Hydration +94%</span>
          <div className="w-16 h-[1px] bg-[#2C2416]" />
        </div>
        <div className="absolute bottom-[25%] -right-4 md:-right-12 flex flex-col items-start gap-1 opacity-60 z-10">
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] font-bold text-[#2C2416]">Recommended by 98%</span>
          <div className="w-16 h-[1px] bg-[#2C2416]" />
        </div>

        {/* The 16:10 Cinematic Slider Container (Luxury Glass Panel) */}
        <div className="relative w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/10] rounded-[32px] md:rounded-[40px] bg-white/30 backdrop-blur-xl border border-white/80 shadow-[0_80px_120px_rgba(44,36,22,0.08),0_20px_40px_rgba(44,36,22,0.04)]">
          
          <div className="absolute inset-0 rounded-[32px] md:rounded-[40px] shadow-[inset_1px_1px_0_rgba(255,255,255,0.9)] pointer-events-none z-30" />
          {/* Massive reflection shadow beneath container */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[70%] h-[60px] bg-[#2C2416] blur-[60px] opacity-15 rounded-[100%] pointer-events-none z-0" />

          <div ref={sliderRef} className="trust-hero-inner relative w-full h-full rounded-[32px] md:rounded-[40px] overflow-hidden cursor-ew-resize group z-10 bg-[#E6D7C0] select-none touch-none">
            
            {/* "Before" Image (Desaturated, cooler, softer texture) */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              <Image src={beforeImage} alt="Skin Before" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover scale-105 pointer-events-none select-none filter sepia-[0.1] saturate-[0.6] brightness-[0.9] blur-[0.5px]" draggable={false} />
              <div className="absolute top-6 left-8 bg-black/30 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-white/20 select-none pointer-events-none">Before</div>
            </div>

            {/* "After" Image (Warmer, brighter, luminous) */}
            <div ref={afterLayerRef} className="absolute inset-0 z-10 will-change-transform pointer-events-none select-none" style={{ clipPath: "inset(0 0 0 50%)" }}>
              <Image src={afterImage} alt="Skin After" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover scale-105 pointer-events-none select-none filter saturate-[1.15] brightness-[1.05] contrast-[1.05]" draggable={false} />
              <div className="absolute top-6 right-8 bg-white/90 backdrop-blur-md text-[#2C2416] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg border border-white select-none pointer-events-none">After 14 Days</div>
            </div>

            {/* Dynamic Status Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 bg-black/40 backdrop-blur-md text-[#F7F4EF] px-8 py-2.5 rounded-full pointer-events-none shadow-xl border border-white/10">
              <span ref={feedbackRef} className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold">Beginning Transformation</span>
            </div>

            {/* Floating Luxury Drag Handle */}
            <div 
              ref={handleRef}
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center will-change-transform"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              <div className="absolute top-0 bottom-0 w-[1px] bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
              
              <div className="relative w-14 h-14 rounded-full bg-white/80 backdrop-blur-xl shadow-[0_15px_40px_rgba(200,155,109,0.5)] flex items-center justify-center border border-white/70 transition-transform group-hover:scale-110">
                <div className="handle-glow absolute inset-0 rounded-full bg-[#C89B6D] opacity-40 blur-[15px] pointer-events-none transition-all duration-300" />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B6A50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="z-10">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B6A50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 absolute z-10">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </div>

              <div className="drag-hint absolute -top-14 whitespace-nowrap text-[10px] font-bold tracking-[0.35em] uppercase text-[#2C2416] bg-white/90 backdrop-blur-md px-5 py-2 rounded-full invisible pointer-events-none shadow-xl border border-white">
                &larr; Drag To Reveal &rarr;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2.5 CLINICAL STORYTELLING BARS (Journal Card) ── */}
      <div className="clinical-card relative z-10 w-full max-w-xl px-6 mb-32 flex flex-col gap-6 invisible bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[32px] shadow-[0_40px_80px_rgba(44,36,22,0.06)]">
        <h3 className="font-serif text-[32px] text-[#2C2416] text-center mb-6">14 Days Clinical Trial</h3>
        
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex justify-between font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B5B48] mb-3">
              <span>Week 1 &bull; Hydration Retention</span>
              <span className="text-[#8B6A50]">+31%</span>
            </div>
            <div className="w-full h-[2px] bg-[#C89B6D]/20 rounded-full overflow-hidden">
              <div className="prog-bar h-full bg-[#C89B6D]" data-width="31%"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B5B48] mb-3">
              <span>Week 2 &bull; Smoother Texture</span>
              <span className="text-[#8B6A50]">+54%</span>
            </div>
            <div className="w-full h-[2px] bg-[#C89B6D]/20 rounded-full overflow-hidden">
              <div className="prog-bar h-full bg-[#C89B6D]" data-width="54%"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B5B48] mb-3">
              <span>Week 3 &bull; Visible Glow & Radiance</span>
              <span className="text-[#8B6A50]">+76%</span>
            </div>
            <div className="w-full h-[2px] bg-[#C89B6D]/20 rounded-full overflow-hidden">
              <div className="prog-bar h-full bg-[#C89B6D]" data-width="76%"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. EDITORIAL TESTIMONIAL MARQUEE ── */}
      <div className="relative z-10 w-full overflow-hidden mb-24 py-10 flex items-center">
        {/* Soft edge fades */}
        <div className="absolute inset-y-0 left-0 w-[20vw] bg-gradient-to-r from-[#F8F4EF] via-[#F8F4EF]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[20vw] bg-gradient-to-l from-[#F8F4EF] via-[#F8F4EF]/80 to-transparent z-20 pointer-events-none" />
        
        <div ref={marqueeRef} className="flex items-center w-max will-change-transform">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((test, i) => (
            <div key={i} className="flex-shrink-0 w-[320px] md:w-[460px] mx-6 bg-white/60 backdrop-blur-xl border border-white/80 p-8 md:p-10 rounded-[32px] shadow-[0_20px_40px_rgba(44,36,22,0.05)] cursor-pointer hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(44,36,22,0.1)] transition-all duration-500 group">
              <div className="flex gap-1 text-[#C89B6D] mb-5 text-[14px]">
                ★★★★★
              </div>
              <p className="font-serif italic text-[20px] md:text-[24px] text-[#2C2416] leading-snug mb-8">
                &quot;{test.text}&quot;
              </p>
              <div className="flex items-center gap-5 border-t border-[#C89B6D]/20 pt-5">
                <div className="w-12 h-12 rounded-full bg-[#E6D7C0] flex items-center justify-center font-serif text-[#8B6A50] font-bold text-[18px]">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <p className="font-sans text-[13px] font-bold text-[#2C2416] uppercase tracking-[0.15em] mb-1">{test.name}</p>
                  <p className="font-sans text-[10px] text-[#8B6A50] uppercase tracking-widest">{test.dur}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. SCIENTIFIC TRUST STRIP ── */}
      <div className="trust-strip relative z-10 w-full max-w-[1200px] px-6">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-8 border-y border-[#C89B6D]/20 py-8">
          {TRUST_BADGES.map((badge, i) => (
            <div key={i} className="badge-item flex items-center gap-3 px-4 py-2 invisible">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C89B6D]" />
              <span className="font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B5B48] whitespace-nowrap">
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}