import { useEffect } from "react";

const CozeBot = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://cdn.coze.com/web-sdk.js";
    script.async = true;
    script.onload = () => {
      window.CozeWebSDK("createBot", {
        bot_id: "7506409065133195280", 
        mode: "popup", // hoặc embedded
        input: {
          accessToken: token,
        },
      });
    };
    document.body.appendChild(script);
  }, []);

  return null; // không hiển thị gì
};

export default CozeBot;
