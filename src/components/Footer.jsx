export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Product: [
      { label: "Analyze Resume", href: "/" },
      { label: "ATS Score Checker", href: "/" },
      { label: "Roadmap Generator", href: "/" },
      { label: "PDF Export", href: "/" },
      { label: "History Dashboard", href: "/" },
    ],
    Resources: [
      { label: "How it Works", href: "#" },
      { label: "Interview Tips", href: "#" },
      { label: "Resume Guide", href: "#" },
      { label: "Career Blog", href: "#" },
      { label: "FAQ", href: "#" },
    ],
    Developer: [
      { label: "Frontend Repo", href: "https://github.com/nitin811/career-navigator-frontend" },
      { label: "Backend Repo", href: "https://github.com/nitin811/career-navigator-backend" },
      { label: "Live Demo", href: "https://career-navigator-frontend-psi.vercel.app/" },
      { label: "Report a Bug", href: "mailto:nitinks3366@gmail.com" },
      { label: "Request Feature", href: "mailto:nitinks3366@gmail.com" },
    ],
    Contact: [
      { label: "nitinks3366@gmail.com", href: "mailto:nitinks3366@gmail.com" },
      { label: "GitHub", href: "https://github.com/nitin811" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nitin-tiwari-272508281/" },
      { label: "Twitter / X", href: "https://x.com/tiwarinitin2212" },
      { label: "Portfolio", href: "https://nitintiwari.netlify.app/" },
    ],
  };

  const techStack = ["React.js", "Node.js", "MongoDB", "Groq AI", "Clerk", "Vercel", "Express.js", "jsPDF"];

  const socials = [
    { label: "GH", title: "GitHub", href: "https://github.com/nitin811" },
    { label: "in", title: "LinkedIn", href: "https://www.linkedin.com/in/nitin-tiwari-272508281/" },
    { label: "𝕏", title: "Twitter", href: "https://x.com/tiwarinitin2212" },
    { label: "@", title: "Email", href: "mailto:nitinks3366@gmail.com" },
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const isTablet = typeof window !== "undefined" && window.innerWidth <= 1024;

  return (
    <footer style={{
      background: "#05070F",
      borderTop: "1px solid rgba(108,99,255,0.12)",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      marginTop: "80px",
    }}>
      <style>{`
        @keyframes cn-footer-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .cn-fl:hover { color: rgba(232,235,244,0.88) !important; }
        .cn-fl:hover .cn-fl-dot { background: #6C63FF !important; }
        .cn-si:hover {
          transform: translateY(-3px) !important;
          background: rgba(108,99,255,0.12) !important;
          border-color: rgba(108,99,255,0.35) !important;
          color: #A8A4FF !important;
        }
        .cn-fl { transition: color 0.18s; }
        .cn-si { transition: all 0.22s ease; }
        .cn-footer-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 56px 32px 40px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
          gap: 40px;
        }
        @media (max-width: 1100px) {
          .cn-footer-inner {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
          .cn-footer-brand { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 700px) {
          .cn-footer-inner {
            grid-template-columns: 1fr 1fr !important;
            padding: 40px 20px 28px !important;
          }
          .cn-footer-brand { grid-column: 1 / -1 !important; }
          .cn-footer-bottom-inner { flex-direction: column !important; align-items: flex-start !important; }
          .cn-footer-made { display: none !important; }
        }
        @media (max-width: 420px) {
          .cn-footer-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Top glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "70%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.7), rgba(0,212,170,0.5), transparent)",
      }} />

      {/* Main grid */}
      <div className="cn-footer-inner">

        {/* Brand */}
        <div className="cn-footer-brand">
          <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "16px" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "linear-gradient(135deg, #6C63FF, #00D4AA)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", boxShadow: "0 4px 20px rgba(108,99,255,0.4)", flexShrink: 0,
            }}>🧭</div>
            <div>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "17px",
                background: "linear-gradient(135deg, #C8C4FF, #00D4AA)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Career Navigator</div>
              <div style={{ fontSize: "10px", color: "rgba(232,235,244,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                AI Powered
              </div>
            </div>
          </div>

          <p style={{ fontSize: "13.5px", color: "rgba(232,235,244,0.4)", lineHeight: 1.8, marginBottom: "18px", maxWidth: "260px" }}>
            Upload your resume, get an ATS score, and receive a personalized 4-week career roadmap powered by Groq AI.
          </p>

          {/* Live demo badge */}
          <a href="https://career-navigator-frontend.vercel.app" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "7px 14px", borderRadius: "10px",
            background: "rgba(0,212,170,0.07)", border: "1px solid rgba(0,212,170,0.2)",
            textDecoration: "none", marginBottom: "20px",
          }}>
            <div style={{
              width: "7px", height: "7px", borderRadius: "50%", background: "#00D4AA",
              boxShadow: "0 0 8px rgba(0,212,170,0.7)",
              animation: "cn-footer-pulse 2s ease-in-out infinite", flexShrink: 0,
            }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#00D4AA" }}>Live on Vercel</span>
            <span style={{ fontSize: "11px", color: "rgba(0,212,170,0.5)" }}>↗</span>
          </a>

          {/* Tech badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
            {techStack.map(t => (
              <span key={t} style={{
                fontSize: "10.5px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(232,235,244,0.4)",
              }}>{t}</span>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: "8px" }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                title={s.title} className="cn-si" style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(232,235,244,0.55)", fontSize: "13px", fontWeight: 700,
                  textDecoration: "none",
                }}>{s.label}</a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([section, items]) => (
          <div key={section}>
            <div style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "rgba(232,235,244,0.28)",
              marginBottom: "16px", paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>{section}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              {items.map(item => (
                <a key={item.label} href={item.href}
                  target={item.href.startsWith("http") || item.href.startsWith("mailto") ? "_blank" : "_self"}
                  rel="noreferrer" className="cn-fl"
                  style={{ fontSize: "13px", color: "rgba(232,235,244,0.48)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="cn-fl-dot" style={{
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: "rgba(108,99,255,0.45)", flexShrink: 0, display: "inline-block",
                    transition: "background 0.18s",
                  }} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", maxWidth: "1100px", margin: "0 auto", padding: "20px 32px" }}>
        <div className="cn-footer-bottom-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ fontSize: "12.5px", color: "rgba(232,235,244,0.3)" }}>
            © {year}{" "}
            <span style={{
              background: "linear-gradient(135deg, #A8A4FF, #00D4AA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700,
            }}>Career Navigator</span>
            . All rights reserved. Built for freshers, by a fresher.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "7px", height: "7px", borderRadius: "50%", background: "#00D4AA",
              boxShadow: "0 0 10px rgba(0,212,170,0.7)",
              animation: "cn-footer-pulse 2.5s ease-in-out infinite", flexShrink: 0,
            }} />
            <span style={{ fontSize: "12px", color: "rgba(232,235,244,0.35)" }}>All systems operational</span>
          </div>

          <div className="cn-footer-made" style={{ fontSize: "12px", color: "rgba(232,235,244,0.25)" }}>
            Made with <span style={{ color: "#FF8080" }}>♥</span> by{" "}
            <a href="https://github.com/nitin811" target="_blank" rel="noreferrer"
              style={{ color: "rgba(232,235,244,0.4)", textDecoration: "none", fontWeight: 600 }}>
              Nitin Tiwari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}