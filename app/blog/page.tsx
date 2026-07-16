import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import { installGuides, guidesByCategory } from "@/lib/guides";

export const metadata: Metadata = {
  title: "DevOps Install Guides & Tutorials — OpenStack Dev",
  description:
    "Step-by-step install and setup guides for every open source DevOps tool we catalog — Docker, Kubernetes, Ansible, Terraform, Prometheus, and more — each with official docs and knowledge base links.",
  keywords: [
    "devops install guides",
    "how to install kubernetes",
    "how to install docker",
    "ansible setup guide",
    "terraform install",
    "self-hosted devops tutorials",
  ],
  openGraph: {
    title: "DevOps Install Guides & Tutorials",
    description:
      "How to install and set up every open source DevOps tool — with official documentation and knowledge base links.",
    url: "https://openstackgit.com/blog",
    siteName: "OpenStack Dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevOps Install Guides & Tutorials",
    description: "Install and setup guides for open source DevOps tools.",
  },
  alternates: { canonical: "https://openstackgit.com/blog" },
};

export default function BlogIndexPage() {
  const groups = guidesByCategory();
  const totalGuides = installGuides.length;

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
            <span className="section-tag">Guides &amp; Tutorials</span>
            <h1
              style={{
                fontSize: "clamp(30px, 5vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "var(--text)",
                margin: "16px 0 20px",
              }}
            >
              How to Install <span className="text-gradient">Every DevOps Tool</span>
            </h1>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
              Practical, copy-paste install and setup guides for {totalGuides} open source infrastructure
              and DevOps tools — each one links straight to the official documentation and its knowledge base.
            </p>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 20 }}>
              Just want the download?{" "}
              <Link href="/downloads" style={{ color: "var(--primary)", fontWeight: 600 }}>
                Browse the tools catalog →
              </Link>
            </p>
          </div>
        </section>

        {/* Guides by category */}
        <section style={{ padding: "50px 0 80px", background: "var(--bg)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
            {groups.map((group) => (
              <div key={group.slug} style={{ marginBottom: 48 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
                  <h2 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, color: "var(--text)", margin: 0 }}>
                    {group.category}
                  </h2>
                  <Link
                    href={`/downloads/${group.slug}`}
                    style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", whiteSpace: "nowrap" }}
                  >
                    Downloads →
                  </Link>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 16,
                  }}
                >
                  {group.guides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/blog/${guide.slug}`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        background: "var(--bg-alt)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius)",
                        padding: "20px",
                      }}
                    >
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>
                        {guide.toolName}
                      </h3>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55, margin: 0, flex: 1 }}>
                        {guide.summary}
                      </p>
                      <span style={{ display: "inline-block", marginTop: 14, fontSize: 13, fontWeight: 600, color: "var(--primary)" }}>
                        Read the install guide →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 8 }}>
              <AdSlot slot="blog-index" style={{ minHeight: 90 }} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 0", background: "var(--bg-dark)", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              Prefer we set it up for you?
            </h2>
            <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 28 }}>
              We&apos;re OpenStack Dev — we design, deploy, and operate production DevOps infrastructure so
              your team can ship instead of babysitting servers.
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
