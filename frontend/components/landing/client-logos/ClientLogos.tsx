"use client";

import React from "react";
import { Shield, Cloud, Server, Database, Lock, Cpu } from "lucide-react";

export const ClientLogos: React.FC = () => {
  const partners = [
    { name: "Cloudflare", icon: Cloud },
    { name: "Amazon AWS", icon: Server },
    { name: "Datadog", icon: Cpu },
    { name: "Snowflake", icon: Database },
    { name: "SentinelOne", icon: Shield },
    { name: "HashiCorp", icon: Lock },
  ];

  return (
    <section className="py-12 border-y border-slate-200/80 bg-white/70 backdrop-blur-sm">
      <div className="skynet-container">
        <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-8">
          Trusted by mission-critical engineering teams and cloud enterprises
        </p>

        <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div 
                key={index} 
                className="flex items-center gap-2.5 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
                </div>
                <span className="font-bold tracking-tight text-sm text-slate-700 group-hover:text-slate-900">
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
