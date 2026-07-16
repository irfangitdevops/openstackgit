"use client";
import { useState } from "react";
import { submitLead } from "@/lib/submitLead";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "", company: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const result = await submitLead({ ...form, source: "contact" });
    setSending(false);
    if (result.ok) {
      setSent(true);
    } else {
      setError(result.error);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "1.5px solid var(--border)",
    borderRadius: "var(--radius)",
    fontSize: 14,
    fontFamily: "inherit",
    color: "var(--text)",
    background: "#fff",
    outline: "none",
    transition: "border-color var(--transition)",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "100px 0",
        background: "linear-gradient(135deg, #FFF5F0 0%, #FFFFFF 60%, #FFF0EA 100%)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* Left — info */}
          <div>
            <span className="section-tag">Get In Touch</span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--text)",
                margin: "16px 0 20px",
              }}
            >
              Let&apos;s Build Something{" "}
              <span className="text-gradient">Great Together</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: 40,
              }}
            >
              Whether you have a fully scoped project or just an idea on a napkin — we&apos;d love to hear from you.
              We typically respond within 24 hours.
            </p>

            {/* Contact items */}
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                label: "Email",
                value: "hello@openstackgit.com",
                href: "mailto:hello@openstackgit.com",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                  </svg>
                ),
                label: "GitHub",
                value: "github.com/irfangitdevops",
                href: "https://github.com/irfangitdevops",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
                label: "Website",
                value: "openstackgit.com",
                href: "https://openstackgit.com",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius)",
                  marginBottom: 12,
                  background: "#fff",
                  transition: "all var(--transition)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "var(--primary-bg)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
                    {item.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Right — form */}
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "40px 36px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                  Message Sent!
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", margin: 0 }}>
                  Tell Us About Your Project
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
                      Your Name *
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
                    Project Type
                  </label>
                  <select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  >
                    <option value="">Select a service...</option>
                    <option>Full-Stack Web App</option>
                    <option>Mobile App (iOS / Android)</option>
                    <option>ERP / Business System</option>
                    <option>Marketing Website</option>
                    <option>DevOps / Infrastructure</option>
                    <option>Security Audit</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your project, timeline, and any specific requirements..."
                    value={form.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Honeypot — hidden from real visitors, bots often fill every field */}
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                />

                {error && (
                  <p style={{ fontSize: 13.5, color: "#DC2626", margin: 0 }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: "var(--primary)",
                    color: "#fff",
                    padding: "14px 32px",
                    borderRadius: "var(--radius)",
                    fontSize: 15,
                    fontWeight: 600,
                    border: "none",
                    cursor: sending ? "default" : "pointer",
                    opacity: sending ? 0.7 : 1,
                    transition: "all var(--transition)",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--primary-dark)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(240,90,40,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--primary)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {sending ? (
                    "Sending..."
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
