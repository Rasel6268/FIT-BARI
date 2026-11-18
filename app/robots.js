const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fitbari.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart",
          "/cart/",
          "/api/",
          "/api/*",
          "/track-order?*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/cart",
          "/cart/",
          "/api/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
