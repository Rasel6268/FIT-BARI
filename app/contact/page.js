"use client";

import React, { useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import siteData from "@/data/site.json";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiCheck
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Product Consultation",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in your name, email, and message");
      return;
    }

    setIsSubmitted(true);
      toast.success("Thank you. Our consultation desk will reply within 2 hours.", {
        style: {
          background: "#173F35",
          color: "#F7F5ED",
          border: "1px solid #D6A54A",
        },
      });
    };

    return (
          <div className="bg-[#F7F5ED] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

              {/* Breadcrumbs */}
              <Breadcrumbs items={[{ label: "Contact & Banani Center" }]} />

                {/* Page Header */}
                <div className="space-y-2 max-w-2xl">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                    CLIENT CONCIERGE
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] tracking-tight">
                    Connect with Our Team
                  </h1>
                  <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
                    Whether you require assistance with supplement stacking, batch verification QR codes, or corporate wholesale inquiries, our team is available to assist.
                  </p>
                </div>

                      {/* 4 Clean Contact Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-[#E7E3D8] shadow-subtle space-y-2">
                          <div className="w-10 h-10 rounded-full bg-[#F7F5ED] text-[#173F35] flex items-center justify-center text-base mb-3 border border-[#E7E3D8]">
                            <FiPhone />
                          </div>
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#777D76]">
                              Hotline
                            </h4>
                              <p className="text-sm font-semibold text-[#173F35]">
                                {siteData.contact.hotline}
                              </p>
                                <p className="text-xs text-[#777D76]">
                                  {siteData.contact.phone}
                                </p>
                              </div>

                                  <div className="bg-white p-6 rounded-3xl border border-[#E7E3D8] shadow-subtle space-y-2">
                                    <div className="w-10 h-10 rounded-full bg-[#F7F5ED] text-[#829B76] flex items-center justify-center text-lg mb-3 border border-[#E7E3D8]">
                                      <FaWhatsapp />
                                    </div>
                                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#777D76]">
                                        WhatsApp Direct
                                      </h4>
                                      <a
                                        href={`https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs font-semibold text-[#173F35] hover:underline block"
                                      >
                                        Start WhatsApp Conversation &rarr;
                                      </a>
                                        <p className="text-[11px] text-[#777D76]">
                                          Instant customer assistance & orders
                                        </p>
                                      </div>

                                          <div className="bg-white p-6 rounded-3xl border border-[#E7E3D8] shadow-subtle space-y-2">
                                            <div className="w-10 h-10 rounded-full bg-[#F7F5ED] text-[#D6A54A] flex items-center justify-center text-base mb-3 border border-[#E7E3D8]">
                                              <FiMail />
                                            </div>
                                              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#777D76]">
                                                Email Desk
                                              </h4>
                                              <a
                                                href={`mailto:${siteData.contact.email}`}
                                                className="text-xs font-semibold text-[#173F35] hover:underline block truncate"
                                              >
                                                {siteData.contact.email}
                                              </a>
                                                <p className="text-[11px] text-[#777D76]">
                                                  Direct responses within 2 business hours
                                                </p>
                                              </div>

                                                  <div className="bg-white p-6 rounded-3xl border border-[#E7E3D8] shadow-subtle space-y-2">
                                                    <div className="w-10 h-10 rounded-full bg-[#F7F5ED] text-[#173F35] flex items-center justify-center text-base mb-3 border border-[#E7E3D8]">
                                                      <FiMapPin />
                                                    </div>
                                                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#777D76]">
                                                        Flagship Center
                                                      </h4>
                                                        <p className="text-xs text-[#252A26] line-clamp-2">
                                                          {siteData.contact.address}
                                                        </p>
                                                          <p className="text-[11px] text-[#777D76]">
                                                            {siteData.contact.hours}
                                                          </p>
                                                        </div>
                                                      </div>

                                                      {/* Contact Form + Flagship Experience Section (2 cols) */}
                                                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

                                                        {/* Form (7 cols) */}
                                                            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E3D8] shadow-subtle">
                                                              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76] block mb-2">
                                                                MESSAGE DESK
                                                              </span>
                                                              <h3 className="text-2xl font-normal font-editorial text-[#173F35] mb-6">
                                                                Send an Inquiry
                                                              </h3>

                                                              {isSubmitted ? (
                                                                    <div className="p-8 rounded-2xl bg-[#F7F5ED] text-center space-y-3 border border-[#E7E3D8]">
                                                                      <div className="w-12 h-12 rounded-full bg-white text-[#173F35] flex items-center justify-center mx-auto text-xl border border-[#E7E3D8]">
                                                                        <FiCheck />
                                                                      </div>
                                                                      <h4 className="text-base font-semibold text-[#173F35]">Message Received</h4>
                                                                      <p className="text-xs text-[#777D76] max-w-sm mx-auto">
                                                                        Thank you, {formData.name}. Our team has received your inquiry and will follow up with you via {formData.email}.
                                                                      </p>
                                                                      <button
                                                                        onClick={() => setIsSubmitted(false)}
                                                                        className="px-6 py-2 rounded-full bg-[#173F35] text-[#F7F5ED] text-xs font-semibold"
                                                                      >
                                                                        Send Another Message
                                                                      </button>
                                                                    </div>
                                                                    ) : (
                                                                    <form onSubmit={handleSubmit} className="space-y-4">
                                                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                        <div>
                                                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1">
                                                                              Full Name *
                                                                            </label>
                                                                            <input
                                                                              type="text"
                                                                              required
                                                                              value={formData.name}
                                                                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                              placeholder="e.g. Asif Mahmud"
                                                                              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none"
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1">
                                                                              Email Address *
                                                                            </label>
                                                                            <input
                                                                              type="email"
                                                                              required
                                                                              value={formData.email}
                                                                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                              placeholder="e.g. asif@example.com"
                                                                              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none"
                                                                            />
                                                                        </div>
                                                                      </div>

                                                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                        <div>
                                                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1">
                                                                              Phone Number
                                                                            </label>
                                                                            <input
                                                                              type="tel"
                                                                              value={formData.phone}
                                                                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                                              placeholder="e.g. 017XXXXXXXX"
                                                                              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none"
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1">
                                                                              Inquiry Type
                                                                            </label>
                                                                            <select
                                                                              value={formData.subject}
                                                                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                                              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none bg-white"
                                                                            >
                                                                              <option value="Product Consultation">Nutrition / Product Consultation</option>
                                                                              <option value="Order Tracking">Order Delivery & Tracking</option>
                                                                              <option value="Wholesale">Wholesale & Corporate Inquiries</option>
                                                                              <option value="Other">Other Questions</option>
                                                                            </select>
                                                                        </div>
                                                                      </div>

                                                                      <div>
                                                                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F35] mb-1">
                                                                            Your Message *
                                                                          </label>
                                                                          <textarea
                                                                            rows={4}
                                                                            required
                                                                            value={formData.message}
                                                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                                            placeholder="Tell us what you are looking for..."
                                                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E3D8] focus:border-[#173F35] outline-none resize-none"
                                                                          />
                                                                      </div>

                                                                      <button
                                                                        type="submit"
                                                                        className="px-8 py-3 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                                                                      >
                                                                        Send Inquiry
                                                                      </button>
                                                                    </form>
            )}
                                                                </div>

                                                                {/* Flagship Experience (5 cols) */}
                                                                <div className="lg:col-span-5 bg-[#173F35] text-[#F7F5ED] rounded-3xl p-7 sm:p-9 shadow-elevate flex flex-col justify-between space-y-6">
                                                                  <div className="space-y-4">
                                                                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A54A] block">
                                                                        EXPERIENCE IN PERSON
                                                                      </span>
                                                                        <h3 className="text-2xl font-normal font-editorial text-white">
                                                                          Visit the Banani Center
                                                                        </h3>
                                                                          <p className="text-xs text-[#F7F5ED]/80 leading-relaxed">
                                                                            Inspect raw honey crystallizations, review third-party laboratory verification certificates, and consult with our resident nutritionists in Banani.
                                                                          </p>

                                                                            {/* Minimalist Location Graphic */}
                                                                            <div className="rounded-2xl p-6 bg-white/5 border border-white/10 text-center space-y-2 mt-4">
                                                                              <FiMapPin size={22} className="text-[#D6A54A] mx-auto" />
                                                                              <span className="text-xs font-semibold text-white block">
                                                                                Block D, Road 11, Banani
                                                                              </span>
                                                                              <span className="text-[11px] text-[#F7F5ED]/70 block">
                                                                                Dhaka-1213, Bangladesh
                                                                              </span>
                                                                            </div>
                                                                          </div>

                                                                              <div className="pt-4 border-t border-white/10 text-xs text-[#F7F5ED]/75 space-y-1">
                                                                                <div className="flex items-center gap-1.5 text-[#D6A54A]">
                                                                                  <FiClock size={13} />
                                                                                  <span className="font-semibold uppercase tracking-wider text-[10px]">Hours</span>
                                                                                </div>
                                                                                  <p className="text-[11px]">
                                                                                    {siteData.contact.hours}
                                                                                  </p>
                                                                              </div>
                                                                            </div>

                                                                          </div>

                                                                        </div>
                                                                      </div>
                                                                      );
}
