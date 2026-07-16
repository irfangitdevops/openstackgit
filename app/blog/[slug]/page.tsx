import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import CodeBlock from "@/components/blog/CodeBlock";
import {
  findGuide,
  featuredGuideParams,
  relatedGuides,
  categoryName,
} from "@/lib/guides";

// Prerender featured (high-traffic) guides at build time; the rest render
// on-demand. All guide content is local, so on-demand pages are fully static.
export async function generateStaticParams() {
  return featuredGuideParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) return {};

  const title = `${guide.headline} (${guide.updated} Guide) — OpenStack Dev`;
  const description = guide.summary;

  return {
    title,
    description,
    keywords: [
      `install ${guide.toolName.toLowerCase()}`,
      `${guide.toolName.toLowerCase()} setup`,
      `how to install ${guide.toolName.toLowerCase()}`,
      `${guide.toolName.toLowerCase()} tutorial`,
      `${guide.toolName.toLowerCase()} documentation`,
    ],
    openGraph: {
      title,
      description,
      url: `https://openstackgit.com/blog/${guide.slug}`,
      siteName: "OpenStack Dev",
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `https://openstackgit.com/blog/${guide.slug}` },
  };
}

const linkBox: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  background: "var(--bg-alt)",
  border: "1px solid var(--border-light)",
  borderRadius: "var(--radius)",
  padding: "18px 20px",
};

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();

  const related = relatedGuides(guide);
  const catName = categoryName(guide.categorySlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.headline,
    description: guide.summary,
    articleSection: catName,
    keywords: `install ${guide.toolName}, ${guide.toolName} setup`,
    author: { "@type": "Organization", name: "OpenStack Dev" },
    publisher: { "@type": "Organization", name: "OpenStack Dev" },
    mainEntityOfPage: `https://openstackgit.com/blog/${guide.slug}`,
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero */}
        <section
          style={{
            padding: "140px 0 40px",
            background: "linear-gradient(135deg, #FFF5F0 0%, #FFFFFF 40%, #FFF0F0 100%)",
          }}
        >
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 16 }}>
              <Link href="/blog" style={{ color: "var(--text-secondary)" }}>Guides</Link>
              {"  /  "}
              <Link href={`/downloads/${guide.categorySlug}`} style={{ color: "var(--text-secondary)" }}>{catName}</Link>
            </div>
            <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 800, lineHeight: 1.15, color: "var(--text)", margin: "0 0 16px" }}>
              {guide.headline}
            </h1>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 640, margin: 0 }}>
              {guide.summary}
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", marginTop: 18, fontSize: 13, color: "var(--text-light)" }}>
              <span>Updated {guide.updated}</span>
              <span aria-hidden>·</span>
              <span>{guide.sections.length}-step setup</span>
              <span aria-hidden>·</span>
              <Link href={`/downloads/${guide.categorySlug}/${guide.toolSlug}`} style={{ color: "var(--primary)", fontWeight: 600 }}>
                Download {guide.toolName} →
              </Link>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section style={{ padding: "40px 0 70px", background: "var(--bg)" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
            {/* Prerequisites */}
            {guide.prerequisites && guide.prerequisites.length > 0 && (
              <div
                style={{
                  background: "var(--primary-bg)",
                  border: "1px solid rgba(240,90,40,0.2)",
                  borderRadius: "var(--radius)",
                  padding: "20px 24px",
                  marginBottom: 36,
                }}
              >
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Prerequisites
                </h2>
                <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {guide.prerequisites.map((p, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--primary)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sections */}
            {guide.sections.map((section, si) => (
              <div key={si} style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: "clamp(19px, 2.6vw, 24px)", fontWeight: 700, color: "var(--text)", margin: "0 0 14px" }}>
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p, pi) => (
                  <p key={pi} style={{ fontSize: 15.5, color: "var(--text-secondary)", lineHeight: 1.75, margin: "0 0 14px" }}>
                    {p}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8, margin: "0 0 14px", paddingLeft: 4 }}>
                    {section.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: "flex", gap: 10, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                        <span style={{ color: "var(--primary)", flexShrink: 0 }}>•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.code?.map((c, ci) => (
                  <CodeBlock key={ci} label={c.label} code={c.code} />
                ))}
                {section.note && (
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      background: "#FFF8F0",
                      border: "1px solid rgba(180,83,9,0.2)",
                      borderRadius: "var(--radius)",
                      padding: "14px 18px",
                      marginTop: 14,
                    }}
                  >
                    <span style={{ color: "#B45309", fontWeight: 700, flexShrink: 0 }}>!</span>
                    <p style={{ fontSize: 14, color: "#92400E", lineHeight: 1.6, margin: 0 }}>{section.note}</p>
                  </div>
                )}
              </div>
            ))}

            <div style={{ margin: "8px 0 36px" }}>
              <AdSlot slot="blog-guide" style={{ minHeight: 90 }} />
            </div>

            {/* Official docs + KB */}
            <h2 style={{ fontSize: "clamp(19px, 2.6vw, 24px)", fontWeight: 700, color: "var(--text)", margin: "0 0 16px" }}>
              Documentation &amp; Knowledge Base
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 40 }}>
              <a href={guide.docs.url} target="_blank" rel="noopener noreferrer" style={linkBox}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Official Documentation
                </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{guide.docs.label} →</span>
              </a>
              <a href={guide.kb.url} target="_blank" rel="noopener noreferrer" style={linkBox}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Knowledge Base &amp; Community
                </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{guide.kb.label} →</span>
              </a>
            </div>

            {/* Download back-link */}
            <Link
              href={`/downloads/${guide.categorySlug}/${guide.toolSlug}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                background: "var(--bg-dark)",
                borderRadius: "var(--radius)",
                padding: "18px 24px",
                marginBottom: 40,
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>
                Download {guide.toolName} — all versions &amp; official links
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "var(--primary-light)", whiteSpace: "nowrap" }}>→</span>
            </Link>

            {/* Related guides */}
            {related.length > 0 && (
              <div>
                <h2 style={{ fontSize: "clamp(19px, 2.6vw, 24px)", fontWeight: 700, color: "var(--text)", margin: "0 0 16px" }}>
                  Related Guides
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      style={{
                        background: "var(--bg-alt)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius)",
                        padding: "16px 18px",
                      }}
                    >
                      <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                        {r.toolName}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)" }}>Install guide →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "70px 0", background: "var(--bg-dark)", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              Need {guide.toolName} deployed and managed for you?
            </h2>
            <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 24 }}>
              We&apos;re OpenStack Dev — we design, deploy, and operate production DevOps infrastructure.
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
                href="/blog"
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
                All Install Guides
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
