"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import siteData from "@/data/site.json";
import {
  FiChevronDown,
  FiArrowRight
} from "react-icons/fi";

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How does FIT BARI guarantee that imported gym supplements are 100% genuine?",
      a: "All our imported supplements (Whey Isolate, Creatine, Amino Acids) are sourced directly from authorized global distributors. Each container carries manufacturer holographic seals, batch numbers, and scratch-off QR codes that verify authenticity instantly on the manufacturer portal.",
    },
    {
      q: "Is FIT BARI Sundarban honey raw and unpasteurized?",
      a: "Yes, 100%. Our Sundarban Honey is cold-extracted by traditional Mawals (honey hunters) without any heating, fine micro-filtering, or pasteurization. Live bee pollens, beneficial enzymes, and natural aromas remain completely intact.",
    },
    {
      q: "What is your nationwide delivery timeframe in Bangladesh?",
      a: "Orders placed inside Dhaka are delivered within 24 hours. Express home delivery across all 64 districts in Bangladesh is fulfilled within 48 to 72 hours via our dedicated logistics network.",
    },
    {
      q: "Can I inspect the products and pay with Cash on Delivery?",
      a: "Yes. We proudly offer Cash on Delivery (COD) nationwide. You can inspect the exterior packaging and authenticity seals in front of the delivery partner before releasing payment.",
    },
    {
      q: "What is your return and replacement policy?",
      a: "If you receive an unsealed product, damaged container, or incorrect item, notify us within 7 days for a 100% free immediate replacement or full refund with no questions asked.",
    },
  ];

  return (
    <div className="bg-[#F7F5ED] min-h-screen py-8">
      {/* Schema.org FAQPage Structured Data */}
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Our Story" }]} />

        {/* Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
            THE FIT BARI ORIGIN
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-editorial text-[#173F35] tracking-tight leading-[1.08]">
            Better Choices Begin at Home.
          </h1>
          <p className="text-sm sm:text-base text-[#777D76] leading-relaxed pt-2">
            FIT BARI was born out of a quiet frustration with an unregulated marketplace saturated with boiled, sugar-fed honeys and counterfeit imported fitness supplements. We created a transparent pantry where authenticity is never questioned.
          </p>
        </div>

        {/* Image Spread */}
        <div className="rounded-3xl overflow-hidden aspect-[16/8] sm:aspect-[16/7] bg-[#EFECE1] border border-[#E7E3D8] shadow-elevate">
          <img
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=85"
            alt="Wholesome ingredients on kitchen table"
            className="w-full h-full object-cover editorial-img"
          />
        </div>

        {/* 2-Column Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E3D8] shadow-subtle space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#829B76]">
              OUR MISSION
            </span>
            <h3 className="text-2xl font-normal font-editorial text-[#173F35]">
              Empowering Bangladesh with Honest Nutrition
            </h3>
            <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
              We supply unadulterated, biologically active whole foods and scientifically validated sports supplements directly to health enthusiasts, families, and elite athletes across every corner of Bangladesh.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E3D8] shadow-subtle space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#D6A54A]">
              OUR RIGOR
            </span>
            <h3 className="text-2xl font-normal font-editorial text-[#173F35]">
              Zero Tolerance for Adulteration
            </h3>
            <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
              If a product contains industrial cane syrups, lacks lab certificate retention, or fails HPLC testing, it never earns the FIT BARI seal. We test our batches rigorously.
            </p>
          </div>
        </div>

        {/* 4-Step Sourcing & Testing Process */}
        <div id="purity" className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E3D8] shadow-subtle">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
              QUALITY VERIFICATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal font-editorial text-[#173F35]">
              How We Verify Every Single Batch
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] space-y-2">
              <span className="font-editorial text-2xl font-bold text-[#173F35]">01</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173F35]">Direct Harvest</h4>
              <p className="text-xs text-[#777D76] leading-relaxed">
                Collecting honey from Sundarban Mawals, importing Chia directly from Peru, and partnering with brand-certified labs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] space-y-2">
              <span className="font-editorial text-2xl font-bold text-[#173F35]">02</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173F35]">Lab Testing</h4>
              <p className="text-xs text-[#777D76] leading-relaxed">
                HMF tests, moisture checks, and HPLC analysis conducted on every batch before entering our pantry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] space-y-2">
              <span className="font-editorial text-2xl font-bold text-[#173F35]">03</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173F35]">Airtight Sealing</h4>
              <p className="text-xs text-[#777D76] leading-relaxed">
                Packed in food-grade, UV-protected, airtight containers to lock in live enzymes and micronutrient density.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] space-y-2">
              <span className="font-editorial text-2xl font-bold text-[#173F35]">04</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173F35]">Nationwide Delivery</h4>
              <p className="text-xs text-[#777D76] leading-relaxed">
                Shipped via express couriers straight to your door with full pre-payment inspection and Cash on Delivery.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
              COMMON QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal font-editorial text-[#173F35]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E7E3D8] overflow-hidden bg-white shadow-subtle"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-5 text-left font-semibold text-xs sm:text-sm text-[#173F35] flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <FiChevronDown
                  className={`transition-transform duration-200 ${openFaq === idx ? "rotate-180 text-[#D6A54A]" : "text-[#777D76]"
                    }`}
                                                                />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#777D76] leading-relaxed border-t border-[#E7E3D8]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            <span>Explore the FIT BARI Catalog</span>
            <FiArrowRight size={13} />
          </Link>
        </div>

      </div>
    </div>
  );
}
