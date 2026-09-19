"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Zap, Shield, Sparkles } from "lucide-react";

export const PricingSection: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Starter Mesh",
      desc: "For growing teams and early-stage production workloads.",
      priceMonthly: 39,
      priceAnnual: 29,
      badge: null,
      highlight: false,
      features: [
        "Up to 25 Kubernetes nodes",
        "Autonomous zero-day heuristic detection",
        "Sub-100ms packet inspection",
        "Standard telemetry retention (30 days)",
        "Slack & PagerDuty integration",
        "Community & email support",
      ],
      buttonText: "Start Starter Trial",
      buttonVariant: "secondary" as const,
    },
    {
      name: "Pro Shield",
      desc: "Comprehensive autonomous defense for scaling multi-cloud infrastructure.",
      priceMonthly: 99,
      priceAnnual: 79,
      badge: "Most Popular",
      highlight: true, // Center highlighted card matching the mockup!
      features: [
        "Up to 250 Kubernetes & cloud nodes",
        "Sub-42ms zero-day quarantine engine",
        "Real-time eBPF deep telemetry streaming",
        "Automated compliance reporting (SOC2, ISO)",
        "Predictive vulnerability correlation",
        "Dedicated account engineer & 99.99% SLA",
      ],
      buttonText: "Start 14-Day Pro Trial",
      buttonVariant: "primary" as const,
    },
    {
      name: "Enterprise Sovereignty",
      desc: "Bespoke deployment for defense-in-depth and global enterprise meshes.",
      priceMonthly: 249,
      priceAnnual: 199,
      badge: "Custom Scale",
      highlight: false,
      features: [
        "Unlimited nodes & multi-cloud clusters",
        "Air-gapped & on-prem deployment options",
        "Custom ML threat model fine-tuning",
        "Dedicated 24/7 SecOps incident desk",
        "99.999% high-availability SLA",
        "Custom security audit logs & legal review",
      ],
      buttonText: "Contact Enterprise Sales",
      buttonVariant: "secondary" as const,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden" id="pricing">
      <div className="skynet-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Defense Tiers</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Plans That Scale with <br className="hidden sm:inline" />
            Your Cloud Defense
          </h2>

          <p className="text-slate-600 text-base md:text-lg mb-8">
            Deploy in minutes with zero disruption. All plans include 14 days of full telemetry evaluation.
          </p>

          {/* Billing Toggle Pill */}
          <div className="inline-flex items-center p-1 rounded-full bg-slate-200/80 border border-slate-300 shadow-inner">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                !annual
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                annual
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${annual ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const price = annual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={index}
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  plan.highlight
                    ? "bg-gradient-to-b from-[#0F172A] via-[#0B152E] to-[#0A1938] text-white shadow-2xl shadow-blue-900/30 border-2 border-blue-500/60 lg:-translate-y-3 z-10"
                    : "bg-white text-slate-900 border border-slate-200/90 shadow-lg shadow-slate-200/50 hover:border-slate-300"
                }`}
              >
                {/* Popular Pill Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs font-extrabold tracking-wide uppercase shadow-md shadow-blue-500/30">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Desc */}
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs leading-relaxed ${plan.highlight ? "text-slate-300" : "text-slate-500"}`}>
                      {plan.desc}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-200/30">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight">
                      ${price}
                    </span>
                    <span className={`text-xs font-semibold ${plan.highlight ? "text-slate-300" : "text-slate-500"}`}>
                      / month, billed {annual ? "annually" : "monthly"}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-8">
                    <span className={`text-xs font-bold uppercase tracking-wider block ${plan.highlight ? "text-blue-300" : "text-slate-400"}`}>
                      Included Defense Capabilities:
                    </span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.highlight ? "bg-blue-500/20 text-sky-400" : "bg-blue-50 text-blue-600"
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-xs font-medium leading-tight ${
                          plan.highlight ? "text-slate-200" : "text-slate-700"
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-4">
                  {plan.highlight ? (
                    <Button
                      variant="glow"
                      size="lg"
                      href="#get-started"
                      className="w-full justify-center shadow-lg shadow-blue-600/40"
                    >
                      {plan.buttonText}
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="lg"
                      href="#get-started"
                      className="w-full justify-center"
                    >
                      {plan.buttonText}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
