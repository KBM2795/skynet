"use client";

import React, { useState } from "react";
import styles from "./resilience-pipeline.module.css";
import { cn } from "@/lib/utils";
import { PillBadge } from "@/components/ui/pill-badge";
import { StadiumFrame } from "@/components/ui/stadium-frame";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Activity, Terminal, Shield, RefreshCw } from "lucide-react";

export interface ResiliencePipelineProps {
  className?: string;
}

export const ResiliencePipeline: React.FC<ResiliencePipelineProps> = ({
  className,
}) => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      index: "01",
      tab: "Continuous Ingestion",
      badge: "Stage 01 • Data & Telemetry Mesh",
      title: "Real-Time Telemetry & Behavior Ingestion",
      description:
        "Skynet hooks directly into eBPF kernel probes, ingress routers, identity providers, and application traces — ingesting millions of unstructured security events per second without adding perceptible overhead.",
      features: [
        "Native eBPF kernel-level event streaming (<0.1% CPU tax)",
        "Cross-cloud VPC flow log & API gateway parsing",
        "Identity authentication attempt & session token validation",
        "Sub-millisecond event normalization into graph format",
      ],
      terminalLines: [
        { text: "$ skynet-mesh stream --source=ebpf-nodes --rate=850k/s", type: "cmd" },
        { text: "[INGEST] 4,820 pods streaming telemetry in sync...", type: "cyan" },
        { text: "[NORMALIZER] Graph topology indexed: 142,000 active nodes", type: "green" },
        { text: "[METRIC] Zero packet loss • Buffer health 99.98%", type: "green" },
        { text: "✓ Telemetry pipeline active & synced to distributed ledger", type: "green" },
      ],
    },
    {
      index: "02",
      tab: "AI Risk Assessment",
      badge: "Stage 02 • Intelligent Decisioning",
      title: "Impact Scoring & Blast-Radius Modeling",
      description:
        "Every anomalous vector is instantly modeled in our real-time graph engine. Skynet computes the statistical likelihood of exploit, the affected downstream services, and automatically ranks incident severity.",
      features: [
        "Dynamic graph-based blast radius simulation in <12ms",
        "Zero-day anomaly detection via baseline behavioral modeling",
        "Automated elimination of false-positive alerting noise",
        "Continuous compliance policy scoring (SOC2 / HIPAA / PCI)",
      ],
      terminalLines: [
        { text: "$ skynet-ai evaluate --incident=ANOM-8924 --mode=graph", type: "cmd" },
        { text: "[RISK_MODEL] Inbound vector: Suspicious Token Replay (Confidence: 0.96)", type: "orange" },
        { text: "[BLAST_RADIUS] 3 Microservices directly exposed | Financial DB Protected", type: "cyan" },
        { text: "[DECISION] Severity: CRITICAL | Recommended action: SURGICAL_ISOLATE", type: "orange" },
        { text: "✓ Mitigation playbook #724 approved for autonomous execution", type: "green" },
      ],
    },
    {
      index: "03",
      tab: "Autonomous Response",
      badge: "Stage 03 • Self-Healing Execution",
      title: "Surgical Mitigation & Service Restoration",
      description:
        "No waiting for on-call engineers at 3 AM. Skynet triggers automated self-healing playbooks to isolate rogue endpoints, re-issue short-lived tokens, rotate credentials, and reroute clean traffic without taking the service down.",
      features: [
        "Zero-downtime mesh traffic rerouting in <15ms",
        "Surgical container quarantine and ephemeral snapshotting",
        "Automatic identity revocation with cryptographic audit trail",
        "Autonomous service verification and state healing",
      ],
      terminalLines: [
        { text: "$ skynet-orchestrator execute --playbook=724 --dry-run=false", type: "cmd" },
        { text: "[ACTION] Quarantined pod `api-auth-worker-7d9` at network perimeter", type: "orange" },
        { text: "[ACTION] Rerouted ingress traffic to healthy replica cluster `us-east-2`", type: "cyan" },
        { text: "[VERIFY] Service availability: 100.00% | Latency normalized to 14ms", type: "green" },
        { text: "✓ Incident ANOM-8924 neutralized in 14.2ms. Ledger written.", type: "green" },
      ],
    },
  ];

  const current = stages[activeStage];

  return (
    <section id="pipeline" className={cn(styles.section, className)}>
      <div className="skynet-container">
        {/* Section Header */}
        <div className={styles.headerContent}>
          <PillBadge dotColor="cyan">AUTONOMOUS FEEDBACK LOOP</PillBadge>
          <h2 className={styles.sectionTitle}>
            How Skynet Neutralizes Incidents in Milliseconds
          </h2>
          <p className={styles.sectionSubtitle}>
            A closed-loop resilience system that eliminates human delay and keeps your
            digital infrastructure online through any cyber shock.
          </p>
        </div>

        {/* Stage Selector Tabs */}
        <div className={styles.stageTabs}>
          {stages.map((stage, idx) => (
            <button
              key={stage.index}
              type="button"
              className={cn(
                styles.stageTab,
                activeStage === idx && styles.stageTabActive
              )}
              onClick={() => setActiveStage(idx)}
            >
              <span className={styles.stageIndex}>{stage.index}</span>
              <span>{stage.tab}</span>
            </button>
          ))}
        </div>

        {/* Stadium Showcase Container */}
        <StadiumFrame glow={activeStage === 2 ? "cyan" : "orange"} withTopHighlight>
          <div className={styles.showcaseFrame}>
            {/* Left: Stage Information */}
            <div className={styles.stageInfo}>
              <span className={styles.stageBadge}>{current.badge}</span>
              <h3 className={styles.stageTitle}>{current.title}</h3>
              <p className={styles.stageDescription}>{current.description}</p>

              <div className={styles.featureList}>
                {current.features.map((feature, fIdx) => (
                  <div key={fIdx} className={styles.featureItem}>
                    <CheckCircle2 className={styles.featureIcon} size={18} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  variant="primary"
                  size="md"
                  href="#simulation"
                  icon={<ArrowRight size={16} />}
                >
                  Simulate In Sandbox
                </Button>
              </div>
            </div>

            {/* Right: Simulated Terminal HUD */}
            <div className={styles.stageScreen}>
              <div className={styles.screenHeader}>
                <div className={styles.screenDots}>
                  <span className={styles.screenDot} />
                  <span className={styles.screenDot} />
                  <span className={styles.screenDot} />
                </div>
                <span>skynet-kernel-v2.4 // interactive-trace</span>
              </div>

              <div className={styles.terminalCode}>
                {current.terminalLines.map((line, lIdx) => (
                  <div key={lIdx} className="mb-2">
                    {line.type === "cmd" && (
                      <span className="text-[#f4f2ee] font-bold">{line.text}</span>
                    )}
                    {line.type === "cyan" && (
                      <span className={styles.codeCyan}>{line.text}</span>
                    )}
                    {line.type === "orange" && (
                      <span className={styles.codeOrange}>{line.text}</span>
                    )}
                    {line.type === "green" && (
                      <span className={styles.codeGreen}>{line.text}</span>
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-1 text-[#00d2ff] animate-pulse mt-4">
                  <span>● Live telemetry listening...</span>
                </div>
              </div>
            </div>
          </div>
        </StadiumFrame>
      </div>
    </section>
  );
};
