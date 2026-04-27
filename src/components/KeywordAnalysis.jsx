export default function KeywordAnalysis({ found = [], missing = [] }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)",
      borderRadius: "16px", padding: "24px"
    }}>
      <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(232,235,244,0.4)", marginBottom: "16px" }}>
        Keyword Analysis
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", maxHeight: "200px", overflowY: "auto" }}>
        {found.map(kw => (
          <div key={kw} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "7px 12px", borderRadius: "8px",
            background: "rgba(0,212,170,0.07)", border: "0.5px solid rgba(0,212,170,0.2)"
          }}>
            <span style={{ fontSize: "13px", color: "#00D4AA" }}>{kw}</span>
            <span style={{ fontSize: "10px", color: "#00D4AA" }}>✓ Found</span>
          </div>
        ))}
        {missing.map(kw => (
          <div key={kw} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "7px 12px", borderRadius: "8px",
            background: "rgba(255,99,99,0.07)", border: "0.5px solid rgba(255,99,99,0.2)"
          }}>
            <span style={{ fontSize: "13px", color: "#FF8080" }}>{kw}</span>
            <span style={{ fontSize: "10px", color: "#FF8080" }}>✗ Missing</span>
          </div>
        ))}
      </div>
    </div>
  )
}