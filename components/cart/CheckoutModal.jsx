"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  FiX,
  FiCheck,
  FiTruck,
  FiArrowRight
} from "react-icons/fi";
import { FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function CheckoutModal() {
  const {
    isCheckoutModalOpen,
    closeCheckoutModal,
    cart,
    cartSubtotal,
    amountNeededForFreeDelivery,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "Mohammad Tanvir",
    phone: "01712345678",
    city: "Dhaka",
    address: "House 12, Road 4, Sector 7, Uttara, Dhaka",
    notes: "Call upon arrival",
    paymentMethod: "cod",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  if (!isCheckoutModalOpen) return null;

  const shippingCost = amountNeededForFreeDelivery === 0 ? 0 : (formData.city === "Dhaka" ? 80 : 130);
  const totalAmount = cartSubtotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in delivery details");
      return;
    }

    const randomId = "FB-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomId);
    setIsSubmitted(true);
    clearCart();

      toast.success("Order Placed Successfully", {
        style: {
          background: "#173F35",
          color: "#F7F5ED",
          border: "1px solid #D6A54A",
        },
      });
    };

    const handleResetAndClose = () => {
      setIsSubmitted(false);
      closeCheckoutModal();
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={handleResetAndClose}
        />

        <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-elevate border border-[#E7E3D8] overflow-hidden z-10 animate-scaleUp">
              {/* Header */}
                  <div className="bg-[#173F35] text-[#F7F5ED] p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-lg text-white">
                        {isSubmitted ? "Order Confirmed" : "Direct Checkout"}
                      </h3>
                      <p className="text-[11px] text-[#F7F5ED]/75 mt-0.5">
                        {isSubmitted ? "Thank you for trusting FIT BARI" : "No pre-payment mandatory. Pay cash or bKash on delivery."}
                      </p>
                    </div>
                    <button
                      onClick={handleResetAndClose}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    >
                      <FiX size={16} />
                    </button>
                  </div>

                  {/* Body */}
                  {isSubmitted ? (
                        <div className="p-8 text-center space-y-6">
                          <div className="w-16 h-16 rounded-full bg-[#F7F5ED] text-[#173F35] flex items-center justify-center mx-auto text-2xl border border-[#E7E3D8]">
                            <FiCheck />
                          </div>

                              <div className="space-y-1">
                                <span className="text-[11px] font-bold text-[#829B76] uppercase tracking-[0.2em] block">
                                  DEMO ORDER CONFIRMATION
                                </span>
                                  <h2 className="text-2xl font-normal font-editorial text-[#173F35]">
                                    Thank You, {formData.name}
                                  </h2>
                                    <div className="mt-2 inline-block px-3 py-1 rounded-full bg-[#F7F5ED] border border-[#E7E3D8] text-xs font-mono font-bold text-[#173F35]">
                                      Order ID: {orderNumber}
                                    </div>
                                  </div>

                                    <div className="bg-[#F7F5ED] rounded-2xl p-4 text-left text-xs space-y-2 border border-[#E7E3D8]">
                                      <div className="flex justify-between">
                                        <span className="text-[#777D76]">Delivery Address:</span>
                                        <span className="font-medium text-[#252A26] text-right max-w-xs">{formData.address}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#777D76]">Phone:</span>
                                        <span className="font-medium text-[#252A26]">{formData.phone}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#777D76]">Payment Mode:</span>
                                        <span className="font-semibold text-[#173F35] uppercase">{formData.paymentMethod}</span>
                                      </div>
                                        <div className="flex justify-between pt-2 border-t border-[#E7E3D8]">
                                          <span className="font-semibold text-[#173F35]">Total Payable on Delivery:</span>
                                          <span className="font-bold text-sm text-[#173F35]">৳{totalAmount.toLocaleString()}</span>
                                        </div>
                                      </div>

                                        <div className="flex items-center justify-center gap-2 text-xs text-[#777D76]">
                                          <FiTruck className="text-[#829B76]" />
                                          <span>Estimated Delivery: Within 24-48 Hours</span>
                                        </div>

                                        <button
                                          onClick={handleResetAndClose}
                                          className="w-full py-3 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-colors"
                                        >
                                          Return to Collections
                                        </button>
                                      </div>
                                      ) : (
                                            <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
                                              <div className="bg-[#F7F5ED] rounded-2xl p-3.5 border border-[#E7E3D8] text-xs flex justify-between items-center">
                                                <span className="text-[#777D76]">
                                                  Items in cart: <strong className="text-[#173F35]">{cart.length}</strong>
                                                </span>
                                                  <span className="text-[#173F35] font-semibold">
                                                    Subtotal: <strong>৳{cartSubtotal.toLocaleString()}</strong>
                                                  </span>
                                              </div>

                                              <div className="space-y-3">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                  <div>
                                                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1">
                                                        Full Name *
                                                      </label>
                                                      <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none"
                                                      />
                                                  </div>
                                                  <div>
                                                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1">
                                                        Phone Number *
                                                      </label>
                                                      <input
                                                        type="tel"
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none"
                                                      />
                                                  </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                  <div>
                                                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1">
                                                        Delivery Region
                                                      </label>
                                                      <select
                                                        value={formData.city}
                                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none bg-white"
                                                      >
                                                        <option value="Dhaka">Inside Dhaka (৳80 or Free above ৳2000)</option>
                                                        <option value="Outside">Outside Dhaka (৳130 or Free above ৳2000)</option>
                                                      </select>
                                                  </div>
                                                  <div>
                                                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1">
                                                        Delivery Notes
                                                      </label>
                                                      <input
                                                        type="text"
                                                        value={formData.notes}
                                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none"
                                                        placeholder="e.g. Call before delivery"
                                                      />
                                                  </div>
                                                </div>

                                                <div>
                                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1">
                                                      Street Address *
                                                    </label>
                                                    <textarea
                                                      rows={2}
                                                      required
                                                      value={formData.address}
                                                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none resize-none"
                                                    />
                                                </div>
                                              </div>

                                              {/* Payment Method Selector */}
                                              <div>
                                                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1.5">
                                                    Payment Method
                                                  </label>
                                                  <div className="grid grid-cols-3 gap-2">
                                                    <label
                                                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer transition-all ${formData.paymentMethod === "cod"
                                                            ? "border-[#173F35] bg-[#173F35]/5 font-semibold text-[#173F35]"
                                                            : "border-[#E7E3D8] text-[#777D76]"
                                                        }`}
                                                    >
                                                      <input
                                                        type="radio"
                                                        name="payment"
                                                        value="cod"
                                                        checked={formData.paymentMethod === "cod"}
                                                        onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                                                        className="sr-only"
                                                      />
                                                      <FaMoneyBillWave className="text-base text-[#173F35] mb-1" />
                                                      <span className="text-[11px]">Cash on Delivery</span>
                                                    </label>

                                                    <label
                                                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer transition-all ${formData.paymentMethod === "bkash"
                                                            ? "border-[#173F35] bg-[#173F35]/5 font-semibold text-[#173F35]"
                                                            : "border-[#E7E3D8] text-[#777D76]"
                                                        }`}
                                                    >
                                                      <input
                                                        type="radio"
                                                        name="payment"
                                                        value="bkash"
                                                        checked={formData.paymentMethod === "bkash"}
                                                        onChange={() => setFormData({ ...formData, paymentMethod: "bkash" })}
                                                        className="sr-only"
                                                      />
                                                      <FaMobileAlt className="text-base text-[#D6A54A] mb-1" />
                                                      <span className="text-[11px]">bKash (Send Money)</span>
                                                    </label>

                                                    <label
                                                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer transition-all ${formData.paymentMethod === "nagad"
                                                            ? "border-[#173F35] bg-[#173F35]/5 font-semibold text-[#173F35]"
                                                            : "border-[#E7E3D8] text-[#777D76]"
                                                        }`}
                                                    >
                                                      <input
                                                        type="radio"
                                                        name="payment"
                                                        value="nagad"
                                                        checked={formData.paymentMethod === "nagad"}
                                                        onChange={() => setFormData({ ...formData, paymentMethod: "nagad" })}
                                                        className="sr-only"
                                                      />
                                                      <FaMobileAlt className="text-base text-[#D6A54A] mb-1" />
                                                      <span className="text-[11px]">Nagad (Send Money)</span>
                                                    </label>
                                                  </div>
                                              </div>

                                              {/* Price Breakdown */}
                                                  <div className="border-t border-[#E7E3D8] pt-3 space-y-1.5 text-xs">
                                                    <div className="flex justify-between text-[#777D76]">
                                                      <span>Items Subtotal</span>
                                                      <span className="font-semibold text-[#252A26]">৳{cartSubtotal.toLocaleString()}</span>
                                                    </div>
                                                      <div className="flex justify-between text-[#777D76]">
                                                        <span>Delivery Charge</span>
                                                          <span className="font-semibold text-[#829B76]">
                                                            {shippingCost === 0 ? "FREE" : `৳${shippingCost}`}
                                                          </span>
                                                      </div>
                                                        <div className="flex justify-between text-sm font-bold text-[#173F35] pt-1 border-t border-[#E7E3D8]">
                                                          <span>Total Amount Payable</span>
                                                          <span className="text-base text-[#173F35]">৳{totalAmount.toLocaleString()}</span>
                                                        </div>
                                                      </div>

                                                      {/* CTA */}
                                                      <button
                                                        type="submit"
                                                        className="w-full py-3.5 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                                                      >
                                                        <span>Confirm Order (৳{totalAmount.toLocaleString()})</span>
                                                        <FiArrowRight size={13} />
                                                      </button>
                                                    </form>
          )}
                                                  </div>
                                                </div>
                                              </div>
                                              );
}
