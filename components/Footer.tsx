"use client";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--bg-dark)", color: "#9CA3AF", padding: "60px 0 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
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
              <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>OpenStack Dev</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              Full-stack, mobile, and ERP development agency. We build production-grade software for
              startups and growing businesses globally.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a
                href="https://github.com/irfangitdevops"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9CA3AF",
                  transition: "all var(--transition)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--primary)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "#9CA3AF";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>
              Services
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Full-Stack Web", "Mobile Apps", "ERP Systems", "DevOps", "SEO & Web Presence", "Security Audit"].map((item) => (
                <li key={item}>
                  <Link
                    href="/#services"
                    style={{ fontSize: 14, color: "#9CA3AF", transition: "color var(--transition)" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#9CA3AF")}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>
              Our Work
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Sahlaat", "Easy Busy ERP", "Dr. Kumud Kumar", "CP Homes", "Royal Mint Hotel", "Vedantika Farms"].map((item) => (
                <li key={item}>
                  <Link
                    href="/#work"
                    style={{ fontSize: 14, color: "#9CA3AF", transition: "color var(--transition)" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#9CA3AF")}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>
              Company
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "About", href: "/#about" },
                { label: "Tech Stack", href: "/#tech" },
                { label: "Download Git", href: "/download-git" },
                { label: "Contact", href: "/#contact" },
                { label: "GitHub", href: "https://github.com/irfangitdevops" },
              ].map((item) =>
                item.href.startsWith("http") ? (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 14, color: "#9CA3AF", transition: "color var(--transition)" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#9CA3AF")}
                    >
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      style={{ fontSize: 14, color: "#9CA3AF", transition: "color var(--transition)" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#9CA3AF")}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13 }}>
            © {year} OpenStack Dev. All rights reserved.
          </p>
          <p style={{ fontSize: 13 }}>
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
