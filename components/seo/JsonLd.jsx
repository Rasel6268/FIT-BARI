import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fitbari.com";

/**
 * Global Store & Organization Schema (Schema.org / Store / LocalBusiness)
 */
export function StoreJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${BASE_URL}/#store`,
    name: "FIT BARI",
    alternateName: "Fit Bari Nutrition",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo-icon.png`,
    image: `${BASE_URL}/images/honey-harvest.png`,
    description:
      "Bangladesh's premier destination for 100% authentic whey protein, raw Sundarban honey, organic chia seeds, and wholesome nutrition.",
    telephone: "+8801930214376",
    email: "fitbari77@gmail.com",
    priceRange: "৳৳",
    currenciesAccepted: "BDT",
    paymentAccepted: "Cash, bKash, Nagad",
    address: {
      "@type": "PostalAddress",
      streetAddress: "House 42, Road 11, Block D, Banani",
      addressLocality: "Dhaka",
      postalCode: "1213",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.7937",
      longitude: "90.4066",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "14:00",
        closes: "21:00",
      },
    ],
    sameAs: [
      "https://facebook.com/fitbari",
      "https://instagram.com/fitbari",
      "https://wa.me/8801930214376",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebSite Schema with Sitelinks Searchbox
 */
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "FIT BARI",
    publisher: {
      "@id": `${BASE_URL}/#store`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/shop?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Product Schema for Google Product Rich Snippets
 */
export function ProductJsonLd({ product }) {
  if (!product) return null;

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.map((img) => (img.startsWith("http") ? img : `${BASE_URL}${img}`))
      : [
          product.image
            ? product.image.startsWith("http")
              ? product.image
              : `${BASE_URL}${product.image}`
            : `${BASE_URL}/images/honey-harvest.png`,
        ];

  const productUrl = `${BASE_URL}/product/${product.slug || product.id}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images,
    description:
      product.shortDescription || product.description || "Premium Pure Nutrition from Fit Bari.",
    sku: product.sku || String(product.id),
    mpn: product.sku || String(product.id),
    brand: {
      "@type": "Brand",
      name: "FIT BARI",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "BDT",
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "FIT BARI",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 4.9,
      reviewCount: product.reviewCount || 28,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Breadcrumbs Schema for Google Breadcrumb rich snippets
 */
export function BreadcrumbsJsonLd({ items = [] }) {
  if (!items || items.length === 0) return null;

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    ...items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 2,
      name: item.label,
      ...(item.href
        ? { item: item.href.startsWith("http") ? item.href : `${BASE_URL}${item.href}` }
        : {}),
    })),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * CollectionPage & ItemList Schema for Category Landing Pages
 */
export function CollectionJsonLd({ category, products = [] }) {
  if (!category) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description:
      category.description || `${category.name} collection at FIT BARI. 100% authentic pure nutrition.`,
    url: `${BASE_URL}/category/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 15).map((prod, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${BASE_URL}/product/${prod.slug || prod.id}`,
        name: prod.name,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage Schema for Google Accordion Rich Results
 */
export function FaqJsonLd({ faqs = [] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
