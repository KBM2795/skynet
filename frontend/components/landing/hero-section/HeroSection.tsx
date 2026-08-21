"use client";

import React, { useState, useEffect } from "react";
import styles from "./hero-section.module.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
import { StadiumFrame } from "@/components/ui/stadium-frame";
import {
  ShieldAlert,
  Activity,
  CheckCircle2,
  Lock,
  ArrowRight,
  Terminal,
  Zap,
} from "lucide-react";

export interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const [activeDots, setActiveDots] = useState([
    { top: "35%", left: "65%", id: 1 },
    { top: "68%", left: "42%", id: 2 },
    { top: "25%", left: "30%", id: 3 },
  ]);

  const [resilienceScore, setResilienceScore] = useState(99.98);

  useEffect(() => {
    const interval = setInterval(() => {
      setResilienceScore((prev) => {
        const delta = (Math.random() * 0.04 - 0.02);
        const next = parseFloat(Math.min(99.99, Math.max(99.95, prev + delta)).toFixed(2));
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="overview" className={cn(styles.heroContainer, className)}>
      <div className={styles.bgAura} aria-hidden="true" />

      <div className="skynet-container">
        {/* Editorial Text Centerpiece */}
        <div className={styles.heroContent}>
          <div className={styles.eyebrowWrapper}>
            <PillBadge dotColor="orange" isPulsing>
              INTELLIGENT CYBER RESILIENCE
            </PillBadge>
          </div>

          <h1 className={styles.heroTitle}>
            Autonomous Protection. <br />
            <span className={styles.highlightText}>
              Uninterrupted Service Availability.
            </span>
          </h1>

          <p className={styles.heroSubtitle}>
            Skynet monitors user behavior, system telemetry, and network topology in real-time.
            When disruptions occur, it assesses blast-radius risk and initiates self-healing
            mitigations before service continuity is compromised.
          </p>

          <div className={styles.ctaGroup}>
            <Button
              variant="primary"
              size="lg"
              href="#simulation"
              icon={<ArrowRight size={18} />}
            >
              Test Live Sandbox
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="#constellation"
            >
              Explore Architecture
            </Button>
          </div>
        </div>

        {/* 40px Radius Stadium Frame Live Preview HUD */}
        <div className={styles.stadiumWrapper}>
          <StadiumFrame glow="orange" withTopHighlight>
            {/* HUD Status Bar */}
            <div className={styles.hudHeader}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#00e599] animate-ping" />
                <span className="text-sm font-medium text-[#f4f2ee]">
                  Skynet Autonomous Defense Grid: <strong className="text-[#00e599]">ONLINE</strong>
                </span>
              </div>

              <div className={styles.hudPills}>
                <div className={styles.hudPill}>
                  <Activity size={12} className="text-[#00d2ff]" />
                  <span>Telemetry: 842k events/s</span>
                </div>
                <div className={styles.hudPill}>
                  <Zap size={12} className="text-[#f37338]" />
                  <span>Auto-Mitigation: Active</span>
                </div>
                <div className={styles.hudPill}>
                  <Lock size={12} className="text-[#00e599]" />
                  <span>Trust Score: Zero-Drift</span>
                </div>
              </div>
            </div>

            {/* HUD Content Grid */}
            <div className={styles.hudGrid}>
              {/* Metric Card 1: Resilience Index */}
              <div className={styles.hudPanel}>
                <div className={styles.panelTitle}>
                  <span>System Resilience Index</span>
                  <ShieldAlert size={14} className="text-[#00e599]" />
                </div>
                <div className={styles.statValueBig}>{resilienceScore}%</div>
                <p className="text-xs text-[#9fa4b2] leading-relaxed">
                  Autonomous self-healing active across 48 global availability zones.
                  0 SLA breaches recorded this quarter.
                </p>
                <div className="mt-auto pt-2">
                  <div className="w-full bg-[#1e2230] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#00e599] to-[#00d2ff] h-full rounded-full transition-all duration-500"
                      style={{ width: `${resilienceScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Center Panel: Real-time Threat Radar */}
              <div className={styles.hudPanel}>
                <div className={styles.panelTitle}>
                  <span>Continuous Threat Radar</span>
                  <span className="text-[10px] text-[#f37338] uppercase tracking-wider font-mono">
                    LIVE SWEEP
                  </span>
                </div>

                <div className={styles.radarVisual}>
                  <div className={styles.radarCrosshairH} />
                  <div className={styles.radarCrosshairV} />
                  <div className={cn(styles.radarRing, styles.radarRing1)} />
                  <div className={cn(styles.radarRing, styles.radarRing2)} />
                  <div className={styles.radarSweepLine} />

                  {activeDots.map((dot) => (
                    <span
                      key={dot.id}
                      className={styles.radarDot}
                      style={{ top: dot.top, left: dot.left }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-[#9fa4b2]">
                  <span>Vector Scan: 360° Mesh</span>
                  <span className="text-[#00d2ff] font-mono">0.4ms Latency</span>
                </div>
              </div>

              {/* Right Panel: Incident Stream */}
              <div className={styles.hudPanel}>
                <div className={styles.panelTitle}>
                  <span>Autonomous Response Log</span>
                  <Terminal size={14} className="text-[#9fa4b2]" />
                </div>

                <div className={styles.feedList}>
                  <div className={styles.feedItem}>
                    <span className={cn(styles.feedBadge, styles.feedBadgeSuccess)}>
                      Isolated
                    </span>
                    <div className="flex-1">
                      <div className="text-[#f4f2ee] font-medium">BGP Route Hijack Attempt</div>
                      <div className="text-[11px] text-[#636979]">Rerouted in 11ms via trust mesh</div>
                    </div>
                  </div>

                  <div className={styles.feedItem}>
                    <span className={cn(styles.feedBadge, styles.feedBadgeMitigated)}>
                      Scored
                    </span>
                    <div className="flex-1">
                      <div className="text-[#f4f2ee] font-medium">Credential Anomaly Burst</div>
                      <div className="text-[11px] text-[#636979]">Dynamic MFA challenge triggered</div>
                    </div>
                  </div>

                  <div className={styles.feedItem}>
                    <span className={cn(styles.feedBadge, styles.feedBadgeSuccess)}>
                      Restored
                    </span>
                    <div className="flex-1">
                      <div className="text-[#f4f2ee] font-medium">Pod CPU Spike Detected</div>
                      <div className="text-[11px] text-[#636979]">Autoscaled & re-balanced zero drop</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StadiumFrame>
        </div>
      </div>
    </section>
  );
};
