import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* Typing effect hook */
function useTyping(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx]       = useState(0);
  const [cIdx, setCIdx]       = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wIdx];
    let timeout;
    if (!deleting && cIdx <= word.length) {
      timeout = setTimeout(() => { setDisplay(word.slice(0, cIdx)); setCIdx(c => c + 1); }, speed);
    } else if (!deleting && cIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && cIdx >= 0) {
      timeout = setTimeout(() => { setDisplay(word.slice(0, cIdx)); setCIdx(c => c - 1); }, speed / 2);
    } else {
      setDeleting(false); setWIdx(w => (w + 1) % words.length); setCIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [cIdx, deleting, wIdx, words, speed, pause]);

  return display;
}

export default function Hero({ profile, stats }) {
  const typed = useTyping(profile.titleRotate);
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current; if (!el) return;
    const fn = (e) => { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; };
    window.addEventListener("mousemove", fn); return () => window.removeEventListener("mousemove", fn);
  }, []);

  const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
  const item    = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-void dot-grid scanline-overlay pt-20">
      {/* Cursor glow */}
      <div ref={glowRef} className="pointer-events-none fixed w-[400px] h-[400px] rounded-full z-0"
        style={{ background: "radial-gradient(circle, rgba(0,255,148,0.05) 0%, transparent 70%)", transform: "translate(-50%,-50%)", transition: "left .08s, top .08s" }} />

      {/* Ambient */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-mint/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div variants={stagger} initial="initial" animate="animate">
            <motion.div variants={item} className="inline-flex items-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              <span className="font-mono text-xs text-mint tracking-[0.2em] uppercase">Available for work</span>
            </motion.div>

            <motion.div variants={item}>
              <p className="font-mono text-muted text-sm mb-2">// Hello, I'm</p>
              <h1 className="font-display font-bold text-text leading-[0.92] tracking-tight mb-4"
                style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}>
                {profile.name}
              </h1>
              {/* Typing headline */}
              <div className="flex items-center gap-2 mb-8" style={{ minHeight: "2.5rem" }}>
                <span className="font-display font-semibold text-xl text-mint">{typed}</span>
                <span className="w-0.5 h-6 bg-mint animate-blink" />
              </div>
            </motion.div>

            <motion.p variants={item} className="text-subtle leading-relaxed text-base max-w-lg mb-10">
              {profile.bio}
            </motion.p>

            {/* Stack pills */}
            <motion.div variants={item} className="flex flex-wrap gap-2 mb-10">
              {profile.stack.map((s, i) => (
                <span key={i} className="font-mono text-xs px-3 py-1.5 border border-wire text-muted hover:border-mint hover:text-mint transition-all duration-200 cursor-default">
                  {s}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 bg-mint text-void font-display font-bold text-sm hover:opacity-90 transition-opacity">
                view_work() →
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text font-mono text-xs hover:border-mint hover:text-mint transition-all duration-300">
                get_in_touch()
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — code block */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block">
            <div className="code-card p-6">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-wire">
                <div className="w-3 h-3 rounded-full bg-red/60" />
                <div className="w-3 h-3 rounded-full bg-amber/60" />
                <div className="w-3 h-3 rounded-full bg-mint/60" />
                <span className="ml-4 font-mono text-xs text-muted">profile.ts</span>
              </div>

              {/* Syntax-highlighted fake code */}
              <div className="font-mono text-xs leading-7 space-y-0">
                <div><span className="text-purple">const</span><span className="text-text"> developer </span><span className="text-subtle">=</span><span className="text-text"> {"{"}</span></div>
                <div className="pl-4"><span className="text-blue">name</span><span className="text-subtle">:</span><span className="text-amber"> "{profile.name}"</span><span className="text-subtle">,</span></div>
                <div className="pl-4"><span className="text-blue">role</span><span className="text-subtle">:</span><span className="text-amber"> "Frontend Engineer"</span><span className="text-subtle">,</span></div>
                <div className="pl-4"><span className="text-blue">location</span><span className="text-subtle">:</span><span className="text-amber"> "{profile.location}"</span><span className="text-subtle">,</span></div>
                <div className="pl-4"><span className="text-blue">available</span><span className="text-subtle">:</span><span className="text-mint"> true</span><span className="text-subtle">,</span></div>
                <div className="pl-4"><span className="text-blue">stack</span><span className="text-subtle">:</span><span className="text-text"> [</span></div>
                {profile.stack.slice(0, 4).map((s, i) => (
                  <div key={i} className="pl-8"><span className="text-amber">"{s}"</span><span className="text-subtle">,</span></div>
                ))}
                <div className="pl-8"><span className="text-muted">// + {profile.stack.length - 4} more</span></div>
                <div className="pl-4"><span className="text-text">],</span></div>
                <div className="pl-4"><span className="text-blue">passion</span><span className="text-subtle">:</span><span className="text-amber"> "Performance &amp; UX"</span></div>
                <div><span className="text-text">{"}"}</span></div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="code-card p-4 text-center hover:border-mint/40 transition-colors duration-300 group">
                  <p className={`font-mono font-bold text-2xl text-${s.color} group-hover:drop-shadow-[0_0_8px_currentColor] transition-all`}>{s.value}</p>
                  <p className="font-mono text-[10px] text-muted mt-1 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-muted tracking-[0.3em] uppercase">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-8 bg-gradient-to-b from-mint to-transparent" />
      </motion.div>
    </section>
  );
}
