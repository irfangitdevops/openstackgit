import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { findTool, featuredToolParams } from "@/lib/devopsCatalog";
import { getToolReleases, type ToolRelease } from "@/lib/githubReleases";
import { findGuide } from "@/lib/guides";

// Prerender high-traffic tools at build time; the rest render on-demand (ISR).
export async function generateStaticParams() {
  return featuredToolParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}): Promise<Metadata> {
  const { category, tool } = await params;
  const found = findTool(category, tool);
  if (!found) return {};

  const title = `Download ${found.tool.name} — All Versions & Releases — OpenStack Dev`;
  const description = `Download ${found.tool.name}: ${found.tool.description} Browse the full version history with release dates and official download links.`;

  return {
    title,
    description,
    keywords: [
      `download ${found.tool.name.toLowerCase()}`,
      `${found.tool.name.toLowerCase()} versions`,
      `${found.tool.name.toLowerCase()} releases`,
      `install ${found.tool.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://openstackgit.com/downloads/${category}/${tool}`,
      siteName: "OpenStack Dev",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `https://openstackgit.com/downloads/${category}/${tool}`,
    },
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}) {
  const { category, tool } = await params;
  const found = findTool(category, tool);
  if (!found) notFound();

  const { category: cat, tool: t } = found;
  const guide = findGuide(t.slug);
  const releases: ToolRelease[] | null = t.repo ? await getToolReleases(t.repo) : null;
  const hasReleases = releases && releases.length > 0;
  const latest = hasReleases ? releases[0] : null;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            padding: "140px 0 48px",
            background: "linear-gradient(135deg, #FFF5F0 0%, #FFFFFF 40%, #FFF0F0 100%)",
          }}
        >
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 16 }}>
              <Link href="/downloads" style={{ color: "var(--text-secondary)" }}>Downloads</Link>
              {"  /  "}
              <Link href={`/downloads/${cat.slug}`} style={{ color: "var(--text-secondary)" }}>{cat.category}</Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
              <h1 style={{ fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 800, lineHeight: 1.1, color: "var(--text)", margin: 0 }}>
                {t.name}
              </h1>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: t.openSource ? "var(--primary)" : "#B45309",
                  background: t.openSource ? "var(--primary-bg)" : "rgba(180,83,9,0.1)",
                  padding: "4px 12px",
                  borderRadius: 100,
                  textTransform: "uppercase",
                  letterSpacing: "0.3px",
                }}
              >
                {t.license}
              </span>
            </div>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 620, marginBottom: 8 }}>
              {t.description}
            </p>
            {t.note && (
              <p style={{ fontSize: 14, color: "#B45309", lineHeight: 1.6, maxWidth: 620, marginBottom: 8 }}>{t.note}</p>
            )}
            {latest && (
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 12 }}>
                Latest version:{" "}
                <strong style={{ color: "var(--text)" }}>{latest.version}</strong>
                {latest.publishedAt ? ` · released ${formatDate(latest.publishedAt)}` : ""}
              </p>
            )}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "12px 26px",
                  borderRadius: "var(--radius)",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Official Install Guide
              </a>
              {guide && (
                <Link
                  href={`/blog/${guide.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "var(--bg-dark)",
                    color: "#fff",
                    padding: "12px 26px",
                    borderRadius: "var(--radius)",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  Read the Install Guide
                </Link>
              )}
              {t.repo && (
                <a
                  href={`https://github.com/${t.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "transparent",
                    color: "var(--text)",
                    padding: "12px 26px",
                    borderRadius: "var(--radius)",
                    fontSize: 15,
                    fontWeight: 600,
                    border: "2px solid var(--border)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                  </svg>
                  Source
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Version archive */}
        <section style={{ padding: "56px 0 80px", background: "var(--bg)" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>
              Version Archive
            </h2>

            {hasReleases ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {releases!.map((r, i) => (
                  <a
                    key={r.version + i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      flexWrap: "wrap",
                      background: i === 0 ? "var(--primary-bg)" : "var(--bg-alt)",
                      border: `1px solid ${i === 0 ? "var(--primary)" : "var(--border-light)"}`,
                      borderRadius: "var(--radius)",
                      padding: "16px 20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", fontFamily: "monospace" }}>
                        {r.version}
                      </span>
                      {i === 0 && (
                        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                          Latest
                        </span>
                      )}
                      {r.prerelease && (
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#B45309", background: "rgba(180,83,9,0.1)", padding: "2px 8px", borderRadius: 100, textTransform: "uppercase" }}>
                          Pre-release
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      {r.publishedAt && (
                        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{formatDate(r.publishedAt)}</span>
                      )}
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", whiteSpace: "nowrap" }}>
                        {r.assetCount > 0 ? `${r.assetCount} download${r.assetCount === 1 ? "" : "s"} →` : "Release notes →"}
                      </span>
                    </div>
                  </a>
                ))}
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>
                  Showing the {releases!.length} most recent releases. Each links to its full release notes and
                  platform-specific downloads on GitHub.
                </p>
              </div>
            ) : (
              <div
                style={{
                  background: "var(--bg-alt)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20, maxWidth: 520, marginInline: "auto" }}>
                  {t.repo
                    ? `${t.name}'s versions aren't published as GitHub releases — grab the latest build directly from the official source.`
                    : `${t.name}'s releases and version history are published on its official site rather than GitHub.`}
                </p>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "var(--primary)",
                    color: "#fff",
                    padding: "12px 26px",
                    borderRadius: "var(--radius)",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  View Official Downloads
                </a>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "70px 0", background: "var(--bg-dark)", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              Need {t.name} deployed and managed for you?
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
                href={`/downloads/${cat.slug}`}
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
                More {cat.category}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
