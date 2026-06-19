"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroContent } from "./HeroContent";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const [isZoomComplete, setIsZoomComplete] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Start the video at 1 second initially
      videoRef.current.currentTime = 1;
    }

    const ctx = gsap.context(() => {
      // Hide elements immediately on load so they don't show during the cinematic intro
      gsap.set("nav", { opacity: 0, y: -30 });
      // Set the huge text to be initially hidden on the right side using a clip-path mask
      gsap.set(".hero-huge-text", { 
        opacity: 0, 
        x: 100, 
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' 
      });

      // Cinematic Intro: Start video heavily zoomed in
      gsap.set(".hero-video", { scale: 1.35 });

      // Smoothly zoom out over 3 seconds with a premium ease
      gsap.to(".hero-video", {
        scale: 1.08,
        duration: 3.0,
        ease: "power3.inOut",
        onComplete: () => {
          setIsZoomComplete(true); // Signal to HeroContent that intro is done

          // Animate the huge text in smoothly, sliding from the right like a sheet, AFTER everything else
          gsap.to(".hero-huge-text", {
            clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
            opacity: (index, target) => target.classList.contains('opacity-80') ? 0.8 : 1,
            x: 0,
            duration: 1.8,
            ease: "power4.out",
            delay: 1.8 // Comes in last
          });

          // Animate the Navbar in smoothly from the top
          gsap.to("nav", {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.2
          });
        }
      });

      // --- ScrollTrigger Clip-Path Animation ---
      if (videoFrameRef.current) {
        // Soft curved bottom edges, almost flat center, premium paper-cut appearance
        gsap.set(videoFrameRef.current, {
          clipPath: "polygon(2% 0%, 98% 0%, 95% 92%, 5% 92%)",
          borderRadius: "0% 0% 25% 25%",
        });
        
        gsap.from(videoFrameRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0% 0% 0% 0%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: videoFrameRef.current,
            start: "center center",
            end: "bottom center",
            scrub: 1.2, // Added smoothing interpolator for a perfect, luxurious feel
          },
        });

        // Premium AUREY text exit animation
        const textExitTrigger = {
          trigger: videoFrameRef.current,
          start: "75% center",
          end: "bottom top",
          scrub: true,
        };

        gsap.fromTo(".hero-huge-text", 
          {
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            rotationZ: 0,
            opacity: (index, target) => target.classList.contains('opacity-80') ? 0.8 : 1,
          },
          {
            scale: 0.92,
            opacity: 0,
            y: -80,
            filter: "blur(8px)",
            rotationZ: -2,
            ease: "none",
            scrollTrigger: textExitTrigger,
            immediateRender: false
          }
        );

        // Premium Mask Reveal (curtain closing effect)
        gsap.fromTo(".hero-text-wrapper", 
          { clipPath: "inset(0 0 0 0)" },
          {
            clipPath: "inset(0 0 100% 0)",
            ease: "none",
            scrollTrigger: textExitTrigger,
            immediateRender: false
          }
        );
        
        // Fade out the golden glow
        gsap.fromTo(".hero-text-glow", 
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: textExitTrigger,
            immediateRender: false
          }
        );

        // Add subtle blur to the hero video as we scroll down
        if (videoRef.current) {
          gsap.to(videoRef.current, {
            filter: "blur(4px)",
            ease: "none",
            scrollTrigger: {
              trigger: videoFrameRef.current,
              start: "center center",
              end: "bottom center",
              scrub: 1.2,
            }
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-surface-1">
      <div
        ref={videoFrameRef}
        id="video-frame"
        className="relative z-10 w-full h-full overflow-hidden"
      >
        {/* Immersive Edge-to-Edge Background Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="hero-video absolute inset-0 w-full h-full object-cover -translate-y-4"
        >
          <source src="/Videos/Landing Page Video 4.mp4" type="video/mp4" />
        </video>

        {/* Extremely subtle overlay just to ensure white text pops, preserving the glowing halo */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Text inside the video container - moves with clipPath and shows cream over the dark video */}
        <div className="hero-text-wrapper absolute bottom-0 -right-2 z-20 pointer-events-none overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
          {/* Subtle golden luxury glow */}
          <div className="hero-text-glow absolute inset-0 -m-10 bg-[radial-gradient(circle,rgba(212,184,136,0.18)_0%,transparent_70%)]" />
          <h1 className="hero-huge-text special-font hero-heading relative text-[5rem] md:text-[8rem] xl:text-[10rem] leading-[0.8] tracking-widest text-[#FFF5EB] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] opacity-80 will-change-transform">
            A<b>U</b>REY
          </h1>
        </div>

        {/* Luxury Editorial Content Layer - only animates in after zoom completes */}
        <HeroContent isZoomComplete={isZoomComplete} />
      </div>

      {/* Text outside the video container - revealed underneath when the video clips up, showing dark on cream background */}
      <div className="hero-text-wrapper absolute bottom-0 -right-2 z-0 pointer-events-none overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
        <h1 className="hero-huge-text special-font hero-heading relative text-[5rem] md:text-[8rem] xl:text-[10rem] leading-[0.8] tracking-widest text-text-primary will-change-transform">
          A<b>U</b>REY
        </h1>
      </div>
    </section>
  );
}
