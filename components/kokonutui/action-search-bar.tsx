"use client";

/**
 * @author: @kokonutui
 * @description: A modern search bar component with action buttons and suggestions
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import {
  Search,
  Send,
  X,
  Sparkles,
  Droplets,
  Leaf,
  Sun
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { products, Product } from "@/constants/products";

interface Action {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  short?: string;
  end?: string;
  product: Product;
}

interface SearchResult {
  actions: Action[];
}

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.4 },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  },
} as const;

const getIcon = (cat: string) => {
  if(cat === 'Cleanse') return <Droplets className="h-3.5 w-3.5 text-[#D9B98E]" />;
  if(cat === 'Treat') return <Sparkles className="h-3.5 w-3.5 text-[#D9B98E]" />;
  if(cat === 'Hydrate') return <Leaf className="h-3.5 w-3.5 text-[#D9B98E]" />;
  return <Sun className="h-3.5 w-3.5 text-[#D9B98E]" />;
};

const allActionsSample: Action[] = products.map(p => ({
  id: p.id,
  label: p.name,
  icon: getIcon(p.category),
  description: p.shortDesc,
  short: p.price,
  end: p.category,
  product: p,
}));

function ActionSearchBar({
  actions = allActionsSample,
  defaultOpen = false,
}: {
  actions?: Action[];
  defaultOpen?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isFocused, setIsFocused] = useState(defaultOpen);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 200);

  const filteredActions = useMemo(() => {
    if (!debouncedQuery) return actions;

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    return actions.filter((action) => {
      const searchableText =
        `${action.label} ${action.description || ""}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [debouncedQuery, actions]);

  useEffect(() => {
    if (!isFocused) {
      setResult(null);
      setActiveIndex(-1);
      return;
    }

    setResult({ actions: filteredActions });
    setActiveIndex(-1);
  }, [filteredActions, isFocused]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setIsTyping(true);
      setActiveIndex(-1);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!result?.actions.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < result.actions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : result.actions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && result.actions[activeIndex]) {
            setSelectedProduct(result.actions[activeIndex].product);
            setIsFocused(false);
            setQuery("");
          }
          break;
        case "Escape":
          setIsFocused(false);
          setActiveIndex(-1);
          break;
      }
    },
    [result?.actions, activeIndex]
  );

  const handleActionClick = useCallback((action: Action) => {
    setSelectedProduct(action.product);
    setIsFocused(false);
    setQuery("");
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setActiveIndex(-1);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setIsFocused(false);
      setActiveIndex(-1);
    }, 200);
  }, []);

  return (
    <div className="w-full max-w-[200px] lg:max-w-[240px]">
      <div className="relative flex flex-col items-center justify-start">
        <div className="relative w-full">
          <div className="relative">
            <Input
              aria-activedescendant={
                activeIndex >= 0
                  ? `action-${result?.actions[activeIndex]?.id}`
                  : undefined
              }
              aria-autocomplete="list"
              aria-expanded={isFocused && !!result}
              autoComplete="off"
              className="h-8 rounded-full bg-[#120D0A]/40 border-[#FFF5EB]/20 text-[#FFF5EB] placeholder:text-[#E6D8C7]/50 py-1.5 pr-9 pl-4 text-xs focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#D9B98E]/50 transition-all"
              id="search"
              onBlur={handleBlur}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              placeholder="Search rituals..."
              role="combobox"
              type="text"
              value={query}
            />
            <div className="absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2">
              <AnimatePresence mode="popLayout">
                {query.length > 0 ? (
                  <motion.div
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    initial={{ y: -20, opacity: 0 }}
                    key="send"
                    transition={{ duration: 0.2 }}
                  >
                    <Send className="h-3.5 w-3.5 text-[#D9B98E]" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    initial={{ y: -20, opacity: 0 }}
                    key="search"
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="h-3.5 w-3.5 text-[#E6D8C7]/50" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full">
          <AnimatePresence>
            {isFocused && result && !selectedProduct && (
              <motion.div
                animate="show"
                aria-label="Search results"
                className="absolute top-[calc(100%+8px)] left-0 z-50 w-[300px] overflow-hidden rounded-2xl border border-[#FFF5EB]/10 bg-[#16100B]/95 backdrop-blur-xl shadow-2xl"
                exit="exit"
                initial="hidden"
                role="listbox"
                variants={ANIMATION_VARIANTS.container}
              >
                <motion.ul role="none">
                  {result.actions.map((action) => (
                    <motion.li
                      aria-selected={
                        activeIndex === result.actions.indexOf(action)
                      }
                      className={`flex cursor-pointer items-center justify-between px-4 py-2.5 hover:bg-[#FFF5EB]/10 transition-colors ${
                        activeIndex === result.actions.indexOf(action)
                          ? "bg-[#FFF5EB]/10"
                          : ""
                      }`}
                      id={`action-${action.id}`}
                      key={action.id}
                      layout
                      onClick={() => handleActionClick(action)}
                      role="option"
                      variants={ANIMATION_VARIANTS.item}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span aria-hidden="true" className="text-[#D9B98E]">
                            {action.icon}
                          </span>
                          <span className="font-medium text-[#FFF5EB] text-[13px]">
                            {action.label}
                          </span>
                          {action.description && (
                            <span className="text-[#E6D8C7]/60 text-[11px]">
                              {action.description}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {action.short && (
                          <span
                            aria-label={`Keyboard shortcut: ${action.short}`}
                            className="text-[#E6D8C7]/40 text-[10px]"
                          >
                            {action.short}
                          </span>
                        )}
                        {action.end && (
                          <span className="text-right text-[#E6D8C7]/40 text-[10px]">
                            {action.end}
                          </span>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-[#0A0705]/80 backdrop-blur-md"
               onClick={() => setSelectedProduct(null)}
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-4xl bg-[#16100B] border border-[#FFF5EB]/10 rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-10 text-[#FFF5EB]/60 hover:text-[#FFF5EB] transition-colors bg-[#120D0A]/50 p-2 rounded-full backdrop-blur-sm">
                <X className="w-5 h-5" />
              </button>
              {/* Left Side: Image */}
              <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative">
                 <img src={selectedProduct.image} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#16100B] to-transparent md:hidden" />
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#16100B] hidden md:block" />
              </div>
              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                 <span className="text-[11px] font-bold tracking-[0.2em] text-[#CBA381] uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>{selectedProduct.category}</span>
                 <h2 className="text-4xl md:text-5xl text-[#FFF5EB] mb-4 leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>{selectedProduct.name}</h2>
                 <p className="text-[#E6D8C7]/80 leading-relaxed mb-8 text-[14px]" style={{ fontFamily: 'var(--font-inter)' }}>{selectedProduct.description}</p>
                 
                 <div className="flex items-center justify-between mt-auto pt-8 border-t border-[#FFF5EB]/10">
                   <span className="text-2xl text-[#FFF5EB] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>{selectedProduct.price}</span>
                   <button className="h-12 px-8 text-[12px] tracking-[0.1em] font-bold uppercase text-[#1B140F] bg-gradient-to-r from-[#E8D6BF] to-[#CBA381] rounded-full hover:from-[#FFF5EB] hover:to-[#D9B98E] transition-all" style={{ fontFamily: 'var(--font-inter)' }}>
                     Add to Bag
                   </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ActionSearchBar;
