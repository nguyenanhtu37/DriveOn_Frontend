import { useEffect } from "react";

const CozeBot = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("CozeBot token:", token);
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://cdn.coze.com/web-sdk.js";
    script.async = true;

    script.onload = () => {
      console.log("Coze SDK script loaded");
      if (window.CozeWebSDK) {
        window.CozeWebSDK("createBot", {
          bot_id: "7506409065133195280",
          mode: "popup", // hoặc "embedded"
          input: {
            accessToken: token,
          },
        });
        console.log("Coze bot created");
      } else {
        console.error("CozeWebSDK not found on window");
      }
    };

    script.onerror = () => {
      console.error("Failed to load Coze SDK script");
    };

    document.body.appendChild(script);

    // Cleanup if component unmounts
    return () => {
      document.body.removeChild(script);
      console.log("Coze SDK script removed");
    };
  }, []);

  return null; // không render UI
};

export default CozeBot;
