"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import comboPackages from "@/data/comboPackages.json";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FiShield, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;
  const { addToCart } = useCart();

  const category = categoriesData.find((c) => c.slug === slug) || {
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    sublabel: "Curated Collection",
    description: "Explore our single-origin harvests and lab-verified sports nutrition.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    productCount: 4,
  };

  const isComboCategory = slug === "combo-packages";
  const categoryProducts = productsData.filter((p) => p.categorySlug === slug);

  return (
      <div className="bg-[#F7F5ED] min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Collections", href: "/shop" },
              { label: category.name },
            ]}
          />

            {/* Category Hero Banner - Editorial Header */}
            <div className="relative rounded-3xl overflow-hidden shadow-elevate mb-12 min-h-[260px] sm:min-h-[320px] flex items-center bg-[#173F35] text-white">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#173F35]/95 via-[#173F35]/80 to-[#0F2B24]/75" />
              </div>

              <div className="relative p-6 sm:p-12 z-10 max-w-2xl space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A54A] block">
                  {category.sublabel || "Pantry Collection"}
                </span>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-white tracking-tight leading-tight">
                    {category.name}
                  </h1>

                    <p className="text-xs sm:text-sm text-[#F7F5ED]/80 leading-relaxed max-w-lg">
                      {category.description}
                    </p>

                        <div className="pt-2 flex items-center gap-4 text-xs text-[#F7F5ED]/75">
                          <span className="flex items-center gap-1.5">
                            <FiShield className="text-[#829B76]" size={13} />
                            100% Traceable Origin
                          </span>
                          <span>•</span>
                            <span className="font-mono text-[#D6A54A]">
                              {isComboCategory
                                ? `${comboPackages.length} Curated Rituals`
                                : `${categoryProducts.length} Items Available`}
                            </span>
                        </div>
                    </div>
                  </div>

                  {/* Content: Bundles vs Products */}
                  {isComboCategory ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                  {comboPackages.map((combo) => (
                                    <div
                                      key={combo.id}
                                      className="bg-white rounded-3xl overflow-hidden border border-[#E7E3D8] shadow-subtle hover:shadow-elevate transition-all duration-300 flex flex-col justify-between"
                                    >
                                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFECE1]">
                                        <img
                                          src={combo.image}
                                          alt={combo.name}
                                          className="w-full h-full object-cover editorial-img"
                                        />
                                        <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#173F35] text-[#F7F5ED]">
                                          {combo.savingsBadge}
                                        </span>
                                      </div>

                                      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                                        <div>
                                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#777D76] block mb-1">
                                            {combo.tag}
                                          </span>
                                        <h3 className="text-xl sm:text-2xl font-normal font-editorial text-[#173F35] mb-2">
                                          {combo.name}
                                        </h3>
                                        <p className="text-xs text-[#777D76] leading-relaxed mb-4">
                                          {combo.description}
                                        </p>

                                                <div className="space-y-1.5 py-3 border-y border-[#E7E3D8]/80 text-xs">
                                                  {combo.includedProducts.map((prod, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-[#252A26]">
                                                      <span className="w-1.5 h-1.5 rounded-full bg-[#829B76]" />
                                                      <span className="truncate">{prod}</span>
                                                    </div>
                      ))}
                                              </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-4 pt-2">
                                              <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold text-[#173F35]">
                                                  ৳{combo.discountedPrice.toLocaleString()}
                                                </span>
                                                <span className="text-xs line-through text-[#777D76]">
                                                  ৳{combo.originalPrice.toLocaleString()}
                                                </span>
                                              </div>

                                              <button
                                                onClick={() =>
                                                  addToCart(
                                                    {
                                                      id: combo.id,
                                                      name: combo.name,
                                                      discountedPrice: combo.discountedPrice,
                                                      regularPrice: combo.originalPrice,
                                                      images: [combo.image],
                                                      weight: "Curated Set",
                                                    },
                                                    1
                                                  )
                                                }
                                                className="px-6 py-2.5 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-sm"
                                              >
                                                <FiShoppingBag size={13} />
                                                <span>Add Bundle</span>
                                              </button>
                                            </div>
                                          </div>
                                      </div>
            ))}
                                    </div>
                                  ) : (
                                  <div>
                                    {categoryProducts.length === 0 ? (
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
                                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                            {categoryProducts.map((product) => (
                                              <ProductCard key={product.id} product={product} />
                                            ))}
                                          </div>
            )}
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
                                          {categoriesData
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
