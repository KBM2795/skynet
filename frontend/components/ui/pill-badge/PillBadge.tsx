import React from "react";
import styles from "./pill-badge.module.css";
import { cn } from "@/lib/utils";

export interface PillBadgeProps {
  dotColor?: "orange" | "green" | "cyan";
  isPulsing?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const PillBadge: React.FC<PillBadgeProps> = ({
  dotColor = "orange",
  isPulsing = false,
  className,
  children,
}) => {
  const dotColorClass =
    dotColor === "green"
      ? styles.greenDot
      : dotColor === "cyan"
      ? styles.cyanDot
      : styles.orangeDot;

  return (
    <div className={cn(styles.badge, className)}>
      <span
        className={cn(
          styles.dot,
          dotColorClass,
          isPulsing && styles.pulsing
        )}
      />
      <span>{children}</span>
    </div>
  );
};
