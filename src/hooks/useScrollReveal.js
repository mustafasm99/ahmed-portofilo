import { useEffect, useRef } from "react";
export function useScrollReveal(t = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); o.unobserve(el); }
    }, { threshold: t });
    o.observe(el); return () => o.disconnect();
  }, [t]);
  return ref;
}
export function useTiltCard() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
      el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  return ref;
}
