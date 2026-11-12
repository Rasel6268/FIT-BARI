"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  FiX,
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiCheck,
  FiPlus,
  FiMinus,
  FiArrowRight
} from "react-icons/fi";

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
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

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-elevate border border-[#E7E3D8] overflow-hidden z-10 animate-scaleUp">
          {/* Close Button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#F7F5ED] hover:bg-white border border-[#E7E3D8] flex items-center justify-center text-[#252A26] transition-colors focus:outline-none focus:ring-2 focus:ring-[#173F35]"
            aria-label="Close modal"
          >
            <FiX size={16} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 bg-[#F7F5ED] flex flex-col justify-between">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#E7E3D8] relative">
                <img
                  src={images[selectedImageIdx] || images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover editorial-img"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#173F35] text-[#F7F5ED] shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${selectedImageIdx === idx
                        ? "border-[#173F35] shadow-sm"
                        : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details & Action */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#777D76]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#252A26]">
                    <FiStar size={11} className="text-[#D6A54A] fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-[#777D76]">({product.reviewCount})</span>
                  </div>
                </div>

                <h3 className="text-xl font-normal font-editorial text-[#173F35] leading-snug">
                  {product.name}
                </h3>

                <p className="text-xs text-[#777D76] mt-2 line-clamp-3 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#173F35]">
                    ৳{price.toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm line-through text-[#777D76]">
                      ৳{originalPrice.toLocaleString()}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#173F35]/10 text-[#173F35]">
                      Save {product.discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Spec details */}
                <div className="mt-4 space-y-1 text-xs text-[#252A26]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#777D76]">Pack Size:</span>
                    <span className="font-semibold">{product.weight}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#777D76]">Origin:</span>
                    <span className="font-semibold truncate">{product.origin}</span>
                  </div>
                </div>

                {/* Benefits */}
                {product.benefits && (
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-[#E7E3D8]">
                    {product.benefits.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#252A26]">
                        <FiCheck className="text-[#829B76] flex-shrink-0 mt-0.5" size={12} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Add */}
              <div className="pt-4 border-t border-[#E7E3D8] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E7E3D8] rounded-full overflow-hidden bg-[#F7F5ED] h-11">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-full flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus size={11} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#173F35]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-full flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <FiPlus size={11} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-11 px-5 rounded-full bg-[#173F35] hover:bg-[#0F2B24] active:scale-[0.98] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                  >
                    <FiShoppingBag size={14} />
                    <span>Add to Cart • ৳{(price * quantity).toLocaleString()}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-11 h-11 rounded-full border transition-all flex items-center justify-center flex-shrink-0 ${isWishlisted
                      ? "border-[#173F35] bg-[#173F35] text-[#D6A54A]"
                      : "border-[#E7E3D8] hover:border-[#173F35] text-[#777D76]"
                      }`}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <FiHeart size={16} className={isWishlisted ? "fill-current" : ""} />
                  </button>
                </div>

                <div className="text-center pt-1">
                  <Link
                    href={`/product/${productId}`}
                    onClick={closeQuickView}
                    className="text-[11px] font-semibold uppercase tracking-wider text-[#173F35] hover:text-[#829B76] inline-flex items-center gap-1 transition-colors group"
                  >
                    <span>Full Product Specification</span>
                    <FiArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
