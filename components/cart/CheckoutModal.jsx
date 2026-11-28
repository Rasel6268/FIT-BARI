"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";
import {
  FiX,
  FiCheck,
  FiTruck,
  FiArrowRight,
  FiCopy,
  FiPrinter,
  FiShoppingBag,
} from "react-icons/fi";
import { FaMoneyBillWave, FaMobileAlt, FaWhatsapp } from "react-icons/fa";
import siteData from "@/data/site.json";
import toast from "react-hot-toast";

export default function CheckoutModal() {
  const {
    isCheckoutModalOpen,
    closeCheckoutModal,
    cart,
    cartSubtotal,
    storeSettings,
    dhakaShipping,
    outsideDhakaShipping,
    amountNeededForFreeDelivery,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "In Dhaka",
    address: "",
    notes: "",
    paymentMethod: "cod",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const isInsideDhaka = formData.city === "In Dhaka";
  const currentShippingRate = isInsideDhaka ? dhakaShipping : outsideDhakaShipping;
  const shippingCost = amountNeededForFreeDelivery === 0 ? 0 : currentShippingRate;
  const totalAmount = cartSubtotal + shippingCost;

  const handleWhatsAppOrder = () => {
    const whatsappDigits = (siteData.contact.whatsapp || "+8801930214376").replace(/[^0-9]/g, "");
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || "https://fitbari.com";

    const itemEntries = cart.map((item) => {
      const prod = item.product || item;
      const weight = item.selectedWeight || prod.weight || "";
      const name = prod.name || prod.title || "Fit Bari Product";
      const productLabel =
        weight &&
        weight !== "Standard Pack" &&
        weight !== "Standard" &&
        !name.toLowerCase().includes(weight.toLowerCase())
          ? `${name} ${weight}`
          : name;
      const qty = Number(item.quantity || 1);
      const sku = prod.sku || prod.id || prod.slug || "N/A";
      const slug = prod.slug || prod.id || prod._id || "";
      const productUrl = slug ? `${baseUrl}/product/${slug}` : baseUrl;

      return {
        productLine: `Product: ${productLabel}${qty > 1 ? ` (x${qty})` : ""}`,
        skuLine: `SKU: ${sku}`,
        urlLine: `Product URL: ${productUrl}`,
      };
    });

    const lines = [
      "Hello! Fit Bari, I'm interested in:",
      ...(itemEntries.length === 1
        ? [
            itemEntries[0].productLine,
            `Subtotal: ৳${cartSubtotal.toLocaleString()}`,
            itemEntries[0].skuLine,
            itemEntries[0].urlLine,
          ]
        : [
            ...itemEntries.flatMap((entry) => [
              entry.productLine,
              entry.skuLine,
              entry.urlLine,
            ]),
            `Subtotal: ৳${cartSubtotal.toLocaleString()}`,
          ]),
      `Delivery (${formData.city}): ${shippingCost === 0 ? "FREE" : `৳${shippingCost}`}`,
      `Total Payable: ৳${totalAmount.toLocaleString()}`,
      ...(formData.name.trim() ? [`Name: ${formData.name.trim()}`] : []),
      ...(formData.phone.trim() ? [`Phone: ${formData.phone.trim()}`] : []),
      ...(formData.address.trim() ? [`Address: ${formData.address.trim()}`] : []),
      ...(formData.notes.trim() ? [`Note: ${formData.notes.trim()}`] : []),
    ];

    window.open(
      `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      toast.error("Please fill in customer name, phone and address");
      return;
    }

    // Validate phone number length (Bangladesh phone numbers are typically 11 digits)
    const cleanPhone = formData.phone.replace(/[^0-9+]/g, "");
    if (cleanPhone.length < 10) {
      toast.error("Please enter a valid 11-digit phone number");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        city: formData.city,
        address: formData.address.trim(),
        notes: formData.notes.trim() || "",
      },
      items: cart.map((item) => {
        const prod = item.product || item;
        const prodPrice = Number(
          typeof prod.price === "number"
            ? prod.price
            : prod.discountedPrice || prod.regularPrice || 0
        );
        const prodQty = Number(item.quantity || 1);
        return {
          productId: String(prod.slug || prod.id || prod._id || "prod-item"),
          name: prod.name || prod.title || "Fit Bari Nutrition Product",
          price: prodPrice,
          quantity: prodQty,
          image:
            (prod.images && prod.images[0]) ||
            prod.image ||
            "/images/honey-harvest.png",
          subtotal: prodPrice * prodQty,
        };
      }),
      subtotal: cartSubtotal,
      shippingCost,
      totalAmount,
      paymentMethod:
        formData.paymentMethod === "bkash"
          ? "BKASH"
          : formData.paymentMethod === "nagad"
          ? "NAGAD"
          : "CASH_ON_DELIVERY",
    };

    try {
      const res = await createOrder(orderPayload);
      const assigned = res?.data?.orderNumber || `FB-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(assigned);
      setIsSubmitted(true);
      clearCart();

      toast.success("Order Placed Successfully!", {
        style: {
          background: "#173F35",
          color: "#F7F5ED",
          border: "1px solid #D6A54A",
        },
      });
    } catch (err) {
      toast.error("Error submitting order: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    closeCheckoutModal();
  };

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    toast.success("Order number copied to clipboard!");
  };

  const codActive = storeSettings?.codEnabled !== false;
  const bkashActive = storeSettings?.bkashEnabled !== false;
  const nagadActive = storeSettings?.nagadEnabled !== false;

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
                {isSubmitted ? "Order Confirmed & Received" : "Direct Checkout"}
              </h3>
              <p className="text-[11px] text-[#F7F5ED]/75 mt-0.5">
                {isSubmitted
                  ? "Thank you for shopping with FIT BARI"
                  : "No pre-payment mandatory. Pay cash or bKash on delivery."}
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
              <div className="py-4 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#173F35] flex items-center justify-center mx-auto border border-emerald-300">
                  <FiCheck size={28} />
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 bg-[#F7F5ED] border border-[#E7E3D8] px-3.5 py-1.5 rounded-full">
                    <span className="font-mono text-sm font-bold text-[#173F35]">
                      #{orderNumber}
                    </span>
                    <button
                      onClick={copyOrderNumber}
                      className="text-stone-500 hover:text-[#173F35] transition-colors"
                      title="Copy Order #"
                    >
                      <FiCopy size={13} />
                    </button>
                  </div>
                  <h4 className="text-xl font-editorial text-[#173F35] mt-2">
                    Order Confirmed for Dispatch
                  </h4>
                  <p className="text-xs text-[#777D76] max-w-sm mx-auto">
                    We will call you at <strong>{formData.phone}</strong> before delivering to{" "}
                    <strong>{formData.city}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] max-w-sm mx-auto text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#777D76]">Customer:</span>
                    <span className="font-semibold text-stone-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777D76]">Address:</span>
                    <span className="font-semibold text-stone-900 truncate max-w-[200px]">
                      {formData.address}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777D76]">Estimated Delivery:</span>
                    <span className="font-semibold text-[#173F35]">
                      {formData.city === "In Dhaka"
                        ? storeSettings?.estimatedDeliveryDhaka || "12-24 Hours"
                        : storeSettings?.estimatedDeliveryOutside || "48-72 Hours"}
                    </span>
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

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Link
                    href={`/track-order?orderNumber=${encodeURIComponent(
                      orderNumber
                    )}&phone=${encodeURIComponent(formData.phone)}`}
                    onClick={handleResetAndClose}
                    className="w-full sm:w-auto h-11 px-6 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FiTruck size={14} />
                    <span>Track Order Live</span>
                  </Link>

                  <button
                    onClick={handleResetAndClose}
                    className="w-full sm:w-auto h-11 px-6 rounded-full bg-white border border-[#E7E3D8] hover:bg-[#F7F5ED] text-[#173F35] text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-1.5"
                  >
                    <FiShoppingBag size={14} />
                    <span>Continue Shopping</span>
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
                      Delivery Area *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#E7E3D8] text-xs text-[#252A26] bg-[#F7F5ED]/40 focus:bg-white focus:border-[#173F35] outline-none transition-all font-medium"
                    >
                      <option value="In Dhaka">In Dhaka (৳{dhakaShipping})</option>
                      <option value="Outside Dhaka">Outside Dhaka (৳{outsideDhakaShipping})</option>
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
                    placeholder="e.g. Call before delivery, deliver after 3 PM"
                  />
                </div>

                {/* Payment Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#173F35] mb-1.5">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {codActive && (
                      <label
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          formData.paymentMethod === "cod"
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
                    )}

                    {bkashActive && (
                      <label
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          formData.paymentMethod === "bkash"
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
                    )}

                    {nagadActive && (
                      <label
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          formData.paymentMethod === "nagad"
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
                    )}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-[#E7E3D8] pt-3.5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#777D76]">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-[#252A26]">
                      ৳{cartSubtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#777D76]">
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-[#829B76]">
                      {shippingCost === 0 ? "FREE" : `৳${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#173F35] pt-2 border-t border-[#E7E3D8]">
                    <span>Total Amount Payable</span>
                    <span className="text-base text-[#173F35]">
                      ৳{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-[#173F35] hover:bg-[#0F2B24] active:scale-[0.98] text-[#F7F5ED] text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                >
                  <span>
                    {isSubmitting
                      ? "Confirming Order..."
                      : `Confirm Order (৳${totalAmount.toLocaleString()})`}
                  </span>
                  <FiArrowRight size={14} />
                </button>

                {/* WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full h-11 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <FaWhatsapp size={16} />
                  <span>Order via WhatsApp (+880 1930214376)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
