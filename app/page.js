import HeroSlider from "@/components/home/HeroSlider";
import TrustFeaturesBar from "@/components/home/TrustFeaturesBar";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestSellersSection from "@/components/home/BestSellersSection";
import EditorialPromotions from "@/components/home/EditorialPromotions";
import ComboPackagesSection from "@/components/home/ComboPackagesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FitnessNutritionGuide from "@/components/home/FitnessNutritionGuide";
import CustomerReviews from "@/components/home/CustomerReviews";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="w-full space-y-0">
      {/* 1. Hero Section – Signature Brand Editorial Split Slider */}
      <HeroSlider />

      {/* 2. Trust Features Bar – Minimalist Verification & Delivery Perks */}
      <TrustFeaturesBar />

      {/* 3. Category Presentation – "Explore What Nourishes You" Magazine Spread */}
      <FeaturedCategories />

      {/* 4. Product Discovery Experience – 4 Sections: Best Sellers, Trending, New, Favorites */}
      <BestSellersSection />

      {/* 5. Editorial Promotional Storytelling – 3 Art-Directed Compositions */}
      <EditorialPromotions />

      {/* 6. Combo Collection – Restrained Bundle Shopping Experience */}
      <ComboPackagesSection />

      {/* 7. Trust & Brand Story – 4 Core Benefits & "Better Choices Begin at Home." */}
      <WhyChooseUs />

      {/* 8. Editorial Nutrition Guide – The FIT BARI Journal */}
      <FitnessNutritionGuide />

      {/* 9. Social Proof – Authentic Community Words */}
      <CustomerReviews />

      {/* 10. Newsletter Subscription – The Nourishment Desk */}
      <NewsletterSection />
    </div>
  );
}
