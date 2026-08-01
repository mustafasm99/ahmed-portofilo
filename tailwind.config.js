module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      colors: {
        void:    "#080B0F",
        dark:    "#0D1117",
        panel:   "#161B22",
        wire:    "#21262D",
        border:  "#30363D",
        muted:   "#58626E",
        subtle:  "#8B949E",
        text:    "#E6EDF3",
        mint:    "#00FF94",
        "mint-dim":  "rgba(0,255,148,0.12)",
        "mint-pale": "rgba(0,255,148,0.06)",
        amber:   "#FFA657",
        blue:    "#79C0FF",
        purple:  "#BC8CFF",
        red:     "#FF7B72",
      },
      keyframes: {
        blink:    { "0%,100%":{ opacity:1 },"50%":{ opacity:0 } },
        scanline: { "0%":{ transform:"translateY(-100%)" },"100%":{ transform:"translateY(100vh)" } },
        "fade-up":{ "0%":{ opacity:0, transform:"translateY(24px)" },"100%":{ opacity:1, transform:"none" } },
        "glitch":{ "0%,100%":{ clipPath:"inset(0 0 100% 0)" },"20%":{ clipPath:"inset(30% 0 50% 0)" },"40%":{ clipPath:"inset(70% 0 10% 0)" },"60%":{ clipPath:"inset(10% 0 70% 0)" },"80%":{ clipPath:"inset(50% 0 30% 0)" } },
        "pulse-mint":{ "0%,100%":{ boxShadow:"0 0 0 0 rgba(0,255,148,0)" },"50%":{ boxShadow:"0 0 20px 4px rgba(0,255,148,0.3)" } },
      },
      animation: {
        blink:      "blink 1s step-end infinite",
        scanline:   "scanline 8s linear infinite",
        "fade-up":  "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "pulse-mint":"pulse-mint 2s ease infinite",
      },
    },
  },
  plugins: [],
};
