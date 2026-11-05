"use client";

import React from "react";
import { FiShield, FiTruck, FiRefreshCw, FiAward } from "react-icons/fi";

export default function TrustFeaturesBar() {
  const perks = [
    {
      icon: <FiShield className="text-xl text-[#173F35]" />,
      title: "100% Authentic Products",
      desc: "Direct import & lab-tested single-origin purity",
    },
    {
      icon: <FiTruck className="text-xl text-[#829B76]" />,
      title: "Complimentary Delivery",
      desc: "On all orders above ৳2,000 nationwide",
    },
    {
      icon: <FiAward className="text-xl text-[#D6A54A]" />,
      title: "Zero Preservatives",
      desc: "No artificial syrups, fillers or amino spiking",
    },
    {
      icon: <FiRefreshCw className="text-xl text-[#829B76]" />,
      title: "Inspection on Delivery",
      desc: "Full verification before payment accepted",
    },
  ];

  return (
          <div className="w-full bg-[#FFFFFF] border-b border-[#E7E3D8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {perks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 group"
                  >
                      <div className="w-10 h-10 rounded-full bg-[#F7F5ED] border border-[#E7E3D8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#173F35] group-hover:text-white transition-colors duration-200">
                        {perk.icon}
                      </div>
                      <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#173F35] leading-snug">
                            {perk.title}
                          </h4>
                            <p className="text-[11px] text-[#777D76] truncate mt-0.5">
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
