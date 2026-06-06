"use client";

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Full-Stack Web Development",
    desc: "Next.js frontends, NestJS backends, REST & GraphQL APIs, PostgreSQL — complete production systems with Docker deployment.",
    tags: ["Next.js", "NestJS", "TypeScript", "PostgreSQL"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Mobile App Development",
    desc: "Native iOS (Swift/SwiftUI) and Android (Kotlin/Jetpack Compose) apps with real-time features, maps, and payments.",
    tags: ["iOS Swift", "Android Kotlin", "Jetpack Compose", "SwiftUI"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "ERP & Business Systems",
    desc: "Custom ERP with invoicing, inventory, appointments, clinic management, and role-based access control.",
    tags: ["Multi-tenant", "Billing", "Reports", "Clinic Module"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "DevOps & Infrastructure",
    desc: "Docker Compose, Nginx, Cloudflare Tunnels, CI/CD pipelines, automated backups and zero-downtime deploys.",
    tags: ["Docker", "Nginx", "Cloudflare", "CI/CD"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Web Presence & SEO",
    desc: "Fast, SEO-optimised marketing sites on Vercel or custom servers. Cloudflare DNS, SSL, Core Web Vitals.",
    tags: ["Next.js", "Vercel", "SEO", "Cloudflare"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Security & Code Audit",
    desc: "OWASP Top 10 assessments, JWT/auth hardening, API security, dependency audits, and penetration test prep.",
    tags: ["OWASP", "JWT", "Auth", "Audit"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{ padding: "100px 0", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <span className="section-tag">What We Do</span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--text)",
              margin: "0 0 16px",
            }}
          >
            End-to-End Development Services
          </h2>
          <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            From a single landing page to a multi-platform ride-hailing system — we&apos;ve done it all.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="services-grid"
        >
          {services.map((s) => (
            <div
              key={s.title}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "36px 28px",
                transition: "all var(--transition)",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--primary)";
                el.style.boxShadow = "var(--shadow-md)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-light)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: "var(--primary-bg)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)",
                  marginBottom: 20,
                }}
              >
                {s.icon}
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 10,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                {s.desc}
              </p>
              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
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
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
