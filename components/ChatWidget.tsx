"use client";
import { useState } from "react";
import { submitLead } from "@/lib/submitLead";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  border: "1.5px solid var(--border)",
  borderRadius: 8,
  fontSize: 13.5,
  fontFamily: "inherit",
  color: "var(--text)",
  background: "#fff",
  outline: "none",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const result = await submitLead({ ...form, source: "chatbox" });
    setSending(false);
    if (result.ok) {
      setSent(true);
    } else {
      setError(result.error);
    }
  };

  const closeAndReset = () => {
    setOpen(false);
    setTimeout(() => {
      setSent(false);
      setError(null);
      setForm({ name: "", email: "", message: "", company: "" });
    }, 300);
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1200 }}>
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: 72,
            right: 0,
            width: 320,
            maxWidth: "calc(100vw - 48px)",
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            border: "1px solid var(--border-light)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "var(--primary)",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: "#fff" }}>OpenStack Dev</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>We usually reply within 24 hours</div>
            </div>
            <button
              onClick={closeAndReset}
              aria-label="Close chat"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 6,
                width: 26,
                height: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: 18 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>✅</div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: "0 0 4px" }}>Message sent!</p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 4px", lineHeight: 1.5 }}>
                  Have a question or a project in mind? Send us a message.
                </p>
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
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="How can we help?"
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
                {error && <p style={{ fontSize: 12.5, color: "#DC2626", margin: 0 }}>{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    padding: "11px",
                    borderRadius: 8,
                    fontSize: 13.5,
                    fontWeight: 600,
                    border: "none",
                    cursor: sending ? "default" : "pointer",
                    opacity: sending ? 0.7 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--primary)",
          border: "none",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
          transition: "transform var(--transition)",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.06)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
