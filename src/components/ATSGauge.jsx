export default function ATSGauge({ score, label }) {
  const circumference = 2 * Math.PI * 38
  const offset = circumference - (score / 100) * circumference
  const color = score >= 75 ? "#00D4AA" : score >= 50 ? "#FFB347" : "#FF8080"

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)",
      borderRadius: "16px", padding: "24px"
    }}>
      <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(232,235,244,0.4)", marginBottom: "16px" }}>
        ATS Score
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ position: "relative", width: "110px", height: "110px", flexShrink: 0 }}>
          <svg width="110" height="110" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="55" cy="55" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle cx="55" cy="55" r="38" fill="none" stroke={color} strokeWidth="8"
              strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease" }} />
          </svg>
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "24px", color
          }}>{score}</div>
        </div>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, color }}>{label}</div>
          <div style={{ fontSize: "12px", color: "rgba(232,235,244,0.45)", marginTop: "4px" }}>out of 100</div>
          <div style={{
            marginTop: "10px", display: "inline-flex", alignItems: "center",
            background: "rgba(0,212,170,0.1)", color: "#00D4AA",
            border: "0.5px solid rgba(0,212,170,0.2)", borderRadius: "20px",
            padding: "4px 10px", fontSize: "11px", fontWeight: 600
          }}>
            {score >= 75 ? "✅ Interview Ready" : score >= 50 ? "⚡ Almost There" : "🔧 Needs Work"}
          </div>
        </div>
      </div>
    </div>
  )
}