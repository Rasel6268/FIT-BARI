"use client";

import React from "react";
import Link from "next/link";
import bannersData from "@/data/promotionalBanners.json";
import { FiArrowRight, FiZap } from "react-icons/fi";

export default function PromotionalBanners() {
  const [b1, b2, b3, b4] = bannersData;

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column High-Impact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Banner 1: Power Up Your Workout */}
          {b1 && (
            <div className="group relative rounded-3xl overflow-hidden shadow-card min-h-[340px] sm:min-h-[380px] flex items-center bg-[#173F35] text-white">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${b1.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#173F35] via-[#173F35]/90 to-transparent" />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              <div className="relative p-6 sm:p-10 z-10 max-w-md space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9A441] text-[#173F35] font-black text-[11px] uppercase tracking-wider shadow">
                  <FiZap size={13} /> {b1.highlight}
                </span>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white leading-tight">
                  {b1.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#FAF7EF]/80 leading-relaxed">
                  {b1.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={b1.ctaLink}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D9A441] hover:bg-[#C59235] text-[#173F35] font-bold text-xs uppercase tracking-wider shadow transition-all transform hover:-translate-y-0.5"
                  >
                    <span>{b1.ctaText}</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Banner 2: Natural Nutrition, Better Living */}
          {b2 && (
            <div className="group relative rounded-3xl overflow-hidden shadow-card min-h-[340px] sm:min-h-[380px] flex items-center bg-[#215346] text-white">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${b2.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#173F35] via-[#215346]/90 to-transparent" />
                <div className="absolute inset-0 bg-black/25" />
              </div>

              <div className="relative p-6 sm:p-10 z-10 max-w-md space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B9B55] text-white font-black text-[11px] uppercase tracking-wider shadow">
                  🌿 {b2.highlight}
                </span>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white leading-tight">
                  {b2.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#FAF7EF]/80 leading-relaxed">
                  {b2.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={b2.ctaLink}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#FAF7EF] text-[#173F35] font-bold text-xs uppercase tracking-wider shadow transition-all transform hover:-translate-y-0.5"
                  >
                    <span>{b2.ctaText}</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Secondary Banners Strip (Combo & Exclusive Deals) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {b3 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#173F35] to-[#255649] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft border border-[#173F35]">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-xs font-bold text-[#D9A441] uppercase tracking-wider">
                  {b3.highlight}
                </span>
                <h4 className="text-xl font-bold font-display text-white">
                  {b3.title}
                </h4>
                <p className="text-xs text-[#FAF7EF]/80 max-w-xs">
                  {b3.description}
                </p>
              </div>
              <Link
                href={b3.ctaLink}
                className="px-5 py-2.5 rounded-xl bg-[#D9A441] hover:bg-[#C59235] text-[#173F35] font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow transition-colors flex items-center gap-1.5"
              >
                <span>{b3.ctaText}</span>
                <FiArrowRight size={14} />
              </Link>
            </div>
          )}

          {b4 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#2B4B42] to-[#173F35] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft border border-[#173F35]">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-xs font-bold text-[#6B9B55] uppercase tracking-wider">
                  {b4.highlight}
                </span>
                <h4 className="text-xl font-bold font-display text-white">
                  {b4.title}
                </h4>
                <p className="text-xs text-[#FAF7EF]/80 max-w-xs">
                  {b4.description}
                </p>
              </div>
              <Link
                href={b4.ctaLink}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF7EF] text-[#173F35] font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow transition-colors flex items-center gap-1.5"
              >
                <span>{b4.ctaText}</span>
                <FiArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

