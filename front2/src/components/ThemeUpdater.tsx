"use client";

import { useEffect } from "react";

export default function FaviconUpdater() {
  useEffect(() => {
    const updateFavicon = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;

      if (favicon) {
        favicon.href = isDark ? "/favicon-dark.svg" : "/favicon-light.svg";
      }
    };

    // Update favicon on load
    updateFavicon();

    // Listen for theme changes
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeQuery.addEventListener("change", updateFavicon);

    return () => {
      darkModeQuery.removeEventListener("change", updateFavicon);
    };
  }, []);

  return null; // No UI rendering needed
}
