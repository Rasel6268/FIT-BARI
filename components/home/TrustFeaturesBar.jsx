"use client";

import React from "react";
import { FiShield, FiTruck, FiRefreshCw, FiAward } from "react-icons/fi";

export default function TrustFeaturesBar() {
  const perks = [
    {
      icon: <FiShield className="text-lg text-[#173F35] group-hover:text-white transition-colors" />,
      title: "100% Authentic Products",
      desc: "Direct import & lab-tested single-origin purity",
    },
    {
      icon: <FiTruck className="text-lg text-[#829B76] group-hover:text-white transition-colors" />,
      title: "Complimentary Delivery",
      desc: "On all orders above ৳2,000 nationwide",
    },
    {
      icon: <FiAward className="text-lg text-[#D6A54A] group-hover:text-white transition-colors" />,
      title: "Zero Preservatives",
      desc: "No artificial syrups, fillers or amino spiking",
    },
    {
      icon: <FiRefreshCw className="text-lg text-[#829B76] group-hover:text-white transition-colors" />,
      title: "Inspection on Delivery",
      desc: "Full verification before payment accepted",
    },
  ];

  return (
    <div className="w-full bg-white border-b border-[#E7E3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 group cursor-default"
            >
              <div className="w-10 h-10 rounded-full bg-[#F7F5ED] border border-[#E7E3D8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#173F35] group-hover:border-[#173F35] transition-all duration-200">
                {perk.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-[#173F35] leading-snug truncate">
                  {perk.title}
                </h4>
                <p className="text-[11px] text-[#777D76] truncate mt-0.5 leading-normal">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      );
}
