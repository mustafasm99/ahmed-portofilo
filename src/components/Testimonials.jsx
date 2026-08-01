import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Testimonials({ testimonials }) {
  const ref = useScrollReveal();
  return (
    <section className="py-24 bg-void border-t border-wire">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal mb-16">
          <p className="font-mono text-mint text-xs tracking-[0.3em] uppercase mb-4">// testimonials.map()</p>
          <h2 className="font-display font-bold text-text" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            What People Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
              className="code-card p-7 flex flex-col justify-between hover:border-mint/30 transition-colors group">
              <div>
                <span className="font-mono text-5xl text-mint/20 group-hover:text-mint/40 transition-colors leading-none block mb-4">"</span>
                <p className="font-body text-subtle text-sm leading-relaxed italic mb-6">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-wire">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                <div>
                  <p className="font-display font-semibold text-text text-sm">{t.name}</p>
                  <p className="font-mono text-[10px] text-mint">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
