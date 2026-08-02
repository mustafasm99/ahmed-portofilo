import { motion } from "framer-motion";
export default function SubscriptionExpired({ clientName }) {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-8 scanline-overlay">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-mint text-xs tracking-[0.3em] uppercase mb-6"></p>
        <h1 className="font-display font-bold text-6xl text-text leading-none mb-2">
          Sub<span className="mint-glow">scription</span><br />Expired.
        </h1>
        <div className="w-12 h-px bg-mint my-6 shadow-[0_0_8px_rgba(0,255,148,0.8)]" />
        <p className="font-mono text-subtle text-sm mb-8">
          {clientName ? `// client: ${clientName}` : "// portfolio.status = inactive"}
        </p>
        <a href="mailto:contact@webstudio.io"
          className="inline-flex items-center gap-2 px-6 py-3 border border-mint text-mint font-mono text-xs tracking-widest uppercase hover:bg-mint hover:text-void transition-all duration-300">
          contact.support() →
        </a>
      </motion.div>
    </div>
  );
}
