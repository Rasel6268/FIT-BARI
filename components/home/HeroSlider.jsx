"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import heroSlides from "@/data/heroSlides.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative w-full bg-[#F7F5ED] border-b border-[#E7E3D8] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        autoplay={{
          delay: 6000,
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
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full py-3 sm:py-5 lg:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 items-center">

                  {/* LEFT: Text content (Hidden on mobile, visible on desktop lg+) */}
                  <div className="hidden lg:block lg:col-span-5 space-y-2.5 sm:space-y-4 text-left order-2 lg:order-1">
                    {/* Small category kicker with accent dot */}
                    {slide.kicker && (
                      <div className="inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A54A]" />
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#777D76]">
                          {slide.kicker}
                        </span>
                      </div>
                    )}

                    {/* Editorial headline */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-normal font-editorial leading-[1.14] tracking-tight text-[#173F35] whitespace-pre-line">
                      {slide.headline}
                    </h1>

                    {/* Short, meaningful subtitle */}
                    <p className="text-xs sm:text-sm md:text-base text-[#777D76] leading-relaxed max-w-md line-clamp-3 sm:line-clamp-none">
                      {slide.lead}
                    </p>

                    {/* Single focused CTA button */}
                    <div className="pt-1">
                      <Link
                        href={slide.cta.href}
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow group"
                      >
                        <span>{slide.cta.text}</span>
                        <FiArrowRight
                          size={13}
                          className="group-hover:translate-x-1 transition-transform duration-200"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* RIGHT: Slide image showcase from public/images (7 cols on lg, full width on mobile) */}
                  <div className="w-full lg:col-span-7 order-1 lg:order-2">
                    <Link href={slide.cta.href} className="block">
                      <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden group">
                        <img
                          src={slide.image}
                          alt={slide.imageAlt}
                          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                          loading={slide.id === 1 ? "eager" : "lazy"}
                        />
                      </div>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slider Controls (Pagination Bullets & Minimal Arrows) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 sm:pb-6 pt-1 sm:pt-2">
        <div className="flex items-center justify-center sm:justify-between">
          {/* Custom Bullet Indicators */}
          <div className="hero-custom-bullets flex items-center gap-2" />

          {/* Minimalist Prev/Next Arrow Controls (Hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              ref={prevRef}
              aria-label="Previous Slide"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#173F35] border border-[#E7E3D8] text-[#173F35] hover:text-white flex items-center justify-center transition-all duration-200 shadow-subtle"
            >
              <FiChevronLeft size={16} />
            </button>
            <button
              ref={nextRef}
              aria-label="Next Slide"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#173F35] border border-[#E7E3D8] text-[#173F35] hover:text-white flex items-center justify-center transition-all duration-200 shadow-subtle"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
