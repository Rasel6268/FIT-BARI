"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import fallbackProducts from "@/data/products.json";
import { fetchProducts, normalizeProduct } from "@/lib/api";
import {
  FiSearch,
  FiX,
  FiShoppingBag,
  FiStar
} from "react-icons/fi";

export default function SearchModal() {
  const { isSearchOpen, closeSearch, addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(() => fallbackProducts.map(normalizeProduct));
  const inputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    fetchProducts()
      .then((res) => {
        if (isMounted && res.products && res.products.length > 0) {
          setProducts(res.products);
        }
      })
      .catch(() => { });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim() === ""
    ? []
    : products.filter((prod) => {
      const query = searchTerm.toLowerCase();
      return (
          prod.name?.toLowerCase().includes(query) ||
        prod.category?.toLowerCase().includes(query) ||
        prod.shortDescription?.toLowerCase().includes(query) ||
        prod.origin?.toLowerCase().includes(query)
        );
});

const popularSearches = [
  "Sundarban Honey",
  "Whey Isolate",
  "Chia Seeds",
  "Peanut Butter",
  "Ajwa Dates",
  "Creatine",
  "Rolled Oats",
  "Bilona Ghee",
];

return (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={closeSearch}
    />

    <div className="min-h-full flex items-start justify-center pt-16 sm:pt-24 px-4 pb-10">
      <div className="relative bg-[#F7F5ED] rounded-3xl max-w-2xl w-full shadow-elevate border border-[#E7E3D8] overflow-hidden z-10 animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E7E3D8] flex items-center gap-3">
          <FiSearch className="text-xl text-[#173F35]" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search raw honey, whey isolate, chia seeds, almonds..."
            className="flex-1 text-sm bg-transparent border-none outline-none text-[#252A26] placeholder-[#777D76]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-xs text-[#777D76] hover:text-[#173F35] px-2 py-1 bg-[#F7F5ED] rounded-md"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="w-8 h-8 rounded-full border border-[#E7E3D8] hover:bg-[#F7F5ED] flex items-center justify-center text-[#252A26] transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Quick Tags when empty */}
        {searchTerm.trim() === "" && (
          <div className="p-6 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76] block">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white border border-[#E7E3D8] text-[#252A26] hover:border-[#173F35] hover:text-[#173F35] transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E7E3D8]">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76] mb-3">
                Trending Staples
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {products.slice(0, 4).map((p) => {
                  const pId = p.slug || p.id;
                  return (
                    <Link
                      key={pId}
                      href={`/product/${pId}`}
                      onClick={closeSearch}
                      className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-[#E7E3D8] hover:border-[#173F35]/40 transition-colors"
                    >
                      <img
                        src={p.images?.[0] || p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover bg-[#F7F5ED] flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#252A26] truncate">{p.name}</p>
                        <p className="text-[11px] font-bold text-[#173F35]">
                          ৳{p.discountedPrice || p.price}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchTerm.trim() !== "" && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
            <div className="text-xs text-[#777D76] px-2 pb-2 flex justify-between items-center">
              <span>
                Found <strong className="text-[#173F35]">{filteredProducts.length}</strong> matching results
              </span>
              {filteredProducts.length > 0 && (
                <Link
                  href={`/shop?q=${encodeURIComponent(searchTerm)}`}
                  onClick={closeSearch}
                  className="text-[#173F35] hover:underline font-semibold"
                >
                  View in Shop &rarr;
                </Link>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <p className="text-sm font-semibold text-[#173F35]">
                  No nutritional items found
                </p>
                <p className="text-xs text-[#777D76]">
                  Try searching for &quot;Honey&quot;, &quot;Whey&quot;, or &quot;Chia&quot;.
                </p>
              </div>
            ) : (
                    filteredProducts.map((p) => {
                  const pId = p.slug || p.id;
                  const currentPrice = p.discountedPrice || p.price || 0;
                  const regPrice = p.regularPrice || p.originalPrice || currentPrice;
                  return (
                  <div
                    key={pId}
                    className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-[#E7E3D8] hover:border-[#173F35] transition-all"
                  >
                          <Link
                            href={`/product/${pId}`}
                            onClick={closeSearch}
                            className="flex items-center gap-3 flex-1 min-w-0"
                          >
                            <img
                              src={p.images?.[0] || p.image}
                              alt={p.name}
                              className="w-12 h-12 rounded-xl object-cover bg-[#F7F5ED] flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#777D76]">
                                {p.category}
                              </span>
                                  <h4 className="text-xs sm:text-sm font-semibold text-[#252A26] truncate hover:text-[#173F35]">
                                    {p.name}
                                  </h4>
                                  <div className="flex items-baseline gap-2 mt-0.5">
                                    <span className="text-xs sm:text-sm font-bold text-[#173F35]">
                                      ৳{currentPrice.toLocaleString()}
                                    </span>
                                    {regPrice > currentPrice && (
                                      <span className="text-[10px] line-through text-[#777D76]">
                                        ৳{regPrice.toLocaleString()}
                                      </span>
                                    )}
                                  </div>
                                </div>
                        </Link>

                      <button
                        onClick={() => addToCart(p, 1)}
                        className="px-3.5 py-1.5 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0"
                      >
                        <FiShoppingBag size={12} />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                    </div>
                    );
                })
              )}
                  </div>
          )}
                </div>
      </div>
    </div>
      );
}
