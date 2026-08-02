import { useScrollReveal } from "../hooks/useScrollReveal";
import { motion } from "framer-motion";

function SkillBar({ name, level, color, delay }) {
  return (
    <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.5 }}
      className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-xs text-subtle group-hover:text-text transition-colors">{name}</span>
        <span className={`font-mono text-xs text-${color}`}>{level}%</span>
      </div>
      <div className="h-1 bg-wire rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${level}%` }}
          viewport={{ once: true }} transition={{ delay: delay + 0.2, duration: 1, ease: [0.22,1,0.36,1] }}
          className={`h-full rounded-full bg-${color}`}
          style={{ boxShadow: `0 0 6px currentColor` }} />
      </div>
    </motion.div>
  );
}

export default function Skills({ skills }) {
  const ref = useScrollReveal();
  return (
    <section id="skills" className="py-24 bg-dark border-t border-wire">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal mb-16">
          <p className="font-mono text-mint text-xs tracking-[0.3em] uppercase mb-4"></p>
          <h2 className="font-display font-bold text-text" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Technical Stack
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((group, gi) => (
            <motion.div key={gi} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: gi * 0.15, duration: 0.6 }}
              className="code-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                <p className="font-mono text-xs text-mint tracking-widest uppercase">{group.category}</p>
              </div>
              <div className="space-y-5">
                {group.items.map((skill, si) => (
                  <SkillBar key={si} {...skill} delay={gi * 0.1 + si * 0.07} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
