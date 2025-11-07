import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";

// Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Import React.lazy or Suspense if you plan to add lazy loading later (optional improvement)
// import { Suspense } from "react";

const AppWrapper = () => {
  useEffect(() => {
    // Initialize AOS animations globally
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Suspense fallback={<div>Loading...</div>}> */}
    <AppWrapper />
    {/* </Suspense> */}
  </StrictMode>
);

// ✅ Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("✅ Service Worker registered successfully"))
      .catch((err) => console.error("❌ Service Worker registration failed:", err));
  });
}
