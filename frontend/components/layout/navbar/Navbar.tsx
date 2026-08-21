"use client";

import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, ArrowRight } from "lucide-react";

export interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Core Architecture", href: "#constellation" },
    { label: "Resilience Engine", href: "#pipeline" },
    { label: "Live Simulation", href: "#simulation" },
    { label: "Trust & Metrics", href: "#metrics" },
  ];

  return (
    <>
      <header className={styles.navWrapper}>
        <nav
          className={cn(
            styles.navPill,
            scrolled && styles.scrolled,
            className
          )}
          aria-label="Main Navigation"
        >
          {/* Brand */}
          <a href="#" className={styles.brandGroup}>
            <div className={styles.logoOrb}>
              <div className={styles.logoInnerDot} />
            </div>
            <div className="flex items-center gap-2">
              <span className={styles.brandName}>SKYNET</span>
              <span className={styles.statusTag}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e599] animate-pulse" />
                Resilience V2.4
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Nav Actions */}
          <div className={styles.navActions}>
            <Button
              variant="secondary"
              size="sm"
              href="#simulation"
              className="hidden sm:inline-flex"
            >
              Demo HUD
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="#deploy"
              icon={<ArrowRight size={14} />}
            >
              Deploy
            </Button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className={styles.mobileMenuBtn}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className={styles.mobileOverlay}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="primary"
              size="md"
              href="#deploy"
              onClick={() => setMobileOpen(false)}
            >
              Deploy Resilience
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
