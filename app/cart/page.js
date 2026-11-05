"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
    FiTrash2,
    FiPlus,
    FiMinus,
    FiShoppingBag,
    FiTruck,
    FiCheck,
    FiShield,
    FiArrowRight,
    FiTag
  } from "react-icons/fi";
import toast from "react-hot-toast";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    freeDeliveryThreshold,
    freeDeliveryProgress,
    amountNeededForFreeDelivery,
    openCheckoutModal,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === "FIT10" || cleanCode === "FITBARI10") {
      const discount = Math.round(cartSubtotal * 0.1);
      setCouponDiscount(discount);
      setAppliedCoupon(cleanCode);
        toast.success("10% Promotional Coupon Applied", {
          style: {
            background: "#173F35",
            color: "#F7F5ED",
          },
        });
      } else {
        toast.error("Invalid coupon code. Try 'FIT10' for 10% off");
      }
  };

    const shippingCost = amountNeededForFreeDelivery === 0 ? 0 : 80;
    const finalTotal = Math.max(0, cartSubtotal - couponDiscount + shippingCost);

    return (
        <div className="bg-[#F7F5ED] min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumbs */}
            <Breadcrumbs items={[{ label: "Shopping Bag" }]} />

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                    ORDER REVIEW
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-normal font-editorial text-[#173F35] tracking-tight mt-1">
                    Your Pantry Bag
                  </h1>
              </div>

              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-[#777D76] hover:text-red-600 flex items-center gap-1 font-medium transition-colors"
                >
                  <FiTrash2 size={13} />
                  <span>Empty Bag</span>
                </button>
              )}
            </div>

            {cart.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-[#E7E3D8] shadow-subtle space-y-4 max-w-lg mx-auto">
                    <div className="w-16 h-16 rounded-full bg-[#F7F5ED] text-[#777D76] flex items-center justify-center mx-auto border border-[#E7E3D8]">
                      <FiShoppingBag size={28} />
                    </div>
                      <h3 className="text-lg font-semibold text-[#173F35]">Your bag is currently empty</h3>
                      <p className="text-xs text-[#777D76] leading-relaxed">
                        Explore our single-origin harvests and clean sports nutrition to fill your pantry bag.
                      </p>
                      <div className="pt-2">
                        <Link
                          href="/shop"
                          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all"
                        >
                          <span>Browse Products</span>
                          <FiArrowRight size={13} />
                        </Link>
                      </div>
                  </div>
                  ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left: Cart Items List (8 cols) */}
                    <div className="lg:col-span-8 space-y-4">

                      {/* Free Delivery Meter */}
                            <div className="bg-white rounded-2xl p-5 border border-[#E7E3D8] shadow-subtle">
                              <div className="flex items-center justify-between text-xs font-medium mb-2">
                                <span className="flex items-center gap-2 text-[#252A26]">
                                  <FiTruck className="text-[#829B76]" size={15} />
                                  {amountNeededForFreeDelivery > 0 ? (
                                    <span>
                                      Add <strong className="text-[#173F35]">৳{amountNeededForFreeDelivery.toLocaleString()}</strong> more for <strong>Free Delivery nationwide</strong>
                                    </span>
                                  ) : (
                      <span className="text-[#173F35] font-semibold flex items-center gap-1">
                        <FiCheck className="text-[#829B76]" size={14} /> Free Express Delivery Unlocked
                      </span>
                    )}
                  </span>
                  <span className="text-[#777D76] text-[11px] font-mono">{freeDeliveryProgress}%</span>
                </div>
                                <div className="w-full bg-[#F7F5ED] h-1.5 rounded-full overflow-hidden border border-[#E7E3D8]/80">
                                  <div
                                    className={`h-full transition-all duration-500 rounded-full ${freeDeliveryProgress >= 100
                                        ? "bg-[#173F35]"
                                        : "bg-[#829B76]"
                                      }`}
                                    style={{ width: `${freeDeliveryProgress}%` }}
                                  />
                                </div>
                              </div>

                              {/* Items Card List */}
                                <div className="bg-white rounded-3xl border border-[#E7E3D8] overflow-hidden shadow-subtle divide-y divide-[#E7E3D8]">
                                  {cart.map((item) => {
                                    const unitPrice = item.product.discountedPrice || item.product.regularPrice;
                                    const itemTotal = unitPrice * item.quantity;

                                    return (
                                      <div
                                        key={`${item.product.id}-${item.selectedWeight}`}
                                        className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                      >
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                          <img
                                            src={item.product.images?.[0] || item.product.image}
                                            alt={item.product.name}
                                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-[#F7F5ED] flex-shrink-0 border border-[#E7E3D8]"
                                          />
                                          <div className="min-w-0">
                                            <Link
                                              href={`/product/${item.product.id}`}
                                              className="text-xs sm:text-sm font-semibold text-[#173F35] hover:text-[#829B76] transition-colors line-clamp-1"
                                            >
                                              {item.product.name}
                                            </Link>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] text-[#777D76]">
                                                  {item.selectedWeight}
                                                </span>
                                                  <span className="text-xs text-[#777D76]">
                                                    ৳{unitPrice.toLocaleString()} each
                                                  </span>
                                                </div>
                                            </div>
                                          </div>

                                          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                                            {/* Stepper */}
                                              <div className="flex items-center border border-[#E7E3D8] rounded-full overflow-hidden bg-[#F7F5ED]">
                                                <button
                                                  onClick={() =>
                                                    updateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)
                                                  }
                                                  className="w-8 h-8 flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
                                                >
                                                  <FiMinus size={11} />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold text-[#173F35]">
                                                  {item.quantity}
                                                </span>
                                                <button
                                                  onClick={() =>
                                                    updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)
                                                  }
                                                  className="w-8 h-8 flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
                                                >
                                                  <FiPlus size={11} />
                                                </button>
                                              </div>

                                                {/* Total */}
                                                <span className="text-sm sm:text-base font-bold text-[#173F35] min-w-[70px] text-right">
                                                  ৳{itemTotal.toLocaleString()}
                                                </span>

                                                <button
                                                  onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                                                  className="text-[#777D76] hover:text-red-600 p-1.5 transition-colors"
                                                  title="Remove item"
                                                >
                                                  <FiTrash2 size={15} />
                                                </button>
                                            </div>
                                          </div>
                                          );
                })}
                                        </div>

                                        <div className="pt-2">
                                          <Link
                                            href="/shop"
                                            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#173F35] hover:text-[#829B76] transition-colors"
                                          >
                                            &larr; <span>Continue Shopping Collections</span>
                                          </Link>
                                        </div>
                                      </div>

                                    {/* Right: Summary (4 cols) */ }
                                    <div className="lg:col-span-4 space-y-6">
                                          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E3D8] shadow-subtle space-y-5">
                                            <h3 className="text-base font-normal font-editorial text-[#173F35] pb-3 border-b border-[#E7E3D8]">
                                              Summary
                                            </h3>

                                            <div className="space-y-2 text-xs">
                                                  <div className="flex justify-between text-[#777D76]">
                                                    <span>Items Subtotal</span>
                                                    <span className="font-semibold text-[#252A26]">
                                                      ৳{cartSubtotal.toLocaleString()}
                                                    </span>
                                                  </div>

                                                  {couponDiscount > 0 && (
                                                      <div className="flex justify-between text-[#829B76] font-semibold">
                                                        <span>Promo ({appliedCoupon})</span>
                                                        <span>-৳{couponDiscount.toLocaleString()}</span>
                                                      </div>
                  )}

                                                          <div className="flex justify-between text-[#777D76]">
                                                            <span>Nationwide Shipping</span>
                                                            <span className="font-semibold text-[#829B76]">
                                                              {shippingCost === 0 ? "FREE" : "৳80"}
                                                            </span>
                                                          </div>

                                                            <div className="flex justify-between text-base font-bold text-[#173F35] pt-3 border-t border-[#E7E3D8]">
                                                              <span>Payable Total</span>
                                                              <span>৳{finalTotal.toLocaleString()}</span>
                                                            </div>
                                                          </div>

                                                          {/* Coupon Code */}
                                                          <form onSubmit={handleApplyCoupon} className="pt-2">
                                                              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1.5">
                                                                Promotional Voucher
                                                              </label>
                                                              <div className="flex gap-2">
                                                                <div className="relative flex-1">
                                                                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777D76]" size={13} />
                                                                  <input
                                                                    type="text"
                                                                    value={couponCode}
                                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                                    placeholder="e.g. FIT10"
                                                                    className="w-full pl-8 pr-3 py-2 text-xs rounded-full border border-[#E7E3D8] uppercase font-mono outline-none focus:border-[#173F35]"
                                                                  />
                                                                </div>
                                                                <button
                                                                  type="submit"
                                                                  className="px-4 py-2 rounded-full bg-[#173F35] text-white text-xs font-semibold hover:bg-[#0F2B24] transition-colors"
                                                                >
                                                                  Apply
                                                                </button>
                                                              </div>
                                                                <span className="text-[10px] text-[#777D76] mt-1 block">
                                                                  Use code <strong>FIT10</strong> for 10% promotional discount.
                                                                </span>
                                                              </form>

                                                              {/* Checkout Trigger */}
                                                              <button
                                                                onClick={openCheckoutModal}
                                                                className="w-full py-3.5 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                                                              >
                                                                <span>Proceed to Direct Checkout</span>
                                                                <FiArrowRight size={13} />
                                                              </button>

                                                                <div className="pt-2 space-y-1.5 text-[11px] text-[#777D76] border-t border-[#E7E3D8]">
                                                                  <div className="flex items-center gap-1.5">
                                                                    <FiShield className="text-[#829B76]" size={12} />
                                                                    <span>256-Bit Encrypted Order Processing</span>
                                                                  </div>
                                                                  <div className="flex items-center gap-1.5">
                                                                    <FiCheck className="text-[#829B76]" size={12} />
                                                                    <span>Cash on Delivery Supported Across Bangladesh</span>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>

                                                          </div>
        )}

                                                      </div>
                                                    </div>
                                                  );
}
