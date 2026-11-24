import HeroSlider from "@/components/home/HeroSlider";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestSellersSection from "@/components/home/BestSellersSection";
import ComboPackagesSection from "@/components/home/ComboPackagesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomerReviews from "@/components/home/CustomerReviews";

export default function HomePage() {
  return (
    <div className="w-full space-y-0">
      {/* 1. Hero Section */}
      <HeroSlider />

      {/* 2. Featured Collections Carousel */}
      <FeaturedCategories />

      {/* 3. Product Discovery (Best Sellers, Trending, New, Favorites) */}
      <BestSellersSection />

      {/* 4. Curated Combo Bundles */}
      <ComboPackagesSection />

      {/* 5. Trust Pillars */}
      <WhyChooseUs />

      {/* 6. Customer Reviews */}
      <CustomerReviews />
    </div>
  );
}
