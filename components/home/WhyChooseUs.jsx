"use client";

import React from "react";
import Link from "next/link";
import siteData from "@/data/site.json";
import { FiCheck, FiArrowRight } from "react-icons/fi";

export default function WhyChooseUs() {
  const pillars = siteData.corePillars || [];
  const story = siteData.brandStory || {};

  return (
            <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E7E3D8]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

                {/* =========================================================================
            PART 1: 4 Carefully Designed Benefits
        ========================================================================= */}
                <div>
                  <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                      OUR COMMITMENT
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-normal font-editorial text-[#173F35] tracking-tight">
                      Why Customers Trust FIT BARI
                    </h2>
                  </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {pillars.map((item) => (
                              <div
                                key={item.id}
                                className="p-6 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] space-y-3 flex flex-col justify-between"
                              >
                                <div>
                                  <span className="font-editorial text-2xl font-bold text-[#829B76] block mb-2">
                                    {item.number}
                                  </span>
                                  <h3 className="text-base font-semibold text-[#173F35] font-sans">
                                    {item.title}
                                  </h3>
                                  <p className="text-xs text-[#777D76] leading-relaxed mt-2">
                                    {item.lead}
                                  </p>
                                </div>

                                <div className="pt-4 border-t border-[#E7E3D8]/60 flex items-center gap-1.5 text-[11px] font-medium text-[#173F35]">
                                  <FiCheck size={12} className="text-[#829B76]" />
                                  <span>Verified Standard</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* =========================================================================
            PART 2: Brand Story — "Better Choices Begin at Home."
        ========================================================================= */}
                        <div className="pt-4">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                            {/* Story Image (6 cols) */}
                            <div className="lg:col-span-6">
                              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-elevate bg-[#F7F5ED] border border-[#E7E3D8]">
                                <img
                                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85"
                                  alt="Wholesome family table with natural honey, oats, and nuts"
                                  className="w-full h-full object-cover editorial-img"
                                  loading="lazy"
                                />
                              </div>
                            </div>

                              {/* Story Text (6 cols) */}
                              <div className="lg:col-span-6 space-y-5">
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                                  {story.kicker || "OUR ETHOS"}
                                </span>

                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] leading-[1.12]">
                                  {story.headline || "Better Choices Begin at Home."}
                                </h2>

                                <p className="text-sm font-medium text-[#173F35] leading-relaxed">
                                  {story.lead}
                                </p>

                                {story.paragraphs && story.paragraphs.map((para, i) => (
                                  <p key={i} className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
                                    {para}
                                  </p>
                                ))}

                                <div className="pt-2">
                                  <Link
                                    href="/about"
                                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#173F35] hover:text-[#829B76] transition-colors"
                                  >
                                    <span>Read Full Heritage & Sourcing Standards</span>
                                    <FiArrowRight size={14} />
                                  </Link>
                                </div>
                              </div>

                            </div>
                          </div>

                        </div>
                      </section>
                      );
}
