"use client";
export default function Hero() {
  const stats = [
    { value: "10+", label: "Projects Shipped" },
    { value: "5+", label: "Happy Clients" },
    { value: "4", label: "Platforms" },
  ];

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 0 80px",
        background: "linear-gradient(135deg, #FFF5F0 0%, #FFFFFF 40%, #FFF0F0 100%)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left — copy */}
          <div>
            <div className="section-tag">🚀 Full-Stack · Mobile · ERP · DevOps</div>
            <h1
              style={{
                fontSize: "clamp(40px, 5.5vw, 64px)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "var(--text)",
                margin: "16px 0 20px",
              }}
            >
              We Build Software{" "}
              <span className="text-gradient">That Ships</span>
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 520,
              }}
            >
              From ride-hailing platforms to ERP systems and doctor portals — we
              design, build, and deploy production-grade software for startups
              and growing businesses.
            </p>

            <div style={{ display: "flex", gap: 16, marginBottom: 48, flexWrap: "wrap" }}>
              <a
                href="#work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "14px 32px",
                  borderRadius: "var(--radius)",
                  fontSize: 16,
                  fontWeight: 600,
                  transition: "all var(--transition)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--primary-dark)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(240,90,40,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--primary)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                View Our Work
              </a>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: "var(--text)",
                  padding: "14px 32px",
                  borderRadius: "var(--radius)",
                  fontSize: 16,
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
                Get a Quote
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: 26,
                        fontWeight: 700,
                        color: "var(--text)",
                      }}
                    >
                      {s.value}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      {s.label}
                    </span>
                  </div>
                  {i < stats.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        height: 36,
                        background: "var(--border)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — code card mockup */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: 340,
                background: "#1A1A2E",
                borderRadius: 20,
                padding: 24,
                boxShadow: "var(--shadow-lg)",
                transform: "rotateY(-5deg) rotateX(2deg)",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                perspective: 1000,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "rotateY(0deg) rotateX(0deg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "rotateY(-5deg) rotateX(2deg)";
              }}
            >
              {/* Window bar */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                ))}
              </div>
              {/* Code lines */}
              {[
                { indent: 0, tokens: [{ t: "const ", c: "#FF7A4D" }, { t: "stack", c: "#e8e8f0" }, { t: " = {", c: "#6B7280" }] },
                { indent: 1, tokens: [{ t: "web", c: "#e8e8f0" }, { t: ": [", c: "#6B7280" }, { t: "'Next.js'", c: "#4CAF50" }, { t: ", ", c: "#6B7280" }, { t: "'NestJS'", c: "#4CAF50" }, { t: "]", c: "#6B7280" }] },
                { indent: 1, tokens: [{ t: "mobile", c: "#e8e8f0" }, { t: ": [", c: "#6B7280" }, { t: "'Swift'", c: "#4CAF50" }, { t: ", ", c: "#6B7280" }, { t: "'Kotlin'", c: "#4CAF50" }, { t: "]", c: "#6B7280" }] },
                { indent: 1, tokens: [{ t: "db", c: "#e8e8f0" }, { t: ": [", c: "#6B7280" }, { t: "'PostgreSQL'", c: "#4CAF50" }, { t: "]", c: "#6B7280" }] },
                { indent: 1, tokens: [{ t: "deploy", c: "#e8e8f0" }, { t: ": [", c: "#6B7280" }, { t: "'Docker'", c: "#4CAF50" }, { t: ", ", c: "#6B7280" }, { t: "'Vercel'", c: "#4CAF50" }, { t: "]", c: "#6B7280" }] },
                { indent: 0, tokens: [{ t: "}", c: "#6B7280" }] },
                { indent: 0, tokens: [] },
                { indent: 0, tokens: [{ t: "// shipped to production ✅", c: "#4a5568" }] },
              ].map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 13,
                    lineHeight: "1.8",
                    paddingLeft: line.indent * 20,
                    color: "#e8e8f0",
                  }}
                >
                  {line.tokens.map((tok, j) => (
                    <span key={j} style={{ color: tok.c }}>
                      {tok.t}
                    </span>
                  ))}
                  {line.tokens.length === 0 && "\u00a0"}
                </div>
              ))}

              {/* Bottom tags */}
              <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
                {["TypeScript", "Docker", "PostgreSQL"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--primary)",
                      background: "var(--primary-bg)",
                      padding: "4px 10px",
                      borderRadius: 100,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 V80 H0 Z" fill="#ffffff" />
        </svg>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
