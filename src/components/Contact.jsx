import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact({ profile, contact }) {
  const ref = useScrollReveal();
  return (
    <section id="contact" className="py-28 bg-dark border-t border-wire relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mint/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal mb-16">
          <p className="font-mono text-mint text-xs tracking-[0.3em] uppercase mb-4">// contact.init()</p>
          <h2 className="font-display font-bold text-text" style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
            {contact.headline}
          </h2>
          <p className="font-body text-subtle text-lg mt-4 max-w-md">{contact.subtext}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-end">
          <div className="space-y-0">
            {[
              { label: "email",     val: profile.email,    href: `mailto:${profile.email}` },
              { label: "github",    val: "github.com/ares", href: profile.github },
              { label: "linkedin",  val: "linkedin.com/in/ares", href: profile.linkedin },
              { label: "twitter",   val: "@areskhalil",    href: profile.twitter },
            ].map((item, i) => (
              <motion.a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group flex items-center justify-between py-4 border-b border-wire hover:border-mint transition-colors duration-200">
                <span className="font-mono text-[10px] text-muted uppercase tracking-widest">{item.label}</span>
                <span className="font-mono text-sm text-subtle group-hover:text-mint transition-colors">{item.val} ↗</span>
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col items-start gap-5">
            <motion.a href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-mint text-void font-display font-bold text-lg hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,255,148,0.25)]">
              send_message() →
            </motion.a>
            <p className="font-mono text-[10px] text-muted uppercase tracking-widest">{contact.responseTime}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
