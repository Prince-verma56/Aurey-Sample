"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronDown, ArrowRight, Sparkles, Search, User, ShoppingBag, X, Droplets, Flower2, Sun } from 'lucide-react';
import { CommandPalette } from '@/components/search/CommandPalette';

// --- Restructured Editorial Menu Data ---
const menuData = {
    collections: {
        title: "Curated Collections",
        layout: "grid",
        items: [
            { name: "The Skin Bar", image: "https://images.unsplash.com/photo-1608283088581-4e1951563f45?auto=format&fit=crop&q=80&w=200&h=150" },
            { name: "The Hair Bar", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=200&h=150" },
            { name: "The Body Bar", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=200&h=150" },
            { name: "Glass Therapy", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200&h=150" },
            { name: "Anti-Aging Edit", image: "https://images.unsplash.com/photo-1615397323145-816b1e3eb820?auto=format&fit=crop&q=80&w=200&h=150" },
            { name: "Acne Solutions", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200&h=150" },
            { name: "Daily Essentials", image: "https://images.unsplash.com/photo-1570194065650-d612c8c6f140?auto=format&fit=crop&q=80&w=200&h=150" },
            { name: "The Glow Kit", image: "https://images.unsplash.com/photo-1611077544976-5ef8d05543c7?auto=format&fit=crop&q=80&w=200&h=150" },
        ],
        featured: {
            label: "New Arrival",
            title: "Teenagers Glow Edit",
            desc: "Gentle, active-free formulations designed for delicate young skin barriers.",
            image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400&h=500"
        }
    },
    rituals: {
        title: "The Core Rituals",
        layout: "editorial",
        sections: [
            { title: "Cleanse", icon: Droplets, links: ["Purifying Rice Wash", "Camellia Cleansing Oil", "Gentle Exfoliant"] },
            { title: "Treat", icon: Sparkles, links: ["Niacinamide Essence", "Ginseng Renewal Serum", "Vitamin C Drops"] },
            { title: "Hydrate", icon: Flower2, links: ["Silk Peony Cream", "Dewy Skin Emulsion", "Overnight Mask"] },
            { title: "Protect", icon: Sun, links: ["Invisible Mineral Sunscreen", "Antioxidant Mist"] },
        ],
        featured: {
            label: "Signature Routine",
            title: "Beauty Rooted In Ritual",
            desc: "Explore the 4-step Korean Beauty regimen adapted specifically for Indian Skin environments.",
            image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=400&h=500"
        }
    }
};

type MenuKey = keyof typeof menuData | null;

export function Navbar() {
    const [activeTab, setActiveTab] = useState<MenuKey>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cartDrawerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastScrollY = useRef(0);
    const isHidden = useRef(false);

    const handleMouseEnter = (tab: MenuKey) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveTab(tab);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveTab(null);
        }, 150);
    };

    // GSAP Dropdown Animation
    useEffect(() => {
        if (!dropdownRef.current || !contentRef.current) return;

        const ctx = gsap.context(() => {
            if (activeTab) {
                gsap.to(dropdownRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                });

                gsap.fromTo(
                    ".menu-item",
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.02, ease: "power2.out", overwrite: true }
                );
            } else {
                gsap.to(dropdownRef.current, {
                    autoAlpha: 0,
                    y: -8,
                    duration: 0.3,
                    ease: "power2.in",
                });
            }
        }, dropdownRef);

        return () => ctx.revert();
    }, [activeTab]);

    // GSAP Cart Drawer Animation
    useEffect(() => {
        if (!cartDrawerRef.current) return;
        if (isCartOpen) {
            gsap.to(cartDrawerRef.current, { x: "0%", duration: 0.8, ease: "power4.out" });
        } else {
            gsap.to(cartDrawerRef.current, { x: "100%", duration: 0.6, ease: "power3.in" });
        }
    }, [isCartOpen]);

    // Scroll-based Navbar Hide / Show ("falling" parallax feel)
    useEffect(() => {
        const SCROLL_THRESHOLD = 80; // Don't trigger until scrolled past 80px from top
        const DELTA_TRIGGER = 6;     // Minimum scroll delta to react to (avoids micro-jitters)

        const onScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollY.current;

            // Always show when near the very top of the page
            if (currentY < SCROLL_THRESHOLD) {
                if (isHidden.current) {
                    isHidden.current = false;
                    gsap.to(navRef.current, {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power3.out",
                    });
                }
                lastScrollY.current = currentY;
                return;
            }

            if (delta > DELTA_TRIGGER && !isHidden.current) {
                // Scrolling DOWN → slide up and out
                isHidden.current = true;
                gsap.to(navRef.current, {
                    y: -110,
                    opacity: 0,
                    duration: 0.55,
                    ease: "power3.in",
                });
            } else if (delta < -DELTA_TRIGGER && isHidden.current) {
                // Scrolling UP → fall back in naturally
                isHidden.current = false;
                gsap.to(navRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    ease: "back.out(1.4)", // Gives a soft "landing" bounce like gravity
                });
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-10 h-[70px] bg-[#0C0806]/40 backdrop-blur-[24px] rounded-[35px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#D9B98E]/30 w-[min(96%,1600px)] transition-colors duration-500 hover:bg-[#0C0806]/50 will-change-transform"
                onMouseLeave={handleMouseLeave}
            >
                {/* 2. Enhanced Logo: Larger, wider tracking, stark white/ivory for contrast */}
                <div className="flex-1 basis-0 flex justify-start">
                    <div className="text-[26px] font-heading tracking-[0.26em] text-[#FFF5EB] cursor-pointer drop-shadow-md">
                        AUREY
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-none flex items-center justify-center gap-10">
                    <button
                        onMouseEnter={() => handleMouseEnter('collections')}
                        className={`group flex items-center gap-1.5 text-[13px] font-medium tracking-[0.05em] uppercase transition-all duration-300 ${activeTab === 'collections' ? 'text-[#FFF5EB] drop-shadow-md' : 'text-[#E6D8C7]/90 hover:text-[#FFF5EB]'}`}
                    >
                        <span className="relative">
                            Collections
                            <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-[#FFF5EB]/60 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeTab === 'collections' ? 'rotate-180 text-[#D9B98E]' : ''}`} />
                    </button>

                    <button className="group relative text-[13px] font-medium tracking-[0.05em] uppercase text-[#E6D8C7]/90 hover:text-[#FFF5EB] transition-all duration-300">
                        Ingredients
                        <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-[#FFF5EB]/60 transition-all duration-300 group-hover:w-full"></span>
                    </button>

                    <button
                        onMouseEnter={() => handleMouseEnter('rituals')}
                        className={`group flex items-center gap-1.5 text-[13px] font-medium tracking-[0.05em] uppercase transition-all duration-300 ${activeTab === 'rituals' ? 'text-[#FFF5EB] drop-shadow-md' : 'text-[#E6D8C7]/90 hover:text-[#FFF5EB]'}`}
                    >
                        <span className="relative">
                            Rituals
                            <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-[#FFF5EB]/60 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeTab === 'rituals' ? 'rotate-180 text-[#D9B98E]' : ''}`} />
                    </button>

                    <button className="group relative text-[13px] font-medium tracking-[0.05em] uppercase text-[#E6D8C7]/90 hover:text-[#FFF5EB] transition-all duration-300">
                        Journal
                        <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-[#FFF5EB]/60 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                </div>

                <div className="flex-1 basis-0 flex items-center justify-end gap-10">
                    {/* Icons Container */}
                    <div className="flex items-center gap-8">
                        <button 
                          onClick={() => setIsSearchOpen(true)}
                          className="text-[#FFF5EB]/80 hover:text-[#D9B98E] hover:-translate-y-1 transition-all duration-300"
                        >
                          <Search className="w-5 h-5" />
                        </button>

                        <button className="text-[#FFF5EB]/80 hover:text-[#D9B98E] hover:-translate-y-1 transition-all duration-300">
                          <User className="w-5 h-5" />
                        </button>
                        
                        <button 
                            className="relative text-[#FFF5EB]/80 hover:text-[#D9B98E] hover:-translate-y-1 transition-all duration-300"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                            <span className="absolute -top-1.5 -right-2 bg-[#D9B98E] text-[#120D0A] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                2
                            </span>
                        </button>
                    </div>
                </div>

                {/* Dropdown Container */}
                <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 w-full pt-4 invisible opacity-0"
                    style={{ transform: 'translateY(-8px)' }}
                >
                    {/* 4. Translucent Dropdown Base: Premium Frosted Acrylic Glass */}
                    <div className="w-full bg-[#0C0806]/95 backdrop-blur-[24px] rounded-[32px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-[#FFF5EB]/10 overflow-hidden">
                        <div ref={contentRef} className="p-10">
                            
                            {activeTab === 'collections' && (
                                <div className="flex gap-12">
                                    <div className="flex-[1.5]">
                                        <h3 className="mb-8 text-[11px] font-bold tracking-[0.25em] text-[#CBA381] uppercase menu-item">
                                            {menuData.collections.title}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                                            {menuData.collections.items.map((item, idx) => (
                                                <div key={idx} className="group flex items-center gap-5 cursor-pointer menu-item">
                                                    <div className="w-20 h-14 overflow-hidden rounded-lg border border-[#FFF5EB]/10 bg-[#2A201A]">
                                                        <img src={item.image} alt={item.name} className="object-cover w-full h-full opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />
                                                    </div>
                                                    <span className="text-[15px] font-medium text-[#E6D8C7] group-hover:text-[#FFF5EB] transition-colors">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <FeaturedCard data={menuData.collections.featured} />
                                </div>
                            )}

                            {activeTab === 'rituals' && (
                                <div className="flex gap-12">
                                    {/* 5. Editorial Layout: Eliminates dead space, looks like a magazine index */}
                                    <div className="flex-[1.5]">
                                        <h3 className="mb-8 text-[11px] font-bold tracking-[0.25em] text-[#CBA381] uppercase menu-item">
                                            {menuData.rituals.title}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                                            {menuData.rituals.sections.map((section, idx) => (
                                                <div key={idx} className="menu-item">
                                                    <h4 className="flex items-center gap-2.5 text-[13px] font-bold tracking-widest text-[#FFF5EB] uppercase mb-4 pb-2 border-b border-[#FFF5EB]/10">
                                                        <section.icon className="w-3.5 h-3.5 text-[#D9B98E]" />
                                                        {section.title}
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {section.links.map((link, lIdx) => (
                                                            <li key={lIdx}>
                                                                <a href="#" className="text-[14px] text-[#E6D8C7]/70 hover:text-[#FFF5EB] transition-colors relative group inline-block">
                                                                    {link}
                                                                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#CBA381]/50 transition-all duration-300 group-hover:w-full"></span>
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <FeaturedCard data={menuData.rituals.featured} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- CART DRAWER --- */}
            <div 
                ref={cartDrawerRef}
                className="fixed top-0 right-0 h-full w-[420px] bg-[rgba(18,18,18,0.85)] backdrop-blur-[30px] z-[100] border-l border-white/10 translate-x-full flex flex-col"
            >
                <div className="p-8 flex items-center justify-between border-b border-white/10">
                <h2 className="font-['Cormorant_Garamond',serif] text-2xl tracking-[0.05em] text-[#FFF5EB]">Your Rituals</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-white/60 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>
                </div>
                <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-12 h-12 text-white/20 mb-4" />
                <p className="text-white/50 tracking-wide text-[13px]">Your bag is elegantly empty.</p>
                </div>
            </div>
            {/* Drawer Overlay */}
            {isCartOpen && (
                <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
                onClick={() => setIsCartOpen(false)}
                />
            )}

            {/* The Global Search Overlay */}
            <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}

// 6. Upgraded Featured Card Component (Editorial Style)
function FeaturedCard({ data }: { data: any }) {
    return (
        <div className="flex-1 relative rounded-[24px] overflow-hidden menu-item group cursor-pointer border border-[#FFF5EB]/10 aspect-[4/3]">
            {/* Background Image */}
            <img
                src={data.image}
                alt="Featured"
                className="absolute inset-0 object-cover w-full h-full opacity-80 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
            />
            {/* Glass Overlay Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A]/90 via-[#120D0A]/40 to-transparent transition-opacity duration-500" />
            
            {/* Content pinned to bottom */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#D9B98E] uppercase mb-3">
                    {data.label}
                </span>
                <h4 className="font-heading text-2xl text-[#FFF5EB] mb-2 drop-shadow-lg">
                    {data.title}
                </h4>
                <p className="text-[13px] text-[#E6D8C7]/90 leading-relaxed mb-6 max-w-[90%] drop-shadow-md">
                    {data.desc}
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-[0.15em] text-[#FFF5EB] uppercase">
                        Explore Ritual
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FFF5EB] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </div>
    );
}