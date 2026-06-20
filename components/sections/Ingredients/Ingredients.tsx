"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloader } from "@/components/providers/PreloaderProvider";

gsap.registerPlugin(ScrollTrigger);

// ─── PALETTE ───────────────────────────────────────────────────────────────
const GOLD = "#C89B6D";
const DARK = "#2C2416";

const SCENES = [
  {
    id: "intro",
    label: "The Aurey Formula",
    title: "Ingredient\nUniverse",
    subtitle: "Each formula begins with a story.",
    body: "Scroll to travel through the rituals, roots, and science behind every Aurey ingredient.",
    accent: GOLD,
    glow: "radial-gradient(circle at 50% 50%, rgba(200,155,109,0.15), transparent 60%)",
    image: null,
    facts: null,
    cta: false,
  },
  {
    id: "rice",
    label: "Korean Ritual · 01",
    title: "Body Butter",
    subtitle: "The Ancient Brightener",
    body: "A staple in royal courts, rice water is packed with amino acids that gently refine and illuminate the skin.",
    accent: "#C8A470",
    glow: "radial-gradient(circle at 40% 60%, rgba(232,210,175,0.25), transparent 70%)",
    image: "https://res.cloudinary.com/dtslaveid/image/upload/v1781884186/b2749403-21c7-4817-a194-db713a53d142_giwfy9.png",
    facts: ["Brightens complexion over time", "Rich in amino acids & vitamins", "Used in Korean rituals for centuries"],
    cta: false,
  },
  {
    id: "niacinamide",
    label: "Science Meets Nature · 02",
    title: "Korean Glow",
    subtitle: "The Pore Refiner",
    body: "A clinical powerhouse that fortifies the skin barrier while visibly smoothing texture and evening tone.",
    accent: "#B89060",
    glow: "radial-gradient(circle at 60% 40%, rgba(200,168,130,0.2), transparent 60%)",
    image: "https://res.cloudinary.com/dtslaveid/image/upload/v1781884459/615eeb66-c87c-44d0-8d9d-262b837dab03_mmvpx1.png",
    facts: ["Minimises pore appearance", "Evens skin tone & texture", "Fortifies moisture barrier"],
    cta: false,
  },
  {
    id: "ginseng",
    label: "1,000 Years of Wisdom · 03",
    title: "Korean Ginseng",
    subtitle: "The Energiser",
    body: "An adaptogenic root that stimulates collagen and revives tired, dull skin from the inside out.",
    accent: "#A07850",
    glow: "radial-gradient(circle at 30% 50%, rgba(176,131,90,0.18), transparent 70%)",
    image: "https://res.cloudinary.com/dtslaveid/image/upload/v1781884361/b0a57901-9262-42dc-ad85-70926e1cb3c0_q95qyw.png",
    facts: ["Stimulates collagen synthesis", "Revives tired, dull skin", "Adaptogenic — responds to skin's needs"],
    cta: false,
  },
  {
    id: "aloe",
    label: "Desert Wisdom · 04",
    title: "H2 WHOH! Shampoo",
    subtitle: "The Soother",
    body: "Ultra-hydrating and instantly calming, providing the essential water-weight hydration sensitive skin craves.",
    accent: "#8A9E80",
    glow: "radial-gradient(circle at 70% 60%, rgba(155,175,142,0.15), transparent 70%)",
    image: "https://res.cloudinary.com/dtslaveid/image/upload/v1781884535/56ce9a83-1efb-4653-a8fa-7565b90e26f6_vnjovw.png",
    facts: ["Instant calming on sensitised skin", "99% water — ultra-hydrating", "Accelerates skin recovery"],
    cta: false,
  },
  {
    id: "cta",
    label: "The Aurey Philosophy",
    title: "Rooted In\nRitual.",
    subtitle: null,
    body: "Every ingredient chosen intentionally.\nEvery formula tested through time.",
    accent: GOLD,
    glow: "radial-gradient(circle at 50% 50%, rgba(200,155,109,0.18), transparent 60%)",
    image: null,
    facts: null,
    cta: true,
  },
];

const SheetRevealText = ({
  children,
  className = "",
  style = {},
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) => (
  <div
    className={`sheet-reveal-inner will-change-transform ${className}`}
    style={{ ...style, clipPath: "inset(0 0 100% 0)" }}
    data-delay={delay}
  >
    {children}
  </div>
);

export function Ingredients() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);

  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const meshRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  const textWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const { isComplete } = usePreloader();

  useEffect(() => {
    if (!isComplete) return;

    const ctx = gsap.context(() => {
      const wrap = wrapRef.current;
      const sticky = stickyRef.current;
      const track = trackRef.current;
      const spine = spineRef.current;
      if (!wrap || !sticky || !track || !spine) return;

      const panels = track.querySelectorAll<HTMLElement>(".scene-container");
      const lastPanel = panels[panels.length - 1];

      // ── Text reveal initial state ──
      gsap.set(".sheet-reveal-inner", { clipPath: "inset(0 0 100% 0)", y: 30 });

      // ── HARD HIDE every ingredient card pre-scroll. visibility:hidden so nothing peeks at any viewport width. ──
      gsap.utils.toArray<HTMLElement>(".anim-img-card").forEach((el) => {
        const fromLeft = el.dataset.side === "left";
        gsap.set(el, {
          x: fromLeft ? -300 : 300,
          opacity: 0,
          autoAlpha: 0,
          rotationZ: fromLeft ? -16 : 16,
          transformOrigin: "50% 100%", // pivots from the bottom like a leg swinging up
        });
      });
      gsap.utils.toArray<HTMLElement>(".anim-text-card").forEach((el) => {
        const fromLeft = el.dataset.side === "left";
        gsap.set(el, {
          x: fromLeft ? -300 : 300,
          opacity: 0,
          autoAlpha: 0,
          rotationZ: fromLeft ? -16 : 16,
          transformOrigin: "50% 100%",
        });
      });
      gsap.set(".card-connector-wave", { opacity: 0 });

      const trackWidth = track.scrollWidth - window.innerWidth;
      const spineWidth = spine.scrollWidth - window.innerWidth;

      // ── Master horizontal scroll ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: `+=${trackWidth}`,
          pin: sticky,
          scrub: 1,
          onUpdate(self) {
            const rawIndex = self.progress * (SCENES.length - 1);
            const idx = Math.round(rawIndex);
            const floorIdx = Math.min(Math.floor(rawIndex), SCENES.length - 1);

            if (glowRef.current) {
              gsap.to(glowRef.current, {
                background: SCENES[floorIdx].glow,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            progressNodesRef.current.forEach((node, i) => {
              if (!node) return;
              if (i === idx) {
                gsap.to(node, {
                  backgroundColor: "#8B7355",
                  scale: 1.5,
                  boxShadow: "0 0 10px rgba(139,115,85,0.5)",
                  duration: 0.4,
                  overwrite: "auto",
                });
              } else {
                gsap.to(node, {
                  backgroundColor: "rgba(139,115,85,0.2)",
                  scale: 1,
                  boxShadow: "none",
                  duration: 0.4,
                  overwrite: "auto",
                });
              }
            });
          },
        },
      });

      // Track translation — last panel's own offset used so CTA truly centers, not just symmetric padding guesswork
      if (lastPanel) {
        const finalX = -(lastPanel.offsetLeft - (window.innerWidth - lastPanel.offsetWidth) / 2);
        tl.to(track, { x: finalX, ease: "none", force3D: true }, 0);
        tl.to(spine, { x: -spineWidth * 0.3, ease: "none", force3D: true }, 0);
        particlesRef.current.forEach((p, i) => {
          if (p) tl.to(p, { x: finalX * (0.5 + (i % 3) * 0.08), ease: "none", force3D: true }, 0);
        });
      }

      // ── Continuous curved connector wave — draws across the whole track, synced to scroll progress, sits BEHIND cards ──
      if (wavePathRef.current) {
        const length = wavePathRef.current.getTotalLength();
        gsap.set(wavePathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(
          wavePathRef.current,
          { strokeDashoffset: 0, ease: "none" },
          0
        );
      }

      panels.forEach((panel) => {
        const imgCard = panel.querySelector<HTMLElement>(".anim-img-card");
        const textCard = panel.querySelector<HTMLElement>(".anim-text-card");
        const connectorWave = panel.querySelector<HTMLElement>(".card-connector-wave");
        const textLines = panel.querySelectorAll<HTMLElement>(".sheet-reveal-inner");
        const ca = { containerAnimation: tl };

        // ── Entry: "rotating leg" swing — pivot from bottom, rotate to 0, settle with elastic bounce ──
        if (imgCard) {
          gsap.to(imgCard, {
            x: 0,
            opacity: 1,
            autoAlpha: 1,
            rotationZ: 0,
            duration: 1,
            ease: "elastic.out(1, 0.6)",
            force3D: true,
            scrollTrigger: { trigger: panel, start: "left 65%", end: "center 55%", scrub: 1, ...ca },
          });
          gsap.to(imgCard, { y: -15, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.6 });
        }
        if (textCard) {
          gsap.to(textCard, {
            x: 0,
            opacity: 1,
            autoAlpha: 1,
            rotationZ: 0,
            duration: 1,
            ease: "elastic.out(1, 0.6)",
            force3D: true,
            scrollTrigger: { trigger: panel, start: "left 65%", end: "center 55%", scrub: 1, ...ca },
          });
          gsap.to(textCard, { y: -15, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.1 });
        }

        // ── Local connector glow — pulses in once cards settle, fades before exit ──
        if (connectorWave) {
          gsap.timeline({
            scrollTrigger: { trigger: panel, start: "left 60%", end: "right 0%", scrub: true, ...ca },
          })
            .to(connectorWave, { opacity: 1, duration: 0.25, ease: "power2.out" })
            .to(connectorWave, { opacity: 0, duration: 0.15, ease: "power1.in" }, 0.85);
        }

        // ── Exit: gentle fade + hard hide once fully passed, so nothing lingers/peeks on the far side ──
        if (imgCard && textCard) {
          gsap.timeline({
            scrollTrigger: { trigger: panel, start: "right 55%", end: "right -10%", scrub: true, ...ca },
          })
            .to([imgCard, textCard], { opacity: 0.2, scale: 0.92, ease: "power1.in" }, 0)
            .to([imgCard, textCard], { autoAlpha: 0, ease: "none" }, 0.9);
        }

        // ── Text cascade ──
        if (textLines.length) {
          const revealTl = gsap.timeline({
            scrollTrigger: { trigger: panel, start: "left 60%", toggleActions: "play none none reverse", ...ca },
          });
          textLines.forEach((line) => {
            const delay = parseFloat(line.getAttribute("data-delay") || "0");
            revealTl.to(line, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1, ease: "power4.out" }, delay);
          });
        }
      });

      meshRefs.current.forEach((mesh) => {
        if (mesh) {
          gsap.to(mesh, { x: "random(-100, 100)", y: "random(-100, 100)", duration: "random(15, 30)", repeat: -1, yoyo: true, ease: "sine.inOut" });
        }
      });

      particlesRef.current.forEach((p) => {
        if (p) {
          gsap.set(p, {
            width: gsap.utils.random(1, 4) + "px",
            height: gsap.utils.random(1, 4) + "px",
            left: gsap.utils.random(0, 500) + "vw",
            top: gsap.utils.random(0, 100) + "vh",
            opacity: gsap.utils.random(0.1, 0.4),
          });
        }
      });

      ScrollTrigger.refresh();
    }, wrapRef);

    return () => ctx.revert();
  }, [isComplete]);

  const particles = Array.from({ length: 30 });

  return (
    <div ref={wrapRef} className="bg-[#F7F4EF] relative">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none z-[1] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-60">
          <div ref={(el) => { meshRefs.current[0] = el; }} className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[100px] bg-[#E8D2BB]/20 mix-blend-multiply" />
          <div ref={(el) => { meshRefs.current[1] = el; }} className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] bg-[#D4C3A3]/20 mix-blend-multiply" />
        </div>

        <div ref={glowRef} className="absolute inset-0 pointer-events-none z-[3]" />

        <div className="absolute inset-0 pointer-events-none z-[4] overflow-visible w-[500vw]">
          {particles.map((_, i) => (
            <div
              key={i}
              ref={(el) => { particlesRef.current[i] = el; }}
              className="absolute rounded-full bg-[#8B7355] blur-[1px] opacity-0"
            />
          ))}
        </div>

        {/* Continuous curved connector — runs the FULL length of the track, BEHIND all cards (z-[7], cards are z-10+), draws in sync with scroll */}
        <div className="absolute top-1/2 left-0 w-[500vw] h-[300px] -translate-y-1/2 pointer-events-none z-[7] opacity-30">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2000 100">
            <path
              ref={wavePathRef}
              d="M0,50 C 80,10 160,90 240,50 S 400,10 480,50 S 640,90 720,50 S 880,10 960,50 S 1120,90 1200,50 S 1360,10 1440,50 S 1600,90 1680,50 S 1840,10 1920,50 S 2080,90 2160,50"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C89B6D" />
                <stop offset="50%" stopColor="#8B7355" />
                <stop offset="100%" stopColor="#C89B6D" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div ref={spineRef} className="absolute top-1/2 -translate-y-1/2 left-[10vw] flex items-center pointer-events-none z-[6] opacity-[0.025] mix-blend-multiply">
          <span className="font-serif font-bold text-[#2C2416] whitespace-nowrap tracking-[-0.04em] select-none" style={{ fontSize: "clamp(250px, 35vw, 600px)" }}>
            THE AUREY FORMULA &nbsp;✦&nbsp; RICE WATER &nbsp;✦&nbsp; NIACINAMIDE &nbsp;✦&nbsp; KOREAN GINSENG &nbsp;✦&nbsp; ALOE VERA &nbsp;✦&nbsp; ROOTED IN RITUAL
          </span>
        </div>

        <div ref={trackRef} className="relative z-[10] flex h-full items-center pl-[15vw] pr-[15vw] will-change-transform gap-[10vw]">
          {SCENES.map((scene, i) => {
            const isCenter = scene.id === "intro" || scene.id === "cta";
            const imageOnLeft = i % 2 !== 0;
            const side = imageOnLeft ? "left" : "right";

            if (isCenter) {
              return (
                <div key={scene.id} className="scene-container flex-shrink-0 w-[70vw] md:w-[50vw] h-full flex flex-col items-center justify-center text-center">
                  <div className="card-group w-full flex flex-col items-center justify-center">
                    <SheetRevealText delay={0}>
                      <p className="font-sans text-[11px] tracking-[0.35em] uppercase mb-8" style={{ color: scene.accent }}>{scene.label}</p>
                    </SheetRevealText>
                    <SheetRevealText delay={0.1}>
                      <h2 className={`font-orange text-[clamp(70px,9vw,140px)] leading-[0.9] tracking-[-0.03em] mb-6 whitespace-pre-line ${scene.id === "cta" ? "italic" : ""}`} style={{ color: DARK }}>{scene.title}</h2>
                    </SheetRevealText>
                    {scene.subtitle && (
                      <SheetRevealText delay={0.2}>
                        <p className="font-serif italic text-[clamp(20px,1.8vw,28px)] text-[#8B7355] mb-8">{scene.subtitle}</p>
                      </SheetRevealText>
                    )}
                    {scene.body && (
                      <SheetRevealText delay={0.3}>
                        <p className="font-sans text-[15px] leading-relaxed text-[#6B5B48] whitespace-pre-line max-w-md mx-auto">{scene.body}</p>
                      </SheetRevealText>
                    )}
                    {scene.cta && (
                      <SheetRevealText delay={0.4}>
                        <button
                          className="mt-12 font-sans text-[11px] tracking-[0.25em] uppercase text-[#F7F3EE] bg-[#2C2416] px-10 py-4 rounded-full transition-all hover:-translate-y-1 shadow-2xl"
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = scene.accent; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = DARK; }}
                        >
                          Discover Collection
                        </button>
                      </SheetRevealText>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div key={scene.id} className="scene-container flex-shrink-0 w-[85vw] max-w-[1400px] h-full flex items-center justify-center">
                <div className={`card-group relative w-full flex items-center justify-center ${imageOnLeft ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Local glow pulse marking this panel's connector segment — sits at z-[8], strictly behind both cards (z-10/20) */}
                  <div
                    className="card-connector-wave absolute top-1/2 left-1/2 w-[24%] h-[60px] -translate-x-1/2 -translate-y-1/2 z-[8] rounded-full blur-[18px]"
                    style={{ background: scene.accent, opacity: 0.25 }}
                  />

                  <div className={`anim-img-card opacity-0 invisible relative w-[50%] md:w-[40%] aspect-[3/4] z-10 ${imageOnLeft ? "mr-[-8%]" : "ml-[-8%]"}`} data-side={side}>
                    <div className="w-full h-full rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-white/40 bg-[#F4EFE8]">
                      {scene.image && <img src={scene.image} alt={scene.title} className="w-full h-full object-cover" />}
                    </div>
                  </div>

                  <div className="anim-text-card opacity-0 invisible relative w-[60%] md:w-[50%] z-20" data-side={side === "left" ? "right" : "left"}>
                    <div className="bg-white/40 backdrop-blur-2xl p-12 md:p-16 rounded-[40px] shadow-[0_40px_120px_rgba(0,0,0,0.08)] border border-white/60">
                      <SheetRevealText delay={0}>
                        <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: scene.accent }}>{scene.label}</p>
                      </SheetRevealText>
                      <SheetRevealText delay={0.1}>
                        <h3 className="font-orange text-[clamp(50px,6vw,84px)] leading-[0.9] tracking-[-0.02em] mb-4 text-[#2C2416]">{scene.title}</h3>
                      </SheetRevealText>
                      <SheetRevealText delay={0.2}>
                        <p className="font-serif italic text-[clamp(18px,1.4vw,22px)] text-[#8B7355] mb-8">{scene.subtitle}</p>
                      </SheetRevealText>
                      <SheetRevealText delay={0.3}>
                        <p className="font-sans text-[14px] leading-relaxed text-[#5C4D3C] mb-10">{scene.body}</p>
                      </SheetRevealText>
                      {scene.facts && (
                        <ul className="flex flex-col gap-4">
                          {scene.facts.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-3">
                              <SheetRevealText delay={0.4 + fi * 0.1}>
                                <span className="flex items-start gap-4">
                                  <span style={{ color: scene.accent, fontSize: 10, marginTop: 4 }}>✦</span>
                                  <span className="font-sans text-[13px] tracking-wide text-[#4A3C2B]">{f}</span>
                                </span>
                              </SheetRevealText>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[30] flex items-center gap-6">
          {SCENES.map((_, i) => (
            <div key={i} className="relative flex items-center">
              <div ref={(el) => { progressNodesRef.current[i] = el; }} className="w-1.5 h-1.5 rounded-full bg-[#8B7355]/20 will-change-transform" />
              {i < SCENES.length - 1 && <div className="absolute left-1.5 w-6 h-[1px] bg-[#8B7355]/10" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}