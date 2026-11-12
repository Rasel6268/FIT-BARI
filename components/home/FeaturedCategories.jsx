"use client";

import React from "react";
import CategoryCarousel from "./CategoryCarousel";

/**
 * Featured Categories Section
 * Integrates the pixel-accurate Product Category Carousel Section with an editorial heading.
 */
export default function FeaturedCategories({
  title = "Featured Categories",
  eyebrow = "Curated Collections",
  subtitle = "Explore our certified organic harvests and lab-verified nutrition",
  ...props
}) {
  return (
    <CategoryCarousel
      title={title}
      eyebrow={eyebrow}
      subtitle={subtitle}
      {...props}
    />
  );
}
