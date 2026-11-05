"use client";

import React from "react";
import Link from "next/link";
import comboPackages from "@/data/comboPackages.json";
import { useCart } from "@/context/CartContext";
import { FiCheck, FiShoppingBag, FiArrowRight } from "react-icons/fi";

export default function ComboPackagesSection() {
  const { addToCart } = useCart();

  const handleAddComboToCart = (combo) => {
    addToCart(
      {
        id: combo.id,
        name: combo.name,
        category: "Nutrition Combos",
        categorySlug: "combo-packages",
        discountedPrice: combo.discountedPrice,
        regularPrice: combo.originalPrice,
        images: [combo.image],
        image: combo.image,
        weight: "Curated Set",
      },
      1
    );
  };

  return (
      <section className="py-20 sm:py-28 bg-[#F7F5ED] border-b border-[#E7E3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                      HARMONIOUS SETS
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] tracking-tight">
                      Curated Daily Bundles
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#777D76] max-w-md leading-relaxed">
                    Scientifically and traditionally paired ingredients designed to support specific daily routines with tangible value.
                  </p>
                </div>

                  {/* 4 Large Editorial Bundle Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {comboPackages.map((combo) => (
                      <div
                        key={combo.id}
                        className="group bg-white rounded-3xl overflow-hidden border border-[#E7E3D8] shadow-subtle hover:shadow-elevate transition-all duration-300 flex flex-col justify-between"
                      >
                          {/* Large Imagery */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFECE1]">
                            <img
                              src={combo.image}
                              alt={combo.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 editorial-img"
                              loading="lazy"
                            />

                              <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#173F35] text-[#F7F5ED] shadow-sm">
                                {combo.savingsBadge}
                              </span>

                              <span className="absolute bottom-4 left-4 text-[10px] uppercase font-bold tracking-widest text-[#252A26] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#E7E3D8]">
                                {combo.tag}
                              </span>
                          </div>

                            {/* Bundle Content */}
                            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                              <div>
                                <div className="flex items-baseline justify-between gap-4 mb-2">
                                  <h3 className="text-xl sm:text-2xl font-normal font-editorial text-[#173F35]">
                                    {combo.name}
                                  </h3>
                                </div>

                                  <p className="text-xs text-[#777D76] leading-relaxed mb-5">
                                    {combo.description}
                                  </p>

                                      {/* Included Items Checklist */}
                                      <div className="space-y-2 py-4 border-y border-[#E7E3D8]/80">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#777D76] block mb-1">
                                          Included in this ritual:
                                        </span>
                                            {combo.includedProducts.map((prod, idx) => (
                                              <div key={idx} className="flex items-center gap-2 text-xs text-[#252A26]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#829B76] flex-shrink-0" />
                                                <span className="truncate">{prod}</span>
                                              </div>
                                            ))}
                                          </div>
                </div>

                                            {/* Price Breakdown & Shopping CTA */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                              <div className="flex items-baseline gap-2.5">
                                                <span className="text-2xl font-bold text-[#173F35]">
                                                  ৳{combo.discountedPrice.toLocaleString()}
                                                </span>
                                                <span className="text-xs line-through text-[#777D76]">
                                                  ৳{combo.originalPrice.toLocaleString()}
                                                </span>
                                              </div>

                                                <div className="flex items-center gap-2">
                                                  <Link
                                                    href="/category/combo-packages"
                                                    className="px-5 py-2.5 rounded-full border border-[#E7E3D8] hover:border-[#173F35] text-xs font-semibold uppercase tracking-wider text-[#252A26] transition-colors"
                                                  >
                                                    Details
                                                  </Link>
                                                  <button
                                                    onClick={() => handleAddComboToCart(combo)}
                                                    className="px-6 py-2.5 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-sm"
                                                  >
                                                    <FiShoppingBag size={13} />
                                                    <span>Add Bundle</span>
                                                  </button>
                                                </div>
                                              </div>

                                            </div>
                                        </div>
          ))}
                                      </div>

                                  </div>
                                </section>
                                );
}
