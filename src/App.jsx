import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import UploadSection from "./components/UploadSection"
import ResultsDashboard from "./components/ResultsDashboard"
import HistoryPage from "./components/HistoryPage"

export default function App() {
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const { user } = useUser()

  return (
    <div style={{
      minHeight: "100vh", background: "#080B14",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden"
    }}>
      {/* Background glows */}
      <div style={{
        position: "fixed", width: "500px", height: "500px", borderRadius: "50%",
        background: "#6C63FF", filter: "blur(140px)", opacity: 0.07,
        top: "-150px", left: "-150px", pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "fixed", width: "400px", height: "400px", borderRadius: "50%",
        background: "#00D4AA", filter: "blur(140px)", opacity: 0.05,
        bottom: "-100px", right: "-100px", pointerEvents: "none", zIndex: 0
      }} />

      {/* Navbar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content */}
      <main style={{ flex: 1, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 1 }}>
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

      {/* Footer */}
      <Footer />
    </div>
  )
}