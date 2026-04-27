const WEEK_COLORS = {
  1: { bg: "rgba(108,99,255,0.2)", text: "#A8A4FF", border: "rgba(108,99,255,0.3)" },
  2: { bg: "rgba(0,212,170,0.15)", text: "#00D4AA", border: "rgba(0,212,170,0.3)" },
  3: { bg: "rgba(255,179,71,0.15)", text: "#FFB347", border: "rgba(255,179,71,0.3)" },
  4: { bg: "rgba(255,111,163,0.15)", text: "#FF6FA3", border: "rgba(255,111,163,0.3)" },
}

const TYPE_ICONS = { YouTube: "▶", Documentation: "📖", Course: "🎓", Practice: "💻" }

export default function RoadmapSection({ roadmap = [] }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)",
      borderRadius: "16px", padding: "24px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(232,235,244,0.4)" }}>
          🗺️Personalized Roadmap
        </p>
        <button style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "8px 14px", borderRadius: "9px", fontSize: "12px",
          background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)",
          color: "rgba(232,235,244,0.7)", cursor: "pointer"
        }}>⬇ Export PDF</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {roadmap.map((week) => {
          const c = WEEK_COLORS[week.week] || WEEK_COLORS[1]
          return (
            <div key={week.week} style={{
              display: "flex", gap: "16px", padding: "16px", borderRadius: "12px",
              background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)"
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "9px",
                background: c.bg, border: `0.5px solid ${c.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 700,
                color: c.text, flexShrink: 0
              }}>W{week.week}</div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "5px", color: "#E8EBF4" }}>
                  {week.title}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(232,235,244,0.5)", lineHeight: 1.6, marginBottom: "10px" }}>
                  {week.description}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                  {week.topics?.map(t => (
                    <span key={t} style={{
                      padding: "3px 10px", borderRadius: "20px", fontSize: "11px",
                      background: "rgba(255,255,255,0.06)", color: "rgba(232,235,244,0.6)",
                      border: "0.5px solid rgba(255,255,255,0.08)"
                    }}>{t}</span>
                  ))}
                  <span style={{
                    padding: "3px 10px", borderRadius: "20px", fontSize: "11px",
                    background: c.bg, color: c.text, border: `0.5px solid ${c.border}`
                  }}>⏱ ~{week.estimatedHours} hrs</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {week.resources?.map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{
                      padding: "4px 10px", borderRadius: "8px", fontSize: "11px",
                      background: "rgba(108,99,255,0.1)", color: "#A8A4FF",
                      border: "0.5px solid rgba(108,99,255,0.2)",
                      textDecoration: "none", display: "flex", alignItems: "center", gap: "4px"
                    }}>
                      {TYPE_ICONS[r.type] || "🔗"} {r.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}