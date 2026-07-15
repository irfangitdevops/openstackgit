import type { WindowsRelease } from "@/lib/gitWindowsRelease";

function formatSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DownloadCard({
  title,
  desc,
  url,
  size,
}: {
  title: string;
  desc: string;
  url: string;
  size?: number;
}) {
  return (
    <div
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div>
        <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
          {title}
        </h4>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{desc}</p>
      </div>
      <a
        href={url}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: "var(--primary)",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: "var(--radius)",
          fontSize: 14,
          fontWeight: 600,
          marginTop: "auto",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download{size ? ` (${formatSize(size)})` : ""}
      </a>
    </div>
  );
}

type Card = { title: string; desc: string; url: string; size?: number };

export default function WindowsSection({ release }: { release: WindowsRelease | null }) {
  const cards: Card[] = [];
  if (release) {
    if (release.setup64) {
      cards.push({
        title: "64-bit Setup",
        desc: "Standard installer for 64-bit Windows 10/11. Recommended for almost everyone.",
        url: release.setup64.browser_download_url,
        size: release.setup64.size,
      });
    }
    if (release.setupArm64) {
      cards.push({
        title: "ARM64 Setup",
        desc: "For Windows on ARM devices (Surface Pro X and similar).",
        url: release.setupArm64.browser_download_url,
        size: release.setupArm64.size,
      });
    }
    if (release.setup32) {
      cards.push({
        title: "32-bit Setup",
        desc: "For legacy 32-bit Windows systems.",
        url: release.setup32.browser_download_url,
        size: release.setup32.size,
      });
    }
    if (release.portable64) {
      cards.push({
        title: "Portable (64-bit)",
        desc: "No installation or admin rights required — extract and run.",
        url: release.portable64.browser_download_url,
        size: release.portable64.size,
      });
    }
    if (release.portableArm64) {
      cards.push({
        title: "Portable (ARM64)",
        desc: "Portable build for Windows on ARM.",
        url: release.portableArm64.browser_download_url,
        size: release.portableArm64.size,
      });
    }
  }

  return (
    <section id="windows" style={{ padding: "80px 0", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: "var(--primary-bg)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "var(--text)", margin: 0 }}>
              Git for Windows
            </h2>
            {release ? (
              <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "4px 0 0" }}>
                Latest version: <strong style={{ color: "var(--text)" }}>{release.version}</strong>
              </p>
            ) : null}
          </div>
        </div>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32, maxWidth: 700 }}>
          Git for Windows bundles Git, Git Bash, and Git GUI in one installer, built and
          maintained by the{" "}
          <a href="https://gitforwindows.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", fontWeight: 600 }}>
            Git for Windows
          </a>{" "}
          project. Links below pull directly from their official GitHub releases.
        </p>

        {cards.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {cards.map((c) => (
              <DownloadCard key={c.title} {...c} />
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            We couldn&apos;t reach GitHub to fetch the latest release right now.
          </p>
        )}

        <a
          href="https://git-scm.com/download/win"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 20, fontSize: 14, color: "var(--text-secondary)", textDecoration: "underline" }}
        >
          View all Windows options on git-scm.com →
        </a>
      </div>
    </section>
  );
}
