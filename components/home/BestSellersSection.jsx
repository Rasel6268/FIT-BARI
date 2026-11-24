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
      {sections.map((section, idx) => {
        return (
          <section
            key={section.id}
            className={`py-8 sm:py-12 lg:py-14 border-b border-[#E7E3D8] ${
              idx % 2 === 1 ? "bg-[#FAF7F0]/40" : "bg-white"
            }`}
          >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header with Title & View All Action */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3 pb-2.5 sm:pb-3 border-b border-[#E7E3D8]/80">
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-normal font-editorial text-[#173F35] tracking-tight">
                {section.title}
              </h2>

              {/* View All Button */}
              <Link
                href={section.viewAllHref}
                className="inline-flex items-center gap-1.5 h-8 px-3.5 sm:px-4 rounded-full border border-[#173F35] text-[#173F35] hover:bg-[#173F35] hover:text-[#F7F5ED] text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] group flex-shrink-0"
              >
                <span>View All</span>
                <FiArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-4.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl sm:rounded-2xl border border-[#E7E3D8] p-3 space-y-3 animate-pulse"
                  >
                    <div className="aspect-square bg-[#F7F5ED] rounded-lg" />
                    <div className="h-3.5 bg-[#F7F5ED] rounded w-3/4" />
                    <div className="h-3 bg-[#F7F5ED] rounded w-1/2" />
                    <div className="h-4 bg-[#F7F5ED] rounded w-1/3" />
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-4.5">
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
        );
      })}
    </div>
  );
}
