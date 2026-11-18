export default function manifest() {
  return {
    name: "FIT BARI – Pure Nutrition & Sports Supplements",
    short_name: "FIT BARI",
    description:
      "Bangladesh's premier destination for 100% authentic whey protein, raw Sundarban honey, organic chia seeds, and wholesome nutrition.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5ED",
    theme_color: "#173F35",
    orientation: "portrait",
    categories: ["shopping", "health", "fitness", "food"],
    icons: [
      {
        src: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/images/logo-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
