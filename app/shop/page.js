"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import fallbackCategories from "@/data/categories.json";
import {
  fetchProducts,
  fetchCategories,
  normalizeProduct,
  normalizeCategory,
} from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  FiFilter,
  FiSliders,
  FiX,
  FiRotateCcw,
  FiSearch,
  FiGrid,
  FiList,
  FiTag,
  FiCheck,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "all";

  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState(() =>
    fallbackCategories.map(normalizeCategory)
  );
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchFilter, setSearchFilter] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState(100000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [bestSellersOnly, setBestSellersOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with searchParams if navigated with URL parameters
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) setSearchFilter(q);
    const cat = searchParams.get("category");
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  // Load live products & categories strictly from Backend API
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.allSettled([
          fetchProducts({ limit: 100 }),
          fetchCategories(),
        ]);

        if (isMounted) {
          if (prodRes.status === "fulfilled" && prodRes.value) {
            const liveItems = prodRes.value.products || [];
            setProductsData(liveItems);
            if (liveItems.length > 0) {
              const maxP = Math.max(...liveItems.map((p) => p.price || 0));
              const upper = Math.max(Math.ceil(maxP / 500) * 500, 2000);
              setPriceRange(upper);
            }
          }
          if (catRes.status === "fulfilled" && catRes.value?.length > 0) {
            setCategoriesData(catRes.value);
          }
        }
      } catch (err) {
        console.warn("Shop: backend fetch error", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute maximum price in current catalog for slider upper bound
  const maxCatalogPrice = useMemo(() => {
    if (!productsData.length) return 6000;
    const highest = Math.max(
      ...productsData.map((p) => p.price || p.discountedPrice || 0)
    );
    return Math.ceil(highest / 500) * 500 || 6000;
  }, [productsData]);

  // Calculate product counts per category
  const categoryCounts = useMemo(() => {
    const counts = {};
    productsData.forEach((p) => {
      const slug = (p.categorySlug || "").toLowerCase();
      counts[slug] = (counts[slug] || 0) + 1;
    });
    return counts;
  }, [productsData]);

  // Active Category Details for Banner
  const currentCategoryObj = useMemo(() => {
    if (selectedCategory === "all") return null;
    return categoriesData.find((c) => c.slug === selectedCategory);
  }, [categoriesData, selectedCategory]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => {
        // Keyword Search (Name, Bengali, Category, Description, Tags, SKU)
        if (searchFilter.trim() !== "") {
          const q = searchFilter.toLowerCase();
          const match =
          p.name?.toLowerCase().includes(q) ||
            p.nameBn?.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q) ||
            p.categorySlug?.toLowerCase().includes(q) ||
            p.shortDescription?.toLowerCase().includes(q) ||
            p.sku?.toLowerCase().includes(q) ||
            (Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(q)));
          if (!match) return false;
        }

          // Category Filter
          if (selectedCategory !== "all") {
            const pCat = (p.categorySlug || "").toLowerCase();
            if (pCat !== selectedCategory.toLowerCase()) {
              return false;
            }
          }

          // Price Filter
          const price = p.price ?? p.discountedPrice ?? p.regularPrice ?? 0;
          if (price > priceRange) {
            return false;
          }

          // In Stock Filter
          if (inStockOnly && !p.inStock) {
            return false;
          }

          // On Sale Filter
          if (onSaleOnly) {
            const orig = p.originalPrice ?? p.regularPrice ?? price;
            if (orig <= price) return false;
          }

          // Best Sellers Filter
          if (bestSellersOnly && !p.isBestSeller) {
            return false;
          }

          return true;
        })
      .sort((a, b) => {
        const priceA = a.price ?? a.discountedPrice ?? a.regularPrice ?? 0;
        const priceB = b.price ?? b.discountedPrice ?? b.regularPrice ?? 0;

        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "newest") return b.isNewArrival ? 1 : -1;
        if (sortBy === "name-asc") return (a.name || "").localeCompare(b.name || "");
        if (sortBy === "name-desc") return (b.name || "").localeCompare(a.name || "");
        // Featured (Best sellers & Trending first)
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return 0;
      });
}, [
  productsData,
  searchFilter,
  selectedCategory,
  priceRange,
  inStockOnly,
  onSaleOnly,
  bestSellersOnly,
  sortBy,
]);

const resetFilters = () => {
  setSearchFilter("");
  setSelectedCategory("all");
  setPriceRange(maxCatalogPrice);
  setInStockOnly(false);
  setOnSaleOnly(false);
  setBestSellersOnly(false);
  setSortBy("featured");
};

const hasActiveFilters =
  searchFilter !== "" ||
  selectedCategory !== "all" ||
priceRange < maxCatalogPrice ||
  inStockOnly ||
  onSaleOnly ||
  bestSellersOnly;

return (
  <div className="bg-[#F7F5ED] min-h-screen py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Pantry Catalog", href: "/shop" },
          ...(currentCategoryObj ? [{ label: currentCategoryObj.name }] : []),
        ]}
      />

        {/* Editorial Page Header / Category Banner */}
        <div className="mb-6 sm:mb-8 space-y-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-editorial text-[#173F35] tracking-tight">
                {currentCategoryObj ? currentCategoryObj.name : "All Nutritional Essentials"}
              </h1>
            </div>

            {/* Total items badge */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#173F35] font-semibold bg-white/80 backdrop-blur-sm border border-[#E7E3D8] px-3 sm:px-4 py-1.5 rounded-full self-start md:self-end">
              <span className="w-2 h-2 rounded-full bg-[#829B76] animate-pulse" />
              <span>{productsData.length} Products</span>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Main Product Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* DESKTOP SIDEBAR FILTERS (3 Cols) */}
          {/* ========================================================= */}
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

            {/* 1. Keyword Search */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-2">
                Search Catalog
              </label>
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777D76]"
                  size={13}
                />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Honey, Whey, Chia, Ghee..."
                  className="w-full pl-8 pr-7 py-2 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none transition-colors"
                />
                {searchFilter && (
                  <button
                    onClick={() => setSearchFilter("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777D76] hover:text-[#173F35]"
                    aria-label="Clear search"
                  >
                    <FiX size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Collections List */}
            <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35]">
                    Collections
                  </label>
                  <span className="text-[10px] text-[#777D76] font-mono">
                    {categoriesData.length} Collections
                  </span>
                </div>

                <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
                  <button
                    onClick={() => setSelectedCategory("all")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${selectedCategory === "all"
                        ? "bg-[#173F35] text-[#F7F5ED] font-semibold shadow-sm"
                        : "text-[#252A26] hover:bg-[#F7F5ED]"
                      }`}
                  >
                    <span>All Collections</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${selectedCategory === "all"
                          ? "bg-white/20 text-[#F7F5ED]"
                          : "bg-[#F7F5ED] text-[#777D76]"
                        }`}
                  >
                      {productsData.length}
                    </span>
                  </button>

                  {categoriesData.map((cat) => {
                    const count = categoryCounts[cat.slug.toLowerCase()] || 0;
                    const isSelected = selectedCategory === cat.slug;
                    return (
                      <button
                        key={cat.id || cat.slug}
                        onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${isSelected
                            ? "bg-[#173F35] text-[#F7F5ED] font-semibold shadow-sm"
                            : "text-[#252A26] hover:bg-[#F7F5ED]"
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span
                        className={`text - [10px] font - mono px - 2 py - 0.5 rounded - full ${
                    isSelected
                    ? "bg-white/20 text-[#F7F5ED]"
                      : "bg-[#F7F5ED] text-[#777D76]"
                  }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#173F35]">
                  Max Price
                </label>
                <span className="text-xs font-bold text-[#173F35] font-mono">
                  ৳{priceRange.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="300"
                max={maxCatalogPrice}
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#173F35] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#777D76] font-mono mt-1">
                <span>৳300</span>
                <span>৳{maxCatalogPrice.toLocaleString()}</span>
              </div>

              {/* Price quick presets */}
              <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                <button
                  type="button"
                  onClick={() => setPriceRange(1000)}
                  className={`text - [10px] py - 1 rounded - lg border text - center transition - colors ${
                    priceRange === 1000
                    ? "border-[#173F35] bg-[#173F35] text-white font-semibold"
                    : "border-[#E7E3D8] hover:border-[#173F35] text-[#777D76]"
                  }`}
                >
                  &le; ৳1,000
                </button>
                <button
                  type="button"
                  onClick={() => setPriceRange(2500)}
                  className={`text-[10px] py-1 rounded-lg border text-center transition-colors ${priceRange === 2500
                      ? "border-[#173F35] bg-[#173F35] text-white font-semibold"
                      : "border-[#E7E3D8] hover:border-[#173F35] text-[#777D76]"
                    }`}
                >
                  &le; ৳2,500
                </button>
                <button
                  type="button"
                  onClick={() => setPriceRange(maxCatalogPrice)}
                  className={`text-[10px] py-1 rounded-lg border text-center transition-colors ${priceRange === maxCatalogPrice
                      ? "border-[#173F35] bg-[#173F35] text-white font-semibold"
                      : "border-[#E7E3D8] hover:border-[#173F35] text-[#777D76]"
                    }`}
                >
                  All
                </button>
              </div>
            </div>

                {/* 4. Filter Toggles */}
                <div className="pt-3 border-t border-[#E7E3D8] space-y-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#252A26] select-none">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded text-[#173F35] focus:ring-[#173F35] w-4 h-4 accent-[#173F35]"
                    />
                    <span className="font-medium">In Stock Items Only</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#252A26] select-none">
                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={(e) => setOnSaleOnly(e.target.checked)}
                      className="rounded text-[#173F35] focus:ring-[#173F35] w-4 h-4 accent-[#173F35]"
                    />
                    <span className="font-medium">Discount & Offers</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#252A26] select-none">
                    <input
                      type="checkbox"
                      checked={bestSellersOnly}
                      onChange={(e) => setBestSellersOnly(e.target.checked)}
                      className="rounded text-[#173F35] focus:ring-[#173F35] w-4 h-4 accent-[#173F35]"
                    />
                    <span className="font-medium">Best Sellers Only</span>
                  </label>
                </div>
              </aside>

              {/* ========================================================= */}
              {/* MAIN PRODUCT LISTING AREA (9 Cols) */}
              {/* ========================================================= */}
              <div className="lg:col-span-9 space-y-6">
                {/* Top Bar Controls */}
                <div className="bg-white rounded-2xl p-4 border border-[#E7E3D8] shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                    <span className="text-xs text-[#777D76]">
                      Showing <strong className="text-[#173F35]">{filteredProducts.length}</strong> of{" "}
                      <strong className="text-[#173F35]">{productsData.length}</strong> products
                    </span>

                    <button
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="lg:hidden px-3.5 py-1.5 rounded-full bg-[#173F35] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <FiFilter size={13} />
                      <span>Filters {hasActiveFilters && "(Active)"}</span>
                    </button>
                  </div>

                    {/* View Switcher & Sort By Dropdown */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      {/* Grid / List Mode Toggle */}
                      <div className="flex items-center border border-[#E7E3D8] rounded-full p-0.5 bg-[#F7F5ED]">
                        <button
                          type="button"
                          onClick={() => setViewMode("grid")}
                          className={`p-1.5 rounded-full transition-colors ${viewMode === "grid"
                              ? "bg-[#173F35] text-white shadow-sm"
                              : "text-[#777D76] hover:text-[#173F35]"
                            }`}
                          title="Grid view"
                          aria-label="Grid view"
                        >
                          <FiGrid size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode("list")}
                          className={`p-1.5 rounded-full transition-colors ${viewMode === "list"
                              ? "bg-[#173F35] text-white shadow-sm"
                              : "text-[#777D76] hover:text-[#173F35]"
                            }`}
                          title="List view"
                          aria-label="List view"
                        >
                          <FiList size={13} />
                        </button>
                      </div>

                      {/* Sort By Dropdown */}
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-[#777D76] whitespace-nowrap hidden sm:inline">
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
                          <option value="newest">Newly Arrived</option>
                          <option value="name-asc">Alphabetical (A–Z)</option>
                          <option value="name-desc">Alphabetical (Z–A)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Active Filters Pill Bar */}
                  {hasActiveFilters && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-xs text-[#777D76] font-medium">Applied:</span>

                        {selectedCategory !== "all" && (
                              <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] font-semibold flex items-center gap-1.5 shadow-xs">
                                <span>
                                  Collection: {currentCategoryObj?.name || selectedCategory}
                                </span>
                                <button
                                  onClick={() => setSelectedCategory("all")}
                                  className="hover:text-red-500 transition-colors"
                                  aria-label="Remove category filter"
                                >
                                  <FiX size={12} />
                                </button>
                              </span>
                )}

                              {searchFilter && (
                                    <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] font-semibold flex items-center gap-1.5 shadow-xs">
                                      <span>&ldquo;{searchFilter}&rdquo;</span>
                                      <button
                                        onClick={() => setSearchFilter("")}
                                        className="hover:text-red-500 transition-colors"
                                        aria-label="Remove search filter"
                                      >
                                        <FiX size={12} />
                                      </button>
                                    </span>
                )}

                                    {priceRange < maxCatalogPrice && (
                                      <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] font-semibold flex items-center gap-1.5 shadow-xs">
                                        <span>&le; ৳{priceRange.toLocaleString()}</span>
                                        <button
                                          onClick={() => setPriceRange(maxCatalogPrice)}
                                          className="hover:text-red-500 transition-colors"
                                          aria-label="Remove price filter"
                                        >
                                          <FiX size={12} />
                                        </button>
                                      </span>
                                    )}

                                    {inStockOnly && (
                                      <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] font-semibold flex items-center gap-1.5 shadow-xs">
                                        <span>In Stock Only</span>
                                        <button
                                          onClick={() => setInStockOnly(false)}
                                          className="hover:text-red-500 transition-colors"
                                          aria-label="Remove in-stock filter"
                                        >
                                          <FiX size={12} />
                                        </button>
                                      </span>
                                    )}

                                    {onSaleOnly && (
                                      <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] font-semibold flex items-center gap-1.5 shadow-xs">
                                        <span>On Sale</span>
                                        <button
                                          onClick={() => setOnSaleOnly(false)}
                                          className="hover:text-red-500 transition-colors"
                                          aria-label="Remove sale filter"
                                        >
                                          <FiX size={12} />
                                        </button>
                                      </span>
                                    )}

                                    {bestSellersOnly && (
                                      <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] font-semibold flex items-center gap-1.5 shadow-xs">
                                        <span>Best Sellers</span>
                                        <button
                                          onClick={() => setBestSellersOnly(false)}
                                          className="hover:text-red-500 transition-colors"
                                          aria-label="Remove best seller filter"
                                        >
                                          <FiX size={12} />
                                        </button>
                                      </span>
                                    )}

                                    <button
                                      onClick={resetFilters}
                                      className="text-xs text-[#829B76] hover:text-[#173F35] underline font-semibold transition-colors ml-1"
                                    >
                                      Clear All
                                    </button>
                                  </div>
            )}

                                  {/* Products Listing Grid / List */}
                                  {loading ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-4.5">
                                      {[...Array(6)].map((_, i) => (
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
                                  ) : productsData.length === 0 ? (
                                    <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E3D8] shadow-subtle space-y-4">
                                      <div className="w-14 h-14 rounded-full bg-[#F7F5ED] border border-[#E7E3D8] flex items-center justify-center mx-auto text-[#173F35]">
                                        <FiShoppingBag size={24} />
                                      </div>
                                      <h3 className="text-xl font-normal font-editorial text-[#173F35]">
                                        Pantry Catalog is Empty
                                      </h3>
                                      <p className="text-xs text-[#777D76] max-w-md mx-auto leading-relaxed">
                                        No products are currently available in the catalog. Products created in the Admin Portal will immediately appear here.
                                      </p>
                                    </div>
                                  ) : filteredProducts.length === 0 ? (
                                    <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E3D8] shadow-subtle space-y-4">
                                      <div className="w-14 h-14 rounded-full bg-[#F7F5ED] border border-[#E7E3D8] flex items-center justify-center mx-auto text-[#777D76]">
                                        <FiSearch size={22} />
                                      </div>
                                      <h3 className="text-lg font-normal font-editorial text-[#173F35]">
                                        No nutritional items found
                                      </h3>
                                      <p className="text-xs text-[#777D76] max-w-sm mx-auto leading-relaxed">
                                        Try adjusting your keywords, expanding the price range slider, or resetting your
                                        applied filters.
                                      </p>
                                      <button
                                        onClick={resetFilters}
                                        className="px-6 py-2.5 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all"
                                      >
                                        Reset All Filters
                                      </button>
                                    </div>
                                  ) : viewMode === "grid" ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-4.5">
                                          {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id || product.slug}
                    product={product}
                  />
                                          ))}
                                        </div>
                                        ) : (
                                        /* List Mode */
                                        <div className="space-y-4">
                                          {filteredProducts.map((product) => {
                                            const pId = product.slug || product.id || product._id;
                                            const price = product.price ?? product.discountedPrice ?? 0;
                                            const origPrice = product.originalPrice ?? product.regularPrice ?? price;
                                            const hasDiscount = origPrice > price;

                                            return (
                                              <div
                                                key={pId}
                                                className="bg-white rounded-xl sm:rounded-2xl border border-[#E7E3D8] p-3 sm:p-5 flex items-center gap-3.5 sm:gap-5 hover:border-[#173F35]/40 hover:shadow-subtle transition-all duration-200"
                                              >
                                                <div className="w-20 h-20 sm:w-32 sm:h-32 aspect-square rounded-xl overflow-hidden bg-[#F7F5ED] flex-shrink-0 border border-[#E7E3D8]/80">
                                                  <img
                                                    src={product.images?.[0] || product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                  />
                                                </div>

                                                <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5 text-left">
                                                  <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#777D76]">
                                                      {product.category}
                                                    </span>
                                                    {hasDiscount && (
                                                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#173F35] text-white">
                                                        Save {product.discountPercentage}%
                                                      </span>
                                                    )}
                                                  </div>

                                                  <a href={`/product/${pId}`} className="block">
                                                    <h3 className="text-xs sm:text-base font-semibold text-[#173F35] hover:text-[#829B76] transition-colors line-clamp-1 sm:line-clamp-2">
                                                      {product.name}
                                                    </h3>
                                                  </a>

                                                  <p className="text-xs text-[#777D76] line-clamp-1 sm:line-clamp-2 hidden xs:block">
                                                    {product.shortDescription || product.description}
                                                  </p>

                                                  {product.rating > 0 && (
                                                    <div className="flex items-center gap-1 text-xs text-[#777D76]">
                                                      <span className="text-[#D6A54A]">★</span>
                                                      <span className="font-medium text-[#252A26]">{product.rating}</span>
                                                    </div>
                                                  )}
                                                </div>

                                                <div className="sm:border-l sm:border-[#E7E3D8] sm:pl-5 flex flex-col items-end gap-2 sm:gap-3 flex-shrink-0 text-right">
                                                  <div>
                                                    <div className="text-sm sm:text-xl font-bold text-[#173F35]">
                                                      ৳{price.toLocaleString()}
                                                    </div>
                                                    {hasDiscount && (
                                                      <div className="text-[10px] sm:text-xs line-through text-[#777D76]">
                                                        ৳{origPrice.toLocaleString()}
                                                      </div>
                                                    )}
                                                  </div>

                                                  <a
                                                    href={`/product/${pId}`}
                                                    className="h-7 sm:h-9 px-3 sm:px-5 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-[11px] sm:text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-sm"
                                                  >
                                                    <FiShoppingBag size={12} />
                                                    <span className="hidden sm:inline">View Product</span>
                                                    <span className="sm:hidden">View</span>
                                                  </a>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
            )}
                                    </div>
        </div>
      </div>

                            {/* ========================================================= */}
                            {/* MOBILE DRAWER FILTERS */}
                            {/* ========================================================= */}
                            {isMobileFilterOpen && (
                              <div className="fixed inset-0 z-50 lg:hidden">
                                <div
                                  className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                                  onClick={() => setIsMobileFilterOpen(false)}
                                />
                                <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white p-6 shadow-elevate flex flex-col justify-between z-50 overflow-y-auto">
                                  <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-3 border-b border-[#E7E3D8]">
                                      <h3 className="font-semibold text-sm text-[#173F35]">Catalog Filters</h3>
                                      <button
                                        onClick={() => setIsMobileFilterOpen(false)}
                                        className="p-1 rounded-md text-[#777D76] hover:text-[#173F35]"
                                      >
                                        <FiX size={18} />
                                      </button>
                                    </div>

                                    {/* Mobile Search */}
                                    <div>
                                      <label className="block text-xs font-bold text-[#173F35] mb-2 uppercase">
                                        Search
                                      </label>
                                      <div className="relative">
                                        <FiSearch
                                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777D76]"
                                          size={13}
                                        />
                                        <input
                                          type="text"
                                          value={searchFilter}
                                          onChange={(e) => setSearchFilter(e.target.value)}
                                          placeholder="Search pantry..."
                                          className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[#E7E3D8] outline-none"
                                        />
                                      </div>
                                    </div>

                                    {/* Mobile Collections */}
                                    <div>
                                      <label className="block text-xs font-bold text-[#173F35] mb-2 uppercase">
                                        Collections
                                      </label>
                                        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                                          <button
                                            onClick={() => {
                                              setSelectedCategory("all");
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-xs flex justify-between items-center ${selectedCategory === "all"
                                                ? "bg-[#173F35] text-white font-semibold"
                                                : "text-[#252A26] hover:bg-[#F7F5ED]"
                                              }`}
                                          >
                                            <span>All Collections</span>
                                            <span>{productsData.length}</span>
                                          </button>
                  {categoriesData.map((cat) => {
                                                const count = categoryCounts[cat.slug.toLowerCase()] || 0;
                                                return (
                                                  <button
                                                    key={cat.id || cat.slug}
                                                    onClick={() => {
                                                      setSelectedCategory(cat.slug);
                                                    }}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex justify-between items-center ${selectedCategory === cat.slug
                                                        ? "bg-[#173F35] text-white font-semibold"
                                                        : "text-[#252A26] hover:bg-[#F7F5ED]"
                                                      }`}
                                            >
                                              <span className="truncate">{cat.name}</span>
                                              <span>{count}</span>
                                            </button>
                                          );
                  })}
                                        </div>
                                      </div>

                                      {/* Mobile Price Range */}
                                      <div>
                                        <div className="flex justify-between items-center mb-1">
                                          <label className="text-xs font-bold text-[#173F35] uppercase">
                                            Max Price
                                          </label>
                                          <span className="text-xs font-bold text-[#173F35] font-mono">
                                            ৳{priceRange.toLocaleString()}
                                          </span>
                                        </div>
                                        <input
                                          type="range"
                                          min="300"
                                          max={maxCatalogPrice}
                                          step="100"
                                          value={priceRange}
                                          onChange={(e) => setPriceRange(Number(e.target.value))}
                                          className="w-full accent-[#173F35]"
                                        />
                                      </div>

                                      {/* Mobile Toggles */}
                                      <div className="space-y-2 pt-2 border-t border-[#E7E3D8]">
                                        <label className="flex items-center gap-2 text-xs">
                                          <input
                                            type="checkbox"
                                            checked={inStockOnly}
                                            onChange={(e) => setInStockOnly(e.target.checked)}
                                            className="accent-[#173F35]"
                                          />
                                          <span>In Stock Only</span>
                                        </label>
                                        <label className="flex items-center gap-2 text-xs">
                                          <input
                                            type="checkbox"
                                            checked={onSaleOnly}
                                            onChange={(e) => setOnSaleOnly(e.target.checked)}
                                            className="accent-[#173F35]"
                                          />
                                          <span>Discount & Offers</span>
                                        </label>
                                        <label className="flex items-center gap-2 text-xs">
                                          <input
                                            type="checkbox"
                                            checked={bestSellersOnly}
                                            onChange={(e) => setBestSellersOnly(e.target.checked)}
                                            className="accent-[#173F35]"
                                          />
                                          <span>Best Sellers Only</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="pt-4 space-y-2">
                                      <button
                                        onClick={() => setIsMobileFilterOpen(false)}
                                        className="w-full py-3 rounded-full bg-[#173F35] text-white text-xs font-semibold uppercase tracking-wider"
                                      >
                                        Show {filteredProducts.length} Products
                                      </button>
                                      {hasActiveFilters && (
                                        <button
                                          onClick={resetFilters}
                                          className="w-full py-2 text-xs text-[#777D76] hover:text-[#173F35] text-center"
                                        >
                                          Reset Filters
                                        </button>
                                      )}
                                    </div>
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
                                  <p className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
                                    Loading FIT BARI Pantry...
                                  </p>
                                </div>
                              }
                            >
                              <ShopContent />
                            </Suspense>
                            );
}
