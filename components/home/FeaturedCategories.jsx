"use client";

import React from "react";
import Link from "next/link";
import categoriesData from "@/data/categories.json";
import { FiArrowRight } from "react-icons/fi";

export default function FeaturedCategories() {
  const [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8] = categoriesData;

  return (
      <section className="py-20 sm:py-28 bg-[#F7F5ED] border-b border-[#E7E3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header - Editorial Magazine Layout */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                      CURATED COLLECTIONS
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] tracking-tight">
                      Explore What Nourishes You
                    </h2>
                  </div>

                  <Link
                    href="/shop"
                    className="text-xs font-semibold tracking-wider uppercase text-[#173F35] hover:text-[#829B76] inline-flex items-center gap-1.5 group transition-colors flex-shrink-0"
                  >
                    <span>View All Eight Collections</span>
                    <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                        {/* Magazine Asymmetrical Spread */}
                        <div className="space-y-6">

                          {/* Row 1: 1 Dominant Tall Feature (5 cols) + 2 Medium Stacks (7 cols) */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                            {/* Tile 1: Natural Honey (Prominent Tall Tile) */}
                            {cat1 && (
                              <Link
                                href={`/category/${cat1.slug}`}
                                className="lg:col-span-5 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E7E3D8] shadow-subtle hover:shadow-elevate transition-all duration-500 min-h-[420px] lg:min-h-[520px] flex flex-col justify-end"
                              >
                                <img
                                  src={cat1.image}
                                  alt={cat1.name}
                                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 editorial-img"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/90 via-[#173F35]/30 to-transparent" />

                                <div className="relative p-6 sm:p-8 text-white z-10 space-y-2">
                                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-[#D6A54A] font-semibold">
                                    <span>{cat1.sublabel}</span>
                                    <span className="text-white/80">{cat1.productCount} Products</span>
                                  </div>
                                  <h3 className="text-2xl sm:text-3xl font-normal font-editorial text-white leading-tight">
                                    {cat1.name}
                                  </h3>
                                  <p className="text-xs text-white/80 max-w-sm leading-relaxed line-clamp-2">
                                    {cat1.description}
                                  </p>
                                  <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-[#D6A54A] transition-colors">
                                    <span>Discover Harvest</span>
                                    <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </div>
                              </Link>
                            )}

                            {/* Right side: 2 Mixed Proportions (Gym Supplements & Oats & Seeds) */}
                            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                              {/* Tile 2: Gym Supplements */}
                              {cat2 && (
                                <Link
                                  href={`/category/${cat2.slug}`}
                                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E7E3D8] shadow-subtle hover:shadow-elevate transition-all duration-500 min-h-[280px] sm:min-h-[520px] flex flex-col justify-end"
                                >
                                  <img
                                    src={cat2.image}
                                    alt={cat2.name}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 editorial-img"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B24]/90 via-[#0F2B24]/30 to-transparent" />

                                  <div className="relative p-6 text-white z-10 space-y-1.5">
                                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#829B76] font-semibold block">
                                      {cat2.sublabel}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-normal font-editorial text-white">
                                      {cat2.name}
                                    </h3>
                                    <p className="text-xs text-white/75 line-clamp-2 leading-relaxed">
                                      {cat2.description}
                                    </p>
                                    <div className="pt-1 flex items-center justify-between text-xs text-white/90">
                                      <span className="text-[11px] font-mono text-[#D6A54A]">{cat2.productCount} items</span>
                                      <span className="inline-flex items-center gap-1 font-semibold uppercase text-[10px] tracking-wider group-hover:text-[#D6A54A]">
                                        Explore &rarr;
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              )}

                              {/* Tile 3: Oats & Seeds */}
                              {cat3 && (
                                <Link
                                  href={`/category/${cat3.slug}`}
                                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E7E3D8] shadow-subtle hover:shadow-elevate transition-all duration-500 min-h-[280px] sm:min-h-[520px] flex flex-col justify-end"
                                >
                                  <img
                                    src={cat3.image}
                                    alt={cat3.name}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 editorial-img"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/90 via-[#173F35]/30 to-transparent" />

                                  <div className="relative p-6 text-white z-10 space-y-1.5">
                                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#D6A54A] font-semibold block">
                                      {cat3.sublabel}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-normal font-editorial text-white">
                                      {cat3.name}
                                    </h3>
                                    <p className="text-xs text-white/75 line-clamp-2 leading-relaxed">
                                      {cat3.description}
                                    </p>
                                    <div className="pt-1 flex items-center justify-between text-xs text-white/90">
                                      <span className="text-[11px] font-mono text-[#D6A54A]">{cat3.productCount} items</span>
                                      <span className="inline-flex items-center gap-1 font-semibold uppercase text-[10px] tracking-wider group-hover:text-[#D6A54A]">
                                        Explore &rarr;
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              )}
                            </div>
                          </div>

                          {/* Row 2: 3 Balanced Editorial Cards (Nuts, Healthy Foods, Ghee & Oils) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[cat4, cat5, cat6].filter(Boolean).map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="group relative rounded-2xl overflow-hidden bg-white border border-[#E7E3D8] shadow-subtle hover:shadow-elevate transition-all duration-500 min-h-[260px] sm:min-h-[300px] flex flex-col justify-end"
                              >
                                <img
                                  src={cat.image}
                                  alt={cat.name}
                                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 editorial-img"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/90 via-[#173F35]/30 to-transparent" />

                                    <div className="relative p-6 text-white z-10 space-y-1">
                                      <span className="text-[10px] uppercase tracking-[0.15em] text-[#D6A54A] font-semibold block">
                                        {cat.sublabel}
                                      </span>
                                            <div className="flex items-baseline justify-between">
                                              <h3 className="text-xl font-normal font-editorial text-white">
                                                {cat.name}
                                              </h3>
                                              <span className="text-[11px] text-white/80 font-mono">
                                                {cat.productCount}
                                              </span>
                                            </div>
                                            </div>
                                          </Link>
            ))}
                                        </div>

                                        {/* Row 3: 2 Asymmetrical Cards (Dates & Superfoods (5 cols) + Nutrition Combos (7 cols)) */}
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                          {cat7 && (
                                            <Link
                                              href={`/category/${cat7.slug}`}
                                              className="lg:col-span-5 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E7E3D8] shadow-subtle hover:shadow-elevate transition-all duration-500 min-h-[260px] sm:min-h-[320px] flex flex-col justify-end"
                                            >
                                              <img
                                                src={cat7.image}
                                                alt={cat7.name}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 editorial-img"
                                                loading="lazy"
                                              />
                                              <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/90 via-[#173F35]/30 to-transparent" />

                                              <div className="relative p-6 sm:p-8 text-white z-10 space-y-1.5">
                                                <span className="text-[10px] uppercase tracking-[0.15em] text-[#D6A54A] font-semibold block">
                                                  {cat7.sublabel}
                                                </span>
                                                  <h3 className="text-xl sm:text-2xl font-normal font-editorial text-white">
                                                    {cat7.name}
                                                  </h3>
                                                  <p className="text-xs text-white/75 line-clamp-1">
                                                    {cat7.description}
                                                  </p>
                                              </div>
                                            </Link>
                                          )}

                                            {cat8 && (
                                              <Link
                                                href={`/category/${cat8.slug}`}
                                                className="lg:col-span-7 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E7E3D8] shadow-subtle hover:shadow-elevate transition-all duration-500 min-h-[260px] sm:min-h-[320px] flex flex-col justify-end"
                                              >
                                                <img
                                                  src={cat8.image}
                                                  alt={cat8.name}
                                                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 editorial-img"
                                                  loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B24]/90 via-[#0F2B24]/30 to-transparent" />

                                                <div className="relative p-6 sm:p-8 text-white z-10 space-y-2">
                                                  <div className="flex items-center gap-2">
                                                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#829B76] font-semibold">
                                                      Curated Bundles
                                                    </span>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#173F35] bg-[#D6A54A] px-2 py-0.5 rounded">
                                                      Save Up to 25%
                                                    </span>
                                                  </div>
                                                  <h3 className="text-2xl sm:text-3xl font-normal font-editorial text-white">
                                                    {cat8.name}
                                                  </h3>
                                                  <p className="text-xs text-white/80 max-w-md line-clamp-2">
                                                    {cat8.description}
                                                  </p>
                                                </div>
                                        </Link>
            )}
                                      </div>

                                    </div>

                                  </div>
    </section>
                            );
}
