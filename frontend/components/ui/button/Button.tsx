import React from "react";
import styles from "./button.module.css";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "signal" | "glow" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  className,
  children,
  disabled,
  ...props
}) => {
  const buttonClass = cn(
    styles.btn,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={buttonClass} aria-disabled={disabled}>
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
