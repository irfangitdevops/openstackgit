import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { devopsCatalog } from "@/lib/devopsCatalog";

export const metadata: Metadata = {
  title: "Open Source DevOps Tools — IaaS, CI/CD, Kubernetes & More — OpenStack Dev",
  description:
    "A curated catalog of open source infrastructure and DevOps tools: IaaS platforms, IaC, CI/CD, container orchestration, monitoring, secrets management, and more — with direct links to official downloads.",
  keywords: [
    "open source devops tools",
    "infrastructure as a service",
    "ci cd tools",
    "kubernetes tools",
    "open source ci",
    "open source cd",
    "devops downloads",
  ],
  openGraph: {
    title: "Open Source DevOps Tools Catalog",
    description: "IaaS, IaC, CI/CD, orchestration, monitoring, and more — curated and linked to official sources.",
    url: "https://openstackgit.com/downloads",
    siteName: "OpenStack Dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source DevOps Tools Catalog",
    description: "Curated open source infra & DevOps tools with official download links.",
  },
  alternates: {
    canonical: "https://openstackgit.com/downloads",
  },
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function DownloadsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            padding: "140px 0 60px",
            background: "linear-gradient(135deg, #FFF5F0 0%, #FFFFFF 40%, #FFF0F0 100%)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>
            <span className="section-tag">Curated &amp; Free</span>
            <h1
              style={{
                fontSize: "clamp(30px, 5vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "var(--text)",
                margin: "16px 0 20px",
              }}
            >
              Open Source <span className="text-gradient">DevOps Tools</span>
            </h1>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
              IaaS platforms, infrastructure as code, CI/CD, container orchestration, monitoring, and
              everything in between — {devopsCatalog.reduce((n, c) => n + c.tools.length, 0)} tools across{" "}
              {devopsCatalog.length} categories, each linked straight to its official source.
            </p>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 20 }}>
              Looking for Git specifically?{" "}
              <Link href="/download-git" style={{ color: "var(--primary)", fontWeight: 600 }}>
                See the dedicated Git download page →
              </Link>
              {"  ·  "}
              Deploying OpenStack itself?{" "}
              <Link href="/download-openstack" style={{ color: "var(--primary)", fontWeight: 600 }}>
                See the OpenStack install guide →
              </Link>
            </p>

            {/* Category jump nav */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: 32,
              }}
            >
              {devopsCatalog.map((c) => (
                <a
                  key={c.category}
                  href={`#${slugify(c.category)}`}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    padding: "6px 16px",
                    borderRadius: 100,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {c.category}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        {devopsCatalog.map((cat, i) => (
          <section
            key={cat.category}
            id={slugify(cat.category)}
            style={{ padding: "56px 0", background: i % 2 === 0 ? "var(--bg)" : "var(--bg-alt)" }}
          >
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
                {cat.category}
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>{cat.blurb}</p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 16,
                }}
              >
                {cat.tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      background: "var(--bg)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius)",
                      padding: "20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: 0 }}>{tool.name}</h3>
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: tool.openSource ? "var(--primary)" : "#B45309",
                          background: tool.openSource ? "var(--primary-bg)" : "rgba(180,83,9,0.1)",
                          padding: "3px 9px",
                          borderRadius: 100,
                          whiteSpace: "nowrap",
                          textTransform: "uppercase",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {tool.license}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>{tool.description}</p>
                    {tool.note && (
                      <p style={{ fontSize: 12, color: "#B45309", lineHeight: 1.5, margin: "8px 0 0" }}>{tool.note}</p>
                    )}
                    <span style={{ display: "inline-block", marginTop: 12, fontSize: 13, fontWeight: 600, color: "var(--primary)" }}>
                      Get it →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section style={{ padding: "80px 0", background: "var(--bg-dark)", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              Need help standing this stack up?
            </h2>
            <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 28 }}>
              We&apos;re OpenStack Dev — we design and operate production DevOps pipelines: CI/CD,
              Kubernetes, monitoring, the works. Let&apos;s talk about your infrastructure.
            </p>
            <Link
              href="/#contact"
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
              }}
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
