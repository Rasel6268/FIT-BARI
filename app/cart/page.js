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
      <div className="bg-[#F7F5ED] min-h-screen py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: "Shopping Bag" }]} />

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8 sm:mb-10">
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
                <h3 className="font-editorial text-xl text-[#173F35]">
                  Your pantry bag is currently empty
                </h3>
                <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed max-w-xs mx-auto">
                  Fuel your daily discipline with unheated Sundarban honey, organic chia seeds, and clean gym supplements.
                </p>
                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>Browse Entire Pantry</span>
                    <FiArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* Left: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Delivery Bar Banner */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7E3D8] shadow-subtle space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="flex items-center gap-2 text-[#252A26]">
                    <FiTruck className="text-[#829B76]" size={15} />
                    {amountNeededForFreeDelivery > 0 ? (
                      <span>
                        Add <strong className="text-[#173F35]">৳{amountNeededForFreeDelivery.toLocaleString()}</strong> more to unlock <strong>Complimentary Nationwide Delivery</strong>
                      </span>
                    ) : (
                      <span className="text-[#173F35] font-semibold flex items-center gap-1.5">
                        <FiCheck className="text-[#829B76]" size={14} /> Complimentary Nationwide Express Delivery Unlocked!
                      </span>
                    )}
                  </span>
                  <span className="text-[#777D76] font-mono text-xs">{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full bg-[#F7F5ED] h-2 rounded-full overflow-hidden border border-[#E7E3D8]/80">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      freeDeliveryProgress >= 100 ? "bg-[#173F35]" : "bg-[#829B76]"
                    }`}
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="space-y-3">
                {cart.map((item) => {
                  const pId = item.product.slug || item.product.id || item.product._id;
                  const itemPrice =
                    typeof item.product.price === "number"
                      ? item.product.price
                      : item.product.discountedPrice || item.product.regularPrice || 0;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div
                      key={`${pId}-${item.selectedWeight}`}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7E3D8] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F7F5ED] border border-[#E7E3D8] flex-shrink-0">
                          <img
                            src={item.product.images?.[0] || item.product.image || "/images/placeholder.png"}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link href={`/product/${pId}`}>
                            <h3 className="text-sm font-semibold text-[#173F35] hover:text-[#829B76] transition-colors leading-snug">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-[#777D76] mt-0.5">
                            {item.selectedWeight || item.product.weight}
                          </p>
                          <span className="text-xs font-medium text-[#252A26] block mt-1">
                            ৳{itemPrice.toLocaleString()} each
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-none pt-3 sm:pt-0">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#E7E3D8] rounded-full overflow-hidden bg-[#F7F5ED] h-9">
                          <button
                            onClick={() =>
                              updateQuantity(pId, item.selectedWeight, item.quantity - 1)
                            }
                            className="w-8 h-full flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus size={11} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#173F35]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(pId, item.selectedWeight, item.quantity + 1)
                            }
                            className="w-8 h-full flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <FiPlus size={11} />
                          </button>
                        </div>

                        <span className="text-sm sm:text-base font-bold text-[#173F35] min-w-[70px] text-right">
                          ৳{itemTotal.toLocaleString()}
                        </span>

                        <button
                          onClick={() => removeFromCart(pId, item.selectedWeight)}
                          className="text-[#777D76] hover:text-red-600 p-1.5 transition-colors"
                          title="Remove item"
                          aria-label="Remove item"
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

                            {/* Right: Summary Card (4 cols) */}
                            <div className="lg:col-span-4 space-y-6">
                              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E7E3D8] shadow-subtle space-y-5">
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

                                {/* Coupon Code Form */}
                                <form onSubmit={handleApplyCoupon} className="pt-2">
                                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1.5">
                                    Promotional Voucher
                                  </label>
                                  <div className="flex gap-2">
                                    <div className="relative flex-1">
                                      <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777D76]" size={13} />
                                      <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="e.g. FIT10"
                                        className="w-full h-10 pl-9 pr-3 text-xs rounded-full border border-[#E7E3D8] uppercase font-mono outline-none focus:border-[#173F35] transition-all"
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      className="h-10 px-5 rounded-full bg-[#173F35] text-white text-xs font-semibold hover:bg-[#0F2B24] transition-colors active:scale-95"
                                    >
                                      Apply
                                    </button>
                                  </div>
                                  <span className="text-[10px] text-[#777D76] mt-1.5 block">
                                    Use code <strong>FIT10</strong> for 10% promotional discount.
                                  </span>
                                </form>

                                {/* Primary Checkout Action */}
                                <button
                                  onClick={openCheckoutModal}
                                  className="w-full h-12 rounded-full bg-[#173F35] hover:bg-[#0F2B24] active:scale-[0.98] text-[#F7F5ED] text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                                >
                                  <span>Proceed to Direct Checkout</span>
                                  <FiArrowRight size={14} />
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
