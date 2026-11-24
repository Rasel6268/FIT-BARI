"use client";

import React, { useRef } from "react";
import testimonials from "@/data/testimonials.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function CustomerReviews() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[#F7F5ED] border-b border-[#E7E3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal font-editorial text-[#173F35] tracking-tight">
              Customer Reviews
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5">
            <button
              ref={prevRef}
              aria-label="Previous Review"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] flex items-center justify-center hover:bg-[#173F35] hover:text-white transition-all shadow-subtle active:scale-95"
            >
              <FiChevronLeft size={15} />
            </button>
            <button
              ref={nextRef}
              aria-label="Next Review"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] flex items-center justify-center hover:bg-[#173F35] hover:text-white transition-all shadow-subtle active:scale-95"
            >
              <FiChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Testimonials Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="pb-2"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#E7E3D8] shadow-subtle h-full flex flex-col justify-between space-y-3.5">
                <div className="space-y-2.5">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-[#D6A54A]">
                    {[...Array(item.rating)].map((_, i) => (
                      <FiStar key={i} size={12} className="fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-[13px] text-[#252A26] leading-relaxed italic line-clamp-4">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-t border-[#E7E3D8]/70 flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#173F35]">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#777D76]">
                      {item.role}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#829B76] font-medium bg-[#829B76]/10 px-2 py-0.5 rounded-full flex-shrink-0">
                    Verified
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
