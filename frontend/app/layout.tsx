import type { Metadata, Viewport } from "next";
import { Sofia_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skynet | Intelligent Cyber Resilience Platform",
  description:
    "Autonomous protection and uninterrupted service availability through real-time anomaly detection, risk assessment, and trust-based mitigation.",
  keywords: [
    "Cyber Resilience",
    "Threat Detection",
    "Autonomous Security",
    "Trust Evaluation",
    "Incident Response",
    "Zero-Downtime Infrastructure",
  ],
  authors: [{ name: "Skynet Resilience Team" }],
  openGraph: {
    title: "Skynet | Intelligent Cyber Resilience Platform",
    description:
      "Detect threats, assess risks, and autonomously respond to incidents while maintaining continuous availability.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#090a0e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sofiaSans.variable} ${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#090a0e] text-[#f4f2ee]">
        {children}
      </body>
    </html>
  );
}
