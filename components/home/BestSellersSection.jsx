"use client";

import React, { useState } from "react";
import Link from "next/link";
import productsData from "@/data/products.json";
import ProductCard from "@/components/product/ProductCard";
import { FiArrowRight } from "react-icons/fi";

export default function BestSellersSection() {
  const [activeTab, setActiveTab] = useState("best-sellers");

  const discoveryTabs = [
    { id: "best-sellers", label: "Best Sellers" },
    { id: "trending", label: "Trending Nutrition" },
    { id: "new-arrivals", label: "Newly Arrived" },
    { id: "favorites", label: "Customer Favorites" },
  ];

  const displayedProducts = productsData.filter((p) => {
    if (activeTab === "best-sellers") return p.isBestSeller;
    if (activeTab === "trending") return p.isTrending;
    if (activeTab === "new-arrivals") return p.isNewArrival;
    if (activeTab === "favorites") return p.isFavorite;
    return true;
  });

  return (
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E7E3D8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                    PURPOSE-DRIVEN DISCOVERY
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] tracking-tight">
                    Selected Everyday Staples
                  </h2>
                </div>

          {/* Discovery Filter Tabs */ }
                    < div className = "flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-[#E7E3D8] sm:border-none" >
                    {
                      discoveryTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`h-9 px-4 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#173F35] ${activeTab === tab.id
                              ? "bg-[#173F35] text-[#F7F5ED] shadow-sm"
                              : "text-[#777D76] hover:text-[#252A26] hover:bg-[#F7F5ED]"
                            }`}
                        >
                          {tab.label}
                        </button>
                      ))
                    }
          </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {displayedProducts.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Secondary Catalog Action */}
              <div className="mt-12 sm:mt-14 text-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-full border border-[#173F35] text-[#173F35] hover:bg-[#173F35] hover:text-[#F7F5ED] text-xs font-semibold tracking-wider uppercase transition-all duration-200 active:scale-[0.98] group"
                >
                  <span>Explore Entire Pantry ({productsData.length} Items)</span>
                  <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>

            </div>
        </section>
        );
}
