"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FiHeart, FiShoppingBag, FiArrowRight } from "react-icons/fi";

export default function WishlistPage() {
  const { wishlist, addToCart } = useCart();

  const handleAddAllToCart = () => {
    wishlist.forEach((p) => addToCart(p, 1));
  };

  return (
    <div className="bg-[#F7F5ED] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Saved Favorites" }]} />

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E3D8] shadow-subtle mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
              SAVED NOURISHMENT
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal font-editorial text-[#173F35] tracking-tight mt-1">
              Your Personal Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-[#777D76] mt-1">
              {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved in your private selection
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="px-6 py-3 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <FiShoppingBag size={14} />
              <span>Add All to Cart</span>
            </button>
          )}
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-[#E7E3D8] shadow-subtle space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F7F5ED] text-[#777D76] flex items-center justify-center mx-auto border border-[#E7E3D8]">
              <FiHeart size={28} />
            </div>
            <h3 className="text-lg font-semibold text-[#173F35]">Your wishlist is currently empty</h3>
            <p className="text-xs text-[#777D76] leading-relaxed">
              Explore our single-origin Sundarban raw honey, lab-tested whey isolate, and organic chia seeds to save your favorites.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <span>Browse Catalog</span>
                <FiArrowRight size={13} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
                        <ProductCard
                          key={product.slug || product.id || product._id}
                          product={product}
                        />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
