"use client";

const projects = [
  {
    name: "Sahlaat",
    tagline: "On-Demand Moving & Logistics — Saudi Arabia",
    desc: "Full ride-hailing platform: real-time GPS tracking, live driver dispatch, PayTabs payments, multi-city coverage. iOS + Android + Spring Boot backend + React admin panel.",
    tech: ["iOS Swift", "Android Kotlin", "Spring Boot", "PostgreSQL", "Firebase", "Docker"],
    type: "Logistics Platform",
    platforms: ["iOS", "Android", "Web Admin", "API"],
    highlight: true,
  },
  {
    name: "Easy Busy ERP",
    tagline: "Multi-module ERP for clinics, retail & services",
    desc: "Full ERP with invoicing, inventory, appointment booking, clinic management, staff roles, and real-time dashboards. Self-hosted on Docker with Cloudflare Tunnel.",
    tech: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "Docker", "Cloudflare"],
    type: "ERP System",
    platforms: ["Web", "Docker", "PostgreSQL"],
    highlight: false,
  },
  {
    name: "Dr. Kumud Kumar",
    tagline: "Doctor portfolio & appointment booking portal",
    desc: "Professional medical website with SEO optimisation, appointment request forms, and service listings. Deployed on VPS with Cloudflare CDN.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    type: "Healthcare Web",
    platforms: ["Web", "SEO"],
    highlight: false,
  },
  {
    name: "CP Homes",
    tagline: "Real estate listings & property management",
    desc: "Property listing platform with search, filter, image galleries, and enquiry management. TypeScript + Next.js frontend.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    type: "Real Estate",
    platforms: ["Web"],
    highlight: false,
  },
  {
    name: "The Royal Mint Hotel",
    tagline: "Luxury hotel website with booking enquiry",
    desc: "Elegant hotel marketing site with room showcases, amenities, photo galleries, and direct booking enquiry flow.",
    tech: ["JavaScript", "HTML/CSS", "Responsive"],
    type: "Hospitality",
    platforms: ["Web"],
    highlight: false,
  },
  {
    name: "Vedantika Farms",
    tagline: "Organic farm e-commerce & brand site",
    desc: "Farm product showcase and direct-to-consumer ordering page. Clean, fast, and mobile-first design.",
    tech: ["JavaScript", "HTML/CSS", "E-commerce"],
    type: "E-commerce",
    platforms: ["Web"],
    highlight: false,
  },
];

export default function Portfolio() {
  return (
    <section
      id="work"
      style={{ padding: "100px 0", background: "var(--bg-alt)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <span className="section-tag">Our Work</span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--text)",
              margin: "0 0 16px",
            }}
          >
            Real Projects, Real Impact
          </h2>
          <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Every project listed here is live and built by our team — from Saudi logistics platforms
            to Indian healthcare portals.
          </p>
        </div>

        {/* Grid */}
        <div
          className="portfolio-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {projects.map((p) => (
            <div
              key={p.name}
              style={{
                background: "#fff",
                border: `1px solid ${p.highlight ? "var(--primary)" : "var(--border-light)"}`,
                borderRadius: "var(--radius-lg)",
                padding: "28px 24px",
                transition: "all var(--transition)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "var(--shadow-md)";
                el.style.transform = "translateY(-4px)";
                if (!p.highlight) el.style.borderColor = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
                if (!p.highlight) el.style.borderColor = "var(--border-light)";
              }}
            >
              {p.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 24,
                    background: "var(--primary)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 100,
                    letterSpacing: "0.5px",
                  }}
                >
                  ⭐ FLAGSHIP PROJECT
                </div>
              )}

              {/* Type badge */}
              <span
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: "var(--primary)",
                  background: "var(--primary-bg)",
                  padding: "4px 10px",
                  borderRadius: 100,
                  width: "fit-content",
                  marginTop: p.highlight ? 8 : 0,
                }}
              >
                {p.type}
              </span>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", margin: 0 }}>
                {p.name}
              </h3>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", margin: 0 }}>
                {p.tagline}
              </p>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                {p.desc}
              </p>

              {/* Platforms */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.platforms.map((pl) => (
                  <span
                    key={pl}
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#fff",
                      background: "var(--bg-dark)",
                      padding: "3px 10px",
                      borderRadius: 100,
                    }}
                  >
                    {pl}
                  </span>
                ))}
              </div>

              {/* Tech stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                {p.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 11,
                      color: "var(--text-secondary)",
                      background: "var(--bg-alt)",
                      border: "1px solid var(--border)",
                      padding: "3px 8px",
                      borderRadius: 6,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
