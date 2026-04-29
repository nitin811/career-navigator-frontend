import { useState, useEffect } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

export default function Navbar({ currentPage, setCurrentPage }) {
  const { isSignedIn, user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        height: "64px", display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 16px" : "0 32px",
        background: "rgba(5,7,16,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(108,99,255,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Logo */}
        <div onClick={() => { setCurrentPage("home"); setMenuOpen(false); }}
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #6C63FF, #00D4AA)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", boxShadow: "0 4px 16px rgba(108,99,255,0.4)",
          }}>🧭</div>
          <div>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "16px",
              background: "linear-gradient(135deg, #C8C4FF, #00D4AA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Career Navigator</div>
            {!isMobile && <div style={{ fontSize: "10px", color: "rgba(232,235,244,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>AI Powered</div>}
          </div>
        </div>

        {/* Desktop center links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "4px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            {["home", ...(isSignedIn ? ["history"] : [])].map(id => (
              <button key={id} onClick={() => setCurrentPage(id)} style={{
                padding: "8px 18px", borderRadius: "10px", fontSize: "13px",
                fontWeight: 500, cursor: "pointer", border: "none",
                fontFamily: "'DM Sans', sans-serif",
                background: currentPage === id ? "rgba(108,99,255,0.15)" : "transparent",
                color: currentPage === id ? "#A8A4FF" : "rgba(232,235,244,0.55)",
                outline: currentPage === id ? "1px solid rgba(108,99,255,0.25)" : "none",
              }}>
                {id === "home" ? "Analyze" : "History"}
              </button>
            ))}
          </div>
        )}

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!isMobile && (
            isSignedIn ? (
              <>
                <span style={{ fontSize: "13px", color: "rgba(232,235,244,0.7)", fontFamily: "'DM Sans',sans-serif" }}>
                  {user.firstName}
                </span>
                <img src={user.imageUrl} alt="avatar" style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid rgba(108,99,255,0.5)" }} />
                <SignOutButton>
                  <button style={{
                    padding: "7px 14px", borderRadius: "9px", fontSize: "12px",
                    background: "rgba(255,80,80,0.08)", color: "#FF8888",
                    border: "1px solid rgba(255,80,80,0.2)", cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                  }}>Sign Out</button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <button style={{
                  padding: "9px 22px", borderRadius: "10px", fontSize: "13px",
                  fontWeight: 600, background: "linear-gradient(135deg, #6C63FF, #5a51e8)",
                  color: "white", border: "none", cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  boxShadow: "0 4px 16px rgba(108,99,255,0.35)",
                }}>Get Started →</button>
              </SignInButton>
            )
          )}

          {/* Hamburger - sirf mobile */}
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              display: "flex", flexDirection: "column", gap: "5px",
              padding: "8px", borderRadius: "9px", border: "none",
              background: "transparent", cursor: "pointer",
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: "22px", height: "2px",
                  background: "rgba(232,235,244,0.8)", borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0 ? "translateY(7px) rotate(45deg)"
                      : i === 2 ? "translateY(-7px) rotate(-45deg)" : "scaleX(0)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && isMobile && (
        <div style={{
          position: "fixed", top: "64px", left: 0, right: 0, bottom: 0,
          background: "rgba(5,7,16,0.98)", backdropFilter: "blur(24px)",
          zIndex: 9998, display: "flex", flexDirection: "column",
          padding: "20px", gap: "6px",
        }}>
          <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(232,235,244,0.25)", marginBottom: "8px", paddingLeft: "4px" }}>
            Navigation
          </div>

          {["home", ...(isSignedIn ? ["history"] : [])].map(id => (
            <button key={id} onClick={() => { setCurrentPage(id); setMenuOpen(false); }} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "14px", borderRadius: "12px", fontSize: "15px",
              fontWeight: 500, cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", border: "none", textAlign: "left",
              background: currentPage === id ? "rgba(108,99,255,0.15)" : "rgba(255,255,255,0.03)",
              color: currentPage === id ? "#A8A4FF" : "rgba(232,235,244,0.75)",
              outline: currentPage === id ? "1px solid rgba(108,99,255,0.25)" : "none",
            }}>
              <span style={{
                width: "36px", height: "36px", borderRadius: "9px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: currentPage === id ? "rgba(108,99,255,0.2)" : "rgba(255,255,255,0.06)",
                fontSize: "16px",
              }}>
                {id === "home" ? "✦" : "◈"}
              </span>
              {id === "home" ? "Analyze Resume" : "My History"}
            </button>
          ))}

          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "12px 0" }} />

          {isSignedIn ? (
            <>
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "14px", borderRadius: "14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)", marginBottom: "8px",
              }}>
                <img src={user.imageUrl} alt="avatar" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid rgba(108,99,255,0.4)" }} />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "rgba(232,235,244,0.9)", fontFamily: "'DM Sans',sans-serif" }}>
                    {user.firstName} {user.lastName}
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(232,235,244,0.35)", fontFamily: "'DM Sans',sans-serif" }}>
                    {user.emailAddresses?.[0]?.emailAddress}
                  </div>
                </div>
              </div>
              <SignOutButton>
                <button onClick={() => setMenuOpen(false)} style={{
                  width: "100%", padding: "13px", borderRadius: "12px",
                  fontSize: "14px", fontWeight: 500,
                  background: "rgba(255,80,80,0.07)", color: "#FF8888",
                  border: "1px solid rgba(255,80,80,0.2)", cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                }}>Sign Out</button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              <button onClick={() => setMenuOpen(false)} style={{
                width: "100%", padding: "14px", borderRadius: "12px",
                fontSize: "15px", fontWeight: 600,
                background: "linear-gradient(135deg, #6C63FF, #5a51e8)",
                color: "white", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                boxShadow: "0 4px 20px rgba(108,99,255,0.35)",
              }}>Sign In with Google →</button>
            </SignInButton>
          )}
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: "64px" }} />
    </div>
  );
}