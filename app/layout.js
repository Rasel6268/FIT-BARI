import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/cart/CheckoutModal";
import QuickViewModal from "@/components/product/QuickViewModal";
import SearchModal from "@/components/search/SearchModal";
import BackToTop from "@/components/ui/BackToTop";
import ToastProvider from "@/components/ui/ToastProvider";
import { StoreJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fitbari.com";

export const viewport = {
  themeColor: "#173F35",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FIT BARI – Pure Nutrition & Sports Supplements in Bangladesh",
    template: "%s | FIT BARI",
  },
  description:
    "Fuel Your Body. Nourish Your Life. Bangladesh's premier destination for 100% authentic whey protein, raw Sundarban honey, organic chia seeds, and wholesome nutrition.",
  keywords: [
    "gym supplements bangladesh",
    "whey protein dhaka",
    "raw sundarban honey",
    "organic chia seeds bd",
    "rolled oats bangladesh",
    "creatine monohydrate bangladesh",
    "pure ghee dhaka",
    "sports nutrition bangladesh",
    "healthy foods",
    "fit bari",
  ],
  authors: [{ name: "FIT BARI", url: SITE_URL }],
  creator: "FIT BARI",
  publisher: "FIT BARI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "FIT BARI",
    title: "FIT BARI – Pure Nutrition & Sports Supplements in Bangladesh",
    description:
      "100% authentic sports nutrition, raw wild honey, and whole superfoods. Inspection before payment supported nationwide.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FIT BARI – Pure Nutrition & Sports Supplements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIT BARI – Pure Nutrition & Sports Supplements in Bangladesh",
    description:
      "100% authentic sports nutrition, raw wild honey, and whole superfoods. Inspection before payment supported nationwide.",
    creator: "@fitbari",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/logo-icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/images/logo-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-bg text-brand-text min-h-screen flex flex-col antialiased selection:bg-[#D9A441] selection:text-[#173F35]">
        {/* Schema.org Structured Data */}
        <StoreJsonLd />
        <WebSiteJsonLd />

        <CartProvider>
          {/* Notification Toaster */}
          <ToastProvider />

          {/* Sticky Header with mega menu & announcement bar */}
          <Header />

          {/* Page Contents */}
          <main className="flex-1 w-full">
            {children}
          </main>

          {/* Global Interactive Overlays */}
          <CartDrawer />
          <CheckoutModal />
          <QuickViewModal />
          <SearchModal />
          <BackToTop />

          {/* Global Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
