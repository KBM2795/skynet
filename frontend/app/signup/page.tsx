"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  User, 
  ArrowRight, 
  AlertCircle, 
  Lock, 
  Mail, 
  Globe, 
  CheckCircle2,
  Users,
  ShieldCheck,
  Loader2
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { signUpWithEmail } = useAuth();

  const [accountType, setAccountType] = useState<"individual" | "organization">("organization");

  // Individual Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Organization Form State
  const [orgName, setOrgName] = useState("");
  const [orgSlug, setOrgSlug] = useState("");
  const [teamSize, setTeamSize] = useState("25-250");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const metadata =
        accountType === "organization"
          ? {
              full_name: fullName,
              organization_name: orgName,
              organization_slug: orgSlug.toLowerCase().trim() || orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              role: "admin",
              team_size: teamSize,
            }
          : {
              full_name: fullName,
              role: "user",
            };

      const { error, data } = await signUpWithEmail(email, password, metadata);

      if (error) {
        setErrorMsg(error.message);
      } else if (data?.session) {
        // Direct session without email verification
        router.push("/dashboard");
      } else {
        // Confirmation email sent
        setSuccessMsg(
          `Success! A confirmation email has been dispatched to ${email}. Please check your inbox to activate your account.`
        );
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-sky-400/10 to-transparent rounded-full blur-[90px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* SkyNet Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <img
              src="/skynet_dark.png"
              alt="SkyNet Logo"
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Your SkyNet Account
        </h2>
        <p className="mt-2 text-center text-xs md:text-sm text-slate-500">
          Instant 14-day free access to autonomous zero-day protection
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 sm:rounded-3xl border border-slate-200/90 sm:px-10">
          {/* Account Type Switcher */}
          <div className="flex rounded-full bg-slate-100 p-1 mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setAccountType("organization");
                setErrorMsg(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-full transition-all ${
                accountType === "organization"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Register Organization</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAccountType("individual");
                setErrorMsg(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-full transition-all ${
                accountType === "individual"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Individual / Dev</span>
            </button>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verification Email Dispatched</span>
              </div>
              <p className="leading-relaxed">{successMsg}</p>
              <div className="pt-1">
                <Link
                  href="/login"
                  className="font-bold text-emerald-700 underline underline-offset-2"
                >
                  Proceed to Login →
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Organization Specific Fields */}
            {accountType === "organization" && (
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3.5 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 pb-1 border-b border-blue-100">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Enterprise Workspace Details</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organization / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => {
                      setOrgName(e.target.value);
                      if (!orgSlug) {
                        setOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                      }
                    }}
                    placeholder="Acme Cyber Defense Corp"
                    className="block w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Organization Slug / Domain
                    </label>
                    <input
                      type="text"
                      required
                      value={orgSlug}
                      onChange={(e) => setOrgSlug(e.target.value)}
                      placeholder="acme-corp"
                      className="block w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estimated Node Scale
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="block w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
                    >
                      <option value="1-25">1 – 25 Cloud Nodes</option>
                      <option value="25-250">25 – 250 Cloud Nodes</option>
                      <option value="250+">250+ Enterprise Multi-Cloud</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Administrator / User Details */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {accountType === "organization" ? "Admin Full Name" : "Your Full Name"}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Marcus Vance"
                className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus@company.com"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Must include at least 8 characters with letters and numbers.
              </p>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={loading}
                icon={!loading ? <ArrowRight className="w-4 h-4" /> : undefined}
                iconPosition="right"
                className="w-full justify-center shadow-lg shadow-blue-600/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering Account...</span>
                  </>
                ) : (
                  <span>
                    {accountType === "organization"
                      ? "Provision Organization Workspace"
                      : "Create Developer Account"}
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Footer Link to Login */}
          <div className="mt-8 text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
            Already have an active account?{" "}
            <Link
              href="/login"
              className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Sign in to Console
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
