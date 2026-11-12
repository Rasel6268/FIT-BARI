"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnnouncementBar from "./AnnouncementBar";
import MegaMenu from "./MegaMenu";
import MobileNavDrawer from "./MobileNavDrawer";
import { useCart } from "@/context/CartContext";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiChevronDown,
  FiUser
} from "react-icons/fi";

export default function Header() {
  const pathname = usePathname();
  const { cartCount, cartSubtotal, wishlist, openCart, openSearch } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const timeoutRef = useRef(null);
  const headerRef = useRef(null);

  // Track scroll position for subtle sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Graceful hover handlers with a 180ms debounce bridge to prevent cursor flickering
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 180);
  };

  const handleToggleMegaMenu = (e) => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaMenuOpen((prev) => !prev);
  };

  // Close on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
  }, [pathname]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMegaMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on click outside header
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsMegaMenuOpen(false);
      }
    };
    if (isMegaMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMegaMenuOpen]);

  return (
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full transition-all duration-300"
      >
        {/* Top Thin Announcement */}
        <AnnouncementBar />

        {/* Main Navigation Bar (Positioning ancestor for the full-width dropdown) */}
        <div
        className={`relative border-b transition-all duration-300 ${isScrolled
              ? "bg-[#F7F5ED]/95 backdrop-blur-md shadow-subtle border-[#E7E3D8] py-3"
              : "bg-[#F7F5ED] border-[#E7E3D8]/80 py-4"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

                {/* LEFT: Mobile Menu Button & Brand Wordmark */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setIsMobileNavOpen(true)}
                    className="lg:hidden p-2 text-[#252A26] hover:text-[#173F35] transition-colors"
                    aria-label="Open mobile menu"
                  >
                    <FiMenu size={22} />
                  </button>

                <Link href="/" className="flex items-baseline gap-2 group">
                  <span className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#173F35] font-editorial">
                    FIT BARI
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A54A] -mb-1" />
                  <span className="hidden xl:inline text-[10px] uppercase tracking-[0.2em] text-[#777D76] font-semibold ml-2 pl-3 border-l border-[#E7E3D8]">
                    Pure Nutrition
                  </span>
                </Link>
              </div>

          {/* CENTER: Minimalist Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                  <Link
                    href="/"
                    className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors rounded-full ${pathname === "/"
                        ? "text-[#173F35] bg-[#173F35]/5"
                        : "text-[#252A26] hover:text-[#173F35]"
                      }`}
            >
                  Home
                </Link>

            {/* Shop Mega Menu Trigger */}
            <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={handleToggleMegaMenu}
                      aria-expanded={isMegaMenuOpen}
                      aria-haspopup="true"
                      className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors rounded-full inline-flex items-center gap-1 ${isMegaMenuOpen || pathname === "/shop"
                          ? "text-[#173F35] bg-[#173F35]/10 font-bold"
                          : "text-[#252A26] hover:text-[#173F35]"
                        }`}
                          >
                <span>Collections</span>
                <FiChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180 text-[#D6A54A]" : ""
                  }`}
                />
                  </button>
                </div>

            <Link
              href="/category/gym-supplements"
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors rounded-full ${pathname.includes("gym-supplements")
                  ? "text-[#173F35] bg-[#173F35]/5"
                  : "text-[#252A26] hover:text-[#173F35]"
                }`}
            >
              Supplements
            </Link>

            <Link
              href="/category/healthy-foods"
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors rounded-full ${pathname.includes("healthy-foods")
                  ? "text-[#173F35] bg-[#173F35]/5"
                  : "text-[#252A26] hover:text-[#173F35]"
                }`}
            >
              Whole Foods
            </Link>

            <Link
              href="/category/combo-packages"
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors rounded-full ${pathname.includes("combo-packages")
                  ? "text-[#173F35] bg-[#173F35]/5"
                  : "text-[#252A26] hover:text-[#173F35]"
                }`}
            >
              Bundles
            </Link>

            <Link
              href="/about"
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors rounded-full ${pathname === "/about"
                  ? "text-[#173F35] bg-[#173F35]/5"
                  : "text-[#252A26] hover:text-[#173F35]"
                }`}
            >
              Our Story
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors rounded-full ${pathname === "/contact"
                  ? "text-[#173F35] bg-[#173F35]/5"
                  : "text-[#252A26] hover:text-[#173F35]"
                }`}
            >
              Contact
            </Link>

            <Link
              href="/track-order"
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors rounded-full ${pathname === "/track-order"
                  ? "text-[#173F35] bg-[#173F35]/10 font-bold"
                  : "text-[#173F35] hover:text-[#0F2B24]"
                }`}
            >
              Track Order
            </Link>
          </nav>

          {/* RIGHT: Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 rounded-full text-[#252A26] hover:text-[#173F35] hover:bg-white/70 transition-all"
              aria-label="Search catalog"
              title="Search catalog"
            >
              <FiSearch size={18} />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full text-[#252A26] hover:text-[#173F35] hover:bg-white/70 transition-all"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <FiHeart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D6A54A] text-[#173F35] text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold transition-all duration-200 shadow-subtle group"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <FiShoppingBag size={15} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#D6A54A] text-[#173F35] text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono">
                ৳{cartSubtotal.toLocaleString()}
              </span>
            </button>
          </div>

        </div>

        {/* FULL-WIDTH DESKTOP MEGA MENU DROPDOWN */}
        {isMegaMenuOpen && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="hidden lg:block absolute top-full left-0 right-0 w-full animate-megaMenu z-50"
          >
            <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </header>
  );
}
