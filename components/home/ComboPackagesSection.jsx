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
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F5ED] border-b border-[#E7E3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A54A]" />
              HARMONIOUS SETS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] tracking-tight">
              Curated Daily Bundles
            </h2>
            <p className="text-xs sm:text-sm text-[#777D76] max-w-md leading-relaxed">
              Scientifically and traditionally paired ingredients designed to support specific daily routines with tangible value.
            </p>
          </div>

          <Link
            href="/category/combo-packages"
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full border border-[#173F35] text-[#173F35] hover:bg-[#173F35] hover:text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] group flex-shrink-0 self-start md:self-end"
          >
            <span>View All Bundles</span>
            <FiArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Dynamic Bundles Grid from Backend API */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E7E3D8] shadow-subtle p-6 space-y-5 animate-pulse"
              >
                <div className="aspect-[16/10] bg-[#EFECE1] rounded-2xl" />
                <div className="h-6 bg-[#F7F5ED] rounded w-2/3" />
                <div className="h-4 bg-[#F7F5ED] rounded w-full" />
                <div className="h-4 bg-[#F7F5ED] rounded w-1/2" />
                <div className="h-10 bg-[#F7F5ED] rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : bundles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E3D8] shadow-subtle space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#F7F5ED] border border-[#E7E3D8] flex items-center justify-center mx-auto text-[#173F35]">
              <FiPackage size={24} />
            </div>
            <h3 className="text-xl font-normal font-editorial text-[#173F35]">
              No Bundles Available Yet
            </h3>
            <p className="text-xs text-[#777D76] leading-relaxed">
              Curated daily stacks and bundle packages added from the Admin Portal will automatically appear here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#173F35] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0F2B24] transition-all"
            >
              <span>Explore All Pantry Products</span>
              <FiArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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

              // Derive highlights / included items from backend data
              const includedItems =
                Array.isArray(combo.includedProducts) && combo.includedProducts.length > 0
                  ? combo.includedProducts
                  : Array.isArray(combo.benefits) && combo.benefits.length > 0
                  ? combo.benefits
                  : Array.isArray(combo.tags) && combo.tags.length > 0
                  ? combo.tags.slice(0, 3)
                  : [
                      "100% Authentic Single-Origin Harvest",
                      "Third-Party Lab Tested For Purity",
                      "Nationwide Express Inspection Delivery",
                    ];

              const imageSrc =
                combo.images?.[0] || combo.image || "/images/placeholder.png";

              return (
                <div
                  key={pId}
                  className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E7E3D8] shadow-subtle hover:shadow-elevate transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Large Imagery */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFECE1]">
                    <img
                      src={imageSrc}
                      alt={combo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out editorial-img"
                      loading="lazy"
                    />

                    {hasDiscount && (
                      <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#173F35] text-[#F7F5ED] shadow-sm">
                        Save {discountPct}%
                      </span>
                    )}

                    <span className="absolute bottom-4 left-4 text-[10px] uppercase font-bold tracking-widest text-[#252A26] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#E7E3D8]">
                      {combo.weight || "CURATED BUNDLE"}
                    </span>
                  </div>

                  {/* Bundle Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-normal font-editorial text-[#173F35] mb-2 leading-snug">
                        {combo.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed mb-5">
                        {combo.shortDescription || combo.description}
                      </p>

                      {/* Included Items Checklist */}
                      <div className="space-y-2 py-4 border-y border-[#E7E3D8]/80">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#777D76] block mb-1">
                          Included in this ritual:
                        </span>
                        {includedItems.map((prod, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#252A26]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#829B76] flex-shrink-0" />
                            <span className="truncate">{prod}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Breakdown & Shopping CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-2xl sm:text-3xl font-bold text-[#173F35]">
                          ৳{price.toLocaleString()}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs line-through text-[#777D76]">
                            ৳{origPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Link
                          href={`/product/${pId}`}
                          className="h-10 px-5 rounded-full border border-[#E7E3D8] hover:border-[#173F35] text-xs font-semibold uppercase tracking-wider text-[#252A26] transition-colors inline-flex items-center justify-center active:scale-95"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => handleAddComboToCart(combo)}
                          className="h-10 px-6 rounded-full bg-[#173F35] hover:bg-[#0F2B24] active:scale-95 text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                        >
                          <FiShoppingBag size={14} />
                          <span>Add Bundle</span>
                        </button>
                      </div>
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
