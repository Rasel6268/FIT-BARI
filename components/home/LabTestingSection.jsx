"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FiCheckCircle,
  FiZoomIn,
  FiZoomOut,
  FiRotateCcw,
  FiDownload,
  FiX,
  FiFileText,
  FiShield,
  FiEye,
  FiMaximize2,
  FiInfo,
} from "react-icons/fi";

const REPORT_IMAGE_SRC = "/images/bcsir-lab-report-fit-fuel.jpg";
const REPORT_DOWNLOAD_NAME = "BCSIR-IFST-Analysis-Report-FIT-FUEL-FTRS-250585.jpg";

const HEAVY_METAL_RESULTS = [
  {
    element: "Lead",
    symbol: "Pb",
    result: "Not Detected",
    detectionLimit: "0.05 mg/kg",
  },
  {
    element: "Arsenic",
    symbol: "As",
    result: "Not Detected",
    detectionLimit: "0.05 mg/kg",
  },
  {
    element: "Cadmium",
    symbol: "Cd",
    result: "Not Detected",
    detectionLimit: "0.05 mg/kg",
  },
];

const LAB_METADATA = [
  {
    label: "Testing Organization",
    value: "Bangladesh Council of Scientific and Industrial Research (BCSIR)",
  },
  {
    label: "Institute",
    value: "Institute of Food Science & Technology (IFST)",
  },
  {
    label: "Sample Name",
    value: "FIT FUEL",
  },
  {
    label: "Sample ID",
    value: "FTRS/250585",
    mono: true,
  },
  {
    label: "Analysis Report Date",
    value: "22 December 2025",
  },
  {
    label: "Testing Method",
    value: "Atomic Absorption Spectrophotometer (AAS)",
  },
];

const TRUST_INDICATORS = [
  {
    icon: FiFileText,
    label: "Laboratory Analysis by BCSIR",
  },
  {
    icon: FiShield,
    label: "Heavy Metal Testing",
  },
  {
    icon: FiEye,
    label: "Transparent Test Results",
  },
];

export default function LabTestingSection({ className = "bg-[#FAF8F2]" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openModal = () => {
    setZoomLevel(1);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setZoomLevel(1);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(2.5, Number((prev + 0.25).toFixed(2))));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(0.75, Number((prev - 0.25).toFixed(2))));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
  }, []);

  // Lock body scroll & handle keyboard shortcuts while modal is open
  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleResetZoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, closeModal, handleZoomIn, handleZoomOut, handleResetZoom]);

  return (
    <section
      id="lab-testing"
      aria-labelledby="lab-testing-heading"
      className={`py-12 sm:py-16 lg:py-20 border-b border-[#E7E3D8] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7E3D8] mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F4E]" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#173F35]">
              Independent Sample Analysis
            </span>
          </div>

          <h2
            id="lab-testing-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-normal font-editorial text-[#173F35] tracking-tight"
          >
            Laboratory Tested. Quality Assured.
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-[15px] text-[#5F665E] leading-relaxed">
            Your trust matters to us. Our FIT FUEL sample has undergone laboratory
            analysis at the Institute of Food Science &amp; Technology (IFST),
            BCSIR, Bangladesh, for selected heavy metal contaminants.
          </p>
        </div>

        {/* Main 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT COLUMN (7 cols): Highlights + Lab Verification Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 sm:gap-6">
            {/* 1. Three Heavy Metal Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {HEAVY_METAL_RESULTS.map((item) => (
                <div
                  key={item.symbol}
                  className="bg-white rounded-xl sm:rounded-2xl border border-[#E7E3D8] p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#173F35]/30 hover:shadow-subtle"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-sm sm:text-[15px] font-semibold text-[#173F35]">
                      {item.element}{" "}
                      <span className="text-[#777D76] font-normal">
                        ({item.symbol})
                      </span>
                    </h3>
                    <span className="w-7 h-7 rounded-full bg-[#EDF5F0] text-[#2E6F4E] flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle size={14} aria-hidden="true" />
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EDF5F0] border border-[#CDE3D6] text-[#1F5A3C] text-xs font-semibold">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#2E6F4E]"
                        aria-hidden="true"
                      />
                      <span>{item.result}</span>
                    </div>

                    <div className="pt-2 border-t border-[#E7E3D8]/70 flex items-center justify-between text-[11px] text-[#777D76]">
                      <span>Detection Limit</span>
                      <span className="font-mono font-medium text-[#252A26]">
                        {item.detectionLimit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Laboratory Verification Panel */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E7E3D8] p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[#E7E3D8]">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-[#173F35]">
                      Laboratory Verification Details
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#777D76] mt-0.5">
                      Official parameters recorded on the IFST, BCSIR analysis report
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#F7F5ED] border border-[#E7E3D8] text-[11px] font-mono font-semibold text-[#173F35] flex-shrink-0">
                    FTRS/250585
                  </span>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                  {LAB_METADATA.map((row) => (
                    <div
                      key={row.label}
                      className="space-y-0.5 pb-2.5 border-b border-[#E7E3D8]/50 last:border-b-0 sm:border-b-0 sm:pb-0"
                    >
                      <dt className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#777D76]">
                        {row.label}
                      </dt>
                      <dd
                        className={`text-xs sm:text-[13px] font-medium text-[#252A26] leading-snug ${
                          row.mono ? "font-mono" : ""
                        }`}
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Accuracy Scope Disclaimer */}
              <div className="mt-5 pt-4 border-t border-[#E7E3D8] flex items-start gap-2.5 text-[11px] sm:text-xs text-[#6B726A] leading-relaxed">
                <FiInfo
                  size={14}
                  className="text-[#829B76] flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p>
                  <strong className="font-semibold text-[#252A26]">
                    Scope of Analysis:
                  </strong>{" "}
                  Reported results apply solely to the supplied{" "}
                  <strong className="font-semibold text-[#252A26]">
                    FIT FUEL
                  </strong>{" "}
                  sample (Sample ID: FTRS/250585) tested by IFST, BCSIR for the
                  listed heavy metals at a 0.05 mg/kg detection limit.
                </p>
              </div>
            </div>

            {/* 3. Trust Indicators Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {TRUST_INDICATORS.map((indicator) => {
                const Icon = indicator.icon;
                return (
                  <div
                    key={indicator.label}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E3D8] text-xs font-medium text-[#173F35]"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#F7F5ED] border border-[#E7E3D8] flex items-center justify-center text-[#173F35] flex-shrink-0">
                      <Icon size={13} aria-hidden="true" />
                    </span>
                    <span className="leading-tight">{indicator.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (5 cols): Original Laboratory Report Preview */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E7E3D8] p-4 sm:p-5 flex flex-col justify-between h-full shadow-subtle">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#777D76]">
                  Original Analysis Report
                </span>
                <span className="text-[11px] text-[#777D76] font-mono">
                  BCSIR • IFST
                </span>
              </div>

              {/* Document Image Frame */}
              <button
                type="button"
                onClick={openModal}
                aria-label="Open full-size BCSIR laboratory analysis report"
                className="group relative w-full rounded-xl overflow-hidden border border-[#E7E3D8] bg-[#F7F5ED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35] cursor-zoom-in"
              >
                <div className="aspect-[3/4] w-full overflow-hidden flex items-center justify-center bg-[#EFECE3]">
                  <img
                    src={REPORT_IMAGE_SRC}
                    alt="Original BCSIR IFST Laboratory Analysis Report for FIT FUEL sample FTRS/250585 showing Lead, Arsenic, and Cadmium Not Detected at 0.05 mg/kg detection limit"
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                {/* Subtle Hover Inspection Cue */}
                <div className="absolute inset-0 bg-[#173F35]/0 group-hover:bg-[#173F35]/10 transition-colors duration-200 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 text-[#173F35] text-xs font-semibold shadow-sm border border-[#E7E3D8]">
                    <FiMaximize2 size={13} aria-hidden="true" />
                    <span>Inspect Document</span>
                  </span>
                </div>
              </button>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={openModal}
                  className="flex-1 h-10 sm:h-11 px-4 rounded-full bg-[#173F35] hover:bg-[#0F2B24] active:scale-[0.98] text-[#F7F5ED] text-xs font-semibold tracking-wide inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35] focus-visible:ring-offset-2"
                >
                  <FiZoomIn size={14} aria-hidden="true" />
                  <span>View Full Laboratory Report</span>
                </button>

                <a
                  href={REPORT_IMAGE_SRC}
                  download={REPORT_DOWNLOAD_NAME}
                  aria-label="Download original BCSIR laboratory report"
                  className="h-10 sm:h-11 px-4 rounded-full border border-[#E7E3D8] hover:border-[#173F35] bg-[#F7F5ED] hover:bg-white text-[#173F35] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35]"
                >
                  <FiDownload size={14} aria-hidden="true" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Accessible Document Viewer Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full Laboratory Analysis Report Viewer"
          className="fixed inset-0 z-[100] flex flex-col bg-[#0E1E19]/90 backdrop-blur-sm animate-fadeIn"
        >
          {/* Top Viewer Toolbar */}
          <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-3 bg-[#173F35] border-b border-white/10 text-[#F7F5ED]">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold truncate">
                BCSIR / IFST Analysis Report — FIT FUEL
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#F7F5ED]/75 font-mono truncate">
                Sample ID: FTRS/250585 • 22 December 2025
              </p>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Zoom Controls */}
              <div className="inline-flex items-center bg-white/10 rounded-full p-0.5 border border-white/15">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.75}
                  aria-label="Zoom out"
                  title="Zoom out"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-white/15 disabled:opacity-40 transition-colors"
                >
                  <FiZoomOut size={14} />
                </button>
                <span className="px-1.5 sm:px-2 text-[11px] font-mono min-w-[44px] text-center select-none">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  aria-label="Zoom in"
                  title="Zoom in"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-white/15 disabled:opacity-40 transition-colors"
                >
                  <FiZoomIn size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  aria-label="Reset zoom"
                  title="Reset zoom"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors"
                >
                  <FiRotateCcw size={13} />
                </button>
              </div>

              {/* Download Button */}
              <a
                href={REPORT_IMAGE_SRC}
                download={REPORT_DOWNLOAD_NAME}
                aria-label="Download laboratory report"
                title="Download original report"
                className="h-8 sm:h-9 px-3 rounded-full bg-[#D6A54A] hover:bg-[#C2933C] text-[#173F35] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <FiDownload size={13} />
                <span className="hidden sm:inline">Download</span>
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close report viewer"
                title="Close (Esc)"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FiX size={17} />
              </button>
            </div>
          </div>

          {/* Scrollable Zoomable Document Viewport */}
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            className="flex-1 overflow-auto p-3 sm:p-6 flex items-start justify-center"
          >
            <div
              className="transition-all duration-200 ease-out origin-top"
              style={{
                width: `${Math.round(zoomLevel * 100)}%`,
                maxWidth: `${Math.round(zoomLevel * 760)}px`,
              }}
            >
              <img
                src={REPORT_IMAGE_SRC}
                alt="Full original BCSIR IFST Laboratory Analysis Report for FIT FUEL sample FTRS/250585"
                className="w-full h-auto rounded-lg shadow-2xl bg-white select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Bottom Helper Bar */}
          <div className="px-4 py-2 bg-[#0F2B24] border-t border-white/10 text-center text-[11px] text-[#F7F5ED]/70">
            Original unaltered IFST, BCSIR report • Use zoom controls to inspect
            details • Press Esc to close
          </div>
        </div>
      )}
    </section>
  );
}
