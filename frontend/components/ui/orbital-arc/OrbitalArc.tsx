import React from "react";
import styles from "./orbital-arc.module.css";
import { cn } from "@/lib/utils";

export interface OrbitalArcProps {
  d: string;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  isAnimated?: boolean;
  withGlow?: boolean;
  className?: string;
}

export const OrbitalArc: React.FC<OrbitalArcProps> = ({
  d,
  width = "100%",
  height = "100%",
  viewBox = "0 0 1000 400",
  isAnimated = true,
  withGlow = true,
  className,
}) => {
  return (
    <svg
      className={cn(styles.arcWrapper, className)}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={d}
        className={cn(
          styles.path,
          isAnimated && styles.animated,
          withGlow && styles.glow
        )}
      />
    </svg>
  );
};
