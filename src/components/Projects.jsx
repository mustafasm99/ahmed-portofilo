import { motion } from "framer-motion";
import { useScrollReveal, useTiltCard } from "../hooks/useScrollReveal";

function ProjectCard({ project, index }) {
  const tiltRef = useTiltCard();
  const colorMap = { mint: "#00FF94", blue: "#79C0FF", purple: "#BC8CFF", amber: "#FFA657" };
  const c = colorMap[project.color] || "#00FF94";

  return (
    <motion.article ref={tiltRef}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}
      className="tilt-card code-card overflow-hidden group cursor-default"
      style={{ "--accent": c }}>

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={project.image} alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #161B22 0%, transparent 60%)` }} />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="font-mono text-xs border px-2 py-1" style={{ color: c, borderColor: c + "40" }}>{project.id}</span>
          {project.featured && <span className="font-mono text-xs text-mint bg-mint-dim px-2 py-1">★ featured</span>}
        </div>
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="font-display font-bold text-lg text-text mb-1 group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
        <p className="font-mono text-xs mb-3" style={{ color: c }}>{project.tagline}</p>
        <p className="text-subtle text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.metrics.map((m, i) => (
            <span key={i} className="font-mono text-[10px] px-2 py-1 bg-void border border-wire text-muted">{m}</span>
          ))}
        </div>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t, i) => (
            <span key={i} className="font-mono text-[10px] text-muted">{t}{i < project.tech.length - 1 ? " ·" : ""}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-3 border-t border-wire">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs hover:underline transition-colors" style={{ color: c }}>live() ↗</a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-text transition-colors">source() ↗</a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ projects }) {
  const ref = useScrollReveal();
  const featured = projects.filter(p => p.featured);
  const rest     = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 bg-dark border-t border-wire">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal mb-16">
          <p className="font-mono text-mint text-xs tracking-[0.3em] uppercase mb-4"></p>
          <h2 className="font-display font-bold text-text" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Selected Work
          </h2>
        </div>

        {/* Featured — 2 col */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {featured.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>
        {/* Rest — 2 col smaller */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5">
            {rest.map((p, i) => <ProjectCard key={i} project={p} index={i + featured.length} />)}
          </div>
        )}
      </div>
    </section>
  );
}
