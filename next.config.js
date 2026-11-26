/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.fitbari.com",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        // Retained for existing legacy ImageKit URLs
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack filesystem pack cache in dev on Windows to prevent ENOENT/EPERM .pack.gz_ rename collisions
      config.cache = false;
      // Prevents Windows filesystem race conditions and file-locking collisions (errno -4094)
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
