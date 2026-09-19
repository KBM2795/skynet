"use client";

import React from "react";

export const StatsBar: React.FC = () => {
  const stats = [
    {
      value: "1,830+",
      label: "Enterprise Clusters Guarded",
      desc: "Across AWS, GCP & Kubernetes",
    },
    {
      value: "220ms",
      label: "Mean Time To Detect (MTTD)",
      desc: "Sub-second autonomous isolation",
    },
    {
      value: "390M+",
      label: "Zero-Day Threats Neutralized",
      desc: "Zero false-positive outages",
    },
    {
      value: "99.999%",
      label: "Telemetry Pipeline Uptime",
      desc: "High-availability multi-region mesh",
    },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="skynet-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center md:items-start text-center md:text-left ${
                index > 0 ? "pt-6 md:pt-0 md:pl-8" : ""
              }`}
            >
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-bold text-slate-800 mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-slate-500">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
