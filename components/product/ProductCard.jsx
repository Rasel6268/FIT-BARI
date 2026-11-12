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

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E7E3D8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#173F35]/40 hover:shadow-subtle">
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F7F5ED]">
        {/* Savings Pill */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#173F35] text-[#F7F5ED] shadow-sm">
            Save {product.discountPercentage}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#173F35] ${isWishlisted
            ? "bg-[#173F35] text-[#D6A54A] shadow-sm"
            : "bg-white/85 backdrop-blur-sm text-[#777D76] hover:text-[#173F35] hover:bg-white shadow-subtle"
            }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart size={15} className={isWishlisted ? "fill-current" : ""} />
        </button>

        {/* Product Image */}
          <Link href={`/product/${productId}`} className="block w-full h-full">
            <img
              src={product.images?.[0] || product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out editorial-img"
              loading="lazy"
            />
          </Link>

          {/* Quick View Drawer on Desktop Hover */}
          <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
            <button
              onClick={() => openQuickView(product)}
              className="flex-1 py-2 px-3 rounded-full bg-white/95 backdrop-blur-md text-[#252A26] hover:text-[#173F35] hover:bg-white text-xs font-semibold shadow-sm border border-[#E7E3D8] transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <FiEye size={13} />
              <span>Quick View</span>
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className="w-9 h-9 rounded-full bg-[#173F35] text-[#F7F5ED] hover:bg-[#0F2B24] flex items-center justify-center shadow-sm transition-all active:scale-95"
              title="Quick Add to Cart"
              aria-label="Quick Add to Cart"
            >
              <FiShoppingBag size={14} />
            </button>
          </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#777D76]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#252A26]">
              <FiStar size={11} className="text-[#D6A54A] fill-current" />
              <span>{product.rating}</span>
              <span className="text-[#777D76]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
            <Link href={`/product/${productId}`} className="block">
              <h3 className="text-sm font-semibold text-[#252A26] hover:text-[#173F35] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                {product.name}
              </h3>
            </Link>

            {/* Pack info & availability */}
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#777D76]">
              <span>{product.weight}</span>
              <span className="text-[#829B76] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#829B76]" />
                In Stock
              </span>
            </div>
        </div>

        {/* Pricing & Add Action */}
        <div className="mt-4 pt-3.5 border-t border-[#E7E3D8] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-[#173F35]">
              ৳{price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs line-through text-[#777D76]">
                ৳{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Primary Add to Cart Button (Mobile & Desktop) */}
          <button
            onClick={() => addToCart(product, 1)}
            className="h-8 sm:h-9 px-3 sm:px-3.5 rounded-full bg-[#173F35] hover:bg-[#0F2B24] active:scale-95 text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#173F35] focus:ring-offset-1"
            aria-label={`Add ${product.name} to cart`}
          >
            <FiShoppingBag size={13} />
            <span className="hidden xs:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
