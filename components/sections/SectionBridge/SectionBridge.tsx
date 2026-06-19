"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────
 * PARTICLE DATA — static seed so it's consistent on server + client
 * ───────────────────────────────────────────────────────────────────────── */
const PARTICLES = [
  { x: "8%",  y: "22%", size: 3,   color: "#DCC8B0", opacity: 0.28, dur: 14 },
  { x: "18%", y: "68%", size: 2,   color: "#C7B39A", opacity: 0.22, dur: 18 },
  { x: "27%", y: "42%", size: 4,   color: "#E7DCCF", opacity: 0.30, dur: 16 },
  { x: "35%", y: "80%", size: 2.5, color: "#DCC8B0", opacity: 0.20, dur: 20 },
  { x: "44%", y: "15%", size: 3.5, color: "#C7B39A", opacity: 0.26, dur: 13 },
  { x: "53%", y: "55%", size: 2,   color: "#E7DCCF", opacity: 0.18, dur: 17 },
  { x: "61%", y: "30%", size: 4,   color: "#DCC8B0", opacity: 0.32, dur: 15 },
  { x: "70%", y: "72%", size: 2.5, color: "#C7B39A", opacity: 0.24, dur: 19 },
  { x: "79%", y: "48%", size: 3,   color: "#E7DCCF", opacity: 0.28, dur: 12 },
  { x: "88%", y: "20%", size: 2,   color: "#DCC8B0", opacity: 0.22, dur: 16 },
  { x: "15%", y: "5%",  size: 2.5, color: "#C7B39A", opacity: 0.20, dur: 21 },
  { x: "50%", y: "90%", size: 3,   color: "#E7DCCF", opacity: 0.25, dur: 14 },
  { x: "92%", y: "62%", size: 2,   color: "#DCC8B0", opacity: 0.18, dur: 18 },
];

export function SectionBridge() {
  const bridgeRef    = useRef<HTMLDivElement>(null);
  const glowRef      = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Central radial glow breathes infinitely ── */
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.12,
          opacity: 0.55,
          duration: 5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      /* ── 2. Each particle drifts slowly, unique rhythm ── */
      particleRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = PARTICLES[i];
        gsap.to(el, {
          y: `random(-18, 18)`,
          x: `random(-10, 10)`,
          opacity: p.opacity * (0.7 + Math.random() * 0.6),
          duration: p.dur,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.6,
        });
      });

      /* ── 3. Parallax: bridge gently moves on scroll ── */
      if (bridgeRef.current) {
        gsap.to(bridgeRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: bridgeRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, bridgeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bridgeRef}
      aria-hidden="true"
      className="relative w-full pointer-events-none select-none overflow-visible"
      style={{
        height: 280,
        marginTop: -140,
        marginBottom: -140,
        zIndex: 10,
      }}
    >
      {/* ── 1. Background morph gradient — Ingredients (top) fades into Products (bottom) ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(248,244,238,0)   0%,
            rgba(247,244,239,0.45) 38%,
            rgba(247,244,239,0.85) 65%,
            #F7F4EF               100%
          )`,
        }}
      />

      {/* ── 2. Organic SVG wave — silk/serum dissolve shape ── */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", height: "100%" }}
      >
        <defs>
          <linearGradient id="bridgeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#F7F4EF" stopOpacity="0" />
            <stop offset="42%"  stopColor="#F7F4EF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F7F4EF" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="pathStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(184,154,120,0)"    />
            <stop offset="20%"  stopColor="rgba(184,154,120,0.18)" />
            <stop offset="50%"  stopColor="rgba(184,154,120,0.22)" />
            <stop offset="80%"  stopColor="rgba(184,154,120,0.18)" />
            <stop offset="100%" stopColor="rgba(184,154,120,0)"    />
          </linearGradient>
        </defs>

        {/* Organic fill shape — flowing liquid cream morphing downward */}
        <path
          d="
            M0,180
            C 120,230 240,110 380,160
            C 520,210 600,80  720,130
            C 840,180 940,60  1060,115
            C 1180,170 1320,90 1440,140
            L1440,240 L0,240 Z
          "
          fill="url(#bridgeFill)"
        />

        {/* Secondary softer wave layer for depth */}
        <path
          d="
            M0,210
            C 180,165 300,230 480,195
            C 660,160 780,220 960,185
            C 1140,150 1280,210 1440,178
            L1440,240 L0,240 Z
          "
          fill="#F7F4EF"
          fillOpacity="0.55"
        />

        {/* ── 3. Continuation of the golden storytelling path from Ingredients ── */}
        <path
          d="
            M0,90
            C 200,40 350,150 540,90
            C 730,30 850,140 1060,80
            C 1200,38 1350,110 1440,70
          "
          fill="none"
          stroke="url(#pathStroke)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      {/* ── 4. Central premium light leak ── */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          maxHeight: 900,
          background: `radial-gradient(
            circle at center,
            rgba(230,215,190,0.38) 0%,
            rgba(230,215,190,0.10) 42%,
            transparent 72%
          )`,
          filter: "blur(120px)",
          opacity: 0.42,
        }}
      />

      {/* ── 5. Editorial ghost word ── */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(80px, 20vw, 260px)",
            fontWeight: 600,
            color: "#8B6A50",
            opacity: 0.025,
            filter: "blur(2px)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          RITUAL
        </span>
      </div>

      {/* ── 6. Floating ingredient dust particles ── */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            ref={(el) => { particleRefs.current[i] = el; }}
            className="absolute rounded-full will-change-transform"
            style={{
              left: p.x,
              top: p.y,
              width:  p.size,
              height: p.size,
              background: p.color,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
