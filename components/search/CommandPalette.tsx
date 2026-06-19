"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { products, Product } from '@/constants/products';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_RITUALS = [
  "Rice Ritual", "Niacinamide", "Glow Boost", "Hydration", "Barrier Repair", "Dark Spots"
];

const ALL_INGREDIENTS = Array.from(new Set(products.flatMap(p => p.ingredients)));
const ALL_CONCERNS = Array.from(new Set(products.flatMap(p => p.concerns)));

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setQuery("");
    setSelectedProduct(null);
    onClose();
  };

  const filteredData = useMemo(() => {
    if (!query) return null;
    const normalized = query.toLowerCase().trim();
    
    return {
      products: products.filter(p => 
        p.name.toLowerCase().includes(normalized) || 
        p.description.toLowerCase().includes(normalized) ||
        p.category.toLowerCase().includes(normalized)
      ),
      ingredients: ALL_INGREDIENTS.filter(i => i.toLowerCase().includes(normalized)),
      concerns: ALL_CONCERNS.filter(c => c.toLowerCase().includes(normalized))
    };
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (selectedProduct) {
          setSelectedProduct(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, selectedProduct]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] md:pt-[15vh]">
          {/* Deep Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-[#0A0705]/50 backdrop-blur-[20px]"
            onClick={handleClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[700px] w-[95%] bg-[#120D0A]/95 backdrop-blur-3xl border border-[#FFF5EB]/10 rounded-[28px] shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '75vh' }}
          >
            {/* Search Input Area */}
            <div className="flex items-center px-6 py-5 border-b border-[#FFF5EB]/10 relative z-10 bg-[#120D0A]">
              <Search className="w-6 h-6 text-[#D9B98E]/80 mr-4 shrink-0" />
              <input 
                type="text"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedProduct(null); // Return to search view if typing
                }}
                placeholder="Search products, ingredients, or skin concerns..."
                className="w-full bg-transparent border-none outline-none text-[#FFF5EB] placeholder:text-[#E6D8C7]/30 text-lg md:text-xl font-light tracking-wide"
                style={{ fontFamily: 'var(--font-inter)' }}
              />
              <button onClick={handleClose} className="p-2 rounded-full hover:bg-[#FFF5EB]/10 transition-colors ml-4 text-[#E6D8C7]/50 hover:text-[#FFF5EB] shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 custom-scrollbar relative">
              <AnimatePresence mode="wait">
                {selectedProduct ? (
                  // PRODUCT DETAIL VIEW INSIDE PALETTE
                  <motion.div 
                    key="detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col md:flex-row h-full"
                  >
                    <div className="w-full md:w-[45%] h-[250px] md:h-auto relative">
                      <img src={selectedProduct.image} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] to-transparent md:hidden" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#120D0A] hidden md:block" />
                    </div>
                    <div className="w-full md:w-[55%] p-8 flex flex-col justify-center bg-[#120D0A]">
                       <span className="text-[10px] font-bold tracking-[0.2em] text-[#D9B98E] uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>{selectedProduct.category} Ritual</span>
                       <h2 className="text-3xl md:text-4xl text-[#FFF5EB] mb-4 leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>{selectedProduct.name}</h2>
                       <p className="text-[#E6D8C7]/70 leading-relaxed mb-6 text-[13px]" style={{ fontFamily: 'var(--font-inter)' }}>{selectedProduct.description}</p>
                       
                       <div className="mb-6">
                         <p className="text-[10px] uppercase tracking-[0.1em] text-[#E6D8C7]/40 mb-2">Key Ingredients</p>
                         <div className="flex gap-2">
                           {selectedProduct.ingredients.map(ing => (
                             <span key={ing} className="text-[11px] text-[#CBA381] px-3 py-1 bg-[#FFF5EB]/5 border border-[#FFF5EB]/10 rounded-full">{ing}</span>
                           ))}
                         </div>
                       </div>

                       <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#FFF5EB]/10">
                         <span className="text-xl text-[#FFF5EB] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>{selectedProduct.price}</span>
                         <button className="h-10 px-6 text-[11px] tracking-[0.1em] font-bold uppercase text-[#1B140F] bg-[#D9B98E] rounded-full hover:bg-[#FFF5EB] transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
                           Add to Bag
                         </button>
                       </div>
                    </div>
                  </motion.div>
                ) : !query ? (
                  // EMPTY STATE
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <h3 className="text-[11px] font-medium tracking-[0.2em] text-[#E6D8C7]/50 uppercase mb-5" style={{ fontFamily: 'var(--font-inter)' }}>Popular Rituals</h3>
                    <div className="flex flex-wrap gap-3">
                      {POPULAR_RITUALS.map(ritual => (
                        <button 
                          key={ritual}
                          onClick={() => setQuery(ritual)}
                          className="px-5 py-2.5 rounded-full border border-[#FFF5EB]/10 bg-[#FFF5EB]/5 text-[#E6D8C7]/90 text-[13px] hover:bg-[#FFF5EB]/15 hover:text-[#FFF5EB] hover:border-[#FFF5EB]/30 transition-all duration-300"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {ritual}
                        </button>
                      ))}
                    </div>

                    <div className="mt-12">
                      <h3 className="text-[11px] font-medium tracking-[0.2em] text-[#E6D8C7]/50 uppercase mb-5" style={{ fontFamily: 'var(--font-inter)' }}>Featured Product</h3>
                      <div 
                        onClick={() => setSelectedProduct(products[0])}
                        className="group relative h-[160px] rounded-[20px] overflow-hidden cursor-pointer border border-[#FFF5EB]/10"
                      >
                        <img src={products[0].image} alt="Featured" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705]/90 via-[#0A0705]/40 to-transparent" />
                        <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end">
                          <div>
                            <span className="text-[10px] text-[#D9B98E] uppercase tracking-[0.1em] font-semibold block mb-1">Bestseller</span>
                            <span className="text-2xl text-[#FFF5EB]" style={{ fontFamily: 'var(--font-cormorant)' }}>{products[0].name}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#FFF5EB]/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#FFF5EB] group-hover:text-[#120D0A] text-[#FFF5EB] transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // SEARCH RESULTS
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 space-y-8"
                  >
                    {filteredData?.products.length === 0 && filteredData?.ingredients.length === 0 && filteredData?.concerns.length === 0 && (
                      <div className="text-center py-16">
                        <p className="text-[#E6D8C7]/50 text-[15px]" style={{ fontFamily: 'var(--font-inter)' }}>No results found for &quot;{query}&quot;</p>
                      </div>
                    )}

                    {filteredData && filteredData.products.length > 0 && (
                      <div>
                        <h3 className="text-[10px] font-medium tracking-[0.2em] text-[#E6D8C7]/50 uppercase mb-4 px-2" style={{ fontFamily: 'var(--font-inter)' }}>Products</h3>
                        <div className="space-y-2">
                          {filteredData.products.map(product => (
                            <div 
                              key={product.id}
                              onClick={() => setSelectedProduct(product)}
                              className="group flex items-center p-3 rounded-[16px] bg-transparent border border-transparent hover:border-[#D9B98E]/30 hover:bg-[#FFF5EB]/[0.03] transition-all duration-300 cursor-pointer"
                            >
                              <div className="w-[56px] h-[56px] rounded-[12px] overflow-hidden shrink-0 border border-[#FFF5EB]/10 relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                              </div>
                              <div className="ml-4 flex-1">
                                <h4 className="text-[16px] text-[#FFF5EB] group-hover:text-[#D9B98E] transition-colors" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600 }}>{product.name}</h4>
                                <p className="text-[12px] text-[#E6D8C7]/60 mt-0.5" style={{ fontFamily: 'var(--font-inter)' }}>{product.shortDesc}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-[13px] text-[#FFF5EB]/90" style={{ fontFamily: 'var(--font-cormorant)' }}>{product.price}</div>
                                <div className="text-[10px] tracking-[0.1em] text-[#D9B98E]/70 uppercase mt-1">{product.category}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(filteredData && (filteredData.ingredients.length > 0 || filteredData.concerns.length > 0)) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
                        {filteredData.ingredients.length > 0 && (
                          <div>
                            <h3 className="text-[10px] font-medium tracking-[0.2em] text-[#E6D8C7]/50 uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>Ingredients</h3>
                            <div className="flex flex-col gap-1">
                              {filteredData.ingredients.map(ing => (
                                <button 
                                  key={ing} 
                                  onClick={() => setQuery(ing)}
                                  className="text-left py-2 px-3 rounded-lg text-[13px] text-[#FFF5EB]/80 hover:bg-[#FFF5EB]/10 hover:text-[#D9B98E] transition-colors"
                                  style={{ fontFamily: 'var(--font-inter)' }}
                                >
                                  {ing}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {filteredData.concerns.length > 0 && (
                          <div>
                            <h3 className="text-[10px] font-medium tracking-[0.2em] text-[#E6D8C7]/50 uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>Skin Concerns</h3>
                            <div className="flex flex-col gap-1">
                              {filteredData.concerns.map(con => (
                                <button 
                                  key={con} 
                                  onClick={() => setQuery(con)}
                                  className="text-left py-2 px-3 rounded-lg text-[13px] text-[#FFF5EB]/80 hover:bg-[#FFF5EB]/10 hover:text-[#D9B98E] transition-colors"
                                  style={{ fontFamily: 'var(--font-inter)' }}
                                >
                                  {con}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#FFF5EB]/10 bg-[#0A0705] flex items-center justify-between text-[#E6D8C7]/40 text-[10px] uppercase tracking-[0.1em] relative z-10" style={{ fontFamily: 'var(--font-inter)' }}>
              <span>AUREY Command Menu</span>
              <span>ESC to Close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
