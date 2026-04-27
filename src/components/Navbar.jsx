import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react"

export default function Navbar({ currentPage, setCurrentPage }) {
  const { isSignedIn, user } = useUser()

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 32px",
      borderBottom: "0.5px solid rgba(255,255,255,0.07)",
      background: "rgba(8,11,20,0.9)",
      backdropFilter: "blur(20px)",
      position: "sticky", top: 0, zIndex: 100
    }}>
      <div
        onClick={() => setCurrentPage("home")}
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <div style={{
          width: "34px", height: "34px", borderRadius: "9px",
          background: "linear-gradient(135deg, #6C63FF, #00D4AA)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px"
        }}>🧭</div>
        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "17px",
          background: "linear-gradient(135deg, #A8A4FF, #00D4AA)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>Career Navigator</span>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {isSignedIn && (
          <button
            onClick={() => setCurrentPage(currentPage === "history" ? "home" : "history")}
            style={{
              padding: "8px 16px", borderRadius: "9px", fontSize: "13px",
              background: currentPage === "history" ? "rgba(108,99,255,0.2)" : "transparent",
              color: currentPage === "history" ? "#A8A4FF" : "rgba(232,235,244,0.6)",
              border: `0.5px solid ${currentPage === "history" ? "rgba(108,99,255,0.3)" : "rgba(255,255,255,0.1)"}`,
              cursor: "pointer"
            }}>📚 History</button>
        )}

        {isSignedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={user.imageUrl}
              alt="avatar"
              style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid rgba(108,99,255,0.4)" }}
            />
            <SignOutButton>
              <button style={{
                padding: "8px 16px", borderRadius: "9px", fontSize: "13px",
                background: "rgba(255,99,99,0.1)", color: "#FF8080",
                border: "0.5px solid rgba(255,99,99,0.2)", cursor: "pointer"
              }}>Sign Out</button>
            </SignOutButton>
          </div>
        ) : (
          <SignInButton mode="modal">
            <button style={{
              padding: "8px 18px", borderRadius: "9px", fontSize: "13px",
              background: "linear-gradient(135deg, #6C63FF, #5B4FE8)",
              color: "white", border: "none", cursor: "pointer", fontWeight: 500
            }}>Sign In</button>
          </SignInButton>
        )}
      </div>
    </nav>
  )
}