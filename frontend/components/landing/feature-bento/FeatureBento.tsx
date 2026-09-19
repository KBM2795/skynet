"use client";

import React from "react";
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Server, 
  AlertCircle, 
  Radio, 
  CheckCircle, 
  Lock,
  Zap,
  TrendingUp,
  UserCheck
} from "lucide-react";

export const FeatureBento: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]" id="architecture">
      <div className="skynet-container">
        {/* Deep Contrast Container */}
        <div className="relative rounded-3xl md:rounded-[36px] bg-[#0B1120] border border-slate-800/80 p-6 md:p-14 overflow-hidden shadow-2xl">
          {/* Background Aurora Wave */}
          <div className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen">
            <img
              src="/bento_aurora_bg.jpg"
              alt="Bento Aurora Lights"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Radial Center Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Section Heading */}
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-sky-400 text-xs font-semibold mb-4">
              <Radio className="w-3.5 h-3.5 animate-pulse text-sky-400" />
              <span>Autonomous Defense Matrix</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Your Sovereignty, <br className="hidden sm:inline" />
              Our Absolute Promise.
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              Enterprise-grade autonomous threat hunting engineered for mission-critical Kubernetes, multi-cloud, and edge compute clusters.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {/* Bento Card 1: Threat Radar Waveform (Col 4) */}
            <div className="md:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Threat Radar
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Scanning
                  </div>
                </div>

                <div className="text-2xl font-bold text-white mb-1">0.00ms Lag</div>
                <p className="text-xs text-slate-400 mb-5">Continuous kernel eBPF packet probe</p>

                {/* Waveform graphic */}
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 h-28 flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 200 60" className="w-full h-full">
                    <path
                      d="M 0 30 Q 20 10, 40 30 T 80 30 T 100 15 T 120 45 T 140 30 T 170 10 T 200 30"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="2"
                    />
                    <path
                      d="M 0 30 Q 20 10, 40 30 T 80 30 T 100 15 T 120 45 T 140 30 T 170 10 T 200 30 L 200 60 L 0 60 Z"
                      fill="rgba(56, 189, 248, 0.12)"
                    />
                  </svg>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Ingress Filter</span>
                <span className="text-sky-400 font-semibold">100% In-Memory</span>
              </div>
            </div>

            {/* Bento Card 2: Server Cluster Telemetry Hub (Col 5) */}
            <div className="md:col-span-5 bg-gradient-to-b from-slate-900/90 to-blue-950/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Telemetry Cluster Hub
                  </span>
                  <Server className="w-4 h-4 text-blue-400" />
                </div>

                <div className="text-2xl font-bold text-white mb-1">1,830 Nodes</div>
                <p className="text-xs text-slate-400 mb-6">Real-time orchestrated Kubernetes pods</p>

                {/* Glowing Bars Diagram */}
                <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80 flex items-end justify-between gap-2 h-32">
                  {[45, 70, 55, 90, 80, 100, 85, 95].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-slate-800/60 rounded-t h-24 flex items-end">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 via-sky-500 to-cyan-300 rounded-t shadow-sm shadow-blue-500/50 transition-all duration-700"
                          style={{ height: `${val}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-slate-500">N{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Ingestion</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> 842.6 Gbps Peak
                </span>
              </div>
            </div>

            {/* Bento Card 3: Posture Donut Meter (Col 3) */}
            <div className="md:col-span-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Security Posture
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>

                {/* SVG Radial Gauge */}
                <div className="flex items-center justify-center my-2 relative">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-blue-500"
                      strokeDasharray="99.4, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold text-white">99.4%</span>
                    <span className="text-[9px] text-slate-400 tracking-wider font-semibold">SOC 2 / ISO</span>
                  </div>
                </div>

                <p className="text-center text-xs text-slate-400 mt-2">
                  Zero unmitigated vulnerabilities detected
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Compliance Score</span>
                <span className="text-emerald-400 font-semibold">Verified</span>
              </div>
            </div>

            {/* Bento Card 4: Automated Mitigation Event Stream (Col 5) */}
            <div className="md:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Automated Action Log
                  </span>
                  <Zap className="w-4 h-4 text-sky-400" />
                </div>

                <div className="space-y-2.5">
                  {[
                    { time: "0.04s ago", target: "k8s-pod-auth-412", action: "eBPF Segment Isolated", status: "Resolved" },
                    { time: "1.12s ago", target: "api.gateway.prod", action: "SYN Flood Rate-Limited", status: "Neutralized" },
                    { time: "4.80s ago", target: "db-replica-east", action: "SQLi Signature Neutralized", status: "Quarantined" },
                  ].map((evt, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-white">{evt.action}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{evt.target}</div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold mb-0.5">
                          {evt.status}
                        </span>
                        <div className="text-[10px] text-slate-500">{evt.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Mean Response Speed</span>
                <span className="text-sky-400 font-semibold">42 Milliseconds</span>
              </div>
            </div>

            {/* Bento Card 5: SecOps Analyst Profile Card (Col 7 - Matching Mockup!) */}
            <div className="md:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col md:flex-row items-center gap-6 hover:border-blue-500/40 transition-all duration-300">
              <div className="relative shrink-0">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-xl shadow-blue-500/20">
                  <img
                    src="/secops_analyst.jpg"
                    alt="Senior SecOps Lead"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-2 border-slate-900 rounded-full p-1 text-slate-950 shadow-md">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-sky-400 border border-blue-500/30">
                    Lead SecOps Engineer
                  </span>
                  <span className="text-[11px] text-slate-400">Level 4 Clearance</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Marcus Chen
                </h3>
                <p className="text-xs md:text-sm text-slate-300 mb-4 leading-relaxed">
                  &ldquo;SkyNet reduced our incident response time from 45 minutes to under 50 milliseconds. It caught three zero-day exploits before our firewalls even flagged an alert.&rdquo;
                </p>

                <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                  <span>Latency: <strong className="text-emerald-400">18ms</strong></span>
                  <span>Clusters: <strong className="text-sky-400">324 Active</strong></span>
                  <span>Escalations: <strong className="text-white">0 Today</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
