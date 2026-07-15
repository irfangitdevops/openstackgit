"use client";
import { useEffect, useRef } from "react";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

type AdSlotProps = {
  slot: string;
  format?: string;
  style?: React.CSSProperties;
};

// Renders nothing until NEXT_PUBLIC_ADSENSE_CLIENT_ID + a real ad slot ID are
// configured — see .env.example. Avoids shipping placeholder AdSense units.
export default function AdSlot({ slot, format = "auto", style }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || pushed.current) return;
    try {
      (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense script not loaded yet or blocked — safe to ignore.
    }
  }, []);

  if (!ADSENSE_CLIENT_ID) return null;

  return (
    <ins
      ref={insRef}
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center", ...style }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
