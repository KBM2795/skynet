import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { ClientLogos } from "@/components/landing/client-logos/ClientLogos";
import { ProcessSection } from "@/components/landing/process-section/ProcessSection";
import { FeatureBento } from "@/components/landing/feature-bento/FeatureBento";
import { StatsBar } from "@/components/landing/stats-bar/StatsBar";
import { AnalyticsShowcase } from "@/components/landing/analytics-showcase/AnalyticsShowcase";
import { PricingSection } from "@/components/landing/pricing-section/PricingSection";
import { TestimonialsSection } from "@/components/landing/testimonials-section/TestimonialsSection";
import { FaqSection } from "@/components/landing/faq-section/FaqSection";
import { FinalCTA } from "@/components/landing/final-cta/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Sticky Luma Glass Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section with Live Telemetry Dashboard Showcase */}
        <HeroSection />

        {/* 2. Enterprise Client Trust Badges */}
        <ClientLogos />

        {/* 3. How It Works: 3 Connected Process Steps */}
        <ProcessSection />

        {/* 4. Contrast Feature Showcase: Deep Navy Bento Matrix */}
        <FeatureBento />

        {/* 5. Statistics Counter Bar */}
        <StatsBar />

        {/* 6. Analytics Deep Dive with Floating Glass Widgets */}
        <AnalyticsShowcase />

        {/* 7. Pricing Section with Center Highlighted Plan */}
        <PricingSection />

        {/* 8. Customer Endorsements / Testimonials */}
        <TestimonialsSection />

        {/* 9. Interactive FAQ Accordion */}
        <FaqSection />

        {/* 10. Final Call-to-Action Banner */}
        <FinalCTA />
      </main>

      {/* Enterprise Footer */}
      <Footer />
    </div>
  );
}