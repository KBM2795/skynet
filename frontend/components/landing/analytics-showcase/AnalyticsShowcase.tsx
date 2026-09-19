"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  ShieldAlert, 
  Lock, 
  Cpu,
  Layers
} from "lucide-react";

export const AnalyticsShowcase: React.FC = () => {
  const highlights = [
    "Sub-millisecond correlation across multi-cloud ingress",
    "Automated compliance posture scoring (SOC 2, ISO 27001, HIPAA)",
    "Deep packet inspection without SSL decryption bottleneck",
    "Instant root-cause dependency trees for SecOps teams",
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden" id="analytics">
      {/* Background radial lights */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="skynet-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Deep Ingestion & Forensics</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-5 leading-tight">
              Unlock the Power of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                Data Authentication
              </span>
            </h2>

            <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed">
              Transform billions of chaotic cloud logs into coherent, actionable security 
              intelligence. SkyNet analyzes payload anomalies and predicts attack vectors 
              before they compromise customer data.
            </p>

            <div className="space-y-3.5 mb-8">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              size="lg"
              href="#get-started"
              icon={<ArrowRight className="w-4 h-4 ml-1" />}
              iconPosition="right"
            >
              Explore Telemetry Engine
            </Button>
          </div>

          {/* Right Column: Layered Floating Glass Cards */}
          <div className="lg:col-span-6 relative">
            {/* Background card glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-sky-400/10 rounded-3xl blur-2xl pointer-events-none" />

            {/* Main Base Analytics Card */}
            <div className="relative bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Real-time Cluster Health & Throughput
                  </h3>
                  <p className="text-xs text-slate-500">Continuous 7-day telemetry aggregation</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  Optimal
                </span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-44 flex items-end justify-between gap-3 px-2 mb-6">
                {[
                  { label: "Mon", height: 50 },
                  { label: "Tue", height: 65 },
                  { label: "Wed", height: 80 },
                  { label: "Thu", height: 95 },
                  { label: "Fri", height: 75 },
                  { label: "Sat", height: 88 },
                  { label: "Sun", height: 100 },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-100 rounded-lg h-36 flex items-end overflow-hidden">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 via-sky-500 to-cyan-400 rounded-lg transition-all duration-500"
                        style={{ height: `${bar.height}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">{bar.label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
                <div>
                  <div className="text-xs text-slate-500">Encrypted Nodes</div>
                  <div className="text-base font-bold text-slate-900">100%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Ingress Rate</div>
                  <div className="text-base font-bold text-blue-600">842 Gbps</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">False Positives</div>
                  <div className="text-base font-bold text-emerald-600">0.001%</div>
                </div>
              </div>
            </div>

            {/* Floating Overlay Card 1: Circular Gauge Card (Top Left) */}
            <div className="absolute -top-8 -left-6 md:-left-10 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-xl shadow-slate-300/40 hidden sm:flex items-center gap-3 animate-float-1 z-20">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600"
                    strokeDasharray="98, 100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[10px] font-extrabold text-slate-900">98%</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Compliance Index</div>
                <div className="text-[11px] text-emerald-600 font-semibold">SOC 2 Type II Pass</div>
              </div>
            </div>

            {/* Floating Overlay Card 2: Threat Alert Toast (Bottom Right) */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-slate-900 text-white rounded-2xl p-3.5 shadow-xl shadow-slate-900/30 flex items-center gap-3 animate-float-2 z-20 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Zero-Day Neutralized</div>
                <div className="text-[10px] text-slate-400">Isolated in 42ms • us-east-1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
