"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const FinalCTA: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="skynet-container">
        {/* Banner with Deep Royal Blue Gradient matching mockup */}
        <div className="relative rounded-3xl md:rounded-[32px] bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0B152E] p-8 md:p-14 overflow-hidden shadow-2xl border border-blue-500/30">
          {/* Subtle light streak / glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Immediate 3-Minute Deployment</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Ready to Fortify Your <br className="hidden sm:inline" />
                Cloud Infrastructure?
              </h2>
              <p className="text-slate-300 text-sm md:text-base max-w-lg mb-6">
                Join 1,830+ engineering organizations running SkyNet autonomous cyber resilience. Deploy with zero downtime today.
              </p>

              <div className="flex items-center gap-3">
                <Button
                  variant="glow"
                  size="lg"
                  href="#get-started"
                  icon={<ArrowRight className="w-4 h-4 ml-1" />}
                  iconPosition="right"
                >
                  Deploy SkyNet Free
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="#simulation"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Book Live Demo
                </Button>
              </div>
            </div>

            {/* Right Col: Quick-Start Email Input matching mockup */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/60 border border-white/15 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-sm font-bold text-white mb-1">
                  Start Your 14-Day Free Evaluation
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  No credit card required. Full telemetry access immediately.
                </p>

                {submitted ? (
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    ✓ Welcome to SkyNet! Check your inbox for your cluster deployment key.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-blue-400"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/30 shrink-0"
                    >
                      Get Started
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
