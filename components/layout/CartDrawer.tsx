"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Check, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const PRODUCTS = [
    { step: "Cleanse", name: "Rice Water Cleanser", price: "$42", image: "https://images.unsplash.com/photo-1608283088581-4e1951563f45?auto=format&fit=crop&q=80&w=200&h=250" },
    { step: "Treat", name: "Fermented Essence", price: "$65", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=200&h=250" },
    { step: "Glow", name: "Radiance Finish Cream", price: "$85", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=200&h=250" },
];

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline({ paused: true })
                .to(overlayRef.current, { opacity: 1, duration: 0.6, ease: "power2.inOut" }, 0)
                .to(drawerRef.current, { x: "0%", duration: 1, ease: "expo.out" }, 0)
                .fromTo(".drawer-header", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.4)
                .fromTo(".drawer-hero", { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" }, 0.5)
                .fromTo(".product-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }, 0.7)
                .fromTo(".drawer-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.0)
                .fromTo(".trust-item", { x: -10, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 1.2);
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (isOpen) {
            tlRef.current?.restart();
        } else {
            // Reverse or custom close animation
            if (tlRef.current && tlRef.current.progress() > 0) {
                const ctx = gsap.context(() => {
                    gsap.to(drawerRef.current, { x: "100%", duration: 0.8, ease: "power3.inOut" });
                    gsap.to(overlayRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut", delay: 0.2 });
                });
                return () => ctx.revert();
            }
        }
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 z-[100] flex justify-end ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Overlay */}
            <div 
                ref={overlayRef}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0"
                onClick={onClose}
            />

            {/* Drawer */}
            <div 
                ref={drawerRef}
                className="relative w-full max-w-[480px] h-full border-l border-white/5 flex flex-col overflow-y-auto overflow-x-hidden transform translate-x-[100%] bg-[#0C0806]/95 backdrop-blur-[24px]"
            >
                {/* Luxury Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="relative z-10 flex flex-col min-h-full p-8 md:p-10">
                    
                    {/* Top Area */}
                    <div className="drawer-header flex items-center justify-between mb-12">
                        <div className="flex items-center gap-3">
                            <h2 className="font-heading text-2xl tracking-[0.05em] text-[#FFF5EB]">Your Rituals</h2>
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D9B98E]/10 border border-[#D9B98E]/20 text-[#D9B98E] text-[11px] font-bold">
                                0
                            </span>
                        </div>
                        <button 
                            onClick={onClose}
                            className="group p-2 -mr-2 text-white/60 hover:text-[#FFF5EB] transition-colors"
                        >
                            <X className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Middle Area (Empty State Hero) */}
                    <div className="drawer-hero flex flex-col items-center text-center mb-16 relative">
                        {/* Glow Behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#D9B98E]/20 blur-[40px] rounded-full animate-pulse pointer-events-none" />
                        
                        {/* Minimalist Illustration (SVG inline) */}
                        <div className="w-20 h-28 mb-8 relative">
                            <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#D9B98E]/80 drop-shadow-[0_0_15px_rgba(217,185,142,0.3)] will-change-transform" style={{ animation: 'float 6s ease-in-out infinite' }}>
                                <path d="M30 40C30 35 35 30 40 30H60C65 30 70 35 70 40V120C70 125 65 130 60 130H40C35 130 30 125 30 120V40Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M42 30V20C42 15 46 10 50 10C54 10 58 15 58 20V30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M30 65H70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 4"/>
                            </svg>
                        </div>
                        
                        <h3 className="font-heading text-3xl text-[#FFF5EB] mb-3 drop-shadow-md">Your Ritual Awaits</h3>
                        <p className="font-sans text-[14px] leading-relaxed text-[#E6D8C7]/70 max-w-[280px]">
                            Curate a collection crafted uniquely for your skin's perfect balance.
                        </p>
                    </div>

                    {/* Recommended Products Preview */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#FFF5EB]/10" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D9B98E]">Curated For You</span>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#FFF5EB]/10" />
                        </div>
                        
                        <div className="space-y-4">
                            {PRODUCTS.map((prod, idx) => (
                                <div key={idx} className="product-card group flex items-center gap-4 p-3 rounded-xl hover:bg-[#FFF5EB]/5 border border-transparent hover:border-[#FFF5EB]/10 transition-all duration-500 cursor-pointer will-change-transform hover:-translate-y-1 hover:scale-[1.02]">
                                    <div className="w-[60px] h-[75px] rounded-lg overflow-hidden relative bg-[#1A1512]">
                                        <img src={prod.image} alt={prod.name} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <span className="text-[10px] uppercase tracking-wider text-[#D9B98E] mb-1">{prod.step}</span>
                                        <h4 className="text-[14px] text-[#FFF5EB] font-medium tracking-wide group-hover:text-[#D9B98E] transition-colors">{prod.name}</h4>
                                        <span className="text-[13px] text-[#E6D8C7]/60 mt-1">{prod.price}</span>
                                    </div>
                                    <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                        <div className="w-8 h-8 rounded-full bg-[#FFF5EB]/10 flex items-center justify-center">
                                            <span className="text-[16px] text-[#FFF5EB] font-light leading-none mb-[2px]">+</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto pt-8">
                        {/* Explore CTA */}
                        <button className="drawer-cta relative w-full h-14 bg-[#FFF5EB] text-[#120D0A] rounded-full overflow-hidden group hover:scale-[1.02] transition-transform duration-500 flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(255,245,235,0.15)]">
                            <span className="relative z-10 text-[13px] font-bold tracking-[0.15em] uppercase flex items-center gap-3">
                                Begin Your Ritual
                                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                            </span>
                            {/* Shine effect */}
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_ease-out]" />
                        </button>

                        {/* Bottom Trust Section */}
                        <div className="flex flex-col gap-3">
                            {["Clinically Tested", "Crafted in Seoul", "Free Ritual Consultation"].map((text, idx) => (
                                <div key={idx} className="trust-item flex items-center gap-3">
                                    <Check className="w-4 h-4 text-[#D9B98E]" />
                                    <span className="text-[12px] tracking-wide text-[#E6D8C7]/60">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
}
