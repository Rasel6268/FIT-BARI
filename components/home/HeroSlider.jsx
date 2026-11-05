"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import heroSlides from "@/data/heroSlides.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiCheck } from "react-icons/fi";

export default function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
      <section className="relative w-full overflow-hidden border-b border-[#E7E3D8] transition-colors duration-700">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          speed={900}
          autoplay={{
            delay: 6500,
            disableOnInteraction: false,
          }}
          loop={true}
          onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
          pagination={{
            clickable: true,
            el: ".hero-custom-bullets",
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="w-full"
        >
                {heroSlides.map((slide, idx) => {
                  const isDark = slide.theme === "forest";

                  return (
                    <SwiperSlide key={slide.id}>
                      <div
                        className={`w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center transition-colors duration-700 ${slide.theme === "forest"
                            ? "bg-[#173F35] text-[#F7F5ED]"
                            : slide.theme === "sage"
                              ? "bg-[#EFECE1] text-[#252A26]"
                              : "bg-[#F7F5ED] text-[#252A26]"
                          }`}
                      >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                          {/* LEFT COLUMN: Editorial Typography & Split Content (6 cols) */}
                          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
                            {/* Small Uppercase Kicker */}
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-2 h-2 rounded-full ${isDark ? "bg-[#D6A54A]" : "bg-[#173F35]"
                                  }`}
                              />
                              <span
                                className={`text-[11px] font-bold tracking-[0.2em] uppercase font-sans ${isDark ? "text-[#D6A54A]" : "text-[#777D76]"
                                  }`}
                              >
                                {slide.kicker}
                              </span>
                            </div>

                            {/* Editorial Headline */}
                            <h1
                              className={`text-4xl sm:text-5xl lg:text-6xl font-normal font-editorial leading-[1.08] tracking-tight whitespace-pre-line ${isDark ? "text-[#F7F5ED]" : "text-[#173F35]"
                                }`}
                            >
                              {slide.headline}
                            </h1>

                                      {/* Supporting Paragraph */}
                                      <p
                                        className={`text-sm sm:text-base leading-relaxed max-w-lg font-sans ${isDark ? "text-[#F7F5ED]/80" : "text-[#777D76]"
                                          }`}
                                      >
                                        {slide.lead}
                                      </p>

                                  {/* Call-to-Action Group */}
                                  <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <Link
                                      href={slide.primaryCta.href}
                                      className={`px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 inline-flex items-center gap-2 shadow-sm ${isDark
                                          ? "bg-[#D6A54A] hover:bg-[#C2933C] text-[#173F35]"
                                          : "bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED]"
                                        }`}
                                    >
                                      <span>{slide.primaryCta.text}</span>
                                      <FiArrowRight size={14} />
                                    </Link>

                                      <Link
                                        href={slide.secondaryCta.href}
                                        className={`px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 border ${isDark
                                            ? "border-[#F7F5ED]/30 text-[#F7F5ED] hover:bg-white/10"
                                            : "border-[#252A26]/30 text-[#252A26] hover:bg-[#252A26]/5"
                                          }`}
                                      >
                                        {slide.secondaryCta.text}
                                      </Link>
                                    </div>

                                      {/* Small Trust Indicators */}
                      <div
                                      className={`pt-6 border-t flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium ${isDark ? "border-white/15 text-[#F7F5ED]/80" : "border-[#E7E3D8] text-[#777D76]"
                                        }`}
                                    >
                                    {slide.trustNotes.map((note, noteIdx) => (
                                      <div key={noteIdx} className="flex items-center gap-2">
                                        <span
                                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isDark
                                              ? "bg-white/10 text-[#D6A54A]"
                                              : "bg-[#829B76]/20 text-[#173F35]"
                                            }`}
                                        >
                                          <FiCheck size={10} />
                                        </span>
                                        <span className="tracking-wide">{note}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                              {/* RIGHT COLUMN: Large Premium Lifestyle Product Photograph (6 cols) */}
                              <div className="lg:col-span-6 relative">
                                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-elevate bg-white border border-[#E7E3D8]/50">
                                  <img
                                    src={slide.image}
                                    alt={slide.imageAlt}
                                    className="w-full h-full object-cover transition-transform duration-1000 scale-[1.01] hover:scale-105 editorial-img"
                                  />

                                          {/* Subtle Editorial Caption Overlay */}
                                          <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6">
                                            <div className="px-4 py-3 rounded-xl bg-white/90 backdrop-blur-md text-[#252A26] border border-white/60 shadow-subtle flex items-center justify-between">
                                              <span className="text-[11px] sm:text-xs font-medium text-[#777D76] truncate">
                                                {slide.caption}
                                              </span>
                                              <span className="text-[10px] uppercase font-bold tracking-widest text-[#173F35] bg-[#F7F5ED] px-2 py-0.5 rounded border border-[#E7E3D8]">
                                                Verified
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                          </SwiperSlide>
                          );
        })}
                        </Swiper>

                          {/* Restrained Navigation & Slide Pagination */}
                          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="relative -mt-12 mb-6 z-20 flex items-center justify-between pointer-events-none">
                              {/* Custom Bullet Indicators */}
                              <div className="hero-custom-bullets flex items-center gap-2 pointer-events-auto" />

                              {/* Minimalist Arrow Controls */}
                              <div className="flex items-center gap-2 pointer-events-auto">
                                <button
                                  ref={prevRef}
                                  aria-label="Previous Slide"
                                  className="w-10 h-10 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] flex items-center justify-center hover:bg-[#173F35] hover:text-white transition-all shadow-subtle"
                                >
                                  <FiChevronLeft size={16} />
                                </button>
                                <button
                                  ref={nextRef}
                                  aria-label="Next Slide"
                                  className="w-10 h-10 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] flex items-center justify-center hover:bg-[#173F35] hover:text-white transition-all shadow-subtle"
                                >
                                  <FiChevronRight size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </section>
                        );
}
