"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiHeart, FiEye, FiShoppingBag, FiStar } from "react-icons/fi";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const price = product.discountedPrice || product.regularPrice;
  const originalPrice = product.regularPrice;
  const hasDiscount = originalPrice > price;

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E7E3D8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#173F35]/40 hover:shadow-subtle">
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F7F5ED]">
        {/* Subtle Savings Pill */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#173F35] text-[#F7F5ED]">
            Save {product.discountPercentage}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isWishlisted
          ? "bg-[#173F35] text-[#D6A54A]"
          : "bg-white/80 backdrop-blur-sm text-[#777D76] hover:text-[#173F35] hover:bg-white"
        }`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
      <FiHeart size={15} className={isWishlisted ? "fill-current" : ""} />
    </button>

        {/* Product Image */ }
  <Link href={`/product/${product.id}`} className="block w-full h-full">
    <img
      src={product.images?.[0] || product.image}
      alt={product.name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 editorial-img"
      loading="lazy"
    />
  </Link>

  {/* Hover Quick Action Drawer */ }
  <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
    <button
      onClick={() => openQuickView(product)}
      className="flex-1 py-2 px-3 rounded-full bg-white/95 backdrop-blur-md text-[#252A26] hover:text-[#173F35] hover:bg-white text-xs font-semibold shadow-sm border border-[#E7E3D8] transition-all flex items-center justify-center gap-1.5"
    >
      <FiEye size={13} />
      <span>Quick View</span>
    </button>
    <button
      onClick={() => addToCart(product, 1)}
      className="w-9 h-9 rounded-full bg-[#173F35] text-[#F7F5ED] hover:bg-[#0F2B24] flex items-center justify-center shadow-sm transition-all"
      title="Quick Add"
    >
      <FiShoppingBag size={14} />
    </button>
  </div>
          </div >

    {/* Content Area */ }
    < div className = "p-4 sm:p-5 flex-1 flex flex-col justify-between" >
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
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-[#252A26] hover:text-[#173F35] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Pack info & availability */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#777D76]">
          <span>{product.weight}</span>
          <span className="text-[#829B76] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#829B76]" />
            In Stock
          </span>
        </div>
      </div>

  {/* Pricing & Add Action */ }
  <div className="mt-4 pt-3 border-t border-[#E7E3D8] flex items-center justify-between gap-2">
    <div className="flex items-baseline gap-2">
      <span className="text-base font-bold text-[#173F35]">
        ৳{price.toLocaleString()}
      </span>
      {hasDiscount && (
        <span className="text-xs line-through text-[#777D76]">
          ৳{originalPrice.toLocaleString()}
        </span>
      )}
    </div>

    {/* Button on mobile / small screen */}
    <button
      onClick={() => addToCart(product, 1)}
      className="sm:hidden p-2 rounded-full bg-[#173F35] text-[#F7F5ED]"
      aria-label="Add to cart"
    >
      <FiShoppingBag size={14} />
    </button>

    <button
      onClick={() => addToCart(product, 1)}
      className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#173F35] hover:text-[#829B76] transition-colors"
    >
      <span>Add</span>
      <FiShoppingBag size={13} />
    </button>
  </div>
                </div >
              </div >
              );
}
