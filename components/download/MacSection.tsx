import CopyButton from "./CopyButton";

const methods = [
  {
    title: "Homebrew",
    desc: "The easiest way to install and keep Git updated on macOS.",
    command: "brew install git",
    recommended: true,
  },
  {
    title: "Xcode Command Line Tools",
    desc: "Ships with Apple's developer tools — no separate install needed on most Macs.",
    command: "xcode-select --install",
  },
  {
    title: "MacPorts",
    desc: "Alternative package manager, if you already use MacPorts.",
    command: "sudo port install git",
  },
];

export default function MacSection() {
  return (
    <section id="mac" style={{ padding: "80px 0", background: "var(--bg-alt)" }}>
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
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "var(--text)", margin: 0 }}>
              Git for Mac
            </h2>
          </div>
        </div>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32, maxWidth: 700 }}>
          Apple no longer ships an official standalone Git installer — the officially
          supported routes are Homebrew, Xcode&apos;s Command Line Tools, or MacPorts. Run
          any of the commands below in Terminal.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {methods.map((m) => (
            <div
              key={m.title}
              style={{
                background: "var(--bg)",
                border: `1px solid ${m.recommended ? "var(--primary)" : "var(--border-light)"}`,
                borderRadius: "var(--radius)",
                padding: "24px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ flex: "1 1 260px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: 0 }}>{m.title}</h4>
                  {m.recommended && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--primary)",
                        background: "var(--primary-bg)",
                        padding: "3px 10px",
                        borderRadius: 100,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Recommended
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>{m.desc}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--bg-dark)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  flex: "0 1 auto",
                }}
              >
                <code style={{ fontSize: 13, color: "#e8e8f0", fontFamily: "monospace", whiteSpace: "nowrap" }}>
                  $ {m.command}
                </code>
                <CopyButton text={m.command} />
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://git-scm.com/download/mac"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 20, fontSize: 14, color: "var(--text-secondary)", textDecoration: "underline" }}
        >
          Official git-scm.com Mac install guide →
        </a>
      </div>
    </section>
  );
}
