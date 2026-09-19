"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        "SkyNet revolutionized our multi-cluster defense posture. We went from reactive log parsing to complete autonomous zero-day containment within 48 hours of installation.",
      author: "Elena Rostova",
      role: "Chief Information Security Officer",
      company: "FinScale Financial",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
    },
    {
      quote:
        "The 42ms isolation speed is real. During a distributed API stuffing campaign, SkyNet segmented the compromised pods without dropping a single legitimate customer transaction.",
      author: "David Alvarez",
      role: "VP of Cloud Engineering",
      company: "DataMesh Systems",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    },
    {
      quote:
        "As a lean SecOps team managing 1,200+ Kubernetes microservices, SkyNet gives us the power of a 24/7 dedicated military-grade threat response team at a fraction of the cost.",
      author: "Sarah Jenkins",
      role: "Head of Infrastructure Security",
      company: "AeroCloud Global",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC]">
      <div className="skynet-container">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
              <span>Customer Endorsements</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Security Leaders Say
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={prev}
              aria-label="Previous Testimonial"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next Testimonial"
              className="w-10 h-10 rounded-full border border-blue-200 bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors shadow-md shadow-blue-500/25"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonials 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Green Quote Mark */}
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  <Quote className="w-4 h-4 fill-emerald-600" />
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.author}</h4>
                  <p className="text-xs text-slate-500">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
