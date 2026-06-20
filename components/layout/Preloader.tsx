"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePreloader } from "@/components/providers/PreloaderProvider";

const MESSAGES = [
  "Preparing Your Ritual",
  "Curating Botanical Wisdom",
  "Gathering Clinical Results",
  "Crafting The Experience",
  "Refining Every Detail"
];

export function Preloader() {
  const { isComplete, setComplete } = usePreloader();
  const preloaderRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const logoCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const ringRef = useRef<HTMLDivElement>(null);

  const [messageIndex, setMessageIndex] = useState(0);
  const isAnimatingOut = useRef(false);

  useEffect(() => {
    // Prevent re-running if already completed
    if (isComplete || isAnimatingOut.current) return;

    const ctx = gsap.context(() => {
      // 1. Staggered character entrance for AUREY
      gsap.fromTo(logoCharsRef.current, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "back.out(1.7)",
          onComplete: () => {
            // Setup Breathing Logo after entrance
            gsap.to(logoCharsRef.current, {
              scale: 1.02,
              opacity: 0.8,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      );

      // 2. Slow Rotating Symbol
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: "linear"
      });

      // 3. Message Rotation using GSAP timeline to avoid setInterval memory leaks
      const msgTl = gsap.timeline({ repeat: -1 });
      MESSAGES.forEach((msg, idx) => {
        msgTl.to(messageRef.current, {
          y: -10,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => setMessageIndex(idx)
        }, "+=1.5")
        .fromTo(messageRef.current, 
          { y: 10, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      });

      // 4. Loading Progress
      const tl = gsap.timeline({
        onComplete: () => {
          msgTl.kill(); // Stop rotating messages
          isAnimatingOut.current = true;
          
          // Pause at 100% for 0.5s before exit sequence
          gsap.delayedCall(0.5, () => {
            // Signal application that we are ready to reveal!
            setComplete(true);

            // Exit Sequence
            gsap.to(ringRef.current, { scale: 1.2, duration: 1.4, ease: "expo.inOut" });
            gsap.to(logoCharsRef.current, { scale: 1.1, opacity: 0, duration: 1.4, ease: "expo.inOut", stagger: 0.05 });
            
            gsap.to(preloaderRef.current, {
              y: "-100%",
              opacity: 0,
              filter: "blur(10px)",
              duration: 1.4,
              ease: "expo.inOut",
              onComplete: () => {
                if (preloaderRef.current) {
                  preloaderRef.current.style.display = 'none'; // Completely hide it
                }
              }
            });
          });
        }
      });

      // Animate percentage text 0 to 100
      tl.to({ val: 0 }, {
        val: 100,
        duration: 3.5,
        ease: "power2.inOut",
        onUpdate: function() {
          if (percentRef.current) {
            const p = Math.round(this.targets()[0].val);
            percentRef.current.innerText = `${p.toString().padStart(2, '0')}%`;
          }
        }
      }, 0);

      // Animate dot across the line
      tl.fromTo(dotRef.current, 
        { left: "0%" },
        { left: "100%", duration: 3.5, ease: "power2.inOut" },
      0);

    }, preloaderRef);

    return () => {
      // Only revert if we are NOT in the middle of animating out.
      // This prevents the cleanup from killing the exit animation when setComplete(true) triggers a re-render.
      if (!isAnimatingOut.current) {
        ctx.revert();
      }
    };
  }, []); // Empty dependency array to prevent re-triggering

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto"
      style={{
        background: "radial-gradient(circle at center, #f6f1eb 0%, #efe8df 55%, #e8dfd3 100%)",
      }}
    >
      {/* Ambient effects */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(44,36,22,0.05)] pointer-events-none" />

      {/* Center Composition */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg">
        
        {/* Rotating Ritual Symbol (Behind Logo) */}
        <div 
          ref={ringRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full border-[1px] border-[#C89B6D] opacity-10"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C89B6D]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C89B6D]" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 rounded-full bg-[#C89B6D]" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 rounded-full bg-[#C89B6D]" />
        </div>

        {/* Brand Signature - Character by Character */}
        <h1 className="font-orange flex text-[3.5rem] md:text-[5rem] tracking-[0.15em] text-[#2C2416] mb-12 will-change-transform z-10">
          {["A", "U", "R", "E", "Y"].map((char, index) => (
            <span
              key={index}
              ref={(el) => { logoCharsRef.current[index] = el; }}
              className="inline-block opacity-0"
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Loading Percentage */}
        <div ref={percentRef} className="font-sans text-[12px] md:text-[14px] tracking-[0.2em] text-[#8B6A50] mb-6">
          00%
        </div>

        {/* Progress Ritual Line */}
        <div className="relative w-[200px] md:w-[280px] h-[1px] bg-[#2C2416]/10 mb-8">
          <div 
            ref={dotRef}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C89B6D] shadow-[0_0_8px_rgba(200,155,109,0.8)]"
          />
        </div>

        {/* Dynamic Loading Messages */}
        <div className="h-4 overflow-hidden relative w-full flex justify-center">
          <div ref={messageRef} className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#6B5B48] font-medium text-center absolute opacity-0">
            {MESSAGES[messageIndex]}
          </div>
        </div>

      </div>
    </div>
  );
}
