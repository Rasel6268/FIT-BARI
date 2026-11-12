"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import fallbackProducts from "@/data/products.json";
import fallbackCategories from "@/data/categories.json";
import { fetchProducts, fetchCategories, normalizeProduct, normalizeCategory } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  FiFilter,
  FiSliders,
  FiX,
  FiRotateCcw,
  FiSearch
} from "react-icons/fi";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [productsData, setProductsData] = useState(() => fallbackProducts.map(normalizeProduct));
  const [categoriesData, setCategoriesData] = useState(() => fallbackCategories.map(normalizeCategory));
  const [loading, setLoading] = useState(false);

  const [searchFilter, setSearchFilter] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(5000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Load live catalog and categories from backend API
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.allSettled([
          fetchProducts(),
          fetchCategories(),
        ]);

        if (isMounted) {
          if (prodRes.status === "fulfilled" && prodRes.value.products?.length > 0) {
            setProductsData(prodRes.value.products);
          }
          if (catRes.status === "fulfilled" && catRes.value?.length > 0) {
            setCategoriesData(catRes.value);
          }
        }
      } catch (err) {
        console.warn("Shop: backend fetch warning, using bundled catalog", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => {
        if (searchFilter.trim() !== "") {
          const q = searchFilter.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q);
          if (!match) return false;
        }
        if (selectedCategory !== "all" && p.categorySlug !== selectedCategory) {
          return false;
        }
        const price = p.discountedPrice || p.regularPrice;
        if (price > priceRange) {
          return false;
        }
        if (inStockOnly && !p.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.discountedPrice || a.regularPrice;
        const priceB = b.discountedPrice || b.regularPrice;

        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [searchFilter, selectedCategory, priceRange, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSearchFilter("");
    setSelectedCategory("all");
    setPriceRange(5000);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const hasActiveFilters =
    searchFilter !== "" ||
    selectedCategory !== "all" ||
    priceRange < 5000 ||
    inStockOnly;

  return (
    <div className="bg-[#F7F5ED] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Pantry Catalog" }]} />

        {/* Editorial Page Header */}
        <div className="mb-10 sm:mb-12 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
            CURATED CATALOG
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] tracking-tight">
            All Nutritional Essentials
          </h1>
          <p className="text-xs sm:text-sm text-[#777D76] max-w-xl leading-relaxed">
            Every product is single-origin or lab-verified for label claim purity. Zero artificial syrups, zero chemical fillers.
          </p>
        </div>

        {/* Layout: Sidebar + Main Product Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Desktop Filters Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-6 border border-[#E7E3D8] shadow-subtle space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E3D8]">
              <div className="flex items-center gap-2">
                <FiSliders className="text-[#173F35]" />
                <h3 className="font-bold text-[#173F35] text-xs uppercase tracking-wider">
                  Filter Catalog
                </h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#777D76] hover:text-[#173F35] flex items-center gap-1 transition-colors"
                >
                  <FiRotateCcw size={10} /> Reset
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-2">
                Search
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777D76]" size={13} />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="e.g. Honey, Whey..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-2">
                Collections
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedCategory === "all"
                      ? "bg-[#173F35] text-[#F7F5ED] font-semibold"
                      : "text-[#252A26] hover:bg-[#F7F5ED]"
                    }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] opacity-75">{productsData.length}</span>
                </button>
                {categoriesData.map((cat) => {
                  const count = productsData.filter((p) => p.categorySlug === cat.slug).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedCategory === cat.slug
                          ? "bg-[#173F35] text-[#F7F5ED] font-semibold"
                          : "text-[#252A26] hover:bg-[#F7F5ED]"
                        }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] opacity-75">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#173F35]">
                  Max Price
                </label>
                <span className="text-xs font-bold text-[#173F35]">
                  ৳{priceRange.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#173F35] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#777D76] mt-1">
                <span>৳400</span>
                <span>৳5,000</span>
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-2 border-t border-[#E7E3D8]">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#252A26]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#173F35] focus:ring-[#173F35] w-3.5 h-3.5 accent-[#173F35]"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* Main Products Grid Area (9 cols) */}
          <div className="lg:col-span-9 space-y-6">

            {/* Top Bar Controls */}
            <div className="bg-white rounded-2xl p-4 border border-[#E7E3D8] shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <span className="text-xs text-[#777D76]">
                  Showing <strong className="text-[#173F35]">{filteredProducts.length}</strong> items
                </span>

                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden px-3 py-1.5 rounded-full bg-[#173F35] text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <FiFilter size={12} />
                  <span>Filters</span>
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <label className="text-xs text-[#777D76] whitespace-nowrap">
                  Sort:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-full border border-[#E7E3D8] bg-[#F7F5ED] text-[#252A26] font-medium outline-none focus:border-[#173F35] cursor-pointer"
                >
                  <option value="featured">Featured Stacking</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="name-asc">Alphabetical (A–Z)</option>
                </select>
              </div>
            </div>

            {/* Active Filter Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#777D76]">Filters applied:</span>
                {selectedCategory !== "all" && (
                  <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] flex items-center gap-1">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("all")}>
                      <FiX size={12} />
                    </button>
                  </span>
                )}
                {searchFilter && (
                  <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] flex items-center gap-1">
                    &ldquo;{searchFilter}&rdquo;
                    <button onClick={() => setSearchFilter("")}>
                      <FiX size={12} />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#829B76] hover:underline font-semibold"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E3D8] shadow-subtle space-y-4">
                <h3 className="text-base font-semibold text-[#173F35]">
                  No matching nutritional items
                </h3>
                <p className="text-xs text-[#777D76] max-w-sm mx-auto">
                  Broaden your price range or remove active filters to discover our staples.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#173F35] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white p-6 shadow-elevate flex flex-col justify-between z-50 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E3D8]">
                <h3 className="font-semibold text-sm text-[#173F35]">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-md text-[#777D76]"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173F35] mb-2 uppercase">
                  Collections
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs ${selectedCategory === "all" ? "bg-[#173F35] text-white" : "text-[#252A26]"
                      }`}
                  >
                    All Categories
                  </button>
                  {categoriesData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs ${selectedCategory === cat.slug ? "bg-[#173F35] text-white" : "text-[#252A26]"
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173F35] mb-2 uppercase">
                  Max Price: ৳{priceRange}
                </label>
                <input
                  type="range"
                  min="400"
                  max="5000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#173F35]"
                />
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 rounded-full bg-[#173F35] text-white text-xs font-semibold uppercase"
            >
              Show Items ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F5ED] py-16 text-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#173F35] border-t-[#D6A54A] animate-spin mx-auto mb-4" />
          <p className="text-xs font-bold uppercase tracking-wider text-[#173F35]">Loading FIT BARI Pantry...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
