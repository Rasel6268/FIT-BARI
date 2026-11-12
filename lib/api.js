import fallbackProducts from "@/data/products.json";
import fallbackCategories from "@/data/categories.json";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * Normalizes any backend or legacy product object into a consistent, robust shape
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
        ? p.discountedPrice
        : typeof p.regularPrice === "number"
          ? p.regularPrice
          : 0;

  const originalPrice =
    typeof p.originalPrice === "number"
      ? p.originalPrice
      : typeof p.regularPrice === "number"
        ? p.regularPrice
        : price;

  const images =
    Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : p.image
        ? [p.image]
        : ["/images/placeholder.png"];

  const discountPct =
    p.discountPercentage !== undefined
      ? p.discountPercentage
      : originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
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
    stock: p.stock !== undefined ? p.stock : 10,
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
    rating: p.rating || 4.8,
    reviewCount: p.reviewCount || 24,
    origin: p.origin || "Bangladesh",
    weight:
      p.weight ||
      (p.nutritionFacts?.servingSize ? p.nutritionFacts.servingSize : "Standard Pack"),
    certifications: p.certifications || ["100% Pure", "Lab Tested"],
  };
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
 * Fetch products with optional query filtering from Backend API
 * Gracefully falls back to bundled catalog if backend is unavailable.
 */
export async function fetchProducts(params = {}) {
  try {
    const url = new URL(`${API_BASE_URL}/products`);
    Object.entries(params).forEach(([key, val]) => {
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
      // If backend has items, return normalized backend items
      if (data.data.length > 0) {
        return {
          products: data.data.map(normalizeProduct),
          meta: data.meta || { total: data.data.length, page: 1, limit: data.data.length },
          isLive: true,
        };
      }
    }
  } catch (err) {
    // Backend offline or network issue: fall back gracefully
    console.warn("Backend API unavailable for fetchProducts, using bundled catalog:", err.message);
  }

  // Client-side fallback filtering on bundled products.json
  let items = fallbackProducts.map(normalizeProduct);

  if (params.category) {
    items = items.filter(
      (p) => p.categorySlug.toLowerCase() === params.category.toLowerCase()
    );
  }
  if (params.isBestSeller === "true" || params.isBestSeller === true) {
    items = items.filter((p) => p.isBestSeller);
  }
  if (params.isTrending === "true" || params.isTrending === true) {
    items = items.filter((p) => p.isTrending);
  }
  if (params.isNewArrival === "true" || params.isNewArrival === true) {
    items = items.filter((p) => p.isNewArrival);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }
  if (params.maxPrice) {
    items = items.filter((p) => p.price <= Number(params.maxPrice));
  }

  return {
    products: items,
    meta: { total: items.length, page: 1, limit: items.length },
    isLive: false,
  };
}

/**
 * Fetch a single product by slug or id from Backend API
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
    console.warn("Backend API unavailable for product detail, using bundled item:", err.message);
  }

  // Fallback search in products.json
  const found = fallbackProducts.find(
    (p) =>
      p.id === identifier ||
      p.slug === identifier ||
      String(p.id) === String(identifier)
  );

  return found ? normalizeProduct(found) : normalizeProduct(fallbackProducts[0]);
}

/**
 * Fetch related products from backend or fallback
 */
export async function fetchRelatedProducts(categorySlug, currentProductId) {
  try {
    const url = `${API_BASE_URL}/products/related?categorySlug=${encodeURIComponent(
      categorySlug || ""
    )}&productId=${encodeURIComponent(currentProductId || "")}`;
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data.map(normalizeProduct);
      }
    }
  } catch (err) {
    // fallback
  }

  return fallbackProducts
    .filter(
      (p) =>
        p.categorySlug === categorySlug &&
        p.id !== currentProductId &&
        p.slug !== currentProductId
    )
    .slice(0, 4)
    .map(normalizeProduct);
}

/**
 * Fetch categories from Backend API
 */
export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data.map(normalizeCategory);
      }
    }
  } catch (err) {
    console.warn("Backend API unavailable for categories, using bundled collections:", err.message);
  }

  return fallbackCategories.map(normalizeCategory);
}

/**
 * Fetch live store settings from Backend API
 * Gracefully falls back to site.json defaults if backend is unavailable.
 */
export async function fetchSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.data) {
        return {
          settings: data.data,
          isLive: true,
        };
      }
    }
  } catch (err) {
    console.warn("Backend API unavailable for settings, using site.json:", err.message);
  }

  return {
    settings: {
      storeName: "FIT BARI",
      tagline: "Fuel Your Body. Nourish Your Life.",
      currency: "BDT (৳)",
      currencySymbol: "৳",
      supportPhone: "01712-345678",
      supportEmail: "hello@fitbari.com",
      officeAddress: "House 42, Road 11, Block D, Banani, Dhaka-1213, Bangladesh",
      operatingHours: "Sat – Thu: 9:00 AM – 9:00 PM, Fri: 2:00 PM – 9:00 PM",
      dhakaShipping: 80,
      outsideDhakaShipping: 130,
      freeShippingThreshold: 2000,
      estimatedDeliveryDhaka: "12-24 Hours Express Dispatch",
      estimatedDeliveryOutside: "48-72 Hours Nationwide Delivery",
      whatsappNumber: "+8801712345678",
      facebookUrl: "https://facebook.com/fitbari",
      instagramUrl: "https://instagram.com/fitbari",
      announcements: [
        "100% Lab-Verified Single-Origin Sundarban Honey & Micro-Filtered Protein",
        "Verified batch authenticity — Inspection before payment supported nationwide",
      ],
      codEnabled: true,
      bkashEnabled: true,
      nagadEnabled: true,
      imagekitEndpoint: "https://ik.imagekit.io/fitbari",
    },
    isLive: false,
  };
}

/**
 * Place a new order with backend API
 */
export async function createOrder(orderPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Order submission failed: ${res.statusText}`);
    }

    return {
      success: true,
      data: data.data,
      isLive: true,
    };
  } catch (err) {
    console.warn("Backend API unavailable for createOrder, using local session:", err.message);
    const fallbackOrderNumber = `FB-${Math.floor(100000 + Math.random() * 900000)}`;
    const mockOrder = {
      orderNumber: fallbackOrderNumber,
      customer: orderPayload.customer,
      items: orderPayload.items,
      subtotal: orderPayload.subtotal,
      shippingCost: orderPayload.shippingCost,
      discountAmount: orderPayload.discountAmount || 0,
      totalAmount: orderPayload.totalAmount,
      paymentMethod: orderPayload.paymentMethod,
      paymentStatus: "PENDING",
      orderStatus: "PENDING",
      createdAt: new Date().toISOString(),
      trackingHistory: [
        {
          status: "PENDING",
          note: "Order received online. Queued for confirmation and inspection.",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    return {
      success: true,
      data: mockOrder,
      isLive: false,
      error: err.message,
    };
  }
}

/**
 * Track an order by orderNumber and optional phone
 */
export async function trackOrder(orderNumber, phone = "") {
  if (!orderNumber) {
    throw new Error("Order number is required");
  }

  const cleanOrderNumber = encodeURIComponent(orderNumber.trim().toUpperCase());
  const cleanPhone = phone ? encodeURIComponent(phone.trim()) : "";
  const url = `${API_BASE_URL}/orders/track/${cleanOrderNumber}${cleanPhone ? `?phone=${cleanPhone}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "No order found matching the provided order number and phone.");
  }

  return data.data;
}

