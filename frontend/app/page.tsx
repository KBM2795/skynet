import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { OrbitalConstellation } from "@/components/landing/orbital-constellation";
import { ResiliencePipeline } from "@/components/landing/resilience-pipeline";
import { ThreatRadarDemo } from "@/components/landing/threat-radar-demo";
import { TrustMetrics } from "@/components/landing/trust-metrics";
import { EnterpriseCTA } from "@/components/landing/enterprise-cta";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090a0e] text-[#f4f2ee]">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <OrbitalConstellation />
        <ResiliencePipeline />
        <ThreatRadarDemo />
        <TrustMetrics />
        <EnterpriseCTA />
      </main>

      <Footer />
    </div>
  );
}