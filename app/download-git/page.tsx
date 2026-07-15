import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WindowsSection from "@/components/download/WindowsSection";
import MacSection from "@/components/download/MacSection";
import LinuxSection from "@/components/download/LinuxSection";
import { getLatestWindowsRelease } from "@/lib/gitWindowsRelease";

export const metadata: Metadata = {
  title: "Download Git for Windows, Mac & Linux (All Versions) — OpenStack Dev",
  description:
    "Download Git free for Windows, macOS, and every major Linux distribution. Direct links pulled from the official Git for Windows releases, plus Homebrew, MacPorts, and package manager commands.",
  keywords: [
    "download git",
    "git for windows",
    "git for mac",
    "git for linux",
    "install git",
    "git download",
    "git bash download",
  ],
  openGraph: {
    title: "Download Git for Windows, Mac & Linux",
    description:
      "Free, official download links and install commands for Git — every platform, every major Linux distro.",
    url: "https://openstackgit.com/download-git",
    siteName: "OpenStack Dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Git — Windows, Mac & Linux",
    description: "Official Git download links for every platform.",
  },
  alternates: {
    canonical: "https://openstackgit.com/download-git",
  },
};

export default async function DownloadGitPage() {
  const windowsRelease = await getLatestWindowsRelease();

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
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
            <span className="section-tag">Free &amp; Official</span>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "var(--text)",
                margin: "16px 0 20px",
              }}
            >
              Download <span className="text-gradient">Git</span> — Windows, Mac &amp; Linux
            </h1>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
              Official installers and install commands for every platform, sourced directly
              from git-scm.com and the Git for Windows project. No sign-up, no bundled junk.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 32,
              }}
            >
              {[
                { label: "Windows", href: "#windows" },
                { label: "Mac", href: "#mac" },
                { label: "Linux", href: "#linux" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    padding: "10px 24px",
                    borderRadius: "var(--radius)",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <WindowsSection release={windowsRelease} />
        <MacSection />
        <LinuxSection />

        {/* CTA back to agency */}
        <section style={{ padding: "80px 0", background: "var(--bg-dark)", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              Need a team to build on top of Git?
            </h2>
            <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 28 }}>
              We&apos;re OpenStack Dev — a full-stack, mobile, and DevOps agency. If you need
              CI/CD, repo hosting, or a production app built and shipped, let&apos;s talk.
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
