"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trackOrder } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  FiSearch,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiAlertCircle,
  FiPrinter,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams ? searchParams.get("orderNumber") || "" : "";
  const initialPhone = searchParams ? searchParams.get("phone") || "" : "";

  const { storeSettings } = useCart() || {};

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phone, setPhone] = useState(initialPhone);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = async (numToSearch, phoneToSearch) => {
    const cleanNum = (numToSearch || orderNumber).trim();
    const cleanPhone = (phoneToSearch !== undefined ? phoneToSearch : phone).trim();

    if (!cleanNum) {
      toast.error("Please enter your Order Number (e.g. FB-839201)");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setHasSearched(true);

    try {
      const data = await trackOrder(cleanNum, cleanPhone);
      setOrder(data);
    } catch (err) {
      setOrder(null);
      setErrorMsg(
        err.message || "No order found matching the provided order number and phone."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      handleTrack(initialOrderNumber, initialPhone);
    }
  }, [initialOrderNumber, initialPhone]);

  const STAGES = [
    { key: "PENDING", label: "Order Placed", desc: "Received in our fulfillment queue" },
    { key: "CONFIRMED", label: "Order Confirmed", desc: "Phone verified & approved for packing" },
    { key: "PROCESSING", label: "Quality Inspection", desc: "Harvest verified and sealed" },
    { key: "SHIPPED", label: "Out for Delivery", desc: "Handed over to nationwide express courier" },
    { key: "DELIVERED", label: "Delivered", desc: "Safely received by customer" },
  ];

  const getStageIndex = (status) => {
    if (status === "CANCELLED" || status === "RETURNED") return -1;
    return STAGES.findIndex((s) => s.key === status);
  };

  const currentStageIdx = order ? getStageIndex(order.orderStatus) : -1;
  const isCancelled = order?.orderStatus === "CANCELLED";

  return (
    <div className="bg-[#F7F5ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Live Order Tracking" }]} />

        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
            REAL-TIME FULFILLMENT
          </span>
          <h1 className="text-3xl sm:text-4xl font-normal font-editorial text-[#173F35] tracking-tight">
            Track Your Fit Bari Order
          </h1>
          <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
            Enter your 6-digit Order ID (from your confirmation invoice) to view real-time delivery status, packaging logs, and courier dispatch.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3D8] shadow-subtle space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack(orderNumber, phone);
            }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end"
          >
            <div className="sm:col-span-6">
              <label className="block text-xs font-semibold text-[#173F35] mb-1">
                Order Number *
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. FB-839201"
                className="w-full h-11 px-3.5 rounded-xl border border-[#E7E3D8] text-xs font-mono font-bold uppercase tracking-wider text-[#173F35] bg-[#F7F5ED]/40 focus:bg-white focus:border-[#173F35] outline-none transition-all"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-[#173F35] mb-1">
                Recipient Phone (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full h-11 px-3.5 rounded-xl border border-[#E7E3D8] text-xs text-[#252A26] bg-[#F7F5ED]/40 focus:bg-white focus:border-[#173F35] outline-none transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-[#173F35] hover:bg-[#0F2B24] active:scale-95 text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <FiSearch size={14} />
                <span>{loading ? "Tracking..." : "Track"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Error State */}
        {hasSearched && errorMsg && !order && (
          <div className="bg-white rounded-3xl p-8 border border-rose-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <FiAlertCircle size={24} />
            </div>
            <h3 className="font-editorial text-lg text-rose-900 font-bold">
              Order Not Located
            </h3>
            <p className="text-xs text-[#777D76] max-w-sm mx-auto">
              {errorMsg}
            </p>
            <p className="text-[11px] text-[#777D76]">
              Need direct help? Contact customer support hotline:{" "}
              <a
                href={`tel:${storeSettings?.supportPhone || "01712-345678"}`}
                className="font-bold text-[#173F35] hover:underline"
              >
                {storeSettings?.supportPhone || "01712-345678"}
              </a>
            </p>
          </div>
        )}

        {/* Found Order Card */}
        {order && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Order Status Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3D8] shadow-subtle space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7E3D8] gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold font-editorial text-[#173F35]">
                      Order #{order.orderNumber}
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#173F35]/10 text-[#173F35]">
                      {order.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-[#777D76] mt-1">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-[#777D76] block">Payable Total:</span>
                  <span className="text-2xl font-bold text-[#173F35] font-editorial">
                    ৳{order.totalAmount?.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#777D76] block uppercase font-medium">
                    {order.paymentMethod?.replace(/_/g, " ")} ({order.paymentStatus || "PENDING"})
                  </span>
                </div>
              </div>

              {/* Fulfillment Stepper */}
              {!isCancelled ? (
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#777D76]">
                    Delivery Progress
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {STAGES.map((stg, idx) => {
                      const isPast = currentStageIdx > idx;
                      const isCurrent = currentStageIdx === idx;

                      return (
                        <div
                          key={stg.key}
                          className={`p-3 rounded-2xl border transition-all ${
                            isCurrent
                              ? "bg-[#173F35] text-white border-[#173F35] shadow-sm"
                              : isPast
                              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                              : "bg-[#F7F5ED]/60 text-stone-400 border-[#E7E3D8]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold uppercase font-mono">
                              Step 0{idx + 1}
                            </span>
                            {isPast && <FiCheckCircle size={14} className="text-emerald-700" />}
                            {isCurrent && (
                              <span className="w-2 h-2 rounded-full bg-[#D6A54A] animate-ping" />
                            )}
                          </div>
                          <p className="font-bold text-xs">{stg.label}</p>
                          <p
                            className={`text-[10px] mt-0.5 ${
                              isCurrent
                                ? "text-[#F7F5ED]/80"
                                : isPast
                                ? "text-emerald-800/80"
                                : "text-stone-400"
                            }`}
                          >
                            {stg.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  <p className="font-bold">This order was cancelled.</p>
                  <p className="text-[11px] mt-0.5">
                    If this cancellation was in error, please reach out to customer support.
                  </p>
                </div>
              )}

              {/* Delivery Destination & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E7E3D8]">
                <div className="bg-[#F7F5ED] p-4 rounded-2xl border border-[#E7E3D8] text-xs space-y-1">
                  <span className="font-bold text-[#173F35] uppercase text-[11px] tracking-wider block mb-1">
                    Delivery Address
                  </span>
                  <p className="text-stone-900 font-semibold">{order.customer?.name}</p>
                  <p className="text-stone-700 flex items-start gap-1">
                    <FiMapPin size={13} className="text-[#173F35] flex-shrink-0 mt-0.5" />
                    <span>{order.customer?.address}</span>
                  </p>
                  <p className="text-stone-700">
                    City/District: <strong>{order.customer?.city || "Dhaka"}</strong>
                  </p>
                  {order.customer?.notes && (
                    <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 mt-2">
                      Instructions: "{order.customer?.notes}"
                    </p>
                  )}
                </div>

                <div className="bg-[#F7F5ED] p-4 rounded-2xl border border-[#E7E3D8] text-xs space-y-1">
                  <span className="font-bold text-[#173F35] uppercase text-[11px] tracking-wider block mb-1">
                    Logistics & Support
                  </span>
                  <p className="text-stone-700">
                    Phone Contact: <strong>{order.customer?.phone}</strong>
                  </p>
                  <p className="text-stone-700">
                    Estimated Transit:{" "}
                    <strong>
                      {order.customer?.city === "Dhaka"
                        ? storeSettings?.estimatedDeliveryDhaka || "12-24 Hours Express"
                        : storeSettings?.estimatedDeliveryOutside || "48-72 Hours Nationwide"}
                    </strong>
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={`tel:${storeSettings?.supportPhone || "01712-345678"}`}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E7E3D8] text-[#173F35] text-[11px] font-bold inline-flex items-center gap-1 hover:bg-[#173F35] hover:text-white transition-colors"
                    >
                      <FiPhone size={11} />
                      <span>Helpline</span>
                    </a>
                    <a
                      href={`https://wa.me/${(
                        storeSettings?.whatsappNumber || "8801930214376"
                      ).replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Assalamu Alaikum, I am inquiring about my Fit Bari order #${order.orderNumber}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1 hover:bg-emerald-700 transition-colors"
                    >
                      <FaWhatsapp size={13} />
                      <span>WhatsApp Help</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Items Purchased */}
              <div className="pt-4 border-t border-[#E7E3D8]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#173F35] mb-3">
                  Pantry Items in this Order ({order.items?.length || 0})
                </h3>
                <div className="divide-y divide-[#E7E3D8] border border-[#E7E3D8] rounded-2xl overflow-hidden">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 flex items-center justify-between gap-4 bg-white hover:bg-[#FAF9F6] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-xl border border-[#E7E3D8] bg-[#F7F5ED]"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        )}
                        <div>
                          <p className="font-bold text-xs text-stone-900">{item.name}</p>
                          <p className="text-[11px] text-[#777D76]">
                            Qty: {item.quantity} × ৳{item.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-[#173F35]">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking Audit Trail */}
              {order.trackingHistory && order.trackingHistory.length > 0 && (
                <div className="pt-4 border-t border-[#E7E3D8] space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#173F35] flex items-center gap-1.5">
                    <FiClock size={13} />
                    <span>Fulfillment Timeline Log</span>
                  </h3>
                  <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E7E3D8]">
                    {order.trackingHistory.map((hist, idx) => (
                      <div key={idx} className="relative text-xs">
                        <span className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-[#173F35] ring-4 ring-[#F7F5ED]" />
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#173F35]">{hist.status}</span>
                          <span className="text-[10px] text-[#777D76]">
                            {new Date(hist.timestamp).toLocaleDateString()} at{" "}
                            {new Date(hist.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-stone-700 mt-0.5 text-[11px]">
                          {hist.note || `Status marked as ${hist.status}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F5ED] flex items-center justify-center p-8">
          <div className="w-10 h-10 border-4 border-[#173F35]/20 border-t-[#173F35] rounded-full animate-spin" />
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
