"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function EditorialPromotions() {
  return (
    <div className="w-full space-y-0">
      
      {/* =========================================================================
          COMPOSITION 1: Large Lifestyle Photograph with Supporting Copy & CTA
          "Nutrition That Works With Your Lifestyle"
      ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#F7F5ED] border-b border-[#E7E3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Image (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/11] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-elevate bg-white border border-[#E7E3D8]">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85"
                  alt="Mindful nutrition lifestyle with unheated honey, raw oats and seeds"
                  className="w-full h-full object-cover editorial-img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Copy (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                SUSTAINABLE NOURISHMENT
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] leading-[1.12]">
                Nutrition That Works With Your Lifestyle
              </h2>

              <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
                Health is not built through extreme cleanses or short-lived resolutions. It is cultivated through ingredients that seamlessly integrate into your morning coffee, post-workout routine, and family dinners.
              </p>

              <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
                From cold-harvested raw Sundarban honey to organic Peruvian chia seeds, we curate pantry essentials that make feeling vibrant a natural part of living.
              </p>

              <div className="pt-2">
                <Link
                  href="/category/healthy-foods"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold tracking-wider uppercase transition-all duration-200"
                >
                  <span>Explore Pantry Staples</span>
                  <FiArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          COMPOSITION 2: Split Editorial Layout Showcasing Natural Foods
          "Small Habits. Stronger You."
      ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E7E3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content (5 cols) */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#829B76]">
                DAILY RITUALS
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] leading-[1.12]">
                Small Habits.<br />Stronger You.
              </h2>

              <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
                A single spoonful of raw wild blossom honey before dawn. A handful of crisp California whole almonds between demanding meetings. Beta-glucan rich rolled oats before evening training.
              </p>

              {/* 3 Step Habit Breakdown */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-4 items-start">
                  <span className="font-editorial text-xl text-[#D6A54A] font-bold">01</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
                      Morning Enzyme Priming
                    </h4>
                    <p className="text-[11px] text-[#777D76] mt-0.5 leading-normal">
                      Raw Sundarban honey in warm water to gently wake metabolic digestion.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="font-editorial text-xl text-[#D6A54A] font-bold">02</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
                      Midday Satiety & Lipids
                    </h4>
                    <p className="text-[11px] text-[#777D76] mt-0.5 leading-normal">
                      Cold-pressed chia seed gel and raw almonds for smooth cognitive focus.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="font-editorial text-xl text-[#D6A54A] font-bold">03</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
                      Evening Cellular Repair
                    </h4>
                    <p className="text-[11px] text-[#777D76] mt-0.5 leading-normal">
                      Virgin Nigella Sativa black seed oil and grass-fed cow ghee for deep joint recovery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/category/combo-packages"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#173F35] hover:text-[#829B76] transition-colors"
                >
                  <span>Discover Morning & Evening Kits &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right Staggered Visual Arrangement (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F7F5ED] shadow-subtle border border-[#E7E3D8]">
                  <img
                    src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=85"
                    alt="Raw unheated Sundarban honey dipper"
                    className="w-full h-full object-cover editorial-img"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] text-center">
                  <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#173F35]">100%</span>
                  <span className="text-[11px] text-[#777D76] block mt-0.5">Cold-Harvested Purity</span>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-10">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] text-center">
                  <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#D6A54A]">Zero</span>
                  <span className="text-[11px] text-[#777D76] block mt-0.5">Refined Sugar or Fillers</span>
                </div>
                <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F7F5ED] shadow-subtle border border-[#E7E3D8]">
                  <img
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=85"
                    alt="Australian rolled oats and chia seed bowls"
                    className="w-full h-full object-cover editorial-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          COMPOSITION 3: Bold Supplement Photography with Contrasting Background
          "Your Fitness Journey Starts Here."
      ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#173F35] text-[#F7F5ED] border-b border-[#0F2B24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Content (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D6A54A]">
                CLEAN SPORTS PERFORMANCE
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-white leading-[1.12]">
                Your Fitness Journey Starts Here.
              </h2>

              <p className="text-xs sm:text-sm text-[#F7F5ED]/80 leading-relaxed max-w-lg">
                No proprietary blends, no mysterious fillers, and zero amino spiking. We provide athletes and lifters in Bangladesh with 100% verified, micro-filtered protein and HPLC-tested creatine directly authenticated with brand hologram seals.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2 max-w-md border-t border-white/15">
                <div>
                  <span className="text-2xl font-editorial font-bold text-[#D6A54A]">24g</span>
                  <span className="text-[11px] text-[#F7F5ED]/70 block mt-0.5">Protein / Scoop</span>
                </div>
                <div>
                  <span className="text-2xl font-editorial font-bold text-[#D6A54A]">5.5g</span>
                  <span className="text-[11px] text-[#F7F5ED]/70 block mt-0.5">Natural BCAAs</span>
                </div>
                <div>
                  <span className="text-2xl font-editorial font-bold text-[#D6A54A]">0g</span>
                  <span className="text-[11px] text-[#F7F5ED]/70 block mt-0.5">Added Sugars</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/category/gym-supplements"
                  className="px-7 py-3.5 rounded-full bg-[#D6A54A] hover:bg-[#C2933C] text-[#173F35] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm"
                >
                  Explore Gym Supplements
                </Link>
                <Link
                  href="/about#purity"
                  className="px-6 py-3.5 rounded-full border border-white/30 text-[#F7F5ED] hover:bg-white/10 text-xs font-semibold tracking-wider uppercase transition-all"
                >
                  Authenticity Verification
                </Link>
              </div>
            </div>

            {/* Right Bold Photography (6 cols) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#0F2B24]">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85"
                  alt="Minimalist athletic performance nutrition"
                  className="w-full h-full object-cover editorial-img"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

