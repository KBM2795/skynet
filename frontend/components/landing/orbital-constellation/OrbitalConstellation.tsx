import React from "react";
import styles from "./orbital-constellation.module.css";
import { cn } from "@/lib/utils";
import { PillBadge } from "@/components/ui/pill-badge";
import { SatelliteCTA } from "@/components/ui/satellite-cta";
import { OrbitalArc } from "@/components/ui/orbital-arc";
import {
  Radar,
  Activity,
  Fingerprint,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export interface OrbitalConstellationProps {
  className?: string;
}

export const OrbitalConstellation: React.FC<OrbitalConstellationProps> = ({
  className,
}) => {
  const nodes = [
    {
      id: "anomaly-detection",
      eyebrow: "• ANOMALY DETECTION",
      title: "Real-Time Threat Detection",
      description:
        "Continuously analyzes telemetry and network flows to identify zero-day risks and anomalous behavioral patterns.",
      metric: "99.94%",
      metricLabel: "Precision Rate",
      icon: <Radar size={28} />,
    },
    {
      id: "risk-assessment",
      eyebrow: "• RISK EVALUATION",
      title: "Dynamic Risk Assessment",
      description:
        "Evaluates event severity, potential blast radius, and likelihood to prioritize responses without human fatigue.",
      metric: "<12ms",
      metricLabel: "Impact Scoring",
      icon: <Activity size={28} />,
    },
    {
      id: "trust-engine",
      eyebrow: "• ZERO-TRUST MESH",
      title: "Continuous Trust Verification",
      description:
        "Multi-dimensional verification scoring users, workloads, and devices to enforce granular runtime permissions.",
      metric: "Zero-Drift",
      metricLabel: "State Verification",
      icon: <Fingerprint size={28} />,
    },
    {
      id: "automated-response",
      eyebrow: "• AUTONOMOUS MITIGATION",
      title: "Intelligent Self-Healing",
      description:
        "Automated surgical response workflows isolate compromised pods, reroute traffic, and restore operations instantly.",
      metric: "0 Downtime",
      metricLabel: "SLA Guarantee",
      icon: <RotateCcw size={28} />,
    },
  ];

  return (
    <section id="constellation" className={cn(styles.section, className)}>
      {/* Ghost Watermark Background */}
      <div className={styles.watermark} aria-hidden="true">
        RESILIENCE
      </div>

      <div className="skynet-container">
        {/* Section Header */}
        <div className={styles.headerContent}>
          <PillBadge dotColor="orange">ARCHITECTURAL CONSTELLATION</PillBadge>
          <h2 className={styles.sectionTitle}>
            Four Autonomous Pillars of Continuous Service Resilience
          </h2>
          <p className={styles.sectionSubtitle}>
            Unlike legacy SIEMs or reactive backups, Skynet seamlessly couples real-time
            detection with autonomous mitigation loops to guarantee operational continuity.
          </p>
        </div>

        {/* Constellation Grid with Orbital Connective Arc */}
        <div className="relative">
          {/* Orbital Decorative Arc spanning the nodes */}
          <div className="hidden lg:block absolute top-[120px] left-0 right-0 w-full h-[180px] pointer-events-none z-0">
            <OrbitalArc
              d="M 120 40 Q 380 -30 620 60 T 1120 40"
              viewBox="0 0 1200 120"
              isAnimated
              withGlow
            />
          </div>

          <div className={styles.constellationGrid}>
            {nodes.map((node, index) => (
              <div key={node.id} className={styles.nodeCard}>
                {/* 50% Perfect Circle Portrait Node */}
                <div className={styles.circlePortraitWrapper}>
                  <div className={styles.circlePortrait}>
                    <div className={styles.portraitIconWrapper}>{node.icon}</div>
                    <div className={styles.portraitMetric}>{node.metric}</div>
                    <div className={styles.portraitMetricLabel}>
                      {node.metricLabel}
                    </div>
                  </div>

                  {/* Satellite Micro-CTA Docked at Bottom-Right */}
                  <div className={styles.dockedSatellite}>
                    <SatelliteCTA
                      href={`#${node.id}`}
                      ariaLabel={`Explore ${node.title}`}
                      size="md"
                    />
                  </div>
                </div>

                {/* Node Description Text */}
                <div className={styles.nodeTextGroup}>
                  <span className={styles.nodeEyebrow}>{node.eyebrow}</span>
                  <h3 className={styles.nodeTitle}>{node.title}</h3>
                  <p className={styles.nodeDescription}>{node.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
