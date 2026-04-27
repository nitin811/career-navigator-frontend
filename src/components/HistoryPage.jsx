import { useState, useEffect } from "react"
import axios from "axios"

export default function HistoryPage({ userId }) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    axios.get(`http://127.0.0.1:5000/api/history/${userId}`)
      .then(res => { setHistory(res.data.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [userId])

  const deleteItem = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/api/history/${id}`)
    setHistory(history.filter(h => h._id !== id))
  }

  if (!userId) return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔐</div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "24px", color: "#E8EBF4", marginBottom: "8px" }}>
        Please Sign In First
      </h2>
      <p style={{ color: "rgba(232,235,244,0.5)" }}>Login is required to view history.</p>
    </div>
  )

  if (loading) return (
    <div style={{ textAlign: "center", marginTop: "80px", color: "rgba(232,235,244,0.5)" }}>
      ⏳ History loading...
    </div>
  )

  if (history.length === 0) return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "24px", color: "#E8EBF4", marginBottom: "8px" }}>
        No History Found!!
      </h2>
      <p style={{ color: "rgba(232,235,244,0.5)" }}>You haven't analyzed any resumes yet.</p>
    </div>
  )

  return (
    <div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "26px", fontWeight: 800, color: "#E8EBF4", marginBottom: "24px" }}>
        📚 Your Analysis History
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {history.map(item => (
          <div key={item._id} style={{
            background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius: "16px", padding: "20px",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", color: "#E8EBF4", marginBottom: "6px" }}>
                {item.candidateName} — {item.targetRole}
              </h3>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{
                  padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600,
                  background: item.atsScore >= 75 ? "rgba(0,212,170,0.15)" : "rgba(255,179,71,0.15)",
                  color: item.atsScore >= 75 ? "#00D4AA" : "#FFB347",
                  border: `0.5px solid ${item.atsScore >= 75 ? "rgba(0,212,170,0.3)" : "rgba(255,179,71,0.3)"}`
                }}>ATS: {item.atsScore}/100</span>
                <span style={{ fontSize: "12px", color: "rgba(232,235,244,0.4)" }}>
                  {new Date(item.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <button
              onClick={() => deleteItem(item._id)}
              style={{
                padding: "8px 14px", borderRadius: "9px", fontSize: "12px",
                background: "rgba(255,99,99,0.1)", color: "#FF8080",
                border: "0.5px solid rgba(255,99,99,0.2)", cursor: "pointer"
              }}>🗑 Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}