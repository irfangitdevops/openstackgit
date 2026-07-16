/**
 * Sends a WhatsApp notification via CallMeBot (https://www.callmebot.com/blog/free-api-whatsapp-messages/).
 * Best-effort — callers should not let a failure here block the main flow (e.g. email delivery).
 * Returns false (and logs) on any failure instead of throwing.
 */
export async function sendWhatsApp(text: string): Promise<boolean> {
  const phone = process.env.WHATSAPP_PHONE;
  const apiKey = process.env.CALLMEBOT_API_KEY;

  if (!phone || !apiKey) {
    return false;
  }

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      console.error("WhatsApp notify: CallMeBot returned", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("WhatsApp notify: request failed.", err);
    return false;
  }
}
