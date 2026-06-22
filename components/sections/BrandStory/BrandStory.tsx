"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloader } from "@/components/providers/PreloaderProvider";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

const row1Data = [
  { text: "MINIMALISM", img: "https://res.cloudinary.com/dtslaveid/image/upload/v1781883818/34f50ee6-ff57-4ef0-9abf-fced606a00d3_g5u18o.png", shape: "circle" },
  { text: "KOREAN RITUALS", img: "https://res.cloudinary.com/dtslaveid/image/upload/v1781883720/b37a009b-df8a-41c0-9c6b-45f0ea9f021b_xp9ypu.png", shape: "pill-h" },
  { text: "SKIN SCIENCE", img: "https://res.cloudinary.com/dtslaveid/image/upload/v1781883818/34f50ee6-ff57-4ef0-9abf-fced606a00d3_g5u18o.png", shape: "organic" },
  { text: "PURITY", img: "https://res.cloudinary.com/dtslaveid/image/upload/v1781883987/79293189-90c6-4e39-9e71-99a9211381a6_dj9sm8.png", shape: "pill-h" },
];

const row2Data = [
  { text: "RICE WATER", img: "https://res.cloudinary.com/dtslaveid/image/upload/v1781883717/425f1dac-494d-439d-bd23-9be06013beaf_wzutyt.png", shape: "pill-v" },
  { text: "FERMENTED ACTIVES", img: "https://res.cloudinary.com/dtslaveid/image/upload/v1781883720/b37a009b-df8a-41c0-9c6b-45f0ea9f021b_xp9ypu.png", shape: "pill-h" },
  { text: "GINSENG ROOT", img: "https://res.cloudinary.com/dtslaveid/image/upload/v1781883818/34f50ee6-ff57-4ef0-9abf-fced606a00d3_g5u18o.png", shape: "circle" },
  { text: "INDIAN SKIN", img: "https://res.cloudinary.com/dtslaveid/image/upload/v1781883987/79293189-90c6-4e39-9e71-99a9211381a6_dj9sm8.png", shape: "organic" },
];

const getShapeClasses = (shape: string) => {
  switch (shape) {
    case "pill-h": return "w-[100px] md:w-[160px] h-[60px] md:h-[90px] rounded-full";
    case "pill-v": return "w-[60px] md:w-[90px] h-[90px] md:h-[130px] rounded-full";
    case "organic": return "w-[90px] md:w-[130px] h-[70px] md:h-[100px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%]";
    default: return "w-[80px] md:w-[110px] h-[80px] md:h-[110px] rounded-full";
  }
};

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1ParallaxRef = useRef<HTMLDivElement>(null);
  const row2ParallaxRef = useRef<HTMLDivElement>(null);
  const row1LoopRef = useRef<HTMLDivElement>(null);
  const row2LoopRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const eyebrowWrapRef = useRef<HTMLDivElement>(null);
  const leakRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { isComplete } = usePreloader();

  useEffect(() => {
    if (!isComplete) return;

    const ctx = gsap.context(() => {

      /* ── 1. Sheet-peel initial states ── */
      gsap.set(eyebrowWrapRef.current, { clipPath: "inset(0 0 100% 0)", y: 20 });
      gsap.set(dividerRef.current, { scaleX: 0, opacity: 0, transformOrigin: "center center" });
      gsap.set(".bs-row-1", { clipPath: "inset(100% -50% -50% -50%)", y: 60 });
      gsap.set(".bs-row-2", { clipPath: "inset(100% -50% -50% -50%)", y: 60 });

      const revealTl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });

      revealTl
        .from(sectionRef.current, { yPercent: 5, opacity: 0, duration: 1.2, ease: "power3.out" }, 0)
        // eyebrow peels up from bottom mask
        .to(eyebrowWrapRef.current, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.85, ease: "power4.out" }, 0.2)
        // divider fans out from center
        .to(dividerRef.current, { scaleX: 1, opacity: 1, duration: 1.1, ease: "power4.out" }, 0.45)
        // marquee row 1 peels up
        .to(".bs-row-1", { clipPath: "inset(-50% -50% -50% -50%)", y: 0, duration: 1.35, ease: "power3.out" }, 0.55)
        // marquee row 2 peels up staggered
        .to(".bs-row-2", { clipPath: "inset(-50% -50% -50% -50%)", y: 0, duration: 1.35, ease: "power3.out" }, 0.72)
        // image capsules pop in
        .fromTo(".image-capsule",
          { scale: 0.82, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.0, stagger: 0.07, ease: "back.out(1.4)" },
          0.75
        );

      /* ── 2. Ambient light leak drift ── */
      leakRefs.current.forEach((leak, i) => {
        if (!leak) return;
        gsap.to(leak, {
          x: `random(-120, 120)`, y: `random(-100, 100)`, scale: `random(0.9, 1.25)`,
          duration: `random(18, 28)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 1.5,
        });
      });

      /* ── 3. Infinite marquee loops ── */
      const setupLoop = (ref: React.RefObject<HTMLDivElement | null>, dir: 1 | -1, dur: number) => {
        const el = ref.current;
        if (!el) return;
        if (dir === -1) gsap.set(el, { xPercent: -50 });
        const tw = gsap.to(el, { xPercent: dir === 1 ? -50 : 0, repeat: -1, duration: dur, ease: "none" });
        el.addEventListener("mouseenter", () => gsap.to(tw, { timeScale: 0.2, duration: 0.8, ease: "power2.out", overwrite: true }));
        el.addEventListener("mouseleave", () => gsap.to(tw, { timeScale: 1, duration: 0.8, ease: "power2.inOut", overwrite: true }));
        return tw;
      };

      const loop1 = setupLoop(row1LoopRef, 1, 55);
      const loop2 = setupLoop(row2LoopRef, -1, 60);

      /* ── 4. Scroll-velocity boost + skew ── */
      let vt1: gsap.core.Tween | null = null;
      let vt2: gsap.core.Tween | null = null;
      Observer.create({
        target: window, type: "wheel,touch,scroll",
        onChangeY: (self) => {
          const boost = gsap.utils.clamp(-4, 4, self.deltaY * 0.04);
          if (loop1) { vt1?.kill(); vt1 = gsap.to(loop1, { timeScale: 1 + Math.abs(boost), duration: 0.3, ease: "power2.out", overwrite: true, onComplete: () => { vt1 = gsap.to(loop1, { timeScale: 1, duration: 1.2, ease: "power3.out" }); } }); }
          if (loop2) { vt2?.kill(); vt2 = gsap.to(loop2, { timeScale: 1 + Math.abs(boost), duration: 0.3, ease: "power2.out", overwrite: true, onComplete: () => { vt2 = gsap.to(loop2, { timeScale: 1, duration: 1.2, ease: "power3.out" }); } }); }
          gsap.to([row1ParallaxRef.current, row2ParallaxRef.current], { skewX: gsap.utils.clamp(-3, 3, boost), duration: 0.4, ease: "power2.out", overwrite: "auto" });
        },
      });

      /* ── 5. Scroll parallax ── */
      gsap.to(row1ParallaxRef.current, { x: -80, scrollTrigger: { trigger: sectionRef.current, scrub: 1 } });
      gsap.to(row2ParallaxRef.current, { x: 80, scrollTrigger: { trigger: sectionRef.current, scrub: 1 } });
      gsap.to(".image-capsule", { y: -50, scrollTrigger: { trigger: sectionRef.current, scrub: 1 } });

    }, sectionRef);
    return () => ctx.revert();
  }, [isComplete]);

  const leaks = [
    { color: "#D9B98E", top: "10%", left: "5%", size: "45vw" },
    { color: "#F3EFEA", top: "55%", left: "70%", size: "50vw" },
    { color: "#D9B98E", top: "75%", left: "15%", size: "38vw" },
    { color: "#F3EFEA", top: "20%", left: "60%", size: "42vw" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex flex-col justify-center min-h-[60vh] bg-[#F7F4EF] overflow-x-clip py-20 md:py-24 rounded-t-[48px] md:rounded-t-[64px] will-change-transform"
      style={{ boxShadow: "0 -30px 80px rgba(0,0,0,0.05)" }}
    >
      {/* Premium Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] opacity-[0.03]">
        <h2 className="text-[35vw] font-['Manrope'] font-bold tracking-tighter whitespace-nowrap select-none text-[#8B6A50]">AUREY</h2>
      </div>

      {/* Grainy Noise Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-[-100px] opacity-[0.04] pointer-events-none z-[3] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Atmospheric light leaks */}
      <div className="absolute top-0 left-0 right-0 bottom-[-100px] pointer-events-none overflow-hidden z-[2]">
        {leaks.map((leak, i) => (
          <div key={i} ref={(el) => { leakRefs.current[i] = el; }}
            className="absolute rounded-full blur-[120px] opacity-30 will-change-transform"
            style={{
              width: leak.size, height: leak.size, top: leak.top, left: leak.left,
              background: `radial-gradient(circle, ${leak.color} 0%, transparent 70%)`
            }}
          />
        ))}
      </div>

      {/* ── Eyebrow + divider — sheet peel ── */}
      <div className="relative z-[4] w-full flex flex-col items-center justify-center mb-16 md:mb-20">
        {/* Clip mask wrapper — hides element below its own baseline until revealed */}
        <div style={{ overflow: "hidden", paddingBottom: 6 }}>
          <div ref={eyebrowWrapRef} style={{ willChange: "clip-path, transform" }}>
            <h4 className="text-[12px] font-semibold tracking-[0.35em] text-[#8B6A50] uppercase inline-block mb-4">
              The Aurey Philosophy
            </h4>
          </div>
        </div>

        <div ref={dividerRef} className="flex items-center justify-center w-[180px] opacity-0 origin-center">
          <span className="w-1.5 h-1.5 rounded-full border border-[#8B6A50]/40" />
          <span className="h-[1px] w-full bg-gradient-to-r from-[#8B6A50]/10 via-[#8B6A50]/30 to-[#8B6A50]/10" />
          <span className="w-1.5 h-1.5 rounded-full border border-[#8B6A50]/40" />
        </div>
      </div>

      {/* ── Marquee Tape Rows ── */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center gap-8 md:gap-16 overflow-hidden py-8 md:py-12">
        
        {/* ROW 1 TAPE: Dark, angled upwards */}
        <div className="bs-row-1 relative z-[2] w-full flex items-center justify-center pointer-events-none">
          <div style={{ transform: "rotate(-3deg)" }} className="pointer-events-auto w-full flex justify-center">
            <div 
              ref={row1ParallaxRef} 
              className="w-[150vw] shrink-0 bg-[#1D1712] py-4 md:py-6 shadow-[0_20px_50px_rgba(29,23,18,0.3)] border-y border-[#3E342B]"
            >
              <div className="flex items-center w-max will-change-transform" ref={row1LoopRef}>
                {[...row1Data, ...row1Data].map((item, index) => (
                  <div key={`r1-${index}`} className="flex items-center mx-6 md:mx-10 group">
                    <span
                      className="marquee-text font-['Manrope',sans-serif] text-[clamp(45px,6vw,90px)] font-medium whitespace-nowrap leading-none tracking-tight text-[#F7F4EF] opacity-80 transition-opacity duration-500"
                    >{item.text}</span>

                    <div
                      className={`image-capsule mx-6 md:mx-10 ${getShapeClasses(item.shape)} relative overflow-hidden shadow-lg border border-white/20 z-[3] will-change-transform transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer`}
                      style={{ transform: "translateZ(0)" }}
                      onMouseEnter={(e) => { const s = e.currentTarget.parentElement?.querySelector(".marquee-text") as HTMLElement | null; if (s) gsap.to(s, { opacity: 1, duration: 0.5, ease: "power2.out" }); }}
                      onMouseLeave={(e) => { const s = e.currentTarget.parentElement?.querySelector(".marquee-text") as HTMLElement | null; if (s) gsap.to(s, { opacity: 0.8, duration: 0.5, ease: "power2.inOut" }); }}
                    >
                      <img src={item.img} alt={item.text} className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-[#1D1712]/10 backdrop-blur-[2px] opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 TAPE: Gold, angled downwards */}
        <div className="bs-row-2 relative z-[1] w-full flex items-center justify-center pointer-events-none">
          <div style={{ transform: "rotate(2deg)" }} className="pointer-events-auto w-full flex justify-center">
            <div 
              ref={row2ParallaxRef} 
              className="w-[150vw] shrink-0 bg-[#D4B895] py-4 md:py-6 shadow-[0_30px_60px_rgba(139,106,80,0.15)] border-y border-white/40"
            >
              <div className="flex items-center w-max will-change-transform" ref={row2LoopRef}>
                {[...row2Data, ...row2Data].map((item, index) => (
                  <div key={`r2-${index}`} className="flex items-center mx-6 md:mx-10 group">
                    <div
                      className={`image-capsule mx-6 md:mx-10 ${getShapeClasses(item.shape)} relative overflow-hidden shadow-lg border border-[#8B6A50]/20 z-[3] will-change-transform transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer`}
                      style={{ transform: "translateZ(0)" }}
                      onMouseEnter={(e) => { const s = e.currentTarget.parentElement?.querySelector(".marquee-text") as HTMLElement | null; if (s) gsap.to(s, { opacity: 1, duration: 0.5, ease: "power2.out" }); }}
                      onMouseLeave={(e) => { const s = e.currentTarget.parentElement?.querySelector(".marquee-text") as HTMLElement | null; if (s) gsap.to(s, { opacity: 0.8, duration: 0.5, ease: "power2.inOut" }); }}
                    >
                      <img src={item.img} alt={item.text} className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-[#D4B895]/20 backdrop-blur-[2px] opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
                    </div>

                    <span
                      className="marquee-text font-['Manrope',sans-serif] text-[clamp(45px,6vw,90px)] font-medium whitespace-nowrap leading-none tracking-tight text-[#2C2416] opacity-80 transition-opacity duration-500"
                    >{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Organic wave bottom ── */}
      <div
        aria-hidden
        className="absolute left-0 right-0 pointer-events-none z-[1]"
        style={{ bottom: -98, width: "100%" }}
      >
        <svg
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 100 }}
        >
          <defs>
            <filter id="waveShadowBottom" x="-5%" y="0%" width="110%" height="200%">
              <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="rgba(50,32,14,0.08)" />
            </filter>
          </defs>
          <path
            d="M0,40 C 160,160 320,20 540,90 C 720,150 900,10 1080,80 C 1220,135 1340,30 1440,75 L1440,0 L0,0 Z"
            fill="#F7F4EF"
            filter="url(#waveShadowBottom)"
          />
        </svg>
      </div>
    </section>
  );
}