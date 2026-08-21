"use client";

import React, { useState, useEffect } from "react";
import styles from "./threat-radar-demo.module.css";
import { cn } from "@/lib/utils";
import { PillBadge } from "@/components/ui/pill-badge";
import { StadiumFrame } from "@/components/ui/stadium-frame";
import { Button } from "@/components/ui/button";
import { Play, Check, ShieldAlert, Radio, Flame, Lock, Server } from "lucide-react";

export interface ThreatRadarDemoProps {
  className?: string;
}

export const ThreatRadarDemo: React.FC<ThreatRadarDemoProps> = ({
  className,
}) => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [simStep, setSimStep] = useState(3); // 0=Detect, 1=Risk, 2=Mitigate, 3=Restored
  const [isSimulating, setIsSimulating] = useState(false);

  const scenarios = [
    {
      id: "credential-burst",
      title: "Distributed Credential Spray",
      subtitle: "10,000 requests/s from 2,400 rotating residential IPs",
      severity: "CRITICAL",
      icon: <Flame size={16} className="text-[#f37338]" />,
      logs: [
        "[00:00.001] Inbound surge detected: 10,000 auth requests/sec across 2,400 ASNs.",
        "[00:00.004] AI Engine flag: Behavioral divergence score 0.98. Class: Distributed Bot.",
        "[00:00.009] Dynamic mesh challenge applied to unverified ASNs without blocking valid users.",
        "[00:00.013] 9,982 bot requests contained at ingress. Zero valid user login disruptions.",
      ],
    },
    {
      id: "privilege-escalation",
      title: "Rogue Pod Privilege Escalation",
      subtitle: "Kernel probe reveals unauthorized namespace escape attempt",
      severity: "HIGH",
      icon: <Server size={16} className="text-[#00d2ff]" />,
      logs: [
        "[00:00.002] eBPF sensor alert: Unauthorized ptrace syscall on worker node `k8s-us-04`.",
        "[00:00.006] Blast-radius simulation: 2 microservices flagged for potential lateral movement.",
        "[00:00.011] Surgical action: Pod isolated into read-only quarantine cage; memory snapshotted.",
        "[00:00.015] Clean pod replica provisioned. Traffic mirrored with 0.00% packet drop.",
      ],
    },
    {
      id: "bgp-hijack",
      title: "Border Gateway Protocol Hijack",
      subtitle: "Malicious route advertisement attempting traffic interception",
      severity: "CRITICAL",
      icon: <Radio size={16} className="text-[#f79e1b]" />,
      logs: [
        "[00:00.002] RPKI route validation failed for AS-9843 prefix advertisement.",
        "[00:00.005] Trust Engine score dropped to 0.00 for anomalous upstream peer.",
        "[00:00.009] Mesh autopolicy rerouted global traffic over verified Tier-1 private backbone.",
        "[00:00.014] Complete path restoration verified. Latency delta <1.2ms.",
      ],
    },
  ];

  const handleRunSimulation = (index: number) => {
    setSelectedScenario(index);
    setIsSimulating(true);
    setSimStep(0);

    setTimeout(() => setSimStep(1), 700);
    setTimeout(() => setSimStep(2), 1500);
    setTimeout(() => {
      setSimStep(3);
      setIsSimulating(false);
    }, 2400);
  };

  const current = scenarios[selectedScenario];

  return (
    <section id="simulation" className={cn(styles.section, className)}>
      <div className="skynet-container">
        {/* Header */}
        <div className={styles.headerContent}>
          <PillBadge dotColor="orange">INTERACTIVE RESILIENCE SANDBOX</PillBadge>
          <h2 className={styles.sectionTitle}>
            Experience Autonomous Incident Neutralization Live
          </h2>
          <p className={styles.sectionSubtitle}>
            Select a complex threat scenario below to trigger Skynet&apos;s real-time detection,
            risk assessment, and autonomous self-healing mitigation loop.
          </p>
        </div>

        {/* Console Stadium Frame */}
        <StadiumFrame glow="orange" withTopHighlight>
          <div className={styles.consoleGrid}>
            {/* Left: Scenarios List */}
            <div className={styles.scenarioPanel}>
              <div className={styles.panelLabel}>Select Attack Scenario</div>
              {scenarios.map((sc, idx) => (
                <button
                  key={sc.id}
                  type="button"
                  className={cn(
                    styles.scenarioCard,
                    selectedScenario === idx && styles.scenarioCardActive
                  )}
                  onClick={() => handleRunSimulation(idx)}
                >
                  <div className={styles.scenarioTitle}>
                    <span className="flex items-center gap-2">
                      {sc.icon}
                      {sc.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#f37338]">
                      {sc.severity}
                    </span>
                  </div>
                  <div className={styles.scenarioDesc}>{sc.subtitle}</div>
                </button>
              ))}

              <div className="mt-auto pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleRunSimulation(selectedScenario)}
                  disabled={isSimulating}
                  icon={<Play size={15} />}
                  className="w-full"
                >
                  {isSimulating ? "Simulating Neutralization..." : "Replay Simulation"}
                </Button>
              </div>
            </div>

            {/* Right: Interactive HUD Simulation View */}
            <div className={styles.simulationDisplay}>
              {/* Top Bar */}
              <div className={styles.hudTopBar}>
                <div className={styles.statusIndicator}>
                  <span
                    className={cn(
                      styles.statusDot,
                      isSimulating ? styles.statusRunning : styles.statusResolved
                    )}
                  />
                  <span>
                    Scenario: <strong>{current.title}</strong>
                  </span>
                </div>

                <div className="text-xs font-mono text-[#00e599]">
                  {isSimulating
                    ? "RUNNING AUTONOMOUS PROTOCOLS..."
                    : "ALL SYSTEMS STABILIZED • 0 SLA IMPACT"}
                </div>
              </div>

              {/* 4-Step Timeline Progression */}
              <div className={styles.timelineGrid}>
                <div
                  className={cn(
                    styles.timelineCard,
                    simStep >= 0 && styles.timelineCardActive,
                    simStep > 0 && styles.timelineCardComplete
                  )}
                >
                  <div className={styles.stepNumber}>Step 01</div>
                  <div className={styles.stepTitle}>Anomaly Detected</div>
                  <div className={styles.stepStatus}>
                    {simStep >= 0 ? "✓ 0.001s Ingestion" : "Pending"}
                  </div>
                </div>

                <div
                  className={cn(
                    styles.timelineCard,
                    simStep >= 1 && styles.timelineCardActive,
                    simStep > 1 && styles.timelineCardComplete
                  )}
                >
                  <div className={styles.stepNumber}>Step 02</div>
                  <div className={styles.stepTitle}>Risk Scored</div>
                  <div className={styles.stepStatus}>
                    {simStep >= 1 ? "✓ Blast Radius Mapped" : "Pending"}
                  </div>
                </div>

                <div
                  className={cn(
                    styles.timelineCard,
                    simStep >= 2 && styles.timelineCardActive,
                    simStep > 2 && styles.timelineCardComplete
                  )}
                >
                  <div className={styles.stepNumber}>Step 03</div>
                  <div className={styles.stepTitle}>Surgical Isolate</div>
                  <div className={styles.stepStatus}>
                    {simStep >= 2 ? "✓ Vector Quarantined" : "Pending"}
                  </div>
                </div>

                <div
                  className={cn(
                    styles.timelineCard,
                    simStep >= 3 && styles.timelineCardComplete
                  )}
                >
                  <div className={styles.stepNumber}>Step 04</div>
                  <div className={styles.stepTitle}>State Restored</div>
                  <div className={styles.stepStatus}>
                    {simStep >= 3 ? "✓ 100% Availability" : "Pending"}
                  </div>
                </div>
              </div>

              {/* Log Terminal */}
              <div className={styles.logTerminal}>
                {current.logs.slice(0, simStep + 1).map((log, lIdx) => (
                  <div key={lIdx} className="mb-1 text-[#f4f2ee]">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StadiumFrame>
      </div>
    </section>
  );
};
