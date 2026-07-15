import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { devopsCatalog } from "@/lib/devopsCatalog";

export async function generateStaticParams() {
  return devopsCatalog.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = devopsCatalog.find((c) => c.slug === slug);
  if (!cat) return {};

  const title = `Open Source ${cat.category} Tools — OpenStack Dev`;
  const description = `${cat.blurb} Curated open source ${cat.category.toLowerCase()} tools with direct links to official downloads.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://openstackgit.com/downloads/${cat.slug}`,
      siteName: "OpenStack Dev",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://openstackgit.com/downloads/${cat.slug}`,
    },
  };
}

export default async function DownloadCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const cat = devopsCatalog.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            padding: "140px 0 50px",
            background: "linear-gradient(135deg, #FFF5F0 0%, #FFFFFF 40%, #FFF0F0 100%)",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
            <Link href="/downloads" style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600 }}>
              ← All DevOps Tools
            </Link>
            <h1
              style={{
                fontSize: "clamp(28px, 4.5vw, 44px)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "var(--text)",
                margin: "16px 0 12px",
              }}
            >
              {cat.category}
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 620 }}>
              {cat.blurb}
            </p>
          </div>
        </section>

        {/* Tools */}
        <section style={{ padding: "50px 0 80px", background: "var(--bg)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {cat.tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={`/downloads/${cat.slug}/${tool.slug}`}
                  style={{
                    display: "block",
                    background: "var(--bg-alt)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius)",
                    padding: "20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: 0 }}>{tool.name}</h2>
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
                    View versions &amp; download →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "70px 0", background: "var(--bg-dark)", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              Need this stack designed and operated for you?
            </h2>
            <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 24 }}>
              We&apos;re OpenStack Dev — DevOps and infrastructure work is what we do.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
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
              <Link
                href="/downloads"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: "var(--radius)",
                  fontSize: 15,
                  fontWeight: 600,
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
