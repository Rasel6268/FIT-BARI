import { fetchProducts, fetchCategories } from "@/lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fitbari.com";

export const revalidate = 3600; // Cache and revalidate sitemap every hour

export default async function sitemap() {
  const currentDate = new Date();

  // 1. Core Top-Level Pages
  const staticRoutes = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/track-order`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/wishlist`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // 2. Collection / Category Pages
  let categoryRoutes = [];
  try {
    const categories = await fetchCategories();
    if (Array.isArray(categories)) {
      categoryRoutes = categories
        .filter((c) => c && c.slug)
        .map((cat) => ({
          url: `${BASE_URL}/category/${cat.slug}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.8,
        }));
    }
  } catch (err) {
    console.warn("Sitemap: Category fetch fallback", err);
  }

  // 3. Product Detail Pages
  let productRoutes = [];
  try {
    const { products } = await fetchProducts({ limit: 500 });
    if (Array.isArray(products)) {
      productRoutes = products
        .filter((p) => p && (p.slug || p.id))
        .map((prod) => ({
          url: `${BASE_URL}/product/${prod.slug || prod.id}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.8,
        }));
    }
  } catch (err) {
    console.warn("Sitemap: Product fetch fallback", err);
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
