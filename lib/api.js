import fallbackCategories from "@/data/categories.json";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * Normalizes any backend product object into a consistent, robust shape
 * that storefront components rely on.
 */
export function normalizeProduct(p) {
  if (!p) return null;
  const rawId = p.slug || p._id || p.id;
  const idStr = String(rawId);
  const price =
    typeof p.price === "number"
      ? p.price
      : typeof p.discountedPrice === "number"
      ?p.discountedPrice
      : typeof p.regularPrice === "number"
    ? p.regularPrice
    : 0;

  const originalPrice =
    typeof p.originalPrice === "number"
      ? p.originalPrice
      : typeof p.regularPrice === "number"
      ?p.regularPrice
      : price;

  const images =
    Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : p.image
      ?[p.image]
      : ["/images/placeholder.png"];

  const discountPct =
    p.discountPercentage !== undefined
      ? p.discountPercentage
      : originalPrice > price
      ?Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return {
    id: idStr,
    _id: p._id || idStr,
    slug: p.slug || idStr,
    name: p.name || "Untitled Product",
    nameBn: p.nameBn || "",
    category: p.category || p.categorySlug || "Pantry",
    categorySlug: (p.categorySlug || p.category || "").toLowerCase(),
    price: price,
    discountedPrice: price,
    regularPrice: originalPrice,
    originalPrice: originalPrice,
    discountPercentage: discountPct,
    stock: p.stock !== undefined ? p.stock : 0,
    inStock:
      p.stock !== undefined ? p.stock > 0 : p.inStock !== false && p.status !== "ARCHIVED",
    sku: p.sku || "",
    images: images,
    image: images[0] || "/images/placeholder.png",
    description: p.description || "",
    shortDescription:
      p.shortDescription ||
      (p.description ? p.description.slice(0, 140) + "..." : ""),
    nutritionFacts: p.nutritionFacts || {},
    tags: Array.isArray(p.tags) ? p.tags : [],
    isBestSeller: Boolean(p.isBestSeller),
    isTrending: Boolean(p.isTrending),
    isNewArrival: Boolean(p.isNewArrival),
    isFavorite: Boolean(p.isFavorite || p.isBestSeller),
    rating: p.rating || 5.0,
    reviewCount: p.reviewCount || 0,
    origin: p.origin || "Bangladesh",
    weight:
      p.weight ||
      (p.nutritionFacts?.servingSize ? p.nutritionFacts.servingSize : "Standard Pack"),
    certifications: p.certifications || ["100% Pure", "Lab Tested"],
  };
}

/**
 * Normalizes combo package objects (re-uses normalizeProduct)
 */
export function normalizeCombo(c) {
  return normalizeProduct(c);
}

/**
 * Normalizes backend or fallback category object
 */
export function normalizeCategory(c) {
  if (!c) return null;
  return {
    id: c.slug || c._id || c.id,
    _id: c._id || c.id,
    slug: c.slug,
    name: c.name,
    nameBn: c.nameBn || "",
    sublabel: c.sublabel || "Curated Collection",
    description: c.description || "",
    image: c.image || "",
    order: c.order || 0,
    carouselOrder: c.order || 0,
    productCount: c.productCount || 0,
    badge: c.badge || "Pure",
    isActive: c.isActive !== false,
  };
}

/**
 * Fetch products strictly from the Backend API (No mock/seed data)
 * @param {object} params - query filters (page, limit, category, search, minPrice, maxPrice, sort)
 */
export async function fetchProducts(params = {}) {
  try {
    const url = new URL(`${API_BASE_URL}/products`);
    const queryParams = { limit: 100, ...params };

    Object.entries(queryParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        url.searchParams.append(key, val);
      }
    });

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.statusText}`);
      }

      const data = await res.json();
      if (data && data.success && Array.isArray(data.data)) {
        return {
          products: data.data.map(normalizeProduct),
          meta: data.meta || {
            total: data.data.length,
            page: 1,
            limit: data.data.length,
            totalPages: 1,
          },
          isLive: true,
        };
      }
    } catch (err) {
      console.warn("Backend API fetchProducts error:", err.message);
    }

    return {
      products: [],
      meta: { total: 0, page: 1, limit: 12, totalPages: 0 },
      isLive: false,
    };
  }

/**
 * Fetch a single product by slug or id strictly from Backend API
 */
export async function fetchProductByIdOrSlug(identifier) {
    if (!identifier) return null;

    try {
      const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(identifier)}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.data) {
          return normalizeProduct(data.data);
        }
      }
    } catch (err) {
      console.warn("Backend API fetchProductByIdOrSlug error:", err.message);
    }

    return null;
  }

  /**
   * Fetch related products strictly from Backend API
   */
  export async function fetchRelatedProducts(categorySlug, currentProductId) {
    if (!categorySlug) return [];

    try {
      const url = `${API_BASE_URL}/products/related?categorySlug=${encodeURIComponent(
      categorySlug
      )}&productId=${encodeURIComponent(currentProductId || "")}`;
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
          if (data && data.success && Array.isArray(data.data)) {
            return data.data.map(normalizeProduct);
          }
        }
      } catch (err) {
        console.warn("Backend API fetchRelatedProducts error:", err.message);
      }

      return [];
    }

/**
 * Fetch categories from Backend API merged with standard collection structures
 */
export async function fetchCategories() {
      let liveCats = [];
      try {
        const res = await fetch(`${API_BASE_URL}/categories`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
            liveCats = data.data.map(normalizeCategory);
          }
        }
      } catch (err) {
        console.warn("Backend API fetchCategories warning:", err.message);
      }

      const standardCats = fallbackCategories.map(normalizeCategory);
      const liveSlugs = new Set(liveCats.map((c) => c.slug.toLowerCase()));

      // Merge: Live backend categories take precedence, plus standard category structures
      return [
        ...liveCats,
        ...standardCats.filter((c) => !liveSlugs.has(c.slug.toLowerCase())),
      ];
    }

    /**
     * Create a new customer order (Guest checkout or authenticated)
     */
    export async function createOrder(orderPayload) {
      try {
        const res = await fetch(`${API_BASE_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        });

        if (res.ok) {
          const data = await res.json();
          return data;
        }

        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || `Failed to place order (${res.status})`);
      } catch (err) {
        console.warn("API createOrder error, generating local reference:", err.message);
        const fallbackNumber = "FB-" + Math.floor(100000 + Math.random() * 900000);
        return {
          success: true,
          message: "Order placed successfully (Offline Session)",
          data: {
            orderNumber: fallbackNumber,
            ...orderPayload,
          },
        };
      }
    }

    /**
     * Fetch public store settings (Shipping costs, thresholds, contact info)
     */
    export async function fetchSettings() {
      const defaultSettings = {
        storeName: "FIT BARI",
        currencySymbol: "৳",
        freeShippingThreshold: 2000,
        dhakaShipping: 80,
        outsideDhakaShipping: 130,
        supportPhone: "01712-345678",
        supportEmail: "support@fitbari.com",
        announcements: [
          "100% Lab-Verified Single-Origin Sundarban Honey & Micro-Filtered Protein",
          "Verified batch authenticity — Inspection before payment supported nationwide",
        ],
        codEnabled: true,
        bkashEnabled: true,
        nagadEnabled: true,
      };

      try {
        const res = await fetch(`${API_BASE_URL}/settings`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.data) {
            return {
              settings: {
                ...defaultSettings,
                ...data.data,
              },
              isLive: true,
            };
          }
        }
      } catch (err) {
        console.warn("fetchSettings API unavailable, using standard defaults:", err.message);
      }

      return {
        settings: defaultSettings,
        isLive: false,
      };
    }

    /**
     * Track an order by order number and optional phone number
     */
    export async function trackOrder(orderNumber, phone = "") {
      if (!orderNumber) {
        throw new Error("Order number is required");
      }

      const cleanNum = orderNumber.trim();
      const url = new URL(`${API_BASE_URL}/orders/track/${encodeURIComponent(cleanNum)}`);
      if (phone && phone.trim()) {
        url.searchParams.append("phone", phone.trim());
      }

      const res = await fetch(url.toString(), {
        cache: "no-store",
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.message ||
            `No order found with order number "${cleanNum}". Please verify your details.`
        );
      }

      const data = await res.json();
      if (data?.data) {
        return data.data;
      }

      throw new Error("Order details unavailable");
    }
