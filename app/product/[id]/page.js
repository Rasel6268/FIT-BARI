"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import productsData from "@/data/products.json";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useCart } from "@/context/CartContext";
import { 
  FiStar, 
  FiShoppingBag, 
  FiHeart, 
  FiCheck, 
  FiShield, 
  FiTruck, 
  FiRefreshCw, 
  FiPlus, 
  FiMinus, 
  FiShare2 
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;

  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed } = useCart();

  const product = productsData.find((p) => p.id === productId) || productsData[0];
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product]);

  const isWishlisted = isInWishlist(product.id);
  const price = product.discountedPrice || product.regularPrice;
  const originalPrice = product.regularPrice;
  const hasDiscount = originalPrice > price;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const relatedProducts = productsData
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard");
    }
  };

  return (
    <div className="bg-[#F7F5ED] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Catalog", href: "/shop" },
            { label: product.category, href: `/category/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#E7E3D8] p-6 sm:p-10 lg:p-12 shadow-subtle mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Gallery Column (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F7F5ED] border border-[#E7E3D8]">
                <img
                  src={images[selectedImageIdx] || images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover editorial-img"
                />

                {hasDiscount && (
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#173F35] text-[#F7F5ED]">
                    Save {product.discountPercentage}%
                  </span>
                )}

                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#252A26] flex items-center justify-center shadow-sm transition-colors"
                  title="Share product"
                >
                  <FiShare2 size={15} />
                </button>
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImageIdx === idx
                          ? "border-[#173F35] shadow-sm"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Actions (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <Link
                    href={`/category/${product.categorySlug}`}
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#829B76] hover:underline"
                  >
                    {product.category}
                  </Link>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#252A26]">
                    <FiStar size={12} className="text-[#D6A54A] fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-[#777D76]">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-editorial text-[#173F35] leading-tight mb-3">
                  {product.name}
                </h1>

                <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Price Display */}
                <div className="mt-6 p-4 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-[#173F35]">
                      ৳{price.toLocaleString()}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm line-through text-[#777D76]">
                        ৳{originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-[#829B76] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#829B76]" /> In Stock
                  </span>
                </div>

                {/* Pack Size */}
                <div className="mt-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#173F35] block">
                    Available Pack:
                  </span>
                  <span className="inline-block px-3.5 py-1.5 rounded-full border border-[#173F35] text-xs font-semibold text-[#173F35] bg-[#173F35]/5">
                    {product.weight}
                  </span>
                </div>

                {/* Highlights */}
                {product.benefits && (
                  <div className="mt-6 space-y-2 pt-4 border-t border-[#E7E3D8]">
                    {product.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#252A26]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#829B76] flex-shrink-0 mt-1.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E7E3D8] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E7E3D8] rounded-full overflow-hidden bg-[#F7F5ED]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-10 flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
                    >
                      <FiMinus size={12} />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-[#173F35]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-10 flex items-center justify-center text-[#252A26] hover:bg-white transition-colors"
                    >
                      <FiPlus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 py-3 px-6 rounded-full bg-[#173F35] hover:bg-[#0F2B24] text-[#F7F5ED] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <FiShoppingBag size={14} />
                    <span>Add to Cart • ৳{(price * quantity).toLocaleString()}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-11 h-10 rounded-full border flex items-center justify-center transition-colors ${
                      isWishlisted
                        ? "border-[#173F35] bg-[#173F35] text-[#D6A54A]"
                        : "border-[#E7E3D8] hover:border-[#173F35] text-[#777D76]"
                    }`}
                  >
                    <FiHeart size={16} className={isWishlisted ? "fill-current" : ""} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-[#777D76]">
                  <div className="flex items-center gap-1.5">
                    <FiShield className="text-[#829B76]" size={13} />
                    <span>{product.certification || "Lab Verified"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiTruck className="text-[#829B76]" size={13} />
                    <span>Free Above ৳2000</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiRefreshCw className="text-[#829B76]" size={13} />
                    <span>7-Day Replacement</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed In-Depth Information */}
        <div className="bg-white rounded-3xl border border-[#E7E3D8] overflow-hidden shadow-subtle mb-16">
          <div className="flex border-b border-[#E7E3D8] bg-[#F7F5ED]/60 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === "description"
                  ? "border-[#173F35] text-[#173F35] bg-white"
                  : "border-transparent text-[#777D76] hover:text-[#173F35]"
              }`}
            >
              Description & Origin
            </button>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === "nutrition"
                  ? "border-[#173F35] text-[#173F35] bg-white"
                  : "border-transparent text-[#777D76] hover:text-[#173F35]"
              }`}
            >
              Nutrition & Ingredients
            </button>
            <button
              onClick={() => setActiveTab("usage")}
              className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === "usage"
                  ? "border-[#173F35] text-[#173F35] bg-white"
                  : "border-transparent text-[#777D76] hover:text-[#173F35]"
              }`}
            >
              Usage Protocol
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === "reviews"
                  ? "border-[#173F35] text-[#173F35] bg-white"
                  : "border-transparent text-[#777D76] hover:text-[#173F35]"
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {activeTab === "description" && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-xl font-normal font-editorial text-[#173F35]">
                  The Craft of {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
                  {product.fullDescription}
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] text-xs text-[#777D76]">
                  Origin: <strong className="text-[#173F35]">{product.origin}</strong>
                </div>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="space-y-4 max-w-xl">
                <h3 className="text-xl font-normal font-editorial text-[#173F35]">
                  Nutritional Value
                </h3>
                {product.nutritionFacts && (
                  <div className="border border-[#E7E3D8] rounded-2xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <tbody className="divide-y divide-[#E7E3D8]">
                        {Object.entries(product.nutritionFacts).map(([key, val]) => (
                          <tr key={key}>
                            <td className="p-3 font-medium capitalize text-[#252A26]">{key}</td>
                            <td className="p-3 font-mono text-[#777D76]">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#173F35] block mb-1">
                    Ingredients
                  </span>
                  <p className="text-xs text-[#777D76]">{product.ingredients}</p>
                </div>
              </div>
            )}

            {activeTab === "usage" && (
              <div className="space-y-4 max-w-xl">
                <h3 className="text-xl font-normal font-editorial text-[#173F35]">
                  Suggested Protocol
                </h3>
                <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed">
                  {product.usageInstructions}
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4 max-w-xl">
                <h3 className="text-xl font-normal font-editorial text-[#173F35]">
                  Customer Feedback
                </h3>
                <div className="p-4 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#173F35]">Kazi Mehraj Hossain</span>
                    <span className="text-[10px] text-[#829B76]">Verified Purchase</span>
                  </div>
                  <p className="text-xs text-[#777D76] italic">
                    &ldquo;Remarkable product quality. Scent, texture, and aftertaste are completely genuine. Will definitely order regularly from FIT BARI.&rdquo;
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-normal font-editorial text-[#173F35]">
                Related Nutritional Essentials
              </h3>
              <Link
                href={`/category/${product.categorySlug}`}
                className="text-xs font-semibold text-[#173F35] hover:text-[#829B76]"
              >
                View More in {product.category} &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
