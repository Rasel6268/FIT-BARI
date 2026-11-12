"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import categoriesData from "@/data/categories.json";
import { fetchCategories } from "@/lib/api";

/**
 * Premium Product Category Carousel Section
 *
 * Pixel-accurate recreation matching reference specifications:
 * - Warm light cream / off-white background (#FAF6EF)
 * - Single horizontal scrollable row of category cards
 * - White cards with subtle beige border, ~9px rounded corners
 * - Centered transparent product illustrations (object-fit: contain, 1.04x scale on hover)
 * - Centered bilingual Bengali/English category labels
 * - Circular white navigation arrows centered vertically on category images
 * - Smooth scroll, mouse drag, touch swipe, trackpad & keyboard navigation
 */
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

  // Mouse drag-to-scroll interaction state
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
        .catch(() => { });
    }
  }, [categories]);

  // Use provided categories or sort default data by carouselOrder
    const items = categoryItems.slice().sort((a, b) => {
      return (a.carouselOrder || a.order || a.id || 0) - (b.carouselOrder || b.order || b.id || 0);
    });

    // Calculate and update scroll bounds
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

    // Arrow button click scrolling
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

    // Keyboard navigation on carousel container
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleScroll("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleScroll("right");
      }
    };

    // Mouse Drag to Scroll handlers with window-level release handling
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

    // Prevent link navigation if user performed a drag gesture
    const handleCardClick = (e) => {
      if (dragDistanceRef.current > 5 || isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    return (
      <section
        className={`w-full ${bgColor} py-10 sm:py-12 md:py-14 select-none overflow-hidden transition-colors duration-200 ${className}`}
        aria-label="Product Categories Carousel"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          {(title || eyebrow) && (
            <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-2">
              {eyebrow && (
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76] block">
                  {eyebrow}
                </span>
              )}
              {title && (
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#777D76] max-w-lg mx-auto leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Carousel Track Container with Navigation Buttons relative to Card Row */}
          <div className="relative">
            {/* Navigation Arrow: Previous (Left) */}
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Previous categories"
              tabIndex={canScrollLeft ? 0 : -1}
              aria-hidden={!canScrollLeft}
              className={`absolute left-2 sm:left-3 md:left-4 z-20 top-[60px] sm:top-[66px] md:top-[71px] lg:top-[74px] -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#EDE6DC] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#2D3748] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35] ${canScrollLeft
                ? "opacity-100 hover:bg-[#FAF9F5] hover:text-[#173F35] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 cursor-pointer"
                : "opacity-0 pointer-events-none cursor-default"
                }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 -translate-x-[1px]" strokeWidth={2.2} />
            </button>

            {/* Navigation Arrow: Next (Right) */}
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Next categories"
              tabIndex={canScrollRight ? 0 : -1}
              aria-hidden={!canScrollRight}
              className={`absolute right-2 sm:right-3 md:right-4 z-20 top-[60px] sm:top-[66px] md:top-[71px] lg:top-[74px] -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#EDE6DC] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#2D3748] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35] ${canScrollRight
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
              className={`flex items-start gap-3.5 sm:gap-4 md:gap-4.5 lg:gap-5 overflow-x-auto scroll-smooth py-1 px-1 sm:px-2 scrollbar-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#173F35]/40 rounded-xl ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"
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
                    className="group flex-shrink-0 w-[128px] sm:w-[140px] md:w-[150px] lg:w-[158px] flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35] focus-visible:ring-offset-2 rounded-[11px] transition-transform duration-200"
                  >
                    {/* White Image Card Box */}
                    <div className="w-full h-[120px] sm:h-[132px] md:h-[142px] lg:h-[148px] bg-white border border-[#EDE6DC] rounded-[9px] relative overflow-hidden flex items-center justify-center p-2.5 sm:p-3 md:p-3.5 transition-all duration-300 ease-out group-hover:border-[#D6A54A]/40 group-hover:shadow-[0_4px_16px_rgba(23,63,53,0.06)]">
                      {/* Category Product Image */}
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

                    {/* Category Label Underneath */}
                    <span className="mt-2.5 sm:mt-3 text-center text-xs sm:text-[13px] md:text-sm font-medium text-[#222222] group-hover:text-[#173F35] transition-colors duration-200 tracking-normal line-clamp-1 w-full px-1">
                      {displayName}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div >
      </section >
    );
  }

