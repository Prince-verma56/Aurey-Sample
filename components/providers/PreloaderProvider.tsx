"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PreloaderContextType {
  isComplete: boolean;
  setComplete: (val: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isComplete: false,
  setComplete: () => {},
});

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isComplete, setComplete] = useState(false);

  // Prevent scrolling on body until preloader is complete and force scroll to top
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    if (!isComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isComplete]);

  return (
    <PreloaderContext.Provider value={{ isComplete, setComplete }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export const usePreloader = () => useContext(PreloaderContext);
