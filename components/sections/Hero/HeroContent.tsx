"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Leaf, Droplets, Sparkles, Atom } from "lucide-react";

export function HeroContent({ isZoomComplete = true }: { isZoomComplete?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isZoomComplete) return;

    const ctx = gsap.context(() => {
      // Short delay after the zoom finishes before content drops in
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Float the Navbar in smoothly from the top (Handled in Hero.tsx now)

      // 2. Kicker
      tl.to(".hero-kicker", {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out"
      });

      // 3. Headline Mask Reveal
      tl.to(".hero-headline-line", {
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      }, "-=0.8");

      // 4. Subtitle Blur + Opacity Reveal
      tl.fromTo(".hero-subtitle",
        { opacity: 0, filter: "blur(10px)" },
        { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        "-=0.6"
      );

      // 5. Right Side Ingredients (Subtle Stagger)
      tl.to(".hero-feature", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=1.0");

      // 6. Product Hotspots
      tl.to(".hero-hotspot", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.4");

      // 7. CTA Line Draw & Reveal
      tl.to(".hero-cta-line", {
        width: "40px",
        duration: 0.8,
        ease: "power3.inOut"
      }, "-=0.2")
        .to(".hero-cta-text", {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4")
        .to(".hero-cta-arrow", {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.6");
    }, containerRef);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      gsap.to(".scroll-parallax-slow", {
        y: scrollY * -0.15, // Move up slowly
        duration: 0.5,
        ease: "power1.out",
        overwrite: "auto"
      });

      gsap.to(".scroll-parallax-fast", {
        y: scrollY * -0.3, // Move up faster
        duration: 0.5,
        ease: "power1.out",
        overwrite: "auto"
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isZoomComplete]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-20 w-full h-full pointer-events-none overflow-hidden">

      {/* LEFT SIDE: Brand Story & CTA */}
      <div className="absolute left-[5%] md:left-[5%] xl:left-[8%] top-[12%] md:top-[50%] md:-translate-y-1/2 text-left pointer-events-auto w-[90%] md:w-full max-w-[500px]">
        <div className="scroll-parallax-slow">
          <p
            className="hero-kicker opacity-0 translate-y-4 text-[10px] tracking-[0.2em] font-semibold text-[#D9B98E] uppercase mb-5 flex items-center gap-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Korean Beauty For Indian Skin
            <span className="w-10 h-[1px] bg-[#D9B98E]/80 block"></span>
          </p>
          <h1
            className="text-[48px] md:text-[60px] xl:text-[72px] leading-[1.05] text-[#FFF5EB] mb-6 md:mb-8 tracking-wide whitespace-nowrap"
            style={{
              fontFamily: '"Orange Vintage", serif',
              fontWeight: 'normal',
              textShadow: '0 2px 20px rgba(0,0,0,0.18), 0 8px 40px rgba(0,0,0,0.10)'
            }}
          >
            <div className="overflow-hidden pb-1">
              <span className="hero-headline-line block translate-y-[120%]">Beauty Rooted</span>
            </div>
            <div className="overflow-hidden pt-1 pb-1">
              <span className="hero-headline-line block translate-y-[120%]">
                <i className="text-[#E6D8C7]" style={{ fontStyle: 'normal' }}>In Ritual</i>
              </span>
            </div>
          </h1>
          <p
            className="hero-subtitle opacity-0 text-[#E6D8C7]/90 text-[13px] md:text-[15px] font-light leading-[1.6] md:leading-[1.8] max-w-[260px] md:max-w-[280px] mb-6 md:mb-10"
            style={{
              fontFamily: 'var(--font-inter)',
              textShadow: '0 2px 20px rgba(0,0,0,0.18), 0 8px 40px rgba(0,0,0,0.10)'
            }}
          >
            Explore the Korean beauty regimen adapted for Indian skin.
          </p>
          <div className="flex items-center gap-4">
            <div className="hero-cta-line w-0 h-[1px] bg-[#D9B98E]"></div>
            <button
              className="hero-cta-text opacity-0 group flex items-center gap-3 text-[9px] md:text-[10px] font-semibold tracking-[0.25em] text-[#FFF5EB] uppercase hover:text-[#D9B98E] transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Discover Ritual
              <ArrowRight className="hero-cta-arrow w-3.5 h-3.5 opacity-0 -translate-x-3 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* CENTER: Interactive Product Details Callouts */}
      <div className="absolute inset-0 pointer-events-none scroll-parallax-slow">

        {/* Callout 1: Left side of jar (Texture/Formula) */}
        <div className="hero-hotspot opacity-0 absolute top-[58%] left-[38%] xl:left-[41%] hidden md:flex items-center z-30 -translate-x-full">
          <div className="text-right mr-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#D9B98E] font-semibold mb-0.5" style={{ fontFamily: 'var(--font-inter)' }}>Texture</p>
            <p className="text-[12px] text-[#FFF5EB] font-light drop-shadow-md whitespace-nowrap" style={{ fontFamily: 'var(--font-inter)' }}>Exfoliating Rice Grains</p>
          </div>
          <div className="w-[60px] lg:w-[80px] h-[1px] bg-gradient-to-r from-transparent to-[#D9B98E]/80 origin-right" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFF5EB] shadow-[0_0_12px_rgba(255,245,235,1)] ml-1 animate-pulse" />
        </div>

        {/* Callout 2: Right side of jar (Purity) */}
        <div className="hero-hotspot opacity-0 absolute top-[48%] left-[62%] xl:left-[59%] hidden md:flex items-center z-30">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFF5EB] shadow-[0_0_12px_rgba(255,245,235,1)] mr-1 animate-pulse" />
          <div className="w-[60px] lg:w-[80px] h-[1px] bg-gradient-to-l from-transparent to-[#D9B98E]/80 origin-left" />
          <div className="text-left ml-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#D9B98E] font-semibold mb-0.5" style={{ fontFamily: 'var(--font-inter)' }}>Purity</p>
            <p className="text-[12px] text-[#FFF5EB] font-light drop-shadow-md whitespace-nowrap" style={{ fontFamily: 'var(--font-inter)' }}>100% Vegan & Cruelty-Free</p>
          </div>
        </div>

        {/* Callout 3: Top of jar (Potency) - L-Shape Line pointing up then right */}
        <div className="hero-hotspot opacity-0 absolute top-[30%] lg:top-[33%] left-[46%] hidden md:flex z-30">
          <div className="relative">
            {/* The hotspot dot exactly at the jar lid */}
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-[#FFF5EB] shadow-[0_0_12px_rgba(255,245,235,1)] animate-pulse" />

            {/* Vertical line going UP */}
            <div className="w-[1px] h-[30px] lg:h-[40px] bg-[#D9B98E]/80 absolute bottom-0 left-0" />

            {/* Horizontal line turning RIGHT */}
            <div className="w-[30px] lg:w-[50px] h-[1px] bg-[#D9B98E]/80 absolute bottom-[30px] lg:bottom-[40px] left-0" />

            {/* Text Box positioned at the end of the right line */}
            <div className="absolute bottom-[35px] lg:bottom-[45px] left-[35px] lg:left-[55px] text-left">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#D9B98E] font-semibold mb-0.5" style={{ fontFamily: 'var(--font-inter)' }}>Potency</p>
              <p className="text-[12px] text-[#FFF5EB] font-light drop-shadow-md whitespace-nowrap" style={{ fontFamily: 'var(--font-inter)' }}>Korean Ginseng Root</p>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE: Elegant Ingredient Circles */}
      <div className="hidden lg:block absolute right-[6%] md:right-[8%] xl:right-[12%] top-[50%] -translate-y-1/2 text-right pointer-events-auto">
        <div className="flex flex-col gap-10 scroll-parallax-fast">
          {[
            { title: "Rice Water", desc: "Brightens skin\n& refines texture", icon: <Droplets className="w-[18px] h-[18px] text-[#FFF5EB]" strokeWidth={1} /> },
            { title: "Niacinamide", desc: "Strengthens skin\nbarrier & balances", icon: <Atom className="w-[18px] h-[18px] text-[#FFF5EB]" strokeWidth={1} /> },
            { title: "Aloe Vera", desc: "Hydrates, soothes\n& calms irritation", icon: <Leaf className="w-[18px] h-[18px] text-[#FFF5EB]" strokeWidth={1} /> }
          ].map((feature, idx) => (
            <div key={idx} className="hero-feature opacity-0 translate-y-4 flex items-center gap-5 justify-start w-[220px] group cursor-default">
              {/* Elegant outline circle for reference match */}
              <div className="w-[46px] h-[46px] shrink-0 rounded-full border border-[#FFF5EB]/30 flex items-center justify-center bg-transparent group-hover:border-[#FFF5EB]/60 transition-colors duration-500 relative">
                {feature.icon}
              </div>

              {/* Text Content aligned left next to the icon */}
              <div className="text-left">
                <h4
                  className="text-[14px] text-[#FFF5EB] mb-0.5 tracking-wide group-hover:text-[#D9B98E] transition-colors"
                  style={{ fontFamily: '"Inter", sans-serif', fontWeight: 500 }}
                >
                  {feature.title}
                </h4>
                <p
                  className="text-[11px] text-[#E6D8C7]/60 font-light tracking-wide leading-relaxed group-hover:text-[#E6D8C7]/80 transition-colors whitespace-pre-line"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* BOTTOM LEFT: Scroll Indicator */}
      <div className="hero-kicker opacity-0 absolute bottom-[8%] left-[5%] md:left-[5%] xl:left-[8%] z-30 flex items-center gap-3 pointer-events-auto cursor-pointer group">
        <div className="w-9 h-9 rounded-full border border-[#FFF5EB]/30 flex items-center justify-center group-hover:bg-[#FFF5EB]/10 transition-colors">
          <ArrowRight className="w-3.5 h-3.5 text-[#FFF5EB] rotate-90" strokeWidth={1.5} />
        </div>
        <span className="text-[9px] tracking-[0.25em] font-semibold text-[#FFF5EB] uppercase">
          Scroll To Explore
        </span>
      </div>

    </div>
  );
}
