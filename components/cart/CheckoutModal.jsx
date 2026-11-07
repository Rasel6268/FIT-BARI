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
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Close checkout"
                >
                  <FiX size={16} />
                </button>
              </div>

                  <div className="p-6">
                    {isSubmitted ? (
                      <div className="py-6 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-[#829B76]/20 text-[#173F35] flex items-center justify-center mx-auto border border-[#829B76]/40">
                          <FiCheck size={28} />
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-xl font-editorial text-[#173F35]">
                            Invoice #{orderNumber} Generated
                          </h4>
                          <p className="text-xs text-[#777D76] max-w-sm mx-auto">
                            Our fulfillment dispatch at Banani has received your order. We will reach out to <strong>{formData.phone}</strong> prior to delivery.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] max-w-sm mx-auto text-left text-xs space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-[#777D76]">Customer:</span>
                            <span className="font-semibold">{formData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#777D76]">Address:</span>
                            <span className="font-semibold truncate max-w-[200px]">{formData.address}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#777D76]">Payment Mode:</span>
                            <span className="font-semibold uppercase">{formData.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between border-t border-[#E7E3D8] pt-1.5 text-sm font-bold text-[#173F35]">
                            <span>Total Due:</span>
                            <span>৳{totalAmount.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={handleResetAndClose}
                            className="h-11 px-8 rounded-full bg-[#173F35] hover:bg-[#0F2B24] active:scale-95 text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all"
                          >
                            Return to Pantry
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs font-semibold text-[#173F35] mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full h-11 px-3.5 rounded-xl border border-[#E7E3D8] text-xs text-[#252A26] bg-[#F7F5ED]/40 focus:bg-white focus:border-[#173F35] outline-none transition-all"
                              placeholder="e.g. Mohammad Tanvir"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#173F35] mb-1">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full h-11 px-3.5 rounded-xl border border-[#E7E3D8] text-xs text-[#252A26] bg-[#F7F5ED]/40 focus:bg-white focus:border-[#173F35] outline-none transition-all"
                              placeholder="017XXXXXXXX"
                            />
                          </div>
                        </div>

                          {/* City & Address */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div>
                              <label className="block text-xs font-semibold text-[#173F35] mb-1">
                                City / Region *
                              </label>
                              <select
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full h-11 px-3.5 rounded-xl border border-[#E7E3D8] text-xs text-[#252A26] bg-[#F7F5ED]/40 focus:bg-white focus:border-[#173F35] outline-none transition-all"
                              >
                                <option value="Dhaka">Dhaka (৳80)</option>
                                <option value="Chittagong">Chittagong (৳130)</option>
                                <option value="Sylhet">Sylhet (৳130)</option>
                                <option value="Rajshahi">Rajshahi (৳130)</option>
                                <option value="Khulna">Khulna (৳130)</option>
                                <option value="Other">Other Region (৳130)</option>
                              </select>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold text-[#173F35] mb-1">
                                Delivery Address *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full h-11 px-3.5 rounded-xl border border-[#E7E3D8] text-xs text-[#252A26] bg-[#F7F5ED]/40 focus:bg-white focus:border-[#173F35] outline-none transition-all"
                                placeholder="House, Road, Area, Landmark"
                              />
                            </div>
                          </div>

                        {/* Notes */}
                        <div>
                          <label className="block text-xs font-semibold text-[#173F35] mb-1">
                            Special Delivery Instructions
                          </label>
                          <input
                            type="text"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full h-11 px-3.5 rounded-xl border border-[#E7E3D8] text-xs text-[#252A26] bg-[#F7F5ED]/40 focus:bg-white focus:border-[#173F35] outline-none transition-all"
                            placeholder="e.g. Ring bell twice, deliver after 3 PM"
                          />
                        </div>

                            {/* Payment Selection */}
                            <div>
                              <label className="block text-xs font-semibold text-[#173F35] mb-1.5">
                                Select Payment Method
                              </label>
                              <div className="grid grid-cols-3 gap-2.5">
                                <label
                                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all ${formData.paymentMethod === "cod"
                                      ? "border-[#173F35] bg-[#173F35]/5 font-semibold text-[#173F35] shadow-xs"
                                      : "border-[#E7E3D8] text-[#777D76] hover:border-[#173F35]/40"
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
                                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all ${formData.paymentMethod === "bkash"
                                      ? "border-[#173F35] bg-[#173F35]/5 font-semibold text-[#173F35] shadow-xs"
                                      : "border-[#E7E3D8] text-[#777D76] hover:border-[#173F35]/40"
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
                                  <span className="text-[11px]">bKash</span>
                                </label>

                            <label
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all ${formData.paymentMethod === "nagad"
                                  ? "border-[#173F35] bg-[#173F35]/5 font-semibold text-[#173F35] shadow-xs"
                                  : "border-[#E7E3D8] text-[#777D76] hover:border-[#173F35]/40"
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
                              <span className="text-[11px]">Nagad</span>
                            </label>
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="border-t border-[#E7E3D8] pt-3.5 space-y-1.5 text-xs">
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
                          <div className="flex justify-between text-sm font-bold text-[#173F35] pt-2 border-t border-[#E7E3D8]">
                            <span>Total Amount Payable</span>
                            <span className="text-base text-[#173F35]">৳{totalAmount.toLocaleString()}</span>
                          </div>
                        </div>

            {/* Primary CTA */}
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#173F35] hover:bg-[#0F2B24] active:scale-[0.98] text-[#F7F5ED] text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
            >
              <span>Confirm Order (৳{totalAmount.toLocaleString()})</span>
              <FiArrowRight size={14} />
            </button>
          </form>
            )}
        </div>
      </div>
    </div>
  </div>
);
}
