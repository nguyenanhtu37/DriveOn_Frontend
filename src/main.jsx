import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
          console.log("Service Worker đăng ký thành công:", registration);
      })
      .catch((error) => {
          console.error("Đăng ký Service Worker thất bại:", error);
      });
}

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
