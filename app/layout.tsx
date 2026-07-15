import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "OpenStack Dev — Full-Stack & Mobile Development Agency",
  description:
    "We build production-grade web apps, mobile apps, and ERPs. TypeScript · Next.js · NestJS · iOS Swift · Android Kotlin · Docker. Based in India, serving clients globally.",
  keywords: [
    "full stack developer",
    "mobile app development",
    "Next.js developer",
    "NestJS developer",
    "iOS Swift developer",
    "Android Kotlin developer",
    "ERP development",
    "freelance developer India",
  ],
  openGraph: {
    title: "OpenStack Dev — Full-Stack & Mobile Development Agency",
    description:
      "Production-grade web, mobile, and ERP solutions. We ship fast, we ship quality.",
    url: "https://openstackgit.com",
    siteName: "OpenStack Dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenStack Dev",
    description: "Full-Stack · Mobile · ERP · DevOps",
  },
  metadataBase: new URL("https://openstackgit.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <head>
        {ADSENSE_CLIENT_ID && (
          // Rendered as a literal <script> in the server HTML <head> (not via
          // next/script, which only emits a preload hint) so Google's AdSense
          // crawler reliably finds the loader for verification and Auto Ads.
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
