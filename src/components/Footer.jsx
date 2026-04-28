import { useState, useEffect } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

export default function Navbar({ currentPage, setCurrentPage }) {
  const { isSignedIn, user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { id: "home", label: "Analyze", icon: "✦" },
    ...(isSignedIn ? [{ id: "history", label: "History", icon: "◈" }] : []),
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .cn-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 32px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'DM Sans', sans-serif;
        }

        .cn-nav.scrolled {
          background: rgba(5, 7, 16, 0.94);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border-bottom: 1px solid rgba(108,99,255,0.13);
          box-shadow: 0 4px 32px rgba(0,0,0,0.5);
          height: 62px;
        }

        /* ── Logo ── */
        .cn-logo {
          display: flex; align-items: center; gap: 11px;
          cursor: pointer; flex-shrink: 0; user-select: none;
        }
        .cn-logo-icon {
          width: 38px; height: 38px; border-radius: 11px;
          background: linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
          box-shadow: 0 4px 18px rgba(108,99,255,0.4);
        }
        .cn-logo-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 17px; letter-spacing: -0.4px;
          background: linear-gradient(135deg, #C8C4FF, #00D4AA);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }
        .cn-logo-sub {
          font-size: 10px; font-weight: 500; letter-spacing: 0.1em;
          color: rgba(232,235,244,0.3); text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Desktop center links ── */
        .cn-center-links {
          display: flex; align-items: center; gap: 2px;
          position: absolute; left: 50%; transform: translateX(-50%);
        }
        .cn-link {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 18px; border-radius: 10px;
          font-size: 13.5px; font-weight: 500;
          color: rgba(232,235,244,0.5);
          background: transparent; border: none; cursor: pointer;
          transition: all 0.2s ease; font-family: 'DM Sans', sans-serif;
        }
        .cn-link:hover { color: rgba(232,235,244,0.9); background: rgba(255,255,255,0.06); }
        .cn-link.active {
          color: #A8A4FF; background: rgba(108,99,255,0.14);
          border: 1px solid rgba(108,99,255,0.22);
        }
        .cn-link-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.6; }

        /* ── Right actions ── */
        .cn-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        .cn-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          border: 2px solid rgba(108,99,255,0.45);
          object-fit: cover; flex-shrink: 0;
          transition: border-color 0.2s;
        }
        .cn-avatar:hover { border-color: rgba(108,99,255,0.85); }

        .cn-username {
          font-size: 13px; font-weight: 500;
          color: rgba(232,235,244,0.75);
          max-width: 100px; overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }

        .cn-btn-outline {
          padding: 8px 18px; border-radius: 10px; font-size: 13px;
          font-weight: 500; background: transparent;
          color: rgba(232,235,244,0.55);
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .cn-btn-outline:hover {
          color: rgba(232,235,244,0.9); border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
        }

        .cn-btn-primary {
          padding: 9px 22px; border-radius: 10px; font-size: 13.5px;
          font-weight: 600;
          background: linear-gradient(135deg, #6C63FF 0%, #5a51e8 100%);
          color: white; border: none; cursor: pointer;
          transition: all 0.22s; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 18px rgba(108,99,255,0.32); white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .cn-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(108,99,255,0.48);
        }
        .cn-btn-primary:active { transform: translateY(0); }

        .cn-btn-signout {
          padding: 8px 15px; border-radius: 10px; font-size: 12.5px;
          font-weight: 500; background: rgba(255,80,80,0.07);
          color: #FF8888; border: 1px solid rgba(255,80,80,0.2);
          cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .cn-btn-signout:hover { background: rgba(255,80,80,0.14); border-color: rgba(255,80,80,0.35); }

        /* ── Hamburger ── */
        .cn-burger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 8px; border-radius: 9px;
          border: none; background: transparent;
          transition: background 0.2s; flex-shrink: 0;
        }
        .cn-burger:hover { background: rgba(255,255,255,0.07); }
        .cn-burger span {
          display: block; width: 22px; height: 2px;
          background: rgba(232,235,244,0.75); border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .cn-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .cn-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .cn-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile Menu ── */
        .cn-mobile {
          display: none; position: fixed;
          top: 62px; left: 0; right: 0; bottom: 0;
          background: rgba(5, 7, 16, 0.97);
          backdrop-filter: blur(28px);
          z-index: 998; flex-direction: column;
          padding: 16px 20px 32px;
          overflow-y: auto;
          animation: menuIn 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        .cn-mobile.open { display: flex; }

        @keyframes menuIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cn-mobile-section-label {
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(232,235,244,0.25);
          padding: 4px 12px; margin-bottom: 4px;
          font-family: 'DM Sans', sans-serif;
        }

        .cn-mobile-link {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 14px; border-radius: 12px;
          font-size: 15px; font-weight: 500;
          color: rgba(232,235,244,0.7);
          background: transparent; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.18s; text-align: left; width: 100%;
          letter-spacing: 0.01em;
        }
        .cn-mobile-link:hover { background: rgba(255,255,255,0.06); color: rgba(232,235,244,0.95); }
        .cn-mobile-link.active {
          background: rgba(108,99,255,0.14); color: #A8A4FF;
          border: 1px solid rgba(108,99,255,0.22);
        }
        .cn-mobile-link-icon {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; flex-shrink: 0;
          background: rgba(255,255,255,0.06);
        }
        .cn-mobile-link.active .cn-mobile-link-icon {
          background: rgba(108,99,255,0.2);
        }

        .cn-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 14px 0; }

        .cn-mobile-user-card {
          display: flex; align-items: center; gap: 12px;
          padding: 14px; border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 10px;
        }
        .cn-mobile-user-info { flex: 1; min-width: 0; }
        .cn-mobile-user-name {
          font-size: 14px; font-weight: 600; color: rgba(232,235,244,0.9);
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .cn-mobile-user-email {
          font-size: 11px; color: rgba(232,235,244,0.35);
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }

        .cn-mobile-btn-primary {
          display: block; width: 100%; padding: 14px;
          border-radius: 12px; font-size: 15px; font-weight: 600;
          background: linear-gradient(135deg, #6C63FF, #5a51e8);
          color: white; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 20px rgba(108,99,255,0.35);
          letter-spacing: 0.02em; margin-top: 4px;
        }
        .cn-mobile-signout {
          display: block; width: 100%; padding: 13px;
          border-radius: 12px; font-size: 14px; font-weight: 500;
          background: rgba(255,80,80,0.07);
          color: #FF8888; border: 1px solid rgba(255,80,80,0.2);
          cursor: pointer; font-family: 'DM Sans', sans-serif;
        }

        /* ── Spacer ── */
        .cn-spacer { height: 70px; }

        /* ── Responsive ── */
        @media (max-width: 840px) {
          .cn-center-links { display: none; }
        }
        @media (max-width: 768px) {
          .cn-nav { padding: 0 18px; }
          .cn-center-links { display: none; }
          .cn-actions .cn-btn-outline,
          .cn-actions .cn-btn-primary,
          .cn-actions .cn-btn-signout,
          .cn-actions .cn-username { display: none; }
          .cn-burger { display: flex; }
        }
        @media (max-width: 400px) {
          .cn-logo-sub { display: none; }
          .cn-logo-name { font-size: 15px; }
          .cn-logo-icon { width: 34px; height: 34px; font-size: 16px; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`cn-nav ${scrolled ? "scrolled" : ""}`}>
        {/* Logo */}
        <div className="cn-logo" onClick={() => { setCurrentPage("home"); setMenuOpen(false); }}>
          <div className="cn-logo-icon">🧭</div>
          <div>
            <div className="cn-logo-name">Career Navigator</div>
            <div className="cn-logo-sub">AI Powered</div>
          </div>
        </div>

        {/* Center nav links (desktop) */}
        <div className="cn-center-links">
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`cn-link ${currentPage === link.id ? "active" : ""}`}
              onClick={() => setCurrentPage(link.id)}
            >
              <span className="cn-link-dot" />
              {link.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="cn-actions">
          {isSignedIn ? (
            <>
              <span className="cn-username">
                {user.firstName || user.emailAddresses?.[0]?.emailAddress?.split("@")[0]}
              </span>
              <img src={user.imageUrl} alt="avatar" className="cn-avatar" />
              <SignOutButton>
                <button className="cn-btn-signout">Sign Out</button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="cn-btn-primary">Get Started →</button>
            </SignInButton>
          )}

          {/* Hamburger */}
          <button
            className={`cn-burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`cn-mobile ${menuOpen ? "open" : ""}`}>
        <div className="cn-mobile-section-label">Navigation</div>

        {navLinks.map(link => (
          <button
            key={link.id}
            className={`cn-mobile-link ${currentPage === link.id ? "active" : ""}`}
            onClick={() => { setCurrentPage(link.id); setMenuOpen(false); }}
          >
            <span className="cn-mobile-link-icon">{link.icon}</span>
            {link.label}
          </button>
        ))}

        <div className="cn-divider" />
        <div className="cn-mobile-section-label">Account</div>

        {isSignedIn ? (
          <>
            <div className="cn-mobile-user-card">
              <img src={user.imageUrl} alt="avatar" className="cn-avatar" />
              <div className="cn-mobile-user-info">
                <div className="cn-mobile-user-name">{user.firstName} {user.lastName}</div>
                <div className="cn-mobile-user-email">{user.emailAddresses?.[0]?.emailAddress}</div>
              </div>
            </div>
            <SignOutButton>
              <button className="cn-mobile-signout" onClick={() => setMenuOpen(false)}>
                Sign Out
              </button>
            </SignOutButton>
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="cn-mobile-btn-primary" onClick={() => setMenuOpen(false)}>
              Sign In with Google →
            </button>
          </SignInButton>
        )}
      </div>

      <div className="cn-spacer" />
    </>
  );
}