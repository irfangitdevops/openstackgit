import type { ContactSource } from "@/app/api/contact/route";

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  project?: string;
  message: string;
  source: ContactSource;
  /** Honeypot field — must stay empty. Real form inputs never set this. */
  company?: string;
};

export type SubmitLeadResult = { ok: true } | { ok: false; error: string };

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: data?.error || "Something went wrong. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — please check your connection and try again." };
  }
}
