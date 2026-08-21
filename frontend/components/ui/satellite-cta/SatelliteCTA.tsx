import React from "react";
import styles from "./satellite-cta.module.css";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export interface SatelliteCTAProps {
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const SatelliteCTA: React.FC<SatelliteCTAProps> = ({
  href,
  onClick,
  size = "md",
  ariaLabel = "Explore module",
  className,
  icon,
}) => {
  const content = icon || <ArrowUpRight className={styles.icon} strokeWidth={2.2} />;

  if (href) {
    return (
      <a
        href={href}
        className={cn(styles.satellite, styles[size], className)}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(styles.satellite, styles[size], className)}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};
