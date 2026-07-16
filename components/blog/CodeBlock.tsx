import CopyButton from "@/components/download/CopyButton";

/**
 * A styled, copyable terminal block used throughout the install guides.
 * Server component — the copy button inside is the only client boundary.
 */
export default function CodeBlock({ label, code }: { label?: string; code: string }) {
  return (
    <div
      style={{
        background: "#0F172A",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "10px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#9CA3AF",
            fontFamily: "monospace",
            letterSpacing: "0.3px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label || "terminal"}
        </span>
        <CopyButton text={code} />
      </div>
      <pre
        style={{
          margin: 0,
          padding: "16px",
          overflowX: "auto",
          fontSize: 13.5,
          lineHeight: 1.7,
          color: "#E8E8F0",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
