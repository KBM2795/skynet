"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, ShieldCheck, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

export interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { user } = useAuth();
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
    { label: "Platform", href: "#platform" },
    { label: "Features", href: "#features" },
    { label: "Architecture", href: "#architecture" },
    { label: "Analytics", href: "#analytics" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
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
              <img
                src="/skynet_dark.png"
                alt="SkyNet Logo"
                className="h-5 w-auto"
              />
            
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
            {user ? (
              <Button
                variant="primary"
                size="sm"
                href="/dashboard"
                icon={<LayoutDashboard className="w-3.5 h-3.5 ml-1" />}
                iconPosition="right"
              >
                Console
              </Button>
            ) : (
              <>
                <Link href="/login" className={styles.signInBtn}>
                  Sign In
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  href="/signup"
                  icon={<ArrowRight className="w-3.5 h-3.5 ml-1" />}
                  iconPosition="right"
                >
                  Get Started
                </Button>
              </>
            )}

            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            {user ? (
              <Button
                variant="primary"
                size="md"
                href="/dashboard"
                icon={<LayoutDashboard className="w-4 h-4 ml-1" />}
                iconPosition="right"
                onClick={() => setMobileOpen(false)}
              >
                Open Console
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="md"
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  href="/signup"
                  icon={<ArrowRight className="w-4 h-4 ml-1" />}
                  iconPosition="right"
                  onClick={() => setMobileOpen(false)}
                >
                  Deploy SkyNet Free
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};