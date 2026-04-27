import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import Navbar from "./components/Navbar"
import UploadSection from "./components/UploadSection"
import ResultsDashboard from "./components/ResultsDashboard"
import HistoryPage from "./components/HistoryPage"

export default function App() {
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const { user } = useUser()

  return (
    <div style={{ minHeight: "100vh", background: "#080B14", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "fixed", width: "500px", height: "500px",
        borderRadius: "50%", background: "#6C63FF",
        filter: "blur(140px)", opacity: 0.08,
        top: "-150px", left: "-150px", pointerEvents: "none"
      }} />
      <div style={{
        position: "fixed", width: "400px", height: "400px",
        borderRadius: "50%", background: "#00D4AA",
        filter: "blur(140px)", opacity: 0.06,
        bottom: "-100px", right: "-100px", pointerEvents: "none"
      }} />

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
        {currentPage === "history" ? (
          <HistoryPage userId={user?.id} />
        ) : !analysisData ? (
          <UploadSection
            loading={loading}
            setLoading={setLoading}
            setAnalysisData={setAnalysisData}
            userId={user?.id}
          />
        ) : (
          <ResultsDashboard
            data={analysisData}
            onReset={() => { setAnalysisData(null); setCurrentPage("home") }}
            userId={user?.id}
          />
        )}
      </main>
    </div>
  )
}