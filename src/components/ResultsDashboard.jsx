import { useEffect } from "react"
import ATSGauge from "./ATSGauge"
import KeywordAnalysis from "./KeywordAnalysis"
import RoadmapSection from "./RoadmapSection"
import axios from "axios"
import jsPDF from "jspdf"

export default function ResultsDashboard({ data, onReset, userId }) {

  // Auto save to MongoDB
  useEffect(() => {
    if (userId && data) {
      axios.post("http://127.0.0.1:5000/api/history/save", {
        ...data,
        userId
      }).then(() => console.log("✅ History saved!"))
        .catch(err => console.log("History save error:", err.message))
    }
  }, [data, userId])

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Title
    doc.setFontSize(22)
    doc.setTextColor(108, 99, 255)
    doc.text("Career Navigator — Roadmap", pageWidth / 2, 20, { align: "center" })

    // Candidate Info
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text(`Name: ${data.candidateName}`, 20, 35)
    doc.text(`Target Role: ${data.targetRole || "N/A"}`, 20, 45)
    doc.text(`ATS Score: ${data.atsScore}/100 (${data.scoreLabel})`, 20, 55)

    // Score Reason
    doc.setFontSize(11)
    doc.setTextColor(80, 80, 80)
    doc.text(`${data.scoreReason}`, 20, 65, { maxWidth: pageWidth - 40 })

    // Keywords
    doc.setFontSize(13)
    doc.setTextColor(0, 150, 100)
    doc.text("✓ Found Keywords:", 20, 80)
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(data.foundKeywords?.join(", ") || "N/A", 20, 88, { maxWidth: pageWidth - 40 })

    doc.setFontSize(13)
    doc.setTextColor(200, 50, 50)
    doc.text("✗ Missing Keywords:", 20, 100)
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(data.missingKeywords?.join(", ") || "N/A", 20, 108, { maxWidth: pageWidth - 40 })

    // Roadmap
    let y = 125
    doc.setFontSize(15)
    doc.setTextColor(108, 99, 255)
    doc.text("4-Week Personalized Roadmap", 20, y)
    y += 10

    data.roadmap?.forEach((week) => {
      if (y > 260) { doc.addPage(); y = 20 }

      doc.setFontSize(13)
      doc.setTextColor(0, 0, 0)
      doc.text(`Week ${week.week}: ${week.title}`, 20, y)
      y += 8

      doc.setFontSize(10)
      doc.setTextColor(80, 80, 80)
      const descLines = doc.splitTextToSize(week.description, pageWidth - 40)
      doc.text(descLines, 20, y)
      y += descLines.length * 5 + 3

      doc.setTextColor(100, 100, 200)
      doc.text(`Topics: ${week.topics?.join(", ")}`, 20, y, { maxWidth: pageWidth - 40 })
      y += 8

      doc.setTextColor(0, 120, 80)
      doc.text(`Resources: ${week.resources?.map(r => r.name).join(", ")}`, 20, y, { maxWidth: pageWidth - 40 })
      y += 8

      doc.setTextColor(150, 100, 0)
      doc.text(`Estimated: ~${week.estimatedHours} hours`, 20, y)
      y += 12
    })

    // Advice
    if (y > 240) { doc.addPage(); y = 20 }
    doc.setFontSize(13)
    doc.setTextColor(0, 150, 100)
    doc.text("AI Career Advice:", 20, y)
    y += 8
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    const adviceLines = doc.splitTextToSize(data.overallAdvice, pageWidth - 40)
    doc.text(adviceLines, 20, y)

    doc.save(`${data.candidateName}_Career_Roadmap.pdf`)
  }

  return (
    <div style={{ animation: "fadeUp 0.5s ease forwards" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "26px", fontWeight: 800, color: "#E8EBF4" }}>
            👋 Namaste,{" "}
            <span style={{
              background: "linear-gradient(135deg, #A8A4FF, #00D4AA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>{data.candidateName}</span>
          </h2>
          <p style={{ color: "rgba(232,235,244,0.5)", fontSize: "14px", marginTop: "4px" }}>
            {data.scoreReason}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={exportPDF} style={{
            padding: "9px 18px", borderRadius: "10px", fontSize: "13px",
            background: "linear-gradient(135deg, #6C63FF, #00D4AA)",
            border: "none", color: "white", cursor: "pointer", fontWeight: 600
          }}>⬇ PDF Export</button>
          <button onClick={onReset} style={{
            padding: "9px 18px", borderRadius: "10px", fontSize: "13px",
            background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)",
            color: "rgba(232,235,244,0.7)", cursor: "pointer"
          }}>← New Resume</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <ATSGauge score={data.atsScore} label={data.scoreLabel} />
        <KeywordAnalysis found={data.foundKeywords} missing={data.missingKeywords} />
      </div>

      <div style={{
        background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: "16px", padding: "20px", marginBottom: "16px"
      }}>
        <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(232,235,244,0.4)", marginBottom: "12px" }}>
          Tumhari Current Skills
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {data.currentSkills?.map(skill => (
            <span key={skill} style={{
              padding: "6px 14px", borderRadius: "20px", fontSize: "13px",
              background: "rgba(108,99,255,0.12)", color: "#A8A4FF",
              border: "0.5px solid rgba(108,99,255,0.25)"
            }}>{skill}</span>
          ))}
        </div>
      </div>

      <RoadmapSection roadmap={data.roadmap} onExportPDF={exportPDF} />

      <div style={{
        background: "rgba(0,212,170,0.03)", border: "0.5px solid rgba(0,212,170,0.2)",
        borderRadius: "16px", padding: "20px", marginTop: "16px"
      }}>
        <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em", color: "#00D4AA", marginBottom: "8px" }}>
          💡 AI Career Advice
        </p>
        <p style={{ fontSize: "14px", color: "rgba(232,235,244,0.75)", lineHeight: 1.7 }}>
          {data.overallAdvice}
        </p>
      </div>
    </div>
  )
}