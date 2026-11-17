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

export const viewport = {
  themeColor: "#173F35",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "FIT BARI – Premium Health & Fitness Nutrition E-commerce",
  description: "Fuel Your Body. Nourish Your Life. Bangladesh's premier destination for 100% authentic whey protein, raw Sundarban honey, organic chia seeds, and wholesome nutrition.",
  keywords: "gym supplements, whey protein, sundarban honey, chia seeds, rolled oats, bangladesh fitness, healthy foods, fit bari",
  authors: [{ name: "FIT BARI" }],
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/logo-icon.png", sizes: "192x192", type: "image/png" }
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
