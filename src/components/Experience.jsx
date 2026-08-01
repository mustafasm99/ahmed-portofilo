import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Experience({ experience }) {
  const [active, setActive] = useState(0);
  const ref = useScrollReveal();

  return (
    <section id="experience" className="py-24 bg-void border-t border-wire">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal mb-16">
          <p className="font-mono text-mint text-xs tracking-[0.3em] uppercase mb-4">// experience.forEach()</p>
          <h2 className="font-display font-bold text-text" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Work History
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Selector */}
          <div className="lg:col-span-2 space-y-2">
            {experience.map((job, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full text-left p-4 border transition-all duration-200 ${
                  active === i
                    ? "border-mint bg-mint-pale text-text"
                    : "border-wire bg-panel text-muted hover:border-border hover:text-text"
                }`}>
                <p className="font-display font-semibold">{job.company}</p>
                <p className={`font-mono text-xs mt-0.5 ${active === i ? "text-mint" : "text-muted"}`}>{job.period}</p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
                className="code-card p-7">
                <div className="mb-5">
                  <h3 className="font-display font-bold text-xl text-text">{experience[active].role}</h3>
                  <p className="font-mono text-mint text-sm mt-0.5">{experience[active].company}</p>
                  <div className="flex gap-3 mt-2">
                    <span className="font-mono text-[10px] text-muted px-2 py-1 border border-wire">{experience[active].type}</span>
                    <span className="font-mono text-[10px] text-muted px-2 py-1 border border-wire">{experience[active].location}</span>
                  </div>
                </div>
                <p className="text-subtle text-sm leading-relaxed mb-5">{experience[active].description}</p>
                <div className="space-y-2 mb-6">
                  {experience[active].highlights.map((h, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 text-sm text-subtle font-mono">
                      <span className="text-mint mt-0.5 flex-shrink-0">›</span>{h}
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience[active].tech.map((t, i) => (
                    <span key={i} className="font-mono text-[10px] text-muted border border-wire px-2 py-1 hover:border-mint hover:text-mint transition-all">{t}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
