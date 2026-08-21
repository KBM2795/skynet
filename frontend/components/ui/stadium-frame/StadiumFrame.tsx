import React from "react";
import styles from "./stadium-frame.module.css";
import { cn } from "@/lib/utils";

export interface StadiumFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "orange" | "cyan";
  isGlass?: boolean;
  withTopHighlight?: boolean;
  children: React.ReactNode;
}

export const StadiumFrame: React.FC<StadiumFrameProps> = ({
  glow = "none",
  isGlass = false,
  withTopHighlight = true,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        styles.stadium,
        glow === "orange" && styles.glowOrange,
        glow === "cyan" && styles.glowCyan,
        isGlass && styles.glass,
        className
      )}
      {...props}
    >
      {withTopHighlight && <div className={styles.innerGlow} aria-hidden="true" />}
      {children}
    </div>
  );
};
