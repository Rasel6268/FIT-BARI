"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { FiShoppingBag, FiArrowRight, FiPackage } from "react-icons/fi";

export default function ComboPackagesSection() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products dynamically from Backend API
  useEffect(() => {
    let isMounted = true;
    async function loadBundles() {
      setLoading(true);
      try {
        const res = await fetchProducts({ limit: 100 });
        if (isMounted && res.products) {
          setProducts(res.products);
        }
      } catch (err) {
        console.warn("ComboPackagesSection: failed to load bundles from API", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadBundles();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter bundle / combo products from backend catalog
  const bundles = useMemo(() => {
    if (products.length === 0) return [];

    const matches = products.filter((p) => {
      const catSlug = (p.categorySlug || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      const tags = Array.isArray(p.tags) ? p.tags.map((t) => String(t).toLowerCase()) : [];
      return (
        catSlug === "combo-packages" ||
        catSlug === "bundles" ||
        cat.includes("combo") ||
        cat.includes("bundle") ||
        name.includes("bundle") ||
        name.includes("combo") ||
        name.includes("pack") ||
        tags.includes("bundle") ||
        tags.includes("combo")
      );
    });

    // If specific bundles exist in backend, display them; otherwise fallback to featured catalog items
    return matches.length > 0 ? matches.slice(0, 4) : products.slice(0, 4);
  }, [products]);

  const handleAddComboToCart = (combo) => {
    const price =
      typeof combo.price === "number"
        ? combo.price
        : combo.discountedPrice || combo.regularPrice || 0;
    const origPrice =
      typeof combo.originalPrice === "number"
        ? combo.originalPrice
        : combo.regularPrice || price;

    addToCart(
      {
        ...combo,
        id: combo.slug || combo.id || combo._id,
        _id: combo._id || combo.id || combo.slug,
        slug: combo.slug || combo.id,
        name: combo.name,
        category: combo.category || "Nutrition Combos",
        categorySlug: combo.categorySlug || "combo-packages",
        discountedPrice: price,
        price: price,
        regularPrice: origPrice,
        originalPrice: origPrice,
        images:
          Array.isArray(combo.images) && combo.images.length > 0
            ? combo.images
            : [combo.image || "/images/placeholder.png"],
        image: combo.images?.[0] || combo.image || "/images/placeholder.png",
        weight: combo.weight || "Curated Set",
      },
      1
    );
  };

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[#F7F5ED] border-b border-[#E7E3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal font-editorial text-[#173F35] tracking-tight">
              Curated Daily Bundles
            </h2>
          </div>

          <Link
            href="/category/combo-packages"
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full border border-[#173F35] text-[#173F35] hover:bg-[#173F35] hover:text-[#F7F5ED] text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] group flex-shrink-0"
          >
            <span>View All</span>
            <FiArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Dynamic Bundles Grid from Backend API - Clean & Compact */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl border border-[#E7E3D8] p-3 space-y-3 animate-pulse"
              >
                <div className="aspect-square bg-[#F7F5ED] rounded-lg" />
                <div className="h-3.5 bg-[#F7F5ED] rounded w-3/4" />
                <div className="h-4 bg-[#F7F5ED] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : bundles.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#E7E3D8] shadow-subtle space-y-3 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#F7F5ED] border border-[#E7E3D8] flex items-center justify-center mx-auto text-[#173F35]">
              <FiPackage size={20} />
            </div>
            <h3 className="text-base font-normal font-editorial text-[#173F35]">
              No Bundles Available Yet
            </h3>
            <p className="text-xs text-[#777D76] leading-relaxed">
              Curated daily stacks added from the Admin Portal will automatically appear here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#173F35] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0F2B24] transition-all"
            >
              <span>Explore Products</span>
              <FiArrowRight size={12} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {bundles.map((combo) => {
              const pId = combo.slug || combo.id || combo._id;
              const price =
                typeof combo.price === "number"
                  ? combo.price
                  : combo.discountedPrice || combo.regularPrice || 0;
              const origPrice =
                typeof combo.originalPrice === "number"
                  ? combo.originalPrice
                  : combo.regularPrice || price;
              const hasDiscount = origPrice > price;
              const discountPct =
                combo.discountPercentage ||
                (hasDiscount ? Math.round(((origPrice - price) / origPrice) * 100) : 0);

              const imageSrc =
                combo.images?.[0] || combo.image || "/images/placeholder.png";

              return (
                <div
                  key={pId}
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E7E3D8] shadow-subtle hover:border-[#173F35]/40 hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Clean Square Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#F7F5ED]">
                    <Link href={`/product/${pId}`} className="block w-full h-full">
                      <img
                        src={imageSrc}
                        alt={combo.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out editorial-img"
                        loading="lazy"
                      />
                    </Link>

                    {hasDiscount && (
                      <span className="absolute top-2.5 left-2.5 z-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#173F35] text-[#F7F5ED] shadow-sm">
                        Save {discountPct}%
                      </span>
                    )}
                  </div>

                  {/* Clean Content Area */}
                  <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#777D76] block mb-1">
                        Curated Bundle
                      </span>
                      <Link href={`/product/${pId}`} className="block">
                        <h3 className="text-xs sm:text-[13px] font-semibold text-[#252A26] hover:text-[#173F35] transition-colors line-clamp-2 leading-snug">
                          {combo.name}
                        </h3>
                      </Link>
                    </div>

                    {/* Pricing & Add to Cart */}
                    <div className="mt-2.5 pt-2 border-t border-[#E7E3D8]/70 flex items-center justify-between gap-1.5">
                      <div className="flex items-baseline gap-1.5 min-w-0">
                        <span className="text-sm sm:text-base font-bold text-[#173F35]">
                          ৳{price.toLocaleString()}
                        </span>
                        {hasDiscount && (
                          <span className="text-[11px] line-through text-[#777D76] truncate">
                            ৳{origPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddComboToCart(combo)}
                        className="h-7 sm:h-8 px-2.5 sm:px-3 rounded-full bg-[#173F35] hover:bg-[#0F2B24] active:scale-95 text-[#F7F5ED] text-[11px] font-semibold inline-flex items-center gap-1 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#173F35] flex-shrink-0"
                        title="Add Bundle to cart"
                        aria-label={`Add ${combo.name} to cart`}
                      >
                        <FiShoppingBag size={12} />
                        <span className="hidden xs:inline">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
