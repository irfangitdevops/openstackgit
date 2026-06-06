"use client";

const techGroups = [
  {
    label: "Frontend",
    items: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "SwiftUI"],
  },
  {
    label: "Backend",
    items: ["NestJS", "Spring Boot (Kotlin)", "Node.js", "REST", "GraphQL"],
  },
  {
    label: "Mobile",
    items: ["iOS Swift", "Android Kotlin", "Jetpack Compose", "Firebase FCM"],
  },
  {
    label: "Database",
    items: ["PostgreSQL", "Firebase Realtime DB", "TypeORM", "Prisma"],
  },
  {
    label: "DevOps",
    items: ["Docker", "Nginx", "Cloudflare", "Vercel", "GitHub Actions"],
  },
  {
    label: "Payments & Maps",
    items: ["PayTabs", "Google Maps", "Stripe", "Razorpay"],
  },
];

export default function TechStack() {
  return (
    <section
      id="tech"
      style={{
        padding: "100px 0",
        background: "var(--bg-dark)",
        color: "#e8e8f0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase" as const,
              color: "var(--primary)",
              background: "var(--primary-bg)",
              padding: "6px 16px",
              borderRadius: 100,
              marginBottom: 16,
            }}
          >
            Our Stack
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#fff",
              margin: "0 0 16px",
            }}
          >
            Tools We Trust in Production
          </h2>
          <p style={{ fontSize: 17, color: "#9CA3AF", lineHeight: 1.6 }}>
            Not trend-chasing — every tool here has been used in live, paying projects.
          </p>
        </div>

        <div
          className="tech-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {techGroups.map((group) => (
            <div
              key={group.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "var(--radius-lg)",
                padding: "28px 24px",
                transition: "all var(--transition)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--primary)";
                el.style.background = "rgba(240,90,40,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "var(--primary)",
                  marginBottom: 16,
                }}
              >
                {group.label}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {group.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
                      color: "#e8e8f0",
                      fontWeight: 500,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--primary)",
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .tech-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .tech-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
