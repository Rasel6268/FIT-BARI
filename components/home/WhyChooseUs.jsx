"use client";

import React from "react";
import { FiShield, FiCheckCircle, FiFeather, FiTruck } from "react-icons/fi";

const trustPillars = [
  {
    icon: FiShield,
    title: "100% Authentic",
    desc: "Directly sourced from verified wild harvests and certified global origins.",
  },
  {
    icon: FiCheckCircle,
    title: "Lab Verified",
    desc: "Strictly screened for active purity, live enzymes, and zero chemical fillers.",
  },
  {
    icon: FiFeather,
    title: "Pure Nutrition",
    desc: "Clean, bioavailable ingredients with zero artificial syrups or adulterants.",
  },
  {
    icon: FiTruck,
    title: "Fast Delivery",
    desc: "Food-grade protective packaging with express nationwide delivery.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white border-b border-[#E7E3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Clean & Focused */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal font-editorial text-[#173F35] tracking-tight">
            Why Choose FIT BARI
          </h2>
        </div>

        {/* 2-Column on Mobile, 4-Column on Desktop Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {trustPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] flex flex-col justify-between hover:border-[#173F35]/30 transition-all duration-200"
              >
                <div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#173F35]/10 text-[#173F35] flex items-center justify-center mb-2.5 sm:mb-3">
                    <Icon size={16} className="text-[#173F35]" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#173F35] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#777D76] leading-relaxed mt-1 sm:mt-1.5 line-clamp-2 sm:line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
