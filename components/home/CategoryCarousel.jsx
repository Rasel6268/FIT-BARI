"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import categoriesData from "@/data/categories.json";
import { fetchCategories } from "@/lib/api";

export default function CategoryCarousel({
  title = "Featured Categories",
  eyebrow = "Curated Collections",
  subtitle = "Explore our certified single-origin harvests and lab-verified nutrition",
  categories = null,
  lang = "bn", // "bn" (Bengali) | "en" (English)
  className = "",
  bgColor = "bg-[#F4EFE4] border-y border-[#E2DACB]",
}) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const [categoryItems, setCategoryItems] = useState(categories || categoriesData);

  useEffect(() => {
    if (!categories) {
      fetchCategories()
        .then((cats) => {
          if (cats && cats.length > 0) {
            setCategoryItems(cats);
          }
        })
        .catch(() => {});
    }
  }, [categories]);

  const items = categoryItems.slice().sort((a, b) => {
    return (a.carouselOrder || a.order || a.id || 0) - (b.carouselOrder || b.order || b.id || 0);
  });

  const updateScrollBounds = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollBounds();

    el.addEventListener("scroll", updateScrollBounds, { passive: true });
    window.addEventListener("resize", updateScrollBounds);

    const timer = setTimeout(updateScrollBounds, 150);

    return () => {
      el.removeEventListener("scroll", updateScrollBounds);
      window.removeEventListener("resize", updateScrollBounds);
      clearTimeout(timer);
    };
  }, [updateScrollBounds]);

  const handleScroll = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = Math.max(el.clientWidth * 0.7, 280);
    const targetScroll =
      direction === "left"
        ? el.scrollLeft - scrollAmount
        : el.scrollLeft + scrollAmount;

    el.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleScroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleScroll("right");
    }
  };

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    isPointerDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollStartRef.current = el.scrollLeft;
    dragDistanceRef.current = 0;

    const onGlobalMouseMove = (moveEvent) => {
      if (!isPointerDownRef.current || !scrollContainerRef.current) return;
      const currentX = moveEvent.pageX - scrollContainerRef.current.offsetLeft;
      const deltaX = currentX - startXRef.current;
      dragDistanceRef.current = Math.abs(deltaX);

      if (dragDistanceRef.current > 4) {
        setIsDragging(true);
        scrollContainerRef.current.scrollLeft = scrollStartRef.current - deltaX;
      }
    };

    const onGlobalMouseUp = () => {
      isPointerDownRef.current = false;
      window.removeEventListener("mousemove", onGlobalMouseMove);
      window.removeEventListener("mouseup", onGlobalMouseUp);

      setTimeout(() => {
        setIsDragging(false);
        dragDistanceRef.current = 0;
      }, 60);
    };

    window.addEventListener("mousemove", onGlobalMouseMove);
    window.addEventListener("mouseup", onGlobalMouseUp);
  };

  const handleCardClick = (e) => {
    if (dragDistanceRef.current > 5 || isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section
      className={`w-full ${bgColor} py-6 sm:py-8 md:py-10 select-none overflow-hidden transition-colors duration-200 ${className}`}
      aria-label="Product Categories Carousel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {title && (
          <div className="text-center mb-3 sm:mb-5 md:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal font-editorial text-[#173F35] tracking-tight">
              {title}
            </h2>
          </div>
        )}

        {/* Carousel Track Container */}
        <div className="relative">
          {/* Previous Button (Hidden on touch mobile) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Previous categories"
            tabIndex={canScrollLeft ? 0 : -1}
            aria-hidden={!canScrollLeft}
            className={`hidden sm:flex absolute left-2 sm:left-3 z-20 top-[60px] sm:top-[66px] md:top-[71px] lg:top-[74px] -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#EDE6DC] shadow-[0_2px_8px_rgba(0,0,0,0.08)] items-center justify-center text-[#2D3748] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35] ${
              canScrollLeft
                ? "opacity-100 hover:bg-[#FAF9F5] hover:text-[#173F35] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 cursor-pointer"
                : "opacity-0 pointer-events-none cursor-default"
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 -translate-x-[1px]" strokeWidth={2.2} />
          </button>

          {/* Next Button (Hidden on touch mobile) */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Next categories"
            tabIndex={canScrollRight ? 0 : -1}
            aria-hidden={!canScrollRight}
            className={`hidden sm:flex absolute right-2 sm:right-3 z-20 top-[60px] sm:top-[66px] md:top-[71px] lg:top-[74px] -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#EDE6DC] shadow-[0_2px_8px_rgba(0,0,0,0.08)] items-center justify-center text-[#2D3748] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35] ${
              canScrollRight
                ? "opacity-100 hover:bg-[#FAF9F5] hover:text-[#173F35] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 cursor-pointer"
                : "opacity-0 pointer-events-none cursor-default"
            }`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 translate-x-[1px]" strokeWidth={2.2} />
          </button>

          {/* Scrollable Category Track */}
          <div
            ref={scrollContainerRef}
            role="region"
            aria-label="Category list"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseDown={onMouseDown}
            className={`flex items-start gap-2.5 sm:gap-4 lg:gap-5 overflow-x-auto scroll-smooth py-1 scrollbar-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#173F35]/40 rounded-xl ${
              isDragging ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {items.map((cat) => {
              const displayName =
                lang === "en" ? cat.name || cat.nameBn : cat.nameBn || cat.name;

              return (
                <Link
                  key={cat.id || cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={handleCardClick}
                  draggable={false}
                  aria-label={`Browse category: ${displayName}`}
                  className="group flex-shrink-0 w-[104px] sm:w-[130px] md:w-[145px] lg:w-[155px] flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35] focus-visible:ring-offset-2 rounded-[11px] transition-transform duration-200"
                >
                  {/* White Image Card Box */}
                  <div className="w-full h-[98px] sm:h-[122px] md:h-[136px] lg:h-[145px] bg-white border border-[#EDE6DC] rounded-[9px] relative overflow-hidden flex items-center justify-center p-2 sm:p-2.5 transition-all duration-300 ease-out group-hover:border-[#D6A54A]/40 group-hover:shadow-[0_4px_16px_rgba(23,63,53,0.06)]">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={cat.image}
                        alt={displayName}
                        loading="lazy"
                        draggable={false}
                        className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>

                  {/* Category Label */}
                  <span className="mt-1.5 sm:mt-2 text-center text-[11px] sm:text-xs md:text-[13px] font-medium text-[#222222] group-hover:text-[#173F35] transition-colors duration-200 tracking-normal line-clamp-1 w-full">
                    {displayName}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}