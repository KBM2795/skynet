"use client";

import React from "react";
import styles from "./hero-section.module.css";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Activity, 
  Lock,
  Cpu
} from "lucide-react";

export interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <section className={styles.heroContainer} id="platform">
      {/* Background Graphic */}
      <img
        src="/hero_aurora_bg.jpg"
        alt="Hero Background Light Waves"
        className={styles.heroBackdropImg}
      />

      <div className="skynet-container">
        {/* Hero Copy */}
        <div className={styles.heroContent}>
          <div className={styles.badgePill}>
            <span className={styles.badgeDot} />
            <span>Autonomous Cyber Defense v4.2 • Zero-Day Matrix</span>
          </div>

          <h1 className={styles.heroTitle}>
            Next-Gen Cyber Resilience. <br />
            <span className={styles.gradientText}>Here&apos;s How SkyNet Wins.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Continuous zero-day threat isolation, AI-orchestrated defense protocols, 
            and sub-millisecond telemetry across multi-cloud and Kubernetes infrastructure.
          </p>

          <div className={styles.ctaGroup}>
            <Button
              variant="primary"
              size="lg"
              href="#get-started"
              icon={<ArrowRight className="w-4 h-4 ml-1" />}
              iconPosition="right"
            >
              Start 14-Day Free Trial
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href="#simulation"
              icon={<Play className="w-4 h-4 fill-slate-700 text-slate-700" />}
              iconPosition="left"
            >
              Watch Live Simulation
            </Button>
          </div>
        </div>

        {/* Dashboard Showcase Stage */}
        <div className={styles.showcaseStage}>
          {/* Subtle Ambient Glow */}
          <div className={styles.showcaseGlow} />

          {/* Floating Pill Badges */}
          <div className={`${styles.floatingChipLeft} animate-float-1`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-emerald-700 font-bold">42ms</span>
            <span className="text-slate-600">Zero-Day Isolation</span>
          </div>

          <div className={`${styles.floatingChipRight} animate-float-2`}>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-bold">1,830+</span>
            <span className="text-slate-600">Clusters Guarded</span>
          </div>

          {/* Main Dashboard Card */}
          <div className={styles.mainDashboardCard}>
            {/* Header / Chrome Controls */}
            <div className={styles.dashboardHeader}>
              <div className="flex items-center gap-3">
                <div className={styles.dashWindowControls}>
                  <span className={`${styles.dashDot} ${styles.dashDotRed}`} />
                  <span className={`${styles.dashDot} ${styles.dashDotYellow}`} />
                  <span className={`${styles.dashDot} ${styles.dashDotGreen}`} />
                </div>
                <span className={styles.dashTitle}>
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  skynet-ai-resilience-mesh.cluster.internal
                </span>
              </div>

              <div className={styles.dashStatusLive}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Telemetry Active
              </div>
            </div>

            {/* Dashboard Inner Grid */}
            <div className={styles.dashGrid}>
              {/* Left Widget: Anomaly Catch Rate */}
              <div className={styles.dashSubCard}>
                <div className={styles.subCardHeader}>
                  <span className={styles.subCardTitle}>Anomaly Detection</span>
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>

                <div className={styles.subCardValue}>99.98%</div>
                <div className={styles.subCardTrend}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+0.4% from last model epoch</span>
                </div>

                {/* Bar Graph */}
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-end justify-between h-24 gap-1.5 px-1">
                  {[
                    { day: "M", val: 80 },
                    { day: "T", val: 92 },
                    { day: "W", val: 86 },
                    { day: "T", val: 98 },
                    { day: "F", val: 90 },
                    { day: "S", val: 96 },
                    { day: "S", val: 100 },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full bg-slate-100 rounded-t-md h-20 flex items-end overflow-hidden">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-600 to-sky-400 rounded-t-md transition-all duration-500"
                          style={{ height: `${bar.val}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Panel: Real-time Telemetry Stream */}
              <div className={styles.centerGraphPanel}>
                <div className={styles.graphHeader}>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-blue-600" />
                      Live Threat Mitigation Frequency
                    </h2>
                    <p className="text-xs text-slate-500">Autonomous quarantine across 840 Gbps ingress</p>
                  </div>

                  <div className={styles.graphStatsRow}>
                    <div className={styles.graphStatItem}>
                      <span className={styles.graphStatLabel}>Throughput</span>
                      <span className={styles.graphStatVal}>842 Gbps</span>
                    </div>
                    <div className={styles.graphStatItem}>
                      <span className={styles.graphStatLabel}>Avg MTTD</span>
                      <span className={styles.graphStatVal}>1.2ms</span>
                    </div>
                  </div>
                </div>

                {/* SVG Area Chart */}
                <div className="relative w-full h-36 mt-2">
                  <svg 
                    viewBox="0 0 500 140" 
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.28" />
                        <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
                    <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeDasharray="3 3" />
                    <line x1="0" y1="110" x2="500" y2="110" stroke="#f1f5f9" strokeDasharray="3 3" />

                    {/* Area fill */}
                    <path
                      d="M 0 110 Q 50 60, 100 80 T 200 40 T 300 70 T 400 30 T 500 50 L 500 140 L 0 140 Z"
                      fill="url(#areaGradient)"
                    />

                    {/* Stroke line */}
                    <path
                      d="M 0 110 Q 50 60, 100 80 T 200 40 T 300 70 T 400 30 T 500 50"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Active pulse points */}
                    <circle cx="200" cy="40" r="4" fill="#2563EB" />
                    <circle cx="200" cy="40" r="8" fill="#2563EB" opacity="0.3" className="animate-ping" />

                    <circle cx="400" cy="30" r="4" fill="#00D2FF" />
                    <circle cx="400" cy="30" r="8" fill="#00D2FF" opacity="0.3" className="animate-ping" />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>00:00 UTC</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span className="font-semibold text-blue-700">NOW (Live Stream)</span>
                </div>
              </div>

              {/* Right Widget: Threat Classification Donut */}
              <div className={styles.dashSubCard}>
                <div className={styles.subCardHeader}>
                  <span className={styles.subCardTitle}>Threat Vector Allocation</span>
                  <Lock className="w-4 h-4 text-blue-600" />
                </div>

                <div className="flex items-center justify-center py-2 relative">
                  {/* SVG Donut */}
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background ring */}
                    <path
                      className="text-slate-100"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Segment 1: Blue */}
                    <path
                      className="text-blue-600"
                      strokeDasharray="42, 100"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Segment 2: Sky */}
                    <path
                      className="text-sky-400"
                      strokeDasharray="36, 100"
                      strokeDashoffset="-42"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Segment 3: Indigo */}
                    <path
                      className="text-indigo-600"
                      strokeDasharray="22, 100"
                      strokeDashoffset="-78"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-slate-900">390M+</span>
                    <span className="text-[9px] text-slate-500 font-medium">TOTAL</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-2 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      Zero-Day Exploits
                    </span>
                    <span className="font-semibold text-slate-900">42%</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      DDoS & Botnets
                    </span>
                    <span className="font-semibold text-slate-900">36%</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      API Injections
                    </span>
                    <span className="font-semibold text-slate-900">22%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
