"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import fallbackCategories from "@/data/categories.json";
import { fetchCategories, normalizeCategory } from "@/lib/api";
import siteData from "@/data/site.json";
import {
  FiX,
  FiSearch,
  FiChevronDown,
  FiShoppingBag,
  FiHeart,
  FiArrowRight
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function MobileNavDrawer({ isOpen, onClose }) {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [categories, setCategories] = useState(() => fallbackCategories.map(normalizeCategory));
  const { cartCount, wishlist, openSearch } = useCart();

  useEffect(() => {
    let isMounted = true;
    fetchCategories()
      .then((cats) => {
        if (isMounted && cats && cats.length > 0) {
          setCategories(cats);
        }
      })
      .catch(() => { });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F7F5ED] shadow-elevate flex flex-col z-50 animate-slideRight overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-[#E7E3D8] flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            aria-label="FIT BARI Home"
            className="flex items-center group select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35]/40 rounded-lg"
          >
            <img
              src="/images/logo.png"
              alt="FIT BARI - Pure Nutrition"
              width={874}
              height={274}
              className="h-8.5 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              style={{ aspectRatio: "874 / 274" }}
            />
          </Link>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#E7E3D8] flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Search Trigger */}
        <div className="p-4 border-b border-[#E7E3D8]">
          <button
            onClick={() => {
              onClose();
              openSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E3D8] text-xs text-[#777D76]"
          >
            <span className="flex items-center gap-2">
              <FiSearch size={14} className="text-[#173F35]" />
              <span>Search products, seeds, honey...</span>
            </span>
          </button>
        </div>

        {/* Links List */}
        <div className="flex-1 p-4 space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#252A26] hover:text-[#173F35] hover:bg-white rounded-lg"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#252A26] hover:text-[#173F35] hover:bg-white rounded-lg"
          >
            All Products
          </Link>

          {/* Categories Accordion */}
          <div className="pt-2 pb-1">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#173F35] bg-white rounded-lg border border-[#E7E3D8]"
            >
              <span>Collections</span>
              <FiChevronDown
                size={14}
                className={`transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {categoriesOpen && (
              <div className="mt-2 space-y-1.5 pt-1">
                  {
                    categories.map((cat) => (
                      <Link
                        key={cat.id || cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 text-xs text-[#252A26] hover:text-[#173F35] hover:bg-white rounded-xl transition-all border border-transparent hover:border-[#E7E3D8]"
                      >
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#FAF7EF] flex-shrink-0 border border-[#E7E3D8]/80">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold truncate">{cat.name}</span>
                            <span className="text-[10px] text-[#829B76] font-medium ml-2 flex-shrink-0">
                              {cat.productCount} items
                            </span>
                          </div>
                          <p className="text-[10px] text-[#777D76] truncate">{cat.sublabel}</p>
                        </div>
                      </Link>
                    ))
                  }
              </div>
            )}
          </div>

          <Link
            href="/category/combo-packages"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#252A26] hover:text-[#173F35] hover:bg-white rounded-lg"
          >
            Curated Bundles
          </Link>

          <Link
            href="/about"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#252A26] hover:text-[#173F35] hover:bg-white rounded-lg"
          >
            Our Story & Purity
          </Link>

          <Link
            href="/contact"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#252A26] hover:text-[#173F35] hover:bg-white rounded-lg"
          >
            Contact & Banani Center
          </Link>

          <Link
            href="/track-order"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#173F35] bg-[#173F35]/5 hover:bg-[#173F35]/10 rounded-lg font-bold"
          >
            Track Order Status
          </Link>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-white border-t border-[#E7E3D8] space-y-3">
          <div className="flex items-center justify-between text-xs font-medium text-[#252A26]">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-1.5 hover:text-[#173F35]"
            >
              <FiHeart size={14} /> Wishlist ({wishlist.length})
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center gap-1.5 hover:text-[#173F35]"
            >
              <FiShoppingBag size={14} /> Cart ({cartCount})
            </Link>
          </div>

          <div className="pt-2 border-t border-[#E7E3D8] text-[11px] text-[#777D76] text-center">
            Hotline: <strong className="text-[#173F35]">{siteData.contact.hotline}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
