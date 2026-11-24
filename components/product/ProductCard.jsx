"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiHeart, FiEye, FiShoppingBag, FiStar } from "react-icons/fi";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useCart();
  const productId = product.slug || product.id || product._id;
  const isWishlisted = isInWishlist(productId) || (product.id && isInWishlist(product.id));

  const price =
    typeof product.price === "number"
      ? product.price
      : product.discountedPrice || product.regularPrice || 0;
  const originalPrice =
    typeof product.originalPrice === "number"
      ? product.originalPrice
      : product.regularPrice || price;
  const hasDiscount = originalPrice > price;
  const discountPct =
    product.discountPercentage ||
    (hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl border border-[#E7E3D8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#173F35]/40 hover:shadow-subtle">
      {/* Top Image Container - Compact Aspect Ratio */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F7F5ED]">
        {/* Savings Pill */}
        {hasDiscount && (
          <span className="absolute top-2.5 left-2.5 z-10 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#173F35] text-[#F7F5ED] shadow-sm">
            Save {discountPct}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#173F35] ${
            isWishlisted
              ? "bg-[#173F35] text-[#D6A54A] shadow-sm"
              : "bg-white/85 backdrop-blur-sm text-[#777D76] hover:text-[#173F35] hover:bg-white shadow-subtle"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart size={13} className={isWishlisted ? "fill-current" : ""} />
        </button>

        {/* Product Image */}
        <Link href={`/product/${productId}`} className="block w-full h-full">
          <img
            src={product.images?.[0] || product.image || "/images/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out editorial-img"
            loading="lazy"
          />
        </Link>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={() => openQuickView(product)}
            className="py-1.5 px-3 rounded-full bg-white/95 backdrop-blur-md text-[#252A26] hover:text-[#173F35] hover:bg-white text-[11px] font-semibold shadow-sm border border-[#E7E3D8] transition-all flex items-center gap-1 active:scale-95"
          >
            <FiEye size={12} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content Area - Clean, Compact & No Unnecessary Text */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] text-[#777D76] mb-1">
            <span className="font-semibold uppercase tracking-wider truncate max-w-[70%]">
              {product.category}
            </span>
            {product.rating > 0 && (
              <div className="flex items-center gap-0.5 font-medium text-[#252A26] flex-shrink-0">
                <FiStar size={10} className="text-[#D6A54A] fill-current" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/product/${productId}`} className="block">
            <h3 className="text-xs sm:text-[13px] font-semibold text-[#252A26] hover:text-[#173F35] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-2.5 pt-2 border-t border-[#E7E3D8]/70 flex items-center justify-between gap-1.5">
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-sm sm:text-base font-bold text-[#173F35]">
              ৳{price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-[11px] line-through text-[#777D76] truncate">
                ৳{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="h-7 sm:h-8 px-2.5 sm:px-3 rounded-full bg-[#173F35] hover:bg-[#0F2B24] active:scale-95 text-[#F7F5ED] text-[11px] font-semibold inline-flex items-center gap-1 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#173F35] flex-shrink-0"
            aria-label={`Add ${product.name} to cart`}
            title="Add to cart"
          >
            <FiShoppingBag size={12} />
            <span className="hidden xs:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
