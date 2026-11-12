"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import fallbackCategories from "@/data/categories.json";
import { fetchCategories, normalizeCategory } from "@/lib/api";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export default function MegaMenu({ onClose }) {
  const [categories, setCategories] = useState(() => fallbackCategories.map(normalizeCategory));

  useEffect(() => {
    let isMounted = true;
    fetchCategories()
      .then((cats) => {
        if (isMounted && cats && cats.length > 0) {
          setCategories(cats);
        }
      })
      .catch(() => { });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="w-full bg-white border-t border-b border-[#E7E3D8] shadow-elevate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
        {/* Main 2-column layout with 70% / 30% ratio */}
        <div
          className="grid gap-6 lg:gap-8 items-stretch"
          style={{
            gridTemplateColumns: "minmax(0, 7fr) minmax(280px, 3fr)",
          }}
        >
          {/* ======================================================== */}
          {/* LEFT SECTION (70% width): Collections & Categories Grid */}
          {/* ======================================================== */}
          <div className="min-w-0 flex flex-col justify-between">
            <div>
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E7E3D8]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#173F35]" />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#173F35]">
                    Explore Collections
                  </h3>
                </div>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="text-xs font-semibold text-[#173F35] hover:text-[#829B76] inline-flex items-center gap-1.5 group transition-colors"
                >
                  <span>View Full Pantry Catalog</span>
                  <FiArrowRight
                    size={13}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </div>

              {/* 4-Column Category Grid on Desktop (2-col on smaller desktop) */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {
                    categories.map((cat) => (
                      <Link
                        key={cat.id || cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="group flex items-start gap-3 p-2.5 rounded-xl bg-white hover:bg-[#F7F5ED] border border-[#E7E3D8]/70 hover:border-[#173F35]/30 transition-all duration-200 min-w-0"
                      >
                        {/* Fixed aspect category thumbnail */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0 bg-[#F7F5ED] border border-[#E7E3D8]/70">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        {/* Text Details */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs font-bold text-[#252A26] group-hover:text-[#173F35] transition-colors leading-tight truncate">
                              {cat.name}
                            </h4>
                            <span className="text-[10px] text-[#777D76] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0">
                              &rarr;
                            </span>
                          </div>
                          <p className="text-[10px] text-[#777D76] truncate mt-0.5 leading-tight">
                            {cat.sublabel || cat.description}
                          </p>
                          <span className="text-[9px] font-semibold text-[#829B76] block mt-1">
                            {cat.productCount} Products
                          </span>
                        </div>
                      </Link>
                    ))
                  }
                      </div>
            </div>

            {/* Bottom Trust Row */}
            <div className="mt-5 pt-3.5 border-t border-[#E7E3D8]/60 flex items-center justify-between text-[11px] text-[#777D76]">
              <span className="flex items-center gap-1.5">
                <FiCheck className="text-[#829B76]" size={12} />
                <span>100% Raw Wild Harvests & Lab Certified</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheck className="text-[#829B76]" size={12} />
                <span>Free Express Delivery on Orders Over ৳2,000</span>
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT SECTION (30% width): Curated Routine Stack Feature */}
          {/* ======================================================== */}
          <div className="min-w-0 bg-[#FAF7EF] rounded-2xl p-5 border border-[#E7E3D8] flex flex-col justify-between shadow-subtle">
            <div>
              {/* Large Product Photography */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3.5 bg-white border border-[#E7E3D8]/80">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                  alt="The Morning Wellness Kit"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#173F35]/90 backdrop-blur-md text-[#F7F5ED] text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A54A]" />
                  <span>Featured Routine Stack</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md text-[#173F35] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#E7E3D8] shadow-sm flex items-center gap-1">
                  <FiCheck className="text-[#829B76]" size={10} />
                  <span>Verified Pure</span>
                </div>
              </div>

              {/* Title & Editorial Description */}
              <h3 className="text-base font-bold text-[#173F35] font-editorial mb-1 leading-snug">
                The Morning Wellness Kit
              </h3>
              <p className="text-[11px] text-[#777D76] leading-relaxed mb-3 line-clamp-2">
                Australian rolled oats, wild Sundarban raw honey, organic Peruvian chia seeds, and California raw almonds.
              </p>

              {/* Pricing & Savings */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-lg font-bold text-[#173F35]">৳2,190</span>
                <span className="text-xs line-through text-[#777D76]">৳2,770</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#173F35] bg-[#D6A54A]/25 px-2 py-0.5 rounded">
                  Save ৳580
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/category/combo-packages"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-center text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group"
            >
              <span>Explore Product</span>
              <FiArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
