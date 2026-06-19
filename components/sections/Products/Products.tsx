"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────
 * FEATURED PRODUCTS (2 Rows of 4)
 * ───────────────────────────────────────────────────────────────────────── */
const featuredProducts = products.slice(0, 8);

/* ─────────────────────────────────────────────────────────────────────────
 * LUXURY EDITORIAL CARD
 * ───────────────────────────────────────────────────────────────────────── */
function LuxuryCard({ product, index }: { product: Product; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const hasDiscount =
    product.originalPrice !== undefined && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(
      ((product.originalPrice! - product.price) / product.originalPrice!) * 100
    )
    : 0;

  const badgeLabel = product.badge ?? product.formula;

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -12,
      boxShadow: "0 40px 100px rgba(60,40,20,0.14)",
      duration: 0.45,
      ease: "power2.out",
    });
    if (imageRef.current)
      gsap.to(imageRef.current, { scale: 1.05, duration: 0.55, ease: "power2.out" });
    if (glowRef.current)
      gsap.to(glowRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
    if (titleRef.current)
      gsap.to(titleRef.current, { y: -4, duration: 0.35, ease: "power2.out" });
    if (ctaRef.current)
      gsap.to(ctaRef.current, { x: 4, duration: 0.35, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 30px 80px rgba(60,40,20,0.08)",
      duration: 0.55,
      ease: "power3.out",
    });
    if (imageRef.current)
      gsap.to(imageRef.current, { scale: 1, duration: 0.55, ease: "power3.out" });
    if (glowRef.current)
      gsap.to(glowRef.current, { opacity: 0, duration: 0.45, ease: "power3.out" });
    if (titleRef.current)
      gsap.to(titleRef.current, { y: 0, duration: 0.4, ease: "power3.out" });
    if (ctaRef.current)
      gsap.to(ctaRef.current, { x: 0, duration: 0.35, ease: "power3.out" });
  };

  return (
    <div
      ref={cardRef}
      className="product-card group relative flex flex-col cursor-pointer will-change-transform"
      style={{
        borderRadius: 32,
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.55)",
        boxShadow: "0 30px 80px rgba(60,40,20,0.08)",
        overflow: "hidden",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Hover background glow ── */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${product.accentColor || '#C89B6D'}22 0%, transparent 70%)`,
          opacity: 0,
        }}
      />

      {/* ── IMAGE AREA ── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ aspectRatio: "4/5", borderRadius: "32px 32px 0 0" }}
      >
        <img
          ref={imageRef}
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover will-change-transform"
          style={{ transform: "scale(1)" }}
          loading="lazy"
        />

        {/* Cinematic gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 55%, rgba(30,22,14,0.18) 100%)",
          }}
        />

        {/* Badge — pill */}
        {badgeLabel && (
          <span
            className="absolute top-4 left-4 z-10 inline-flex items-center px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(20,15,8,0.72)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#F0EBE3",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {badgeLabel}
          </span>
        )}

        {/* Wishlist button */}
        <button
          aria-label={`${wishlisted ? "Remove" : "Add"} ${product.title} from wishlist`}
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted((v) => !v);
          }}
          className="absolute top-4 right-4 z-10 font-cormorant flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.5)",
          }}
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={wishlisted ? "#C97B63" : "none"}
            stroke={wishlisted ? "#C97B63" : "#5D5952"}
            strokeWidth={2}
          >
            <path
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* ── CONTENT AREA ── */}
      <div
        className="relative z-[2] flex flex-col flex-1 px-7 pb-7 pt-6"
        style={{ background: "rgba(255,255,255,0.5)" }}
      >
        {/* Category label */}
        <p
          className="mb-2 uppercase tracking-[0.28em] font-semibold"
          style={{ fontSize: 10, color: product.accentColor || "#8B6A50" }}
        >
          {product.subtitle || "Signature Formula"}
        </p>

        {/* Product title */}
        <h3
          ref={titleRef}
          className="will-change-transform leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(20px, 2.2vw, 26px)",
            fontWeight: 500,
            color: "#1D1712",
            marginBottom: 8,
          }}
        >
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating !== undefined && (
          <div className="flex items-center gap-1.5 mb-4">
            <span style={{ color: "#C9A86C", fontSize: 14, letterSpacing: 1 }}>
              {"★".repeat(Math.floor(product.rating))}
              {product.rating % 1 >= 0.5 ? "½" : ""}
            </span>
            <span
              className="font-medium"
              style={{ fontSize: 12, color: "#8B7B6B" }}
            >
              {product.rating}
            </span>
          </div>
        )}

        {/* Spacer */}
        <div className="mt-auto" />

        {/* Price row */}
        <div className="flex items-end gap-2 mb-5">
          <span
            className="font-semibold"
            style={{ fontSize: "clamp(22px, 2.4vw, 28px)", color: "#1D1712" }}
          >
            {product.currency || "₹"}
            {product.price.toLocaleString("en-IN")}
          </span>
          {hasDiscount && (
            <>
              <span
                className="line-through mb-1"
                style={{ fontSize: 14, color: "#B0A898" }}
              >
                {product.currency || "₹"}
                {product.originalPrice!.toLocaleString("en-IN")}
              </span>
              <span
                className="rounded-full px-2.5 py-0.5 font-semibold mb-1"
                style={{
                  fontSize: 10,
                  background: "rgba(185,100,80,0.1)",
                  color: "#B96450",
                  letterSpacing: "0.06em",
                }}
              >
                -{discountPct}%
              </span>
            </>
          )}
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-3 group/cta"
          style={{ borderTop: "1px solid rgba(139,106,80,0.12)", paddingTop: 18 }}
        >
          <span
            ref={ctaRef}
            className="relative font-semibold will-change-transform"
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#8B6A50",
            }}
          >
            Explore Ritual
            {/* Animated underline */}
            <span
              className="absolute left-0 bottom-[-3px] h-[1px] w-0 transition-all duration-500 group-hover/cta:w-full"
              style={{ background: "#8B6A50" }}
            />
          </span>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="#8B6A50"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * MAIN PRODUCTS COMPONENT
 * ───────────────────────────────────────────────────────────────────────── */
export function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const leakRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── header words split reveal ── */
      gsap.set(
        [
          ".prd-eyebrow",
          ".prd-line-left",
          ".prd-line-right",
          ".prd-heading",
          ".prd-desc",
        ],
        { autoAlpha: 0 }
      );
      gsap.set(".prd-heading", { y: 40 });
      gsap.set(".prd-eyebrow", { y: 12 });
      gsap.set(".prd-desc", { y: 16 });
      gsap.set([".prd-line-left", ".prd-line-right"], { scaleX: 0 });

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true, // Only plays once, never reverses
        },
      });

      headerTl
        .to(".prd-eyebrow", { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to(
          ".prd-line-left",
          { autoAlpha: 1, scaleX: 1, duration: 0.9, ease: "power4.out", transformOrigin: "right center" },
          "-=0.5"
        )
        .to(
          ".prd-line-right",
          { autoAlpha: 1, scaleX: 1, duration: 0.9, ease: "power4.out", transformOrigin: "left center" },
          "<"
        )
        .to(".prd-heading", { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" }, "-=0.6")
        .to(".prd-desc", { autoAlpha: 1, y: 0, duration: 0.85, ease: "power2.out" }, "-=0.65");

      /* ── cards stagger reveal ── */
      // Initial state hidden
      gsap.set(".product-card", { autoAlpha: 0, y: 80 });

      // Animate IN once
      gsap.to(".product-card", {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1, // Smooth sequence
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true, // IMPORTANT: Prevents cards from disappearing when scrolling back up
        },
      });

      /* ── ambient light leak drift ── */
      leakRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          x: `random(-80, 80)`,
          y: `random(-60, 60)`,
          scale: `random(0.92, 1.15)`,
          duration: `random(20, 30)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 2.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-visible"
      style={{
        paddingTop: 80,
        paddingBottom: 140,
        marginTop: 0,
      }}
    >
      {/* ── Solid background below the wave ── */}
      <div className="absolute inset-0 bg-[#F7F4EF] z-0" style={{ top: 0 }} />

      {/* ── Organic wave topper — placed ABOVE the section to overlap Ingredients ── */}
      <div
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
            <filter id="waveShadow" x="-5%" y="-40%" width="110%" height="200%">
              <feDropShadow
                dx="0"
                dy="-12"
                stdDeviation="20"
                floodColor="rgba(50,32,14,0.13)"
              />
            </filter>
          </defs>
          {/* Deep organic wave — flows like cream/serum spreading */}
          <path
            d="
              M0,40
              C 160,160 320,20 540,90
              C 720,150 900,10  1080,80
              C 1220,135 1340,30 1440,75
              L1440,200 L0,200 Z
            "
            fill="#F7F4EF"
            filter="url(#waveShadow)"
          />
        </svg>
      </div>
      {/* ── Atmospheric radial glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {[
          { color: "#E8D5B5", top: "0%", left: "8%", size: "50vw", opacity: 0.32 },
          { color: "#F0E8D8", top: "40%", left: "55%", size: "55vw", opacity: 0.28 },
          { color: "#D9C5A8", top: "75%", left: "2%", size: "40vw", opacity: 0.22 },
        ].map((g, i) => (
          <div
            key={i}
            ref={(el) => { leakRefs.current[i] = el; }}
            className="absolute rounded-full will-change-transform"
            style={{
              width: g.size,
              height: g.size,
              top: g.top,
              left: g.left,
              background: `radial-gradient(circle, ${g.color} 0%, transparent 68%)`,
              filter: "blur(100px)",
              opacity: g.opacity,
            }}
          />
        ))}
      </div>

      {/* ── Noise grain ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          opacity: 0.022,
          mixBlendMode: "multiply",
        }}
      />

      {/* ── SECTION HEADER ── */}
      <div
        ref={headerRef}
        className="relative z-10 flex flex-col items-center text-center px-6 mb-20"
      >
        <div className="flex items-center gap-6 mb-5">
          <div
            className="prd-line-left h-[1px] w-20 md:w-32"
            style={{ background: "linear-gradient(to left, rgba(139,106,80,0.35), transparent)" }}
          />
          <span
            className="prd-eyebrow inline-block text-[11px] font-semibold uppercase tracking-[0.34em]"
            style={{ color: "#8B6A50" }}
          >
            The Aurey Collection
          </span>
          <div
            className="prd-line-right h-[1px] w-20 md:w-32"
            style={{ background: "linear-gradient(to right, rgba(139,106,80,0.35), transparent)" }}
          />
        </div>

        <h2
          className="prd-heading font-orange"
          style={{
            fontSize: "clamp(38px, 6vw, 78px)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: 1.08,
            color: "#1D1712",
            maxWidth: 780,
          }}
        >
          Rituals Crafted{" "}
          <em style={{ fontStyle: "italic", color: "#8B6A50" }}>For Modern Skin</em>
        </h2>

        <p
          className="prd-desc mt-5 font-light"
          style={{
            fontSize: 15,
            color: "#7A6F66",
            letterSpacing: "0.06em",
            maxWidth: 480,
            lineHeight: 1.7,
          }}
        >
          Rooted in Korean traditions, refined through science, created for Indian skin.
        </p>
      </div>

      {/* ── PRODUCT GRID (Perfect 4-Column Alignment, Increased Max-Width) ── */}
      <div
        ref={gridRef}
        className="relative z-10 mx-auto px-6 lg:px-12 flex flex-col gap-12"
        style={{ maxWidth: 1600 }} // Increased from 1440px to give cards more weight/width
      >
        {/* All products placed into a continuous, perfectly aligned 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featuredProducts.map((product, i) => (
            <LuxuryCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="relative z-10 flex justify-center mt-24">
        <a
          href="#"
          className="group inline-flex items-center gap-3 px-10 py-5 rounded-full transition-all duration-400"
          style={{
            border: "1px solid rgba(139,106,80,0.28)",
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#5D4A38",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { background: "rgba(139,106,80,0.12)", y: -3, duration: 0.3, ease: "power2.out" });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { background: "rgba(255,255,255,0.5)", y: 0, duration: 0.4, ease: "power3.out" });
          }}
        >
          View Full Collection
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </div>
    </section>
  );
}