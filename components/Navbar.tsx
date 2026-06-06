"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Tech Stack", href: "#tech" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #F0F0F0" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Brand */}
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "var(--primary)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, color: "var(--primary)" }}>
            OpenStack Dev
          </span>
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            margin: 0,
            padding: 0,
          }}
          className="nav-desktop"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  transition: "color var(--transition)",
                  position: "relative",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-secondary)")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--primary)",
              color: "#fff",
              padding: "10px 22px",
              borderRadius: "var(--radius)",
              fontSize: 14,
              fontWeight: 600,
              transition: "all var(--transition)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--primary-dark)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(240,90,40,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--primary)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Hire Us
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "none",
              flexDirection: "column",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
            }}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            <span style={{ width: 24, height: 2, background: "var(--text)", borderRadius: 2, display: "block" }} />
            <span style={{ width: 24, height: 2, background: "var(--text)", borderRadius: 2, display: "block" }} />
            <span style={{ width: 24, height: 2, background: "var(--text)", borderRadius: 2, display: "block" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "#fff",
            borderTop: "1px solid var(--border-light)",
            padding: "16px 24px 24px",
          }}
        >
          <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "10px 0",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    borderBottom: "1px solid var(--border-light)",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li style={{ marginTop: 12 }}>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "12px",
                  background: "var(--primary)",
                  color: "#fff",
                  borderRadius: "var(--radius)",
                  fontWeight: 600,
                }}
              >
                Hire Us
              </a>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
