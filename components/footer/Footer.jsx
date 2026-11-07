"use client";

import React from "react";
import Link from "next/link";
import siteData from "@/data/site.json";
import navData from "@/data/navigation.json";
import {
FiMapPin,
  FiPhone,
  FiMail,
  FiArrowRight,
  FiShield
} from "react-icons/fi";
import {
FaFacebookF,
  FaInstagram,
  FaWhatsapp
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
        <footer className="bg-[#0F2B24] text-[#F7F5ED] border-t border-[#173F35] pt-16 sm:pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Main 4-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-12 sm:pb-14 border-b border-white/10">

                  {/* Column 1: Brand Narrative (4 cols) */}
                  <div className="lg:col-span-4 space-y-4 sm:space-y-5">
                    <Link href="/" className="inline-flex items-baseline gap-2">
                      <span className="text-2xl font-bold tracking-tight text-white font-editorial">
                        FIT BARI
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6A54A]" />
                    </Link>

                    <p className="text-xs sm:text-sm text-[#F7F5ED]/75 leading-relaxed max-w-sm">
                      {siteData.subTagline}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D6A54A] hover:text-[#173F35] flex items-center justify-center text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6A54A]"
                      >
                        <FaInstagram />
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D6A54A] hover:text-[#173F35] flex items-center justify-center text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6A54A]"
                      >
                        <FaFacebookF />
                      </a>
                      <a
                        href={`https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="WhatsApp"
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#829B76] hover:text-white flex items-center justify-center text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#829B76]"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>

                  <div className="pt-2 text-[11px] text-[#F7F5ED]/60 flex items-center gap-1.5">
                    <FiShield className="text-[#829B76]" size={13} />
                    <span>BSTI Certified • 100% Laboratory Tested Batches</span>
                  </div>
                </div>

                  {/* Column 2: Shopping Collections (3 cols) */}
                  <div className="lg:col-span-3 space-y-4">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D6A54A]">
                      Pantry Collections
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[#F7F5ED]/80">
                      {navData.footerNav.categories.map((cat, idx) => (
                        <li key={idx}>
                          <Link
                            href={cat.href}
                            className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all group"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#829B76]" />
                            <span>{cat.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                    {/* Column 3: Care & Verification (2 cols) */}
                    <div className="lg:col-span-2 space-y-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D6A54A]">
                        Customer Care
                      </h4>
                      <ul className="space-y-2.5 text-xs text-[#F7F5ED]/80">
                        {navData.footerNav.customerCare.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              href={item.href}
                              className="hover:text-white transition-colors"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 4: Contact & Banani Flagship (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D6A54A]">
                        Banani Flagship Center
                      </h4>
                      <div className="space-y-3 text-xs text-[#F7F5ED]/80">
                        <div className="flex items-start gap-2.5">
                          <FiMapPin className="text-[#D6A54A] mt-0.5 flex-shrink-0" size={14} />
                          <span>{siteData.contact.address}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <FiPhone className="text-[#829B76] flex-shrink-0" size={14} />
                          <a href={`tel:${siteData.contact.hotline}`} className="hover:text-white transition-colors">
                            {siteData.contact.hotline}
                          </a>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <FiMail className="text-[#D6A54A] flex-shrink-0" size={14} />
                          <a href={`mailto:${siteData.contact.email}`} className="hover:text-white transition-colors">
                            {siteData.contact.email}
                          </a>
                        </div>
                      </div>
                    </div>

                </div>

                  {/* Bottom Bar: Copyright & Payment */}
                  <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F7F5ED]/60">
                    <p>© {currentYear} FIT BARI Ltd. Fuel Your Body. Nourish Your Life.</p>

                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <span className="text-[11px] mr-1">Accepted Payment:</span>
                    {siteData.paymentMethods.map((pm, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono tracking-wider text-white"
                      >
                        {pm.name}
                      </span>
                    ))}
                  </div>
                </div>

          </div>
        </footer>
        );
}
