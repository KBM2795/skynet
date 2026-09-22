import type { Metadata, Viewport } from "next";
import { Sofia_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";

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
  title: "SkyNet — Autonomous Cyber Defense & Zero-Day Isolation",
  description:
    "Next-Gen Cyber Resilience. Continuous zero-day threat isolation, AI-orchestrated defense pipelines, and sub-millisecond telemetry across multi-cloud and Kubernetes infrastructure.",
  keywords: [
    "Cyber Resilience",
    "Threat Detection",
    "Autonomous Security",
    "Zero-Day Defense",
    "Incident Response",
    "Cloud Telemetry",
  ],
  authors: [{ name: "SkyNet Technologies" }],
  openGraph: {
    title: "SkyNet — Next-Gen Cyber Defense Powered by Autonomous AI",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sofiaSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
