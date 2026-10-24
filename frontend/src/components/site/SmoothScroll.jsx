import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";

export const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    setLenis(lenis);
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); setLenis(null); };
  }, []);
  return null;
};
