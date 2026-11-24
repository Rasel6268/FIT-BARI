"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import fallbackCategories from "@/data/categories.json";
import { fetchProducts, fetchCategories, normalizeProduct, normalizeCategory } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { CollectionJsonLd } from "@/components/seo/JsonLd";
import { FiShield, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;
  const { addToCart } = useCart();

  const [categories, setCategories] = useState(() => fallbackCategories.map(normalizeCategory));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      let isMounted = true;
      async function loadData() {
        setLoading(true);
        try {
          const [catRes, prodRes] = await Promise.allSettled([
            fetchCategories(),
            fetchProducts({ category: slug }),
          ]);

          if (isMounted) {
            if (catRes.status === "fulfilled" && catRes.value?.length > 0) {
              setCategories(catRes.value);
            }
              if (prodRes.status === "fulfilled" && prodRes.value) {
                setProducts(prodRes.value.products || []);
              }
            }
          } catch (err) {
            console.warn("CategoryPage: backend fetch error", err);
          } finally {
            if (isMounted) setLoading(false);
          }
        }
    loadData();
        return () => {
          isMounted = false;
        };
      }, [slug]);

    const category = categories.find((c) => c.slug === slug) || {
      name: slug ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Collection",
      sublabel: "Curated Collection",
      description: "Explore our single-origin harvests and lab-verified sports nutrition.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
      productCount: 0,
    };

  const categoryProducts = products.filter((p) => {
    if (!slug) return true;
    const targetSlug = slug.toLowerCase();
    const pSlug = (p.categorySlug || "").toLowerCase();
    const pCat = (p.category || "").toLowerCase();
    return (
      pSlug === targetSlug ||
      pCat === targetSlug ||
      pSlug.includes(targetSlug) ||
      targetSlug.includes(pSlug)
    );
  });
  const displayedProducts = categoryProducts.length > 0 ? categoryProducts : products;

  return (
    <div className="bg-[#F7F5ED] min-h-screen py-8">
      {/* Schema.org CollectionPage & ItemList */}
      <CollectionJsonLd category={category} products={products} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Collections", href: "/shop" },
            { label: category.name },
          ]}
        />

        {/* Category Hero Banner - Editorial Header */}
        <div className="relative rounded-3xl overflow-hidden shadow-elevate mb-12 min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] flex items-center bg-[#173F35] text-white">
          {/* Background gradient & ambient lighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#173F35] via-[#173F35] to-[#102C23]" />
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#829B76]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Category Product Image - Set perfectly on the right */}
          {category.image && (
            <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/5 lg:w-1/2 flex items-center justify-end pointer-events-none select-none overflow-hidden pr-2 sm:pr-6 lg:pr-10">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-auto max-h-[250px] sm:max-h-[290px] lg:max-h-[330px] object-contain object-right drop-shadow-2xl opacity-90 sm:opacity-100 transition-transform duration-700 hover:scale-105"
              />
              {/* Subtle fade on small screens so left text remains 100% legible */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#173F35] via-[#173F35]/75 to-transparent sm:hidden" />
            </div>
          )}

          <div className="relative p-6 sm:p-10 lg:p-12 z-10 max-w-xl lg:max-w-2xl space-y-3.5">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#D6A54A] block">
              {category.sublabel || "Pantry Collection"}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-white tracking-tight leading-tight">
              {category.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#F7F5ED]/85 leading-relaxed max-w-lg">
              {category.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[#F7F5ED]/80">
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <FiShield className="text-[#829B76]" size={13} />
                100% Traceable Origin
              </span>
              <span>•</span>
              <span className="font-mono text-[#D6A54A] bg-[#0F2B24]/80 px-3 py-1 rounded-full border border-[#D6A54A]/25">
                {displayedProducts.length} Items Available
              </span>
            </div>
          </div>
        </div>

        {/* Content: Products */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-4.5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E7E3D8] p-4 space-y-4 animate-pulse"
              >
                <div className="aspect-square bg-[#F7F5ED] rounded-xl" />
                <div className="h-4 bg-[#F7F5ED] rounded w-3/4" />
                <div className="h-3 bg-[#F7F5ED] rounded w-1/2" />
                <div className="h-5 bg-[#F7F5ED] rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E3D8] shadow-subtle space-y-4">
            <h3 className="text-base font-semibold text-[#173F35]">
              Seasonal harvest in preparation
            </h3>
            <p className="text-xs text-[#777D76] max-w-sm mx-auto">
              New laboratory batches are currently being verified for this collection.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 rounded-full bg-[#173F35] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider"
            >
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-4.5">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}

            {/* Cross-Collection Discovery */}
            <div className="mt-20 pt-12 border-t border-[#E7E3D8]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                  OTHER COLLECTIONS
                </span>
                <Link href="/shop" className="text-xs font-semibold text-[#173F35] hover:text-[#829B76]">
                  View All &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {categories
                  .filter((c) => c.slug !== slug)
                  .map((c) => (
                    <Link
                      key={c.id}
                      href={`/category/${c.slug}`}
                      className="p-3 bg-white rounded-2xl border border-[#E7E3D8] hover:border-[#173F35] text-center transition-all group"
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-12 h-12 rounded-lg object-cover mx-auto mb-2 group-hover:scale-105 transition-transform editorial-img"
                      />
                      <span className="text-xs font-semibold text-[#252A26] group-hover:text-[#173F35] block truncate">
                        {c.name}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>

          </div>
    </div>
      );
}
