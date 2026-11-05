"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { 
  FiX, 
  FiShoppingBag, 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiArrowRight, 
  FiTruck, 
  FiCheck 
} from "react-icons/fi";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeDeliveryThreshold,
    freeDeliveryProgress,
    amountNeededForFreeDelivery,
    openCheckoutModal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#F7F5ED] shadow-elevate flex flex-col z-50 animate-slideLeft">
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#E7E3D8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-bold text-[#173F35] font-editorial">
              Your Pantry Cart
            </h2>
            <span className="text-[10px] bg-[#173F35] text-[#F7F5ED] px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full border border-[#E7E3D8] hover:bg-[#F7F5ED] flex items-center justify-center text-[#252A26] transition-colors"
            aria-label="Close cart"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="bg-white px-5 py-3.5 border-b border-[#E7E3D8]">
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            <span className="flex items-center gap-1.5 text-[#252A26]">
              <FiTruck className="text-[#829B76]" size={14} />
              {amountNeededForFreeDelivery > 0 ? (
                <span>
                  Add <strong className="text-[#173F35]">৳{amountNeededForFreeDelivery.toLocaleString()}</strong> more for <strong>Free Delivery</strong>
                </span>
              ) : (
                <span className="text-[#173F35] font-semibold flex items-center gap-1">
                  <FiCheck className="text-[#829B76]" size={13} /> Free Express Delivery Unlocked
                </span>
              )}
            </span>
            <span className="text-[#777D76] text-[11px] font-mono">{freeDeliveryProgress}%</span>
          </div>
          <div className="w-full bg-[#F7F5ED] h-1.5 rounded-full overflow-hidden border border-[#E7E3D8]/80">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                freeDeliveryProgress >= 100
                  ? "bg-[#173F35]"
                  : "bg-[#829B76]"
              }`}
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white border border-[#E7E3D8] flex items-center justify-center text-[#777D76]">
                <FiShoppingBag size={28} />
              </div>
              <h3 className="text-base font-semibold text-[#173F35]">Your cart is currently empty</h3>
              <p className="text-xs text-[#777D76] max-w-xs leading-relaxed">
                Explore our unpasteurized Sundarban honey, micro-filtered protein isolates, and organic seeds.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="px-6 py-2.5 rounded-full bg-[#173F35] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider hover:bg-[#0F2B24] transition-colors"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            cart.map((item) => {
              const price = item.product.discountedPrice || item.product.regularPrice;
              const itemTotal = price * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.selectedWeight}`}
                  className="flex gap-3 p-3 bg-white rounded-2xl border border-[#E7E3D8] hover:border-[#173F35]/30 transition-all"
                >
                  <div className="w-18 h-18 rounded-xl overflow-hidden relative flex-shrink-0 bg-[#F7F5ED] border border-[#E7E3D8]/60">
                    <img
                      src={item.product.images?.[0] || item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="text-xs font-semibold text-[#252A26] hover:text-[#173F35] line-clamp-1 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                          className="text-[#777D76] hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-[#777D76]">
                          {item.selectedWeight}
                        </span>
                        <span className="text-xs font-medium text-[#173F35]">
                          ৳{price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F7F5ED]">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#E7E3D8] rounded-full overflow-hidden bg-[#F7F5ED]">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
                        >
                          <FiMinus size={10} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#173F35]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
                        >
                          <FiPlus size={10} />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#173F35]">
                        ৳{itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E7E3D8] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#777D76]">
                <span>Pantry Subtotal</span>
                <span className="font-semibold text-[#252A26]">
                  ৳{cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#777D76]">
                <span>Nationwide Shipping</span>
                <span className="font-semibold text-[#829B76]">
                  {amountNeededForFreeDelivery === 0 ? "FREE" : "৳80 (Dhaka) / ৳130 (Outside)"}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#173F35] pt-2 border-t border-[#E7E3D8]">
                <span>Estimated Total</span>
                <span className="text-base text-[#173F35]">
                  ৳{(cartSubtotal + (amountNeededForFreeDelivery === 0 ? 0 : 80)).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/cart"
                onClick={closeCart}
                className="py-3 px-3 rounded-full border border-[#E7E3D8] hover:border-[#173F35] text-[#173F35] font-semibold text-xs uppercase tracking-wider text-center transition-colors"
              >
                View Cart
              </Link>
              <button
                onClick={() => {
                  closeCart();
                  openCheckoutModal();
                }}
                className="py-3 px-3 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Checkout</span>
                <FiArrowRight size={13} />
              </button>
            </div>

            <p className="text-[10px] text-center text-[#777D76]">
              Verified genuine batches • Cash on delivery supported nationwide
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
