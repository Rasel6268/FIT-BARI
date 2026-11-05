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
      <section className="py-20 sm:py-28 bg-[#F7F5ED] border-b border-[#E7E3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                      AUTHENTIC WORDS
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] tracking-tight">
                      Shared by Our Community
                    </h2>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      ref={prevRef}
                      aria-label="Previous Review"
                      className="w-10 h-10 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] flex items-center justify-center hover:bg-[#173F35] hover:text-white transition-all shadow-subtle"
                    >
                      <FiChevronLeft size={16} />
                    </button>
                    <button
                      ref={nextRef}
                      aria-label="Next Review"
                      className="w-10 h-10 rounded-full bg-white border border-[#E7E3D8] text-[#173F35] flex items-center justify-center hover:bg-[#173F35] hover:text-white transition-all shadow-subtle"
                    >
                      <FiChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Testimonials Swiper */}
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={28}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
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
                  className="pb-4"
                >
                  {testimonials.map((item) => (
                    <SwiperSlide key={item.id} className="h-auto">
                            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E7E3D8] shadow-subtle h-full flex flex-col justify-between space-y-6">
                              <div className="space-y-4">
                                {/* Subtle 5-star rating */}
                                <div className="flex items-center gap-1 text-[#D6A54A]">
                                  {[...Array(item.rating)].map((_, i) => (
                      <FiStar key={i} size={13} className="fill-current" />
                                  ))}
                                </div>

                                  {/* Review Text */}
                                  <p className="text-xs sm:text-sm text-[#252A26] leading-relaxed italic">
                                    &ldquo;{item.review}&rdquo;
                                  </p>
                              </div>

                                {/* Author & Product Info */}
                                <div className="pt-4 border-t border-[#E7E3D8]/70">
                                  <h4 className="text-sm font-semibold text-[#173F35]">
                                    {item.name}
                                  </h4>
                                  <p className="text-[11px] text-[#777D76] mt-0.5">
                                    {item.role}
                                  </p>
                                  <p className="text-[10px] text-[#829B76] font-medium mt-1 truncate">
                                    Verified Purchase: {item.productPurchased}
                                  </p>
                                </div>
                              </div>
                            </SwiperSlide>
          ))}
                          </Swiper>

                        </div>
                      </section>
                      );
}
