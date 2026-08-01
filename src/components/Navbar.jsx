import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [["work", "#projects"], ["skills", "#skills"], ["experience", "#experience"], ["contact", "#contact"]];

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-void/90 backdrop-blur-xl border-b border-wire" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-mono text-sm text-mint tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
          {profile.handle}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(([label, href]) => (
            <a key={label} href={href}
              className="font-mono text-xs text-muted hover:text-mint transition-colors duration-200 px-4 py-2">
              .{label}()
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-mint text-mint font-mono text-xs tracking-widest hover:bg-mint hover:text-void transition-all duration-300">
          hire_me()
        </a>

        {/* Mobile */}
        <button onClick={() => setOpen(o => !o)} className="md:hidden font-mono text-xs text-muted">
          {open ? "[×]" : "[≡]"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden bg-void border-t border-wire">
            <div className="px-6 py-5 space-y-2">
              {LINKS.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setOpen(false)}
                  className="block font-mono text-sm text-muted hover:text-mint transition-colors py-2">.{label}()</a>
              ))}
              <a href="#contact" className="block font-mono text-sm text-mint mt-4">hire_me() →</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
