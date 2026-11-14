"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "13px",
          fontWeight: "600",
        },
      }}
    />
  );
}

