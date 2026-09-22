"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { apiFetch } from "@/lib/auth/apiClient";
import {
  Menu,
  Search,
  Terminal,
  Bell,
  Sparkles,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  X,
  Star,
  Copy,
  Check,
  Cpu,
  Box,
  HardDrive,
  Database,
  Shield,
  Server,
  CreditCard,
  Network,
  LineChart,
  Zap,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ExternalLink,
  Lock,
  Layers,
  ShoppingBag,
  SlidersHorizontal,
  Key,
  HelpCircle,
  LogOut,
  RefreshCw,
  Activity,
  ShieldAlert,
  UserCheck
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, session, loading, signOut } = useAuth();

  // Navigation & Drawer States
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [flyoutMenu, setFlyoutMenu] = useState<string | null>(null);
  const [projectPickerOpen, setProjectPickerOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [cloudShellOpen, setCloudShellOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Real Database Profile Fetched from Go Backend
  const [dbProfile, setDbProfile] = useState<any>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Copy states
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);

  // Live Backend Integration Testing States
  const [profileTesting, setProfileTesting] = useState(false);
  const [profileResult, setProfileResult] = useState<{ status?: number; data?: any; error?: string | null } | null>(null);
  const [healthTesting, setHealthTesting] = useState(false);
  const [healthResult, setHealthResult] = useState<{ status?: number; data?: any; error?: string | null } | null>(null);

  // Active Favorites in Sidebar
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    billing: false,
    iam: false,
    marketplace: false,
    apis: true,
    agentPlatform: false,
    compute: true,
    kubernetes: false,
    storage: false,
    security: false,
    bigquery: false,
    monitoring: false,
    cloudrun: false,
    vpc: false,
  });

  const toggleFavorite = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Check auth and auto-fetch real user profile on mount
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      // Auto-fetch real profile from Go API (syncs with PostgreSQL)
      apiFetch("/api/v1/user/profile")
        .then((res) => {
          if (res.status === 200 && res.data?.data) {
            setDbProfile(res.data.data);
          }
        })
        .catch((err) => {
          console.warn("Backend profile fetch notice:", err);
        })
        .finally(() => {
          setInitialLoading(false);
        });
    }
  }, [user, loading, router]);

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  // Live Go API Calls
  const handleFetchProfile = async () => {
    setProfileTesting(true);
    setProfileResult(null);
    setApiModalOpen(true);
    const res = await apiFetch("/api/v1/user/profile");
    setProfileResult(res);
    if (res.status === 200 && res.data?.data) {
      setDbProfile(res.data.data);
    }
    setProfileTesting(false);
  };

  const handleHealthCheck = async () => {
    setHealthTesting(true);
    setHealthResult(null);
    const res = await apiFetch("/api/health");
    setHealthResult(res);
    setHealthTesting(false);
  };

  if (loading || (initialLoading && !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-xs font-semibold tracking-wide text-slate-500">Connecting to SkyNet Console...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Real user and metadata extraction
  const meta = user.user_metadata || {};
  const displayName = dbProfile?.full_name || meta.full_name || user.email?.split("@")[0] || "Cloud Operator";
  const displayEmail = dbProfile?.email || user.email || "";
  const displayAvatar = dbProfile?.avatar_url || meta.avatar_url || meta.picture || "";
  const projectName = dbProfile?.organization?.name || meta.organization_name || "My First Project";
  const projectSlug = dbProfile?.organization?.slug || meta.organization_slug || "skynet-prod-94021";
  const projectNumber = "57024573886";
  const userRole = dbProfile?.role || meta.role || "Owner";
  const userInitial = (displayName || user.email || "K")[0].toUpperCase();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600/15 overflow-x-hidden relative">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NOTIFICATION BANNER (SkyNet Mesh Status)
      ────────────────────────────────────────────────────────────── */}
      {showBanner && (
        <div className="bg-blue-50/80 border-b border-blue-100 px-4 py-2 text-xs text-slate-700 flex items-center justify-between z-40 relative">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
            <span className="font-semibold text-slate-900">SkyNet Autonomous Mesh Active:</span>
            <span>14 nodes armed with zero-day micro-segmentation.</span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="text-slate-600 hidden sm:inline">Connected to Go API (:8080) & Supabase PostgreSQL</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBanner(false)}
              className="text-slate-500 hover:text-slate-800 transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={handleFetchProfile}
              className="bg-white hover:bg-slate-50 text-blue-600 px-3 py-1 rounded text-xs font-semibold border border-blue-200 transition-colors shadow-xs"
            >
              Run Health Check
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. WHITE THEME TOP NAVIGATION BAR (GCP Inspired)
      ────────────────────────────────────────────────────────────── */}
      <header className="h-14 bg-white border-b border-slate-200/90 px-4 flex items-center justify-between sticky top-0 z-50 select-none shadow-xs">
        {/* Left Section: Menu Toggle, SkyNet Logo, Project Selector */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
            title="Navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* SkyNet Dark Logo for White Background */}
          <Link href="/dashboard" className="flex items-center gap-2 px-1">
            <img
              src="/skynet_dark.png"
              alt="SkyNet Console"
              className="h-6 w-auto object-contain"
            />
          </Link>

          <span className="hidden sm:inline-block h-4 w-px bg-slate-200" />

          {/* Project Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setProjectPickerOpen(!projectPickerOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-xs text-slate-800 shadow-xs"
            >
              <span className="font-semibold truncate max-w-[160px]">{projectName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Project Picker Dropdown */}
            {projectPickerOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 text-slate-800 p-2.5 z-50 text-xs">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select a project
                </div>
                <div className="mt-1 space-y-1">
                  <button
                    onClick={() => setProjectPickerOpen(false)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-medium"
                  >
                    <div className="text-left">
                      <div className="font-bold text-slate-900">{projectName}</div>
                      <div className="text-[10px] font-mono text-slate-500">ID: {projectSlug}</div>
                    </div>
                    <Check className="w-4 h-4 text-blue-600" />
                  </button>

                  <button
                    onClick={() => setProjectPickerOpen(false)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    <div className="text-left">
                      <div className="font-medium">skynet-staging-mesh</div>
                      <div className="text-[10px] font-mono text-slate-400">ID: skynet-sec-staging-02</div>
                    </div>
                  </button>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] px-1 text-slate-500">
                  <span>Target DB: Supabase Pooler</span>
                  <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Manage projects</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Section: Pill Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search (/) for resources, docs, products and more"
              className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white placeholder-slate-400 text-xs text-slate-900 rounded-full pl-10 pr-16 py-2 transition-all outline-none border border-slate-200 focus:border-blue-500 focus:shadow-xs"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-400 pointer-events-none text-xs">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] text-slate-500">Search</span>
            </div>
          </div>
        </div>

        {/* Right Section: Gemini Sparkle, Cloud Shell, Notifications, Avatar */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setApiModalOpen(true)}
            className="p-1.5 hover:bg-slate-100 rounded-full text-blue-600 transition-colors"
            title="SkyNet AI Copilot"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCloudShellOpen(!cloudShellOpen)}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition-colors"
            title="Activate Cloud Shell"
          >
            <Terminal className="w-4 h-4" />
          </button>

          <button
            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 hover:text-slate-900 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          <button
            className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition-colors"
            title="Console Settings"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Real User Avatar or Terracotta Initials Pill */}
          <div className="relative ml-1">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-blue-500/40 transition-all"
            >
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-xs"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#b85437] text-white font-medium text-xs flex items-center justify-center shadow-xs">
                  {userInitial}
                </div>
              )}
            </button>

            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3.5 text-xs z-50">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  {displayAvatar ? (
                    <img
                      src={displayAvatar}
                      alt={displayName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-xs"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#b85437] text-white font-medium text-xs flex items-center justify-center shadow-xs shrink-0">
                      {userInitial}
                    </div>
                  )}
                  <div className="truncate">
                    <div className="font-bold text-slate-900 truncate">{displayName}</div>
                    <div className="text-[11px] text-slate-500 truncate">{displayEmail}</div>
                  </div>
                </div>

                <div className="py-2.5 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Security Role:</span>
                    <span className="font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 capitalize">
                      {userRole}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Go API Gateway:</span>
                    <span className="font-mono text-emerald-600 font-medium">localhost:8080</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Supabase User ID:</span>
                    <span className="font-mono text-[10px] text-slate-700 truncate max-w-[130px]">{user.id}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setApiModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors font-medium text-left"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Inspect Supabase JWT Token</span>
                  </button>

                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors font-medium text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. SLIDE-OVER NAVIGATION DRAWER (White Theme)
      ────────────────────────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
          />

          {/* White Theme Drawer Panel */}
          <aside className="relative w-72 bg-white border-r border-slate-200 text-slate-800 flex flex-col justify-between h-full z-10 shadow-2xl overflow-y-auto">
            <div className="py-3">
              {/* Drawer Header with SkyNet Logo */}
              <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img
                    src="/skynet_dark.png"
                    alt="SkyNet Console"
                    className="h-5 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Main Category Links */}
              <div className="py-2 border-b border-slate-100">
                <button className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-slate-400" />
                    <span>Continuous Monitoring</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Centralized Visibility with flyout trigger */}
                <div
                  className="relative"
                  onMouseEnter={() => setFlyoutMenu("overview")}
                  onMouseLeave={() => setFlyoutMenu(null)}
                >
                  <button className="w-full flex items-center justify-between px-4 py-2 text-xs text-blue-700 bg-blue-50 font-semibold">
                    <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <span>Centralized Visibility</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                  </button>

                  {/* Flyout Submenu */}
                  {flyoutMenu === "overview" && (
                    <div className="absolute top-0 left-full ml-0.5 w-60 bg-white border border-slate-200 rounded-lg shadow-xl p-1.5 text-xs text-slate-700 z-50 space-y-0.5">
                      <button className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-100 font-semibold text-blue-600">
                        Resilience Dashboard
                      </button>
                      <button className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-100">
                        System Health Status
                      </button>
                      <button className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-100">
                        Security Posture
                      </button>
                      <button className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-100">
                        Threat Classification Queue
                      </button>
                      <button className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-100">
                        Incident Prioritization
                      </button>
                      <button className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-100">
                        Audit & Compliance Records
                      </button>
                    </div>
                  )}
                </div>

                <button className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 text-slate-400" />
                    <span>Cyber Resilience Hub</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Products Section with Star Icons */}
              <div className="py-2">
                <div className="px-4 py-1 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  Favourite features
                </div>
                <div className="px-4 py-0.5 text-[10px] text-slate-400 italic mb-1">
                  Starred security features appear here
                </div>

                <div className="px-4 py-1 text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-2">
                  Resilience Modules
                </div>

                <div className="space-y-0.5 mt-1">
                  {[
                    { id: "apis", label: "APIs & Go Gateway (:8080)", icon: Server, hasArrow: true },
                    { id: "threatDetection", label: "Threat Detection & Anomalies", icon: ShieldAlert, hasArrow: true },
                    { id: "behavioralAnalysis", label: "Behavioral Analysis", icon: LineChart, hasArrow: true },
                    { id: "trustEvaluation", label: "Trust Evaluation Engine", icon: UserCheck, hasArrow: true },
                    { id: "riskAssessment", label: "Risk Assessment & Scoring", icon: SlidersHorizontal, hasArrow: true },
                    { id: "incidentPrioritization", label: "Incident Prioritization", icon: AlertTriangle, hasArrow: true },
                    { id: "automatedResponse", label: "Automated Response Workflows", icon: Zap, hasArrow: true },
                    { id: "eventTracking", label: "Security Event Tracking", icon: Database, hasArrow: true },
                    { id: "auditCompliance", label: "Audit & Compliance Support", icon: Shield, hasArrow: true },
                    { id: "iam", label: "IAM & Organization Access", icon: Lock, hasArrow: true },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isFav = favorites[p.id];
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          if (p.id === "apis") {
                            setDrawerOpen(false);
                            handleFetchProfile();
                          }
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                          <span>{p.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            onClick={(e) => toggleFavorite(e, p.id)}
                            className="p-0.5 hover:text-amber-500"
                            title="Toggle favorite"
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                isFav ? "fill-amber-400 text-amber-500" : "text-slate-300 hover:text-slate-400"
                              }`}
                            />
                          </span>
                          {p.hasArrow && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="p-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  setApiModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-xs text-blue-700 border border-blue-200 transition-colors font-medium"
              >
                <Key className="w-4 h-4" />
                <span>Test Go API Auth Pipeline</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. MAIN WHITE THEME HOMEPAGE CANVAS
      ────────────────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-10 relative">
        {/* SkyNet Cyber Telemetry Lattice Background (No GCP Doodle Shapes) */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 -z-10" />
        <div className="absolute top-6 right-72 pointer-events-none opacity-25 hidden md:block">
          <svg width="120" height="70" viewBox="0 0 120 70" fill="none" stroke="#3B82F6" strokeWidth="1.2">
            <circle cx="20" cy="35" r="3" fill="#3B82F6" />
            <circle cx="65" cy="18" r="3.5" fill="#3B82F6" />
            <circle cx="105" cy="45" r="3" fill="#3B82F6" />
            <line x1="20" y1="35" x2="65" y2="18" strokeDasharray="3 3" />
            <line x1="65" y1="18" x2="105" y2="45" strokeDasharray="3 3" />
            <circle cx="65" cy="18" r="10" stroke="#93C5FD" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* HERO HEADER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 relative z-10">
          {/* Left Hero: Welcome & Project Metadata */}
          <div className="lg:col-span-8 space-y-4">
            {/* Welcome Title */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Welcome
              </h1>
            </div>

            {/* Active Project Details */}
            <div className="text-sm text-slate-600">
              You&apos;re working in{" "}
              <button
                onClick={() => setProjectPickerOpen(true)}
                className="text-blue-600 hover:underline font-semibold"
              >
                {projectName}
              </button>
            </div>

            {/* Project Number & ID with Copy Icons */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span>Project number:</span>
                <span className="font-mono text-slate-800 font-semibold">{projectNumber}</span>
                <button
                  onClick={() => copyToClipboard(projectNumber, setCopiedNumber)}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                  title="Copy project number"
                >
                  {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Project ID:</span>
                <span className="font-mono text-slate-800 font-semibold">{projectSlug}</span>
                <button
                  onClick={() => copyToClipboard(projectSlug, setCopiedId)}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                  title="Copy project ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Sub-Tabs: Resilience Dashboard, Security Hub */}
            <div className="flex items-center gap-5 pt-1 text-xs font-semibold">
              <span className="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer">
                Resilience Dashboard
              </span>
              <span className="text-slate-500 hover:text-slate-800 pb-1 cursor-pointer transition-colors">
                Security Hub
              </span>
            </div>

            {/* Action Chips (SkyNet Cyber Resilience Workflows) */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={handleFetchProfile}
                disabled={profileTesting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 text-xs font-semibold transition-all shadow-xs"
              >
                {profileTesting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                ) : (
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span>Test Auth: GET /api/v1/user/profile</span>
              </button>

              <button
                onClick={() => setApiModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 text-xs font-medium transition-colors shadow-xs"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />
                <span>Detect Abnormal Activities</span>
              </button>

              <button
                onClick={() => setApiModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 text-xs font-medium transition-colors shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Run Trust Evaluation</span>
              </button>

              <button
                onClick={() => setApiModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 text-xs font-medium transition-colors shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-600" />
                <span>Assess Risk Severity</span>
              </button>

              <button
                onClick={() => setApiModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 text-xs font-medium transition-colors shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Trigger Automated Response</span>
              </button>

              <button
                onClick={() => setApiModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 text-xs font-medium transition-colors shadow-xs"
              >
                <Database className="w-3.5 h-3.5 text-slate-500" />
                <span>Track Security Events</span>
              </button>

              <button
                onClick={() => setApiModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 text-xs font-medium transition-colors shadow-xs"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span>Audit & Compliance Logs</span>
              </button>
            </div>
          </div>

          {/* Right Hero SkyNet Posture Card */}
          <div className="lg:col-span-4 relative">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3.5 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Posture: Resilient
                </span>
                <span className="text-[11px] font-mono text-slate-400">Score 98.4/100</span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                Autonomous cyber resilience engine active. Continuous monitoring & automated anomaly remediation across all cluster nodes.
              </p>

              <div className="pt-1">
                <button
                  onClick={() => setApiModalOpen(true)}
                  className="text-xs text-blue-600 hover:underline font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Explore Security Telemetry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            5. QUICK ACCESS SECTION (Exact 8 Features from project.md)
        ────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Quick access</h2>
            <span className="text-[11px] font-medium text-slate-400">8 of 8 Modules Active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Card 1: APIs and Go Gateway */}
            <div
              onClick={handleFetchProfile}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-blue-400 rounded-xl p-3.5 transition-all cursor-pointer group shadow-xs hover:shadow-sm flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0 mt-0.5">
                <Server className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    APIs & Go Gateway
                  </div>
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                    :8080
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Auth active & PostgreSQL synced
                </div>
              </div>
            </div>

            {/* Card 2: Threat Detection */}
            <div
              onClick={() => setApiModalOpen(true)}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-blue-400 rounded-xl p-3.5 transition-all cursor-pointer group shadow-xs hover:shadow-sm flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 shrink-0 mt-0.5">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    Threat Detection
                  </div>
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 shrink-0">
                    Active
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Real-time anomaly monitoring
                </div>
              </div>
            </div>

            {/* Card 3: Behavioral Analysis */}
            <div
              onClick={() => setApiModalOpen(true)}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-blue-400 rounded-xl p-3.5 transition-all cursor-pointer group shadow-xs hover:shadow-sm flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0 mt-0.5">
                <LineChart className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    Behavioral Analysis
                  </div>
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                    Online
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  User & network profiling
                </div>
              </div>
            </div>

            {/* Card 4: Trust Evaluation Engine */}
            <div
              onClick={() => setApiModalOpen(true)}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-blue-400 rounded-xl p-3.5 transition-all cursor-pointer group shadow-xs hover:shadow-sm flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 border border-purple-100 shrink-0 mt-0.5">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    Trust Evaluation
                  </div>
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-200 shrink-0">
                    Enforced
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Trust-based decision making
                </div>
              </div>
            </div>

            {/* Card 5: Risk Assessment & Scoring */}
            <div
              onClick={() => setApiModalOpen(true)}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-blue-400 rounded-xl p-3.5 transition-all cursor-pointer group shadow-xs hover:shadow-sm flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 shrink-0 mt-0.5">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    Risk Assessment
                  </div>
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200 shrink-0">
                    Low Risk
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Impact & likelihood scoring
                </div>
              </div>
            </div>

            {/* Card 6: Incident Prioritization */}
            <div
              onClick={() => setApiModalOpen(true)}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-blue-400 rounded-xl p-3.5 transition-all cursor-pointer group shadow-xs hover:shadow-sm flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    Incident Prioritization
                  </div>
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                    0 Critical
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Severity triage & queue
                </div>
              </div>
            </div>

            {/* Card 7: Automated Response Workflows */}
            <div
              onClick={() => setApiModalOpen(true)}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-blue-400 rounded-xl p-3.5 transition-all cursor-pointer group shadow-xs hover:shadow-sm flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 shrink-0 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    Automated Response
                  </div>
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                    Armed
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Incident remediation workflows
                </div>
              </div>
            </div>

            {/* Card 8: Security Event Tracking & Audit */}
            <div
              onClick={() => setApiModalOpen(true)}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-blue-400 rounded-xl p-3.5 transition-all cursor-pointer group shadow-xs hover:shadow-sm flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0 mt-0.5">
                <Database className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    Security Event Tracking
                  </div>
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                    Audit Ready
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Audit & compliance records
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Button: View all products */}
          <div className="pt-2">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 text-xs font-semibold transition-colors shadow-xs"
            >
              <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                <span className="w-1.5 h-1.5 rounded-xs bg-blue-600" />
                <span className="w-1.5 h-1.5 rounded-xs bg-blue-600" />
                <span className="w-1.5 h-1.5 rounded-xs bg-blue-600" />
                <span className="w-1.5 h-1.5 rounded-xs bg-blue-600" />
              </div>
              <span>View all products</span>
            </button>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          6. LIVE GO API & SUPABASE JWT INSPECTOR MODAL (White Theme)
      ────────────────────────────────────────────────────────────── */}
      {apiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 text-xs text-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Server className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Go API Verification & Supabase JWT Pipeline
                </h3>
              </div>
              <button
                onClick={() => setApiModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              The client attaches your active Supabase session token in <code className="text-blue-600 bg-slate-100 px-1.5 py-0.5 rounded font-mono">Authorization: Bearer &lt;token&gt;</code>. The Go middleware validates the HMAC signature with <code className="text-blue-600 bg-slate-100 px-1.5 py-0.5 rounded font-mono">SUPABASE_JWT_SECRET</code> and syncs PostgreSQL.
            </p>

            {/* Test Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleFetchProfile}
                disabled={profileTesting}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                {profileTesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                <span>Call GET /api/v1/user/profile</span>
              </button>

              <button
                onClick={handleHealthCheck}
                disabled={healthTesting}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
              >
                {healthTesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Ping Health (/api/health)</span>
              </button>
            </div>

            {/* Profile Test Result Box */}
            {profileResult && (
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 font-mono text-[11px]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-600">Endpoint: GET /api/v1/user/profile</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      profileResult.status === 200 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    HTTP {profileResult.status} {profileResult.status === 200 ? "OK" : ""}
                  </span>
                </div>

                {profileResult.status === 200 && profileResult.data ? (
                  <div className="space-y-2">
                    <div className="text-emerald-700 flex items-center gap-2 font-sans text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>JWT signature verified & real user profile retrieved from PostgreSQL!</span>
                    </div>

                    <pre className="p-3 bg-white border border-slate-200 rounded-lg text-slate-800 overflow-x-auto max-h-48 text-[11px]">
                      {JSON.stringify(profileResult.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="text-red-700 flex items-start gap-2 font-sans text-xs">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Backend Request Notice ({profileResult.status}):</div>
                      <div className="text-slate-600 text-[11px] mt-0.5">
                        {profileResult.error || "Unable to reach Go backend on port 8080."} Ensure <code className="font-mono bg-slate-200 px-1 rounded">go run main.go</code> is running in the backend directory.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Active JWT Access Token Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-700">Active Supabase JWT Access Token</span>
                <button
                  onClick={() => copyToClipboard(session?.access_token || "", setCopiedToken)}
                  className="flex items-center gap-1 text-blue-600 hover:underline text-[11px] font-medium"
                >
                  {copiedToken ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedToken ? "Copied" : "Copy Token"}</span>
                </button>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 text-slate-300 font-mono text-[10px] break-all max-h-24 overflow-y-auto">
                {session?.access_token || "No active access token"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. BOTTOM CLOUD SHELL TERMINAL DRAWER (COLLAPSIBLE)
      ────────────────────────────────────────────────────────────── */}
      {cloudShellOpen && (
        <div className="fixed bottom-0 left-0 right-0 h-64 bg-[#0F172A] border-t-2 border-blue-500 text-slate-200 font-mono text-xs flex flex-col z-50 shadow-2xl">
          <div className="h-8 bg-slate-900 px-4 flex items-center justify-between text-[11px] border-b border-slate-800 select-none">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold text-white">SkyNet Cloud Shell ({displayEmail})</span>
              <span className="text-slate-400">• bash 5.2</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleFetchProfile}
                className="px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 text-[10px] transition-colors"
              >
                curl /api/v1/user/profile
              </button>
              <button
                onClick={() => setCloudShellOpen(false)}
                className="text-slate-400 hover:text-white"
                title="Close Cloud Shell"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-[11px] leading-relaxed">
            <div className="text-slate-400">
              Welcome to SkyNet Cloud Shell. Interactive terminal connected to project <span className="text-blue-400">{projectSlug}</span>.
            </div>
            <div className="text-emerald-400">
              Authenticated Operator: {displayName} ({user.id})
            </div>
            <div className="text-slate-300 pt-1">
              <span className="text-blue-400">operator@{projectSlug}:~$ </span>
              <span>curl -H &quot;Authorization: Bearer &lt;supabase_jwt&gt;&quot; http://localhost:8080/api/v1/user/profile</span>
            </div>

            {profileResult && (
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                <span className="text-slate-400">HTTP {profileResult.status} Response:</span>
                <pre className="mt-1">{JSON.stringify(profileResult.data || profileResult.error, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
