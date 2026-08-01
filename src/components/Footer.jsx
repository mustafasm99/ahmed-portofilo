export default function Footer({ profile }) {
  return (
    <footer className="bg-void border-t border-wire py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-mint" />
          <span className="font-mono text-xs text-muted">{profile.handle}</span>
        </div>
        <p className="font-mono text-[10px] text-muted">
          © {new Date().getFullYear()} {profile.name} · Built with React + Tailwind + Framer Motion
        </p>
        <div className="flex gap-5">
          {[["gh", profile.github], ["li", profile.linkedin], ["tw", profile.twitter]].map(([l, url]) => (
            <a key={l} href={url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] text-muted hover:text-mint transition-colors uppercase tracking-widest">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
