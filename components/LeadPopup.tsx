"use client";
import { useEffect, useState } from "react";
import { submitLead } from "@/lib/submitLead";

const SHOW_DELAY_MS = 15000; // 15s — middle of the requested 10-20s window
const DISMISSED_KEY = "osd.popupDismissed"; // per-tab (sessionStorage)
const CONVERTED_KEY = "osd.leadCaptured"; // persistent (localStorage) — never re-pester a convert

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1.5px solid var(--border)",
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "inherit",
  color: "var(--text)",
  background: "#fff",
  outline: "none",
};

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", project: "", message: "", company: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISSED_KEY) || localStorage.getItem(CONVERTED_KEY)) return;
    } catch {
      // Storage unavailable (privacy mode, etc.) — fall through and show it anyway.
    }
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // ignore
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const result = await submitLead({ ...form, source: "popup" });
    setSending(false);
    if (result.ok) {
      setSent(true);
      try {
        localStorage.setItem(CONVERTED_KEY, "1");
      } catch {
        // ignore
      }
    } else {
      setError(result.error);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request a project quote"
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          width: 420,
          maxWidth: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "var(--bg-alt)",
            border: "none",
            borderRadius: 8,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-secondary)",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div style={{ padding: "36px 32px 32px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>✅</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                Got it — thanks!
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14.5 }}>
                We&apos;ll get back to you within 24 hours with next steps.
              </p>
            </div>
          ) : (
            <>
              <span className="section-tag">Free Quote</span>
              <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, color: "var(--text)", margin: "14px 0 8px", lineHeight: 1.2 }}>
                Need Your Infra or App Built?
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 22 }}>
                Tell us what you&apos;re building and we&apos;ll send back a free scope and quote —
                usually within 24 hours.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Your email"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                  <select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="">What do you need built?</option>
                    <option>Full-Stack Web App</option>
                    <option>Mobile App (iOS / Android)</option>
                    <option>ERP / Business System</option>
                    <option>DevOps / Infrastructure</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="A few details (optional)"
                  value={form.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
                />
                {error && <p style={{ fontSize: 13, color: "#DC2626", margin: 0 }}>{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    padding: "13px",
                    borderRadius: "var(--radius)",
                    fontSize: 14.5,
                    fontWeight: 600,
                    border: "none",
                    cursor: sending ? "default" : "pointer",
                    opacity: sending ? 0.7 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  {sending ? "Sending..." : "Get My Free Quote"}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-secondary)",
                    fontSize: 13,
                    cursor: "pointer",
                    padding: 4,
                    fontFamily: "inherit",
                  }}
                >
                  No thanks, maybe later
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
