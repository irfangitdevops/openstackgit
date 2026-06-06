"use client";
export default function About() {
  const values = [
    {
      icon: "🚀",
      title: "We Ship Fast",
      desc: "MVPs in weeks, not months. We build lean, deploy early, and iterate based on real feedback.",
    },
    {
      icon: "🏗️",
      title: "Production-Grade Quality",
      desc: "Every project uses proper auth, security hardening, Docker, and CI/CD — not just demo code.",
    },
    {
      icon: "🌍",
      title: "Remote-First, Global Clients",
      desc: "We've shipped projects for clients in Saudi Arabia, India, and the UK — all managed remotely.",
    },
    {
      icon: "🔒",
      title: "Security by Default",
      desc: "OWASP Top 10, JWT hardening, encrypted data, and regular audits on every project we own.",
    },
  ];

  return (
    <section
      id="about"
      style={{ padding: "100px 0", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <span className="section-tag">About Us</span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--text)",
                margin: "16px 0 20px",
              }}
            >
              A Boutique Dev Agency That Builds the{" "}
              <span className="text-gradient">Whole Product</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              We&apos;re a small, senior team of developers who have built everything from
              ride-hailing apps serving Saudi Arabia to full ERPs for clinics and hotels.
              No juniors, no outsourcing — you get the same engineers from day one to launch.
            </p>
            <p
              style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              We understand the full stack — database schema, API design, mobile app UX,
              cloud deployment, and Cloudflare configuration. You don&apos;t need five agencies;
              you need one team that can do it all.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: "var(--radius)",
                  fontSize: 15,
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
                Start a Project
              </a>
              <a
                href="https://github.com/irfangitdevops"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: "var(--text)",
                  padding: "12px 28px",
                  borderRadius: "var(--radius)",
                  fontSize: 15,
                  fontWeight: 600,
                  border: "2px solid var(--border)",
                  transition: "all var(--transition)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
                  (e.currentTarget as HTMLElement).style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Right — values */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  background: "var(--bg-alt)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius)",
                  padding: "24px 20px",
                  transition: "all var(--transition)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--primary)";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "var(--shadow)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-light)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{v.icon}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                  {v.title}
                </h4>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </section>
  );
}
