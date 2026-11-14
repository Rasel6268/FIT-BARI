"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";
import { FiArrowRight } from "react-icons/fi";

export default function BestSellersSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      setLoading(true);
      try {
        const res = await fetchProducts({ limit: 100 });
        if (isMounted && res.products) {
          setProducts(res.products);
        }
      } catch (err) {
        console.warn("BestSellersSection: failed to load live products", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute products for each of the 4 sections
  // Genuine flags take precedence; distinct slices avoid unnecessary duplicates if flags are sparse
  const sectionsData = useMemo(() => {
    if (products.length === 0) {
      return {
        bestSellers: [],
        trending: [],
        newArrivals: [],
        favorites: [],
      };
    }

    const genuineBestSellers = products.filter((p) => p.isBestSeller);
    const genuineTrending = products.filter((p) => p.isTrending);
    const genuineNewArrivals = products.filter((p) => p.isNewArrival);
    const genuineFavorites = products.filter(
      (p) => p.isFavorite || (typeof p.rating === "number" && p.rating >= 4.9)
    );

    const hasAnyFlags =
      genuineBestSellers.length > 0 ||
      genuineTrending.length > 0 ||
      genuineNewArrivals.length > 0 ||
      genuineFavorites.length > 0;

    let bestSellers = [...genuineBestSellers];
    let trending = [...genuineTrending];
    let newArrivals = [...genuineNewArrivals];
    let favorites = [...genuineFavorites];

    if (!hasAnyFlags) {
      // Distribute distinct slices so products do not repeat unnecessarily
      bestSellers = products.slice(0, 4);
      trending = products.slice(4, 8).length > 0 ? products.slice(4, 8) : products.slice(0, 4);
      newArrivals =
        products.slice(8, 12).length > 0
          ? products.slice(8, 12)
          : [...products].reverse().slice(0, 4);
      favorites =
        products.slice(12, 16).length > 0
          ? products.slice(12, 16)
          : [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);
    } else {
      // If a section is empty while products exist, fill with unassigned items
      const assignedIds = new Set([
        ...bestSellers.map((p) => p.id || p.slug),
        ...trending.map((p) => p.id || p.slug),
        ...newArrivals.map((p) => p.id || p.slug),
        ...favorites.map((p) => p.id || p.slug),
      ]);

      const unassigned = products.filter((p) => !assignedIds.has(p.id || p.slug));

      if (bestSellers.length === 0) {
        bestSellers = unassigned.slice(0, 4);
      }
      if (trending.length === 0) {
        const remaining = products.filter(
          (p) => !bestSellers.some((b) => (b.id || b.slug) === (p.id || p.slug))
        );
        trending = (remaining.length > 0 ? remaining : products).slice(0, 4);
      }
      if (newArrivals.length === 0) {
        const remaining = products.filter(
          (p) =>
            !bestSellers.some((b) => (b.id || b.slug) === (p.id || p.slug)) &&
            !trending.some((t) => (t.id || t.slug) === (p.id || p.slug))
        );
        newArrivals = (remaining.length > 0 ? remaining : products).slice(0, 4);
      }
      if (favorites.length === 0) {
        const remaining = products.filter(
          (p) =>
            !bestSellers.some((b) => (b.id || b.slug) === (p.id || p.slug)) &&
            !trending.some((t) => (t.id || t.slug) === (p.id || p.slug)) &&
            !newArrivals.some((n) => (n.id || n.slug) === (p.id || p.slug))
        );
        favorites = (remaining.length > 0 ? remaining : products).slice(0, 4);
      }
    }

    return {
      bestSellers: bestSellers.slice(0, 8),
      trending: trending.slice(0, 8),
      newArrivals: newArrivals.slice(0, 8),
      favorites: favorites.slice(0, 8),
    };
  }, [products]);

  // Definition of the 4 vertically stacked sections
  const sections = [
    {
      id: "best-sellers",
      eyebrow: "CUSTOMER ACCLAIMED",
      title: "Best Sellers",
      subtitle: "Our most trusted and highly repurchased daily staples.",
      viewAllHref: "/shop",
      items: sectionsData.bestSellers,
    },
    {
      id: "trending-nutrition",
      eyebrow: "IN HIGH DEMAND",
      title: "Trending Nutrition",
      subtitle: "Formulations and pure harvests capturing the attention of conscious athletes.",
      viewAllHref: "/shop",
      items: sectionsData.trending,
    },
    {
      id: "newly-arrived",
      eyebrow: "FRESH BATCHES",
      title: "Newly Arrived",
      subtitle: "The latest seasonal batches, single-origin honey, and clean active supplements.",
      viewAllHref: "/shop?sort=newest",
      items: sectionsData.newArrivals,
    },
    {
      id: "customer-favorites",
      eyebrow: "TOP RATED FORMULAS",
      title: "Customer Favorites",
      subtitle: "Handpicked selections celebrated for label claim purity and exceptional taste.",
      viewAllHref: "/shop?sort=rating",
      items: sectionsData.favorites,
    },
  ];

  return (
    <div className="w-full bg-white">
      {sections.map((section, idx) => (
        <section
          key={section.id}
          className={`py-14 sm:py-18 lg:py-20 border-b border-[#E7E3D8] ${
            idx % 2 === 1 ? "bg-[#FAF7F0]/40" : "bg-white"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header with Title, Eyebrow & View All Action */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4 pb-4 border-b border-[#E7E3D8]/80">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A54A]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                    {section.eyebrow}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-editorial text-[#173F35] tracking-tight">
                  {section.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#777D76] max-w-xl leading-relaxed">
                  {section.subtitle}
                </p>
              </div>

              {/* View All Button */}
              <Link
                href={section.viewAllHref}
                className="inline-flex items-center gap-2 h-9 px-5 rounded-full border border-[#173F35] text-[#173F35] hover:bg-[#173F35] hover:text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] group flex-shrink-0 self-start sm:self-end shadow-xs"
              >
                <span>View All</span>
                <FiArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-[#E7E3D8] p-4 space-y-4 animate-pulse"
                  >
                    <div className="aspect-[4/5] bg-[#F7F5ED] rounded-xl" />
                    <div className="h-4 bg-[#F7F5ED] rounded w-3/4" />
                    <div className="h-3 bg-[#F7F5ED] rounded w-1/2" />
                    <div className="h-5 bg-[#F7F5ED] rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : section.items.length === 0 ? (
              <div className="bg-[#F7F5ED] rounded-2xl p-8 sm:p-10 text-center border border-[#E7E3D8] max-w-md mx-auto">
                <p className="text-xs text-[#777D76]">
                  No products currently listed in {section.title}. Products will appear once added in the Admin Portal.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {section.items.map((product) => (
                  <ProductCard
                    key={`${section.id}-${product.id || product.slug}`}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Complete Catalog Footer Callout */}
      <div className="py-12 sm:py-14 text-center bg-[#F7F5ED] border-b border-[#E7E3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#173F35]">
            Looking for Our Complete Pantry Range?
          </h3>
          <p className="text-xs sm:text-sm text-[#777D76] max-w-md mx-auto">
            Explore all certified raw honey, organic chia seeds, superfoods, and clean sports supplements.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-11 px-8 rounded-full bg-[#173F35] text-[#F7F5ED] hover:bg-[#0F2B24] text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm active:scale-[0.98] group"
            >
              <span>Explore Complete Pantry Catalog ({products.length} Items)</span>
              <FiArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
