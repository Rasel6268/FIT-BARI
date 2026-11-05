"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("fitbari_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("fitbari_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedRecent = localStorage.getItem("fitbari_recent");
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    } catch (e) {
      console.error("Failed to load from storage", e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("fitbari_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("fitbari_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("fitbari_recent", JSON.stringify(recentlyViewed));
    } catch (e) {}
  }, [recentlyViewed]);

  const addToCart = (product, quantity = 1, selectedWeight = null) => {
    if (!product) return;
    const weight = selectedWeight || product.weight || "Standard";

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weight
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedWeight: weight }];
      }
    });

    toast.success(
      `Added "${product.name.slice(0, 24)}..." to your cart!`,
      {
        icon: "🛒",
        style: {
          borderRadius: "10px",
          background: "#173F35",
          color: "#FAF7EF",
          border: "1px solid #D9A441",
        },
      }
    );
  };

  const removeFromCart = (productId, selectedWeight) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && (!selectedWeight || item.selectedWeight === selectedWeight))
      )
    );
    toast("Item removed from cart", {
      icon: "🗑️",
      style: {
        borderRadius: "10px",
        background: "#252B28",
        color: "#FAF7EF",
      },
    });
  };

  const updateQuantity = (productId, selectedWeight, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedWeight);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedWeight === selectedWeight) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    if (!product) return;
    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast("Removed from Wishlist", {
        icon: "🤍",
        style: {
          borderRadius: "10px",
          background: "#252B28",
          color: "#FAF7EF",
        },
      });
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success(`Saved "${product.name.slice(0, 22)}..." to Wishlist`, {
        icon: "❤️",
        style: {
          borderRadius: "10px",
          background: "#173F35",
          color: "#FAF7EF",
          border: "1px solid #D9A441",
        },
      });
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const addToRecentlyViewed = (product) => {
    if (!product) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.product.discountedPrice || item.product.regularPrice) * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const freeDeliveryThreshold = 2000;
  const freeDeliveryProgress = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        openQuickView: (prod) => setQuickViewProduct(prod),
        closeQuickView: () => setQuickViewProduct(null),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        addToRecentlyViewed,
        cartSubtotal,
        cartCount,
        freeDeliveryThreshold,
        freeDeliveryProgress,
        amountNeededForFreeDelivery,
        isCheckoutModalOpen,
        openCheckoutModal: () => setIsCheckoutModalOpen(true),
        closeCheckoutModal: () => setIsCheckoutModalOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

