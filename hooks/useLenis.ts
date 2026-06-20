import { useEffect } from "react";
import Lenis from "lenis";
import { usePreloader } from "@/components/providers/PreloaderProvider";

export function useLenis() {
  const { isComplete } = usePreloader();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5, // Increased from 1.2 for a much longer, smoother delay
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly reduced to make the scroll feel "heavier" and more luxurious
      touchMultiplier: 2,
    });

    if (!isComplete) {
      lenis.stop();
    } else {
      lenis.start();
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isComplete]);
}
