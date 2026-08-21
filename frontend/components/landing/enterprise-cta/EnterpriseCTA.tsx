import React from "react";
import styles from "./enterprise-cta.module.css";
import { cn } from "@/lib/utils";
import { PillBadge } from "@/components/ui/pill-badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

export interface EnterpriseCTAProps {
  className?: string;
}

export const EnterpriseCTA: React.FC<EnterpriseCTAProps> = ({ className }) => {
  return (
    <section id="deploy" className={cn(styles.section, className)}>
      <div className="skynet-container">
        <div className={styles.stadiumCard}>
          <div className={styles.bgOrbitalGlow} aria-hidden="true" />

          <div className={styles.contentWrapper}>
            <PillBadge dotColor="orange" isPulsing>
              ENTERPRISE DEPLOYMENT
            </PillBadge>

            <h2 className={styles.title}>
              Ready to guarantee zero-downtime cyber resilience?
            </h2>

            <p className={styles.description}>
              Integrate Skynet with your Kubernetes clusters, AWS / GCP / Azure VPCs,
              and identity mesh in under 15 minutes. No infrastructure downtime required.
            </p>

            <div className={styles.btnGroup}>
              <Button
                variant="primary"
                size="lg"
                href="#deploy"
                icon={<ArrowRight size={18} />}
              >
                Deploy Skynet Mesh
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="#overview"
              >
                Schedule Architecture Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
