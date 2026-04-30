import { useState, useRef } from "react"
import axios from "axios"

const ROLES = [
  "MERN Stack Developer", "DevOps Engineer", "Data Scientist",
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Android Developer", "Cloud Engineer", "Machine Learning Engineer",
  "Product Manager", "UI/UX Designer", "Cybersecurity Analyst"
]

export default function UploadSection({ loading, setLoading, setAnalysisData }) {
  const [file, setFile] = useState(null)
  const [role, setRole] = useState("MERN Stack Developer")
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState("")
  const fileRef = useRef()

  const handleFile = (f) => {
    if (f && f.type === "application/pdf") {
      setFile(f)
      setError("")
    } else {
      setError("Only PDF files are allowed!")
    }
  }

  const handleSubmit = async () => {
    if (!file) return setError("Please upload your resume first!")
    setLoading(true)
    setError("")
    const formData = new FormData()
    formData.append("resume", file)
    formData.append("targetRole", role)
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      setAnalysisData(res.data.data)
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "580px", margin: "60px auto 0", textAlign: "center" }}>
      <h1 style={{
        fontFamily: "'Syne', sans-serif", fontSize: "42px", fontWeight: 800,
        lineHeight: 1.15, marginBottom: "14px", color: "#E8EBF4"
      }}>
        <span style={{
          background: "linear-gradient(135deg, #A8A4FF, #00D4AA)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>AI-Powered</span><br />Career Roadmap Generator
      </h1>
      <p style={{ color: "rgba(232,235,244,0.5)", fontSize: "15px", marginBottom: "40px", lineHeight: 1.7 }}>
        Upload your resume, choose your target role — get a personalized roadmap.
      </p>

      <div style={{
        background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: "16px", padding: "28px", textAlign: "left"
      }}>
        {/* Upload Zone */}
        <div
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
          style={{
            border: `1.5px dashed ${dragOver ? "#6C63FF" : file ? "#00D4AA" : "rgba(108,99,255,0.35)"}`,
            borderRadius: "12px", padding: "32px 20px", textAlign: "center",
            cursor: "pointer", marginBottom: "20px",
            background: file ? "rgba(0,212,170,0.04)" : "rgba(108,99,255,0.03)",
            transition: "all 0.2s"
          }}>
          <input ref={fileRef} type="file" accept=".pdf"
            style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
          <div style={{
            width: "48px", height: "48px", margin: "0 auto 12px", borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px",
            background: file ? "rgba(0,212,170,0.15)" : "rgba(108,99,255,0.15)"
          }}>{file ? "✅" : "📄"}</div>
          {file ? (
            <>
              <p style={{ fontWeight: 600, fontSize: "14px", color: "#00D4AA" }}>{file.name}</p>
              <p style={{ fontSize: "12px", color: "rgba(232,235,244,0.4)", marginTop: "4px" }}>
                {(file.size / 1024).toFixed(0)} KB • Click to change
              </p>
            </>
          ) : (
            <>
              <p style={{ fontSize: "14px", color: "rgba(232,235,244,0.7)" }}>
                <span style={{ color: "#A8A4FF", fontWeight: 600 }}>Click to upload</span> OR drag & drop
              </p>
              <p style={{ fontSize: "12px", color: "rgba(232,235,244,0.35)", marginTop: "4px" }}>PDF only • Max 5MB</p>
            </>
          )}
        </div>

        {/* Role Select */}
        <label style={{ fontSize: "12px", color: "rgba(232,235,244,0.4)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
          Target Role
        </label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{
          width: "100%", padding: "11px 14px", borderRadius: "10px",
          background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)",
          color: "#E8EBF4", fontSize: "14px", marginTop: "8px", marginBottom: "20px",
          fontFamily: "'DM Sans', sans-serif", outline: "none"
        }}>
          {ROLES.map(r => <option key={r} value={r} style={{ background: "#0F1420" }}>{r}</option>)}
        </select>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(255,99,99,0.1)", border: "0.5px solid rgba(255,99,99,0.3)",
            borderRadius: "8px", padding: "10px 14px", marginBottom: "16px",
            fontSize: "13px", color: "#FF8080"
          }}>⚠️ {error}</div>
        )}

        {/* Button */}
        <button onClick={handleSubmit} disabled={loading || !file} style={{
          width: "100%", padding: "14px",
          background: loading || !file ? "rgba(108,99,255,0.3)" : "linear-gradient(135deg, #6C63FF, #00D4AA)",
          border: "none", borderRadius: "12px", color: "white",
          fontWeight: 600, fontSize: "15px", cursor: loading || !file ? "not-allowed" : "pointer",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
        }}>
          {loading ? "⏳ Processing your data…" : "✨ Analyze & Generate Roadmap"}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "16px", marginTop: "24px", justifyContent: "center" }}>
        {[["12K+", "Users"], ["4.9★", "Rating"], ["95%", "Accuracy"]].map(([num, lbl]) => (
          <div key={lbl} style={{
            padding: "12px 24px", borderRadius: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(255,255,255,0.07)", textAlign: "center"
          }}>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800,
              background: "linear-gradient(135deg, #A8A4FF, #00D4AA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>{num}</div>
            <div style={{ fontSize: "11px", color: "rgba(232,235,244,0.4)", marginTop: "2px" }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}