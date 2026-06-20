"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloader } from "@/components/providers/PreloaderProvider";

gsap.registerPlugin(ScrollTrigger);

// ─── RITUAL DATA (Cleaned up, no massive background glows) ───────────────────
const RITUALS = [
  {
    id: "cleanse",
    name: "Cleanse",
    title: "The Purifying Base",
    bgText: "CLEANSE",
    desc: "Sweep away urban impurities without stripping the skin's essential lipid barrier. A meticulously crafted formula.",
    benefit: "Maintains natural microbiome.",
    texture: "Silky milk-to-oil",
    ingredients: ["Oat Extract", "Ceramides"],
    bestFor: "Sensitive & Dry Skin",
    result: "Purified, soft canvas",
    microLeft: "001 / Lipid Respect",
    microRight: "Seoul Laboratory",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600&h=800",
    particleColor: "#B4D2E6",
  },
  {
    id: "treat",
    name: "Treat",
    title: "Active Infusion",
    bgText: "TREAT",
    desc: "Targeted cellular repair. High-potency fermented actives penetrate the dermal layers to refine pores.",
    benefit: "Sparks collagen synthesis.",
    texture: "Water-light essence",
    ingredients: ["Niacinamide", "Kombucha"],
    bestFor: "Enlarged Pores",
    result: "Refined, balanced tone",
    microLeft: "002 / Active Ferment",
    microRight: "Clinical Synthesis",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600&h=800",
    particleColor: "#C8DCBE",
  },
  {
    id: "protect",
    name: "Protect",
    title: "Barrier Defense",
    bgText: "PROTECT",
    desc: "A breathable shield of deep hydration. Adaptogenic ginseng locks in moisture against environmental stressors.",
    benefit: "Defends against urban stress.",
    texture: "Whipped cloud cream",
    ingredients: ["Ginseng Root", "Squalane"],
    bestFor: "Compromised Barriers",
    result: "Deeply fortified shield",
    microLeft: "003 / Adaptogen",
    microRight: "Korean Highlands",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600&h=800",
    particleColor: "#E6BEA0",
  },
  {
    id: "glow",
    name: "Glow",
    title: "Radiance Finish",
    bgText: "GLOW",
    desc: "The final signature touch. A weightless emulsion that leaves the skin with an unmistakable luminosity.",
    benefit: "Light-reflecting perfection.",
    texture: "Luminous emulsion",
    ingredients: ["Pearl Extract", "Hyaluronic"],
    bestFor: "Dullness & Uneven Texture",
    result: "Glass-like radiance",
    microLeft: "004 / Light Refraction",
    microRight: "Signature Finish",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600&h=800",
    particleColor: "#F0D7AA",
  },
];

// ─── HELPER: TEXT SPLITTER ────────────────────────────────────────────────────
// We removed character-level splitting because it breaks kerning and baseline alignment 
// for elegant serif/display fonts like Orange Vintage.
const SplitLine = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("\n").map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden pb-2">
          <span className="split-line inline-block will-change-transform opacity-0 translate-y-[100%]">
            {line}
          </span>
        </span>
      ))}
    </span>
  );
};

export function RitualBuilder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxTargets = useRef<(HTMLDivElement | null)[]>([]);
  const { isComplete } = usePreloader();

  useEffect(() => {
    if (!isComplete) return;

    const ctx = gsap.context(() => {
      const wrap = containerRef.current;
      const sticky = stickyRef.current;
      if (!wrap || !sticky) return;

      // ─── 1. INITIAL SETUPS (Prevent Flashing) ───
      gsap.set(".scene-content:not(.scene-0)", { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(".huge-bg-text:not(.bg-text-0)", { autoAlpha: 0, yPercent: 15 });
      gsap.set(".particle-burst", { autoAlpha: 0, scale: 0 });
      gsap.set(".section-eyebrow", { autoAlpha: 0, y: 15 });
      gsap.set(".glare-layer", { opacity: 0 });

      // Organic Wave Parallax Entrance
      if (waveRef.current) {
        gsap.fromTo(waveRef.current, 
          { scaleY: 0.5 }, 
          { scaleY: 1, duration: 2, ease: "power2.out", transformOrigin: "bottom", scrollTrigger: { trigger: wrap, start: "top 80%", once: true } }
        );
      }

      // Accelerated Entrance Sequence
      const entranceTl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: "top 60%", once: true } });

      entranceTl
        .to(".section-eyebrow", { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" })
        .to(".section-eyebrow .split-line", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.8")
        .to(".bg-text-0", { autoAlpha: 0.02, yPercent: 0, duration: 1.5, ease: "power4.out" }, "-=0.8")
        .fromTo(".scene-0 .center-product",
          { y: 50, z: -100, rotationX: 10, scale: 0.8, opacity: 0 },
          { y: 0, z: 0, rotationX: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", force3D: true }, "-=1.2")
        .fromTo(".scene-0 .micro-detail", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(2)" }, "-=0.8")
        .to(".scene-0 .split-line", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=1")
        .fromTo(".scene-0 .left-fade", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.8")
        .fromTo(".scene-0 .right-fade", { x: 15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.8");

      // ─── 2. MASTER SCROLL TIMELINE ───
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      }

      const totalSteps = RITUALS.length;
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=400%", // Let GSAP dictate the duration/spacing
          pin: sticky, // Use pure GSAP pinning
          scrub: 1.5, // Increased scrub smoothing for a silkier feel
          onUpdate: (self) => {
            if (pathRef.current) {
              const length = pathRef.current.getTotalLength();
              gsap.set(pathRef.current, { strokeDashoffset: length - (self.progress * length) });
            }
            const currentIndex = Math.min(Math.floor(self.progress * (totalSteps + 1)), totalSteps);
            progressNodesRef.current.forEach((node, i) => {
              if (!node) return;
              gsap.to(node, { backgroundColor: i <= currentIndex ? "#C89B6D" : "rgba(200,155,109,0.3)", scale: i === currentIndex ? 1.5 : 1, duration: 0.3, overwrite: "auto" });
            });
          }
        }
      });

      // ─── 3. OVERLAPPING CINEMATIC CROSSFADES ───
      RITUALS.forEach((ritual, i) => {
        if (i === 0) {
          scrollTl.to({}, { duration: 0.05 }); // Minimal reading zone for first item to start instantly
          return;
        }

        scrollTl.to({}, { duration: 1.0 }); // Reading Zone

        const prev = `.scene-${i - 1}`;
        const curr = `.scene-${i}`;
        const prevBg = `.bg-text-${i - 1}`;
        const currBg = `.bg-text-${i}`;

        scrollTl.addLabel(`step${i}`);

        // --- Fade OUT Previous Scene ---
        scrollTl.to(`${prev} .center-product`, { scale: 0.8, y: -30, opacity: 0, duration: 0.8, ease: "power2.inOut", force3D: true }, `step${i}`)
          .to(`${prev} .particle-burst`, { autoAlpha: 1, scale: 2, duration: 1.0, ease: "power3.out" }, `step${i}`)
          .to(`${prev} .left-fade, ${prev} .right-fade, ${prev} .split-line, ${prev} .micro-detail`, { autoAlpha: 0, y: -15, duration: 0.5, stagger: 0.02, ease: "power2.inOut" }, `step${i}`)
          .to(prevBg, { yPercent: -15, autoAlpha: 0, duration: 1.0, ease: "power2.inOut" }, `step${i}`);

        // --- Fade IN New Scene ---
        const enterOffset = `step${i}+=0.3`;

        scrollTl.to(curr, { autoAlpha: 1, pointerEvents: "auto", duration: 0.1 }, enterOffset)
          .fromTo(`${curr} .center-product`,
            { scale: 0.8, z: -100, y: 50, rotationX: 10, opacity: 0 },
            { scale: 1, z: 0, y: 0, rotationX: 0, opacity: 1, duration: 1.2, ease: "power3.out", force3D: true }, enterOffset)
          .fromTo(`${curr} .micro-detail`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(2)" }, `${enterOffset}+=0.2`)
          .fromTo(`${curr} .split-line`, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, `${enterOffset}+=0.3`)
          .fromTo(`${curr} .left-fade`, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, `${enterOffset}+=0.4`)
          .fromTo(`${curr} .right-fade`, { x: 15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, `${enterOffset}+=0.4`)
          .to(currBg, { autoAlpha: 0.02, yPercent: 0, duration: 1.0, ease: "power3.out" }, enterOffset);
      });

      // ─── 4. FINAL ASSEMBLY REVEAL ───
      scrollTl.to({}, { duration: 1.0 });

      scrollTl.addLabel("finalReveal");
      scrollTl.to(".scene-3", { autoAlpha: 0, scale: 0.8, y: -30, duration: 0.8, ease: "power2.inOut", force3D: true }, "finalReveal")
        .to(".bg-text-3", { autoAlpha: 0, duration: 0.8 }, "finalReveal")
        .to(".section-eyebrow", { autoAlpha: 0, y: -20, duration: 0.8, ease: "power2.inOut" }, "finalReveal") // Fade out top heading
        .to(".final-assembly", { autoAlpha: 1, pointerEvents: "auto", duration: 0.1 }, "finalReveal+=0.4")
        .fromTo(".final-card",
          { scale: 0.8, y: 50, autoAlpha: 0, rotationY: 15, z: -100 },
          { scale: 1, y: 0, autoAlpha: 1, rotationY: 0, z: 0, duration: 1.2, stagger: 0.1, ease: "power3.out", force3D: true }, "finalReveal+=0.4")
        .fromTo(".final-ui", { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "finalReveal+=0.8");

      // ─── 5. INTERACTIVE PARALLAX & TILT (Replacing float animation) ───
      gsap.to(".micro-detail", { y: 5, rotationZ: -1, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 1 });

      const xTo = gsap.quickTo(parallaxTargets.current, "rotationY", { duration: 0.8, ease: "power3.out" });
      const yTo = gsap.quickTo(parallaxTargets.current, "rotationX", { duration: 0.8, ease: "power3.out" });
      const xPosTo = gsap.quickTo(parallaxTargets.current, "x", { duration: 1.2, ease: "power3.out" });
      const yPosTo = gsap.quickTo(parallaxTargets.current, "y", { duration: 1.2, ease: "power3.out" });

      const glareTargets = gsap.utils.toArray(".glare-layer") as HTMLElement[];
      const glareXTo = glareTargets.map(t => gsap.quickTo(t, "x", { duration: 0.4, ease: "power3.out" }));
      const glareYTo = glareTargets.map(t => gsap.quickTo(t, "y", { duration: 0.4, ease: "power3.out" }));
      const glareOpacityTo = glareTargets.map(t => gsap.quickTo(t, "opacity", { duration: 0.4, ease: "power3.out" }));

      const handleMouseMove = (e: MouseEvent) => {
        const xPercent = (e.clientX / window.innerWidth) - 0.5;
        const yPercent = (e.clientY / window.innerHeight) - 0.5;

        // Tilt effect
        xTo(xPercent * 15); // RotateY based on X
        yTo(yPercent * -15); // RotateX based on Y

        // Subtle positional parallax
        xPosTo(xPercent * 20);
        yPosTo(yPercent * 20);

        // Glare effect
        glareTargets.forEach((_, idx) => {
          glareXTo[idx](xPercent * 100);
          glareYTo[idx](yPercent * 100);
          glareOpacityTo[idx](0.3 + Math.abs(xPercent * 0.4));
        });
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
        xPosTo(0);
        yPosTo(0);
        glareTargets.forEach((_, idx) => glareOpacityTo[idx](0));
      };

      window.addEventListener("mousemove", handleMouseMove);
      wrap.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        wrap.removeEventListener("mouseleave", handleMouseLeave);
      };

    }, containerRef);
    return () => ctx.revert();
  }, [isComplete]);

  return (
    <section ref={containerRef} className="relative bg-[#F7F4EF] w-full" style={{ paddingTop: 80, paddingBottom: 100 }}>
      {/* ── Organic wave topper ── */}
      <div
        ref={waveRef}
        aria-hidden
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{ top: -198, width: "100%" }}
      >
        <svg
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 200 }}
        >
          <defs>
            <filter id="waveShadowRitual" x="-5%" y="-40%" width="110%" height="200%">
              <feDropShadow
                dx="0"
                dy="-12"
                stdDeviation="20"
                floodColor="rgba(50,32,14,0.13)"
              />
            </filter>
          </defs>
          <path
            d="
              M0,40
              C 160,160 320,20 540,90
              C 720,150 900,10  1080,80
              C 1220,135 1340,30 1440,75
              L1440,200 L0,200 Z
            "
            fill="#F7F4EF"
            filter="url(#waveShadowRitual)"
          />
        </svg>
      </div>

      <div ref={stickyRef} className="h-screen w-full overflow-hidden flex flex-col items-center justify-center perspective-[2000px]">

        {/* ── CLEAN ATMOSPHERE (No Giant Bubbles) ── */}
        <div className="absolute inset-0 pointer-events-none z-[1] mix-blend-multiply opacity-[0.035] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Subtle Edge Vignettes for depth */}
        <div className="absolute inset-y-0 left-0 w-[15vw] bg-gradient-to-r from-[#EAE5DB]/40 to-transparent z-[5] pointer-events-none mix-blend-multiply" />
        <div className="absolute inset-y-0 right-0 w-[15vw] bg-gradient-to-l from-[#EAE5DB]/40 to-transparent z-[5] pointer-events-none mix-blend-multiply" />

        {/* ── SECTION HEADING ── */}
        <div className="section-eyebrow absolute top-12 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-4 invisible pointer-events-none text-center whitespace-nowrap">
          <div className="flex items-center gap-6">
            <div className="w-12 h-[1px] bg-gradient-to-l from-[#C89B6D]/50 to-transparent" />
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#8B6A50] font-semibold">Beauty Ritual Builder</span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-[#C89B6D]/50 to-transparent" />
          </div>
          <h2 className="font-orange text-[clamp(28px,4vw,42px)] text-[#2C2416] tracking-tight">
            <SplitLine text="Craft Your Perfect Ritual" />
          </h2>
        </div>

        {/* ── MASSIVE TYPOGRAPHY (Background) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden">
          {RITUALS.map((ritual, i) => (
            <h2 key={ritual.id} className={`huge-bg-text bg-text-${i} absolute font-orange text-[#2C2416] tracking-tight leading-none whitespace-nowrap will-change-transform opacity-0`} style={{ fontSize: "22vw" }}>
              {ritual.bgText}
            </h2>
          ))}
        </div>

        {/* ── 3-COLUMN EDITORIAL STAGE ── */}
        <div className="relative z-10 w-full max-w-[1600px] h-[75vh] flex items-center px-8 lg:px-16 mt-8">

          {RITUALS.map((ritual, i) => (
            <div key={ritual.id} className={`scene-content scene-${i} absolute inset-0 flex flex-col md:flex-row items-center justify-between w-full h-full will-change-transform invisible`}>

              {/* LEFT COLUMN: Storytelling */}
              <div className="flex flex-col items-start text-left w-full md:w-[30%] z-20 pl-8 lg:pl-16">
                <p className="left-fade text-[#C89B6D] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
                  Step 0{i + 1} &mdash; {ritual.name}
                </p>
                <h3 className="font-orange text-[clamp(42px,6vw,68px)] leading-[1.05] tracking-[-0.02em] text-[#2C2416] mb-8">
                  <SplitLine text={ritual.title} />
                </h3>
                <p className="left-fade font-sans text-[14px] text-[#6B5B48] leading-[1.8] max-w-sm mb-6">
                  {ritual.desc}
                </p>
                <div className="left-fade flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[#C89B6D]" />
                  <p className="font-serif italic text-[18px] text-[#8B6A50]">{ritual.benefit}</p>
                </div>
              </div>

              {/* CENTER COLUMN: Floating Product Hero */}
              <div
                ref={el => { parallaxTargets.current[i] = el; }}
                className="relative w-full md:w-[40%] h-[70vh] flex items-center justify-center z-10"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Simulated Particle Burst (Triggers on droplet collapse) */}
                <div className="particle-burst absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                  {Array.from({ length: 15 }).map((_, pIdx) => {
                    const pseudoRandomOffset = ((pIdx * 41) % 180) + 120;
                    return (
                      <div key={pIdx} className="absolute w-2 h-2 rounded-full blur-[2px]" style={{ backgroundColor: ritual.particleColor, transform: `rotate(${pIdx * 24}deg) translateY(${pseudoRandomOffset}px)` }} />
                    );
                  })}
                </div>

                {/* Micro Detail Labels */}
                <div className="micro-detail absolute top-[20%] left-0 z-30 bg-white/70 backdrop-blur-md border border-white/60 px-4 py-2 rounded-full shadow-lg">
                  <span className="font-sans text-[9px] uppercase tracking-widest text-[#5C4D3C] font-semibold">{ritual.microLeft}</span>
                </div>
                <div className="micro-detail absolute bottom-[25%] right-0 z-30 bg-[#2C2416]/85 backdrop-blur-md border border-[#2C2416]/50 px-4 py-2 rounded-full shadow-lg">
                  <span className="font-sans text-[9px] uppercase tracking-widest text-[#F7F4EF] font-semibold">{ritual.microRight}</span>
                </div>

                {/* The Hero Image */}
                <div className="center-product relative w-[280px] md:w-[340px] aspect-[3/4] rounded-[40px] overflow-hidden bg-[#F4EFE8] will-change-transform z-10"
                  style={{ boxShadow: "0 60px 120px rgba(44,36,22,0.1), 0 20px 40px rgba(44,36,22,0.06), inset 0 0 20px rgba(255,255,255,0.6)" }}>
                  <Image src={ritual.image} alt={ritual.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover scale-105" priority={i === 0} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2C2416]/10 mix-blend-multiply" />
                  <div className="glare-layer absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,transparent_60%)] w-[150%] h-[150%] -top-1/4 -left-1/4 mix-blend-overlay" />
                </div>

                {/* Drop Shadow Under Product */}
                <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[240px] h-[25px] bg-[#2C2416] blur-[25px] opacity-15 rounded-[100%]" />
              </div>

              {/* RIGHT COLUMN: Premium Contextual Information */}
              <div className="flex flex-col items-end text-right w-full md:w-[30%] z-20 pr-8 lg:pr-16">

                <div className="right-fade w-full border-b border-[#C89B6D]/20 pb-4 mb-6">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#A68B74] font-bold mb-2">Texture</p>
                  <p className="font-serif text-[20px] text-[#2C2416]">{ritual.texture}</p>
                </div>

                <div className="right-fade w-full border-b border-[#C89B6D]/20 pb-4 mb-6">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#A68B74] font-bold mb-2">Key Ingredients</p>
                  <p className="font-serif text-[20px] text-[#2C2416]">{ritual.ingredients.join(" · ")}</p>
                </div>

                <div className="right-fade w-full border-b border-[#C89B6D]/20 pb-4 mb-6">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#A68B74] font-bold mb-2">Best For</p>
                  <p className="font-serif text-[20px] text-[#2C2416]">{ritual.bestFor}</p>
                </div>

                <div className="right-fade w-full pb-4">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#A68B74] font-bold mb-2">Expected Result</p>
                  <p className="font-serif text-[20px] text-[#2C2416] italic">{ritual.result}</p>
                </div>

              </div>
            </div>
          ))}

          {/* ── FINAL ASSEMBLY REVEAL ── */}
          <div className="final-assembly absolute inset-0 flex flex-col items-center justify-center opacity-0 z-30 pointer-events-none invisible">
            <h3 className="final-ui font-orange text-[clamp(40px,7vw,80px)] leading-[1.05] tracking-[-0.02em] text-[#2C2416] mb-4">
              Your Aurey Ritual
            </h3>
            <div className="final-ui flex items-center gap-6 mb-16 font-sans text-[10px] tracking-[0.25em] uppercase text-[#8B6A50] font-semibold">
              <span>Estimated: 4 Minutes</span>
              <span className="w-1 h-1 rounded-full bg-[#8B6A50]" />
              <span>AM / PM Focus</span>
            </div>

            <div className="flex items-center justify-center gap-[-30px] md:gap-[-40px] mb-16" style={{ perspective: "1200px" }}>
              {RITUALS.map((r, i) => (
                <div key={i} className={`final-card relative w-[130px] md:w-[190px] aspect-[3/4] rounded-[24px] overflow-hidden shadow-[0_30px_60px_rgba(44,36,22,0.15)] border border-white/80 -ml-10 first:ml-0`} style={{ zIndex: 10 - i, transformStyle: "preserve-3d" }}>
                  <Image src={r.image} alt={r.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              ))}
            </div>

            <button className="final-ui pointer-events-auto relative overflow-hidden group bg-[#2C2416] text-[#F7F4EF] font-sans text-[11px] tracking-[0.25em] uppercase px-14 py-6 rounded-full transition-all duration-500 hover:-translate-y-1 shadow-[0_20px_40px_rgba(44,36,22,0.2)]">
              <span className="relative z-10 flex items-center gap-4">
                Add Entire Ritual <span className="opacity-50 line-through text-[9px]">₹5,296</span> ₹4,499
              </span>
              <div className="absolute top-0 left-[-100%] w-[120%] h-full bg-gradient-to-r from-transparent via-[#C89B6D]/20 to-transparent skew-x-[-20deg] transition-all duration-[800ms] group-hover:left-[100%]" />
            </button>
          </div>

        </div>

        {/* ── PREMIUM STEP NAVIGATION ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[900px] px-8 z-40 hidden md:block">
          <div className="relative flex items-center justify-between w-full h-[60px]">

            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#C89B6D]/15 -translate-y-1/2" />
            <svg className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 pointer-events-none" preserveAspectRatio="none">
              <path ref={pathRef} d="M0,0 L900,0" fill="none" stroke="#C89B6D" strokeWidth="2" />
            </svg>

            {RITUALS.map((ritual, i) => (
              <div key={ritual.id} className="relative flex flex-col items-center justify-center w-20 h-full">
                <div ref={el => { progressNodesRef.current[i] = el; }} className="w-2.5 h-2.5 rounded-full bg-[#C89B6D]/30 z-10 shadow-[0_0_10px_rgba(200,155,109,0.2)] will-change-transform" />
                <span className="absolute top-full mt-3 font-sans text-[9px] uppercase tracking-[0.3em] text-[#8B6A50] font-bold whitespace-nowrap">
                  {ritual.name}
                </span>
              </div>
            ))}

            <div className="relative flex flex-col items-center justify-center w-20 h-full">
              <div ref={el => { progressNodesRef.current[4] = el; }} className="w-2.5 h-2.5 rounded-full bg-[#C89B6D]/30 z-10 shadow-lg will-change-transform" />
              <span className="absolute top-full mt-3 font-sans text-[9px] uppercase tracking-[0.3em] text-[#8B6A50] font-bold whitespace-nowrap">
                Complete
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}