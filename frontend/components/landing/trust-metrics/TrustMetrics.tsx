import React from "react";
import styles from "./trust-metrics.module.css";
import { cn } from "@/lib/utils";
import { PillBadge } from "@/components/ui/pill-badge";
import { ShieldCheck, Zap, Lock, Cpu, Globe2, Award } from "lucide-react";

export interface TrustMetricsProps {
  className?: string;
}

export const TrustMetrics: React.FC<TrustMetricsProps> = ({ className }) => {
  const metrics = [
    {
      value: "99.999%",
      title: "Service Uptime SLA",
      desc: "Guaranteed uninterrupted operational continuity under active cyber attacks.",
    },
    {
      value: "<12ms",
      title: "Mitigation Latency",
      desc: "Instant blast-radius calculation and autonomous container quarantine.",
    },
    {
      value: "10x",
      title: "Faster Threat Recovery",
      desc: "Eliminates on-call engineer triage delay with closed-loop playbook execution.",
    },
    {
      value: "0.00%",
      title: "Unverified Drift",
      desc: "Continuous cryptographic zero-trust validation across all cluster nodes.",
    },
  ];

  const certifications = [
    "SOC 2 Type II Certified",
    "ISO 27001 / ISO 22301",
    "HIPAA Security Rule",
    "PCI DSS v4.0 Ready",
    "FedRAMP High Baseline",
  ];

  return (
    <section id="metrics" className={cn(styles.section, className)}>
      <div className="skynet-container">
        {/* Section Header */}
        <div className={styles.headerContent}>
          <PillBadge dotColor="green">VERIFIED RESILIENCE BENCHMARKS</PillBadge>
          <h2 className={styles.sectionTitle}>
            Engineered for Mission-Critical Infrastructure
          </h2>
          <p className={styles.sectionSubtitle}>
            Proven operational metrics powering tier-1 fintechs, healthcare networks,
            and global enterprise clouds.
          </p>
        </div>

        {/* 4 Metrics Stadium Cards */}
        <div className={styles.metricsGrid}>
          {metrics.map((item, idx) => (
            <div key={idx} className={styles.metricCard}>
              <div className={styles.metricValue}>{item.value}</div>
              <div className={styles.metricTitle}>{item.title}</div>
              <p className={styles.metricDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Compliance & Audit Pill Banner */}
        <div className={styles.complianceBanner}>
          <span className={styles.complianceLabel}>Enterprise Compliance & Governance</span>
          <div className={styles.badgesGroup}>
            {certifications.map((cert, cIdx) => (
              <div key={cIdx} className={styles.certBadge}>
                <ShieldCheck size={16} className={styles.certIcon} />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
