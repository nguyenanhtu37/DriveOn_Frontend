import { useEffect } from "react";

const CozeBot = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("CozeBot token:", token);
    if (!token) return;

    const script = document.createElement("script");
    script.src =
      "https://sf1-cdn-tos.douyinstatic.com/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.1/libs/oversea/index.js";
    script.async = true;

    script.onload = () => {
      console.log("Coze SDK script loaded");

      if (
        window.CozeWebSDK &&
        typeof window.CozeWebSDK.WebChatClient === "function"
      ) {
        const chatClient = new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: "7506409065133195280",
          },
          auth: {
            type: "jwt",
            token: token,
            onRefreshToken: async () => localStorage.getItem("token") || "",
          },
          userInfo: {
            id: "user",
            nickname: "User",
            url: "https://res.cloudinary.com/dt2akiv9y/image/upload/v1743097602/unnamed_ewf2fc.webp",
          },
          ui: {
            base: {
              icon: "https://res.cloudinary.com/dt2akiv9y/image/upload/v1743097602/unnamed_ewf2fc.webp",
              layout: "pc",
              lang: "vi",
              zIndex: 1000,
            },
            chatBot: {
              title: "DriveOn Bot",
              uploadable: true,
              width: 400,
            },
            asstBtn: {
              isNeed: true,
            },
            footer: {
              isShow: true,
              expressionText: "DriveOn Bot",
              linkvars: {
                name: {
                  text: "DriveOn",
                  link: "https://drive-on-frontend.vercel.app/",
                },
              },
            },
          },
        });

        console.log("Coze WebChatClient initialized", chatClient);
      } else {
        console.error("ozeWebSDK.WebChatClient not found");
      }
    };

    script.onerror = () => {
      console.error("Failed to load Coze SDK script");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      console.log("Coze SDK script removed");
    };
  }, []);

  return null;
};

export default CozeBot;
