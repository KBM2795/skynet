"use client";

import React from "react";
import { Link2, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Connect Cloud Ingress & Telemetry",
      desc: "Deploy our lightweight eBPF daemon or link AWS, GCP, and Kubernetes clusters in under 3 minutes with zero latency overhead.",
      badge: "Zero Downtime",
      visual: (
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-blue-600" />
              eBPF Collector v2.8
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
              Connected
            </span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-500 font-mono">
            <div className="flex justify-between">
              <span>ingress.us-east-1</span>
              <span className="text-emerald-600 font-bold">100% Sync</span>
            </div>
            <div className="flex justify-between">
              <span>k8s-prod-cluster-04</span>
              <span className="text-emerald-600 font-bold">100% Sync</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "02",
      title: "Autonomous AI Neural Analysis",
      desc: "SkyNet's ensemble models continuously inspect packet payloads, anomalous memory access, and API call trajectories in real time.",
      badge: "Deep Learning",
      visual: (
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              Neural Threat Engine
            </span>
            <span className="text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full text-[10px]">
              Inspecting
            </span>
          </div>
          {/* Wave visual */}
          <div className="h-9 flex items-center justify-between gap-1 px-1">
            {[40, 65, 30, 85, 95, 45, 70, 35, 90, 60, 25, 80].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-gradient-to-t from-blue-600 to-sky-400 rounded-full"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      step: "03",
      title: "Instant Quarantine & Zero-Day Isolation",
      desc: "Targeted micro-segmentation fires in 42ms. Malicious lateral movement is blocked while valid enterprise traffic flows uninterrupted.",
      badge: "42ms Response",
      visual: (
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Containment Matrix
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
              Resolved
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold pt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>CVE-2026-4412 Quarantined</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden" id="features">
      <div className="skynet-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <span>Seamless Deployment</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Does SkyNet Protect <br className="hidden sm:inline" />
            Your Entire Cloud Ecosystem?
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Three autonomous stages from continuous telemetry ingestion to instantaneous zero-day threat isolation.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line behind cards for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-blue-200 -translate-y-8 z-0" />

          {steps.map((item, index) => (
            <div
              key={index}
              className="relative z-10 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Step badge & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    {item.step}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                    {item.badge}
                  </span>
                </div>

                {/* Visual Widget Preview */}
                <div className="mb-6">{item.visual}</div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                <span>Learn more about this step</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
