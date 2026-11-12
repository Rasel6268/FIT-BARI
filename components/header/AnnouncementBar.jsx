"use client";

import React, { useState, useEffect } from "react";
import siteData from "@/data/site.json";
import { useCart } from "@/context/CartContext";
import { FiShield } from "react-icons/fi";

export default function AnnouncementBar() {
  const { storeSettings } = useCart() || {};
  const [currentIdx, setCurrentIdx] = useState(0);

  const announcements =
    storeSettings?.announcements && storeSettings.announcements.length > 0
      ? storeSettings.announcements
      : siteData.announcementBar || [];

  const hotline =
    storeSettings?.supportPhone || siteData.contact.hotline || "+880 1712-345678";

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="bg-[#173F35] text-[#F7F5ED] text-[11px] font-medium tracking-wide py-2 px-4 border-b border-[#0F2B24]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Hotline */}
        <div className="hidden md:flex items-center gap-3 text-[#F7F5ED]/75">
          <a href={`tel:${hotline}`} className="hover:text-white transition-colors">
            Direct Support: {hotline}
          </a>
        </div>

        {/* Center: Subtle Text Rotation */}
        <div className="flex-1 flex justify-center items-center text-center">
          <div key={currentIdx} className="animate-fadeIn inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A54A] flex-shrink-0" />
            <span className="text-[#F7F5ED]/95">{announcements[currentIdx]}</span>
          </div>
        </div>

        {/* Right: Guarantee */}
        <div className="hidden lg:flex items-center gap-4 text-[#F7F5ED]/75">
          <span className="flex items-center gap-1.5">
            <FiShield className="text-[#829B76]" size={13} />
            <span>100% Authentic Guaranteed</span>
          </span>
        </div>
      </div>
    </div>
  );
}
