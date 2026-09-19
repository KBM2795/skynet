"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const categories = ["All", "Architecture", "Zero-Day", "Integration", "Billing"];

  const faqs = [
    {
      category: "Architecture",
      question: "How does SkyNet deploy into our Kubernetes and cloud infrastructure?",
      answer:
        "SkyNet deploys as a non-intrusive eBPF daemonset on your worker nodes or through our agentless cloud API connector. It inspects socket events and packet headers at the Linux kernel boundary with zero application code changes and less than 0.5% CPU overhead.",
    },
    {
      category: "Zero-Day",
      question: "How does SkyNet isolate zero-day attacks with no known CVE signatures?",
      answer:
        "Unlike traditional pattern-matching firewalls, SkyNet models baseline application entropy and kernel execution trajectories. When anomalous memory writes, unauthorized socket creation, or unmapped API sequences occur, our neural engine automatically enforces dynamic micro-segmentation in 42ms.",
    },
    {
      category: "Security",
      question: "Does SkyNet decrypt or store our customer's sensitive payload data?",
      answer:
        "No. SkyNet performs all telemetry inspection and anomaly correlation ephemerally in-memory. Payload data never leaves your VPC or jurisdiction. Only anonymized statistical telemetry vectors are streamed to your dedicated management dashboard.",
    },
    {
      category: "Integration",
      question: "Can SkyNet integrate with our existing SIEM and incident tooling?",
      answer:
        "Yes. SkyNet provides native bi-directional webhooks and integrations for Datadog, Splunk, SentinelOne, PagerDuty, Slack, and AWS Security Hub, streaming parsed event payloads with zero translation lag.",
    },
    {
      category: "Billing",
      question: "What happens if our cluster spikes during peak seasonal traffic?",
      answer:
        "SkyNet dynamically scales telemetry ingestion without blocking legitimate traffic. Burst capacity is included across all plans with no sudden termination of protection.",
    },
  ];

  const filteredFaqs =
    activeTab === "All" ? faqs : faqs.filter((f) => f.category === activeTab);

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC]" id="faq">
      <div className="skynet-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Got Questions? <br className="hidden sm:inline" />
            We&apos;ve Got Answers!
          </h2>
          <p className="text-slate-600 text-sm md:text-base mb-8">
            Everything you need to know about SkyNet autonomous resilience and deployment.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveTab(cat);
                  setOpenIndex(null);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-blue-300 shadow-md shadow-blue-500/5"
                    : "bg-white border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-bold text-slate-900 text-sm md:text-base">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-blue-50 text-blue-600 rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
