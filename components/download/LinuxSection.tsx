import CopyButton from "./CopyButton";

const distros = [
  { name: "Ubuntu / Debian", command: "sudo apt update && sudo apt install git" },
  { name: "Fedora", command: "sudo dnf install git" },
  { name: "RHEL / CentOS / Oracle Linux", command: "sudo dnf install git" },
  { name: "Arch / Manjaro", command: "sudo pacman -S git" },
  { name: "openSUSE", command: "sudo zypper install git" },
  { name: "Alpine", command: "sudo apk add git" },
  { name: "Gentoo", command: "sudo emerge --ask --verbose dev-vcs/git" },
  { name: "FreeBSD", command: "sudo pkg install git" },
  { name: "OpenBSD", command: "doas pkg_add git" },
  { name: "Solaris (OpenCSW)", command: "pkgutil -i git" },
  { name: "Nix / NixOS", command: "nix-env -i git" },
  { name: "Mageia", command: "sudo urpmi git" },
];

export default function LinuxSection() {
  return (
    <section id="linux" style={{ padding: "80px 0", background: "var(--bg)" }}>
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
              <path d="M12.5 2c-1.5 0-2.5 1.5-2.5 3.5 0 1.2.4 2 .8 2.8-.9.6-1.8 1.6-2.3 2.9-.9.4-2 1.2-2.5 2.4C4.4 14.6 4 16.5 4.7 18c.3.7 1 1.2 1.5 1.7-.2.5-.3 1.1-.1 1.7.4 1.1 1.7 1.6 3 1.3.5.7 1.4 1.3 2.9 1.3s2.4-.6 2.9-1.3c1.3.3 2.6-.2 3-1.3.2-.6.1-1.2-.1-1.7.5-.5 1.2-1 1.5-1.7.7-1.5.3-3.4-.3-4.4-.5-1.2-1.6-2-2.5-2.4-.5-1.3-1.4-2.3-2.3-2.9.4-.8.8-1.6.8-2.8 0-2-1-3.5-2.5-3.5z" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "var(--text)", margin: 0 }}>
              Git for Linux — All Distros
            </h2>
          </div>
        </div>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32, maxWidth: 700 }}>
          Git ships as a package in every major distribution&apos;s repository — there&apos;s no
          standalone installer to download. Pick your distro and run its command.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 14,
          }}
        >
          {distros.map((d) => (
            <div
              key={d.name}
              style={{
                background: "var(--bg-alt)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius)",
                padding: "18px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: 0 }}>{d.name}</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  background: "var(--bg-dark)",
                  borderRadius: 8,
                  padding: "8px 12px",
                }}
              >
                <code
                  style={{
                    fontSize: 12.5,
                    color: "#e8e8f0",
                    fontFamily: "monospace",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  $ {d.command}
                </code>
                <CopyButton text={d.command} />
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://git-scm.com/download/linux"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 24, fontSize: 14, color: "var(--text-secondary)", textDecoration: "underline" }}
        >
          Official git-scm.com Linux install guide →
        </a>
      </div>
    </section>
  );
}
