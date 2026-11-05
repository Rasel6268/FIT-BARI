"use client";

import React, { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#173F35] text-[#FAF7EF] border-2 border-[#D9A441] shadow-xl flex items-center justify-center hover:bg-[#0F2B24] hover:scale-110 active:scale-95 transition-all duration-300 animate-fadeIn"
    >
      <FiArrowUp size={20} />
    </button>
  );
}

