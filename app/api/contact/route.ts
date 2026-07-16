import nodemailer from "nodemailer";
import { sendWhatsApp } from "@/lib/sendWhatsApp";

export type ContactSource = "contact" | "chatbox" | "popup";

type ContactPayload = {
  name?: string;
  email?: string;
  project?: string;
  message?: string;
  source?: ContactSource;
  // Honeypot — real visitors never fill this (it's visually hidden). Bots often do.
  company?: string;
};

const SOURCE_LABELS: Record<ContactSource, string> = {
  contact: "Contact form",
  chatbox: "Chatbox",
  popup: "Lead popup",
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, project, message, source, company } = body;

  // Honeypot tripped — pretend success so bots don't learn to avoid it, but send nothing.
  if (company) {
    return Response.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL || user;

  if (!host || !user || !pass || !to) {
    console.error("Contact form: SMTP env vars not configured.");
    return Response.json(
      { error: "The contact form isn't configured yet. Please email us directly instead." },
      { status: 503 }
    );
  }

  const sourceLabel = SOURCE_LABELS[source ?? "contact"] ?? "Contact form";
  const port = Number(process.env.SMTP_PORT) || 587;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const lines = [
    `New enquiry via ${sourceLabel} on openstackgit.com`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    project ? `Project type: ${project}` : null,
    "",
    "Message:",
    message,
  ].filter((l): l is string => l !== null);

  try {
    await transporter.sendMail({
      from: `"OpenStack Dev Website" <${user}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `[${sourceLabel}] New enquiry from ${name}`,
      text: lines.join("\n"),
    });
  } catch (err) {
    console.error("Contact form: failed to send email.", err);
    return Response.json(
      { error: "Couldn't send your message right now. Please try emailing us directly." },
      { status: 502 }
    );
  }

  // Best-effort — a WhatsApp delivery failure should never fail the request; the email above
  // already succeeded and is the source of truth.
  const whatsappText =
    `New enquiry via ${sourceLabel}\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    (project ? `Project: ${project}\n` : "") +
    `Message: ${message.length > 200 ? message.slice(0, 200) + "…" : message}`;
  await sendWhatsApp(whatsappText);

  return Response.json({ ok: true });
}
