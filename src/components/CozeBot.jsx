// import { useState, useEffect, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";

// const CozeBot = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [conversationId, setConversationId] = useState(null);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
//   const [showInvite, setShowInvite] = useState(true);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowInvite(false), 7000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) {
//       const newConversationId = uuidv4();
//       setConversationId(newConversationId);
//     }
//   }, [conversationId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   useEffect(() => {
//     if (isChatOpen) {
//       setTimeout(() => {
//         inputRef.current?.focus();
//       }, 200);
//     }
//   }, [isChatOpen]);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const authToken = localStorage.getItem("token");
//     const PAT =
//       "pat_06Q0ZFNiVAzG37OuFcNv5fDTWPxWMU8EEfRZLHN2oKGL6UPNMo6T4tdw3pd4Ev1u";
//     const userId = "user_211";

//     if (!conversationId) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Lỗi: Không thể khởi tạo hội thoại." },
//       ]);
//       return;
//     }

//     setMessages((prev) => [...prev, { sender: "user", text: input }]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("https://api.coze.com/open_api/v2/chat", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${PAT}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           bot_id: "7506409065133195280",
//           user: userId,
//           query: input,
//           stream: false,
//           custom_variables: {
//             token: authToken || "",
//           },
//           conversation_id: conversationId,
//           chat_history: messages.map((msg) => ({
//             role: msg.sender === "user" ? "user" : "assistant",
//             content: msg.text,
//             content_type: "text",
//           })),
//         }),
//       });

//       const data = await response.json();
//       if (data.code === 0 && data.messages && data.messages.length > 0) {
//         const botResponse =
//           data.messages.find((msg) => msg.type === "answer")?.content ||
//           "Không có phản hồi từ bot.";
//         setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
//       } else {
//         throw new Error(
//           data.msg || "Lỗi khi gọi Coze API: Không nhận được phản hồi hợp lệ"
//         );
//       }
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: `Lỗi: ${error.message}` },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendMessage();
//     }
//   };

//   return (
//     <div
//       className="floating-menu"
//       style={{
//         position: "fixed",
//         bottom: 160,
//         right: 64,
//         zIndex: 10000,
//         fontFamily: "Inter, Arial, sans-serif",
//       }}
//     >
//       {showInvite && (
//         <div
//           style={{
//             position: "absolute",
//             bottom: 90,
//             right: 0,
//             background: "rgba(251,146,60, 0.7)",
//             borderRadius: 10,
//             boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
//             padding: "5px 10px",
//             fontWeight: 500,
//             color: "#222",
//             fontSize: 15,
//             animation: "fadeInUp 1s",
//             width: 300,
//           }}
//         >
//           Xin chào! Tôi là Chatbot của DriveOn.
//         </div>
//       )}
//       <button
//         className="floating-icon chat-icon pulse-effect"
//         onClick={() => setIsChatOpen((v) => !v)}
//         title="Chat với DriveOn Bot"
//         style={{
//           border: "none",
//           background: "linear-gradient(135deg,#f87171,#fb923c)",
//           borderRadius: "50%",
//           width: 80,
//           height: 80,
//           boxShadow: "0 4px 24px rgba(251,146,60,0.18)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor: "pointer",
//           transition: "box-shadow 0.2s",
//           position: "relative",
//           overflow: "visible",
//         }}
//       >
//         <img
//           src="https://res.cloudinary.com/dt2akiv9y/image/upload/v1743097602/unnamed_ewf2fc.webp"
//           alt="Chatbot"
//           style={{ width: 75, height: 75, borderRadius: "50%" }}
//         />
//       </button>

//       {isChatOpen && (
//         <div
//           className="chat-window"
//           style={{
//             position: "absolute",
//             bottom: -95,
//             right: 100,
//             width: 500,
//             height: 700,
//             maxWidth: "90vw",
//             minHeight: 300,
//             background: "rgba(255,255,255,0.98)",
//             borderRadius: 10,
//             boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
//             overflow: "auto",
//             display: "flex",
//             flexDirection: "column",
//             animation: "fadeInUp 0.25s",
//             // resize: "vertical",
//           }}
//         >
//           <div
//             className="chat-header"
//             style={{
//               background: "linear-gradient(90deg,#f87171,#fb923c)",
//               color: "#fff",
//               padding: "16px 20px",
//               fontWeight: 700,
//               fontSize: 18,
//               letterSpacing: 0.5,
//               borderBottom: "1px solid #f3f4f6",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <span>DriveOn</span>
//             <button
//               onClick={() => setIsChatOpen(false)}
//               style={{
//                 background: "transparent",
//                 border: "none",
//                 color: "#fff",
//                 fontSize: 22,
//                 cursor: "pointer",
//                 marginLeft: 8,
//               }}
//               aria-label="Đóng"
//             >
//               ×
//             </button>
//           </div>
//           <div
//             className="chat-messages"
//             style={{
//               flex: 1,
//               padding: "18px 14px 8px 14px",
//               overflowY: "auto",
//               background: "#f8fafc",
//               minHeight: 180,
//               maxHeight: 600,
//               transition: "background 0.2s",
//             }}
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   justifyContent:
//                     msg.sender === "user" ? "flex-end" : "flex-start",
//                   marginBottom: 10,
//                 }}
//               >
//                 <div
//                   style={{
//                     background:
//                       msg.sender === "user"
//                         ? "linear-gradient(135deg,#f87171,#fb923c)"
//                         : "#fff",
//                     color: msg.sender === "user" ? "#fff" : "#222",
//                     borderRadius: 16,
//                     borderTopRightRadius: msg.sender === "user" ? 4 : 16,
//                     borderTopLeftRadius: msg.sender === "user" ? 16 : 4,
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//                     padding: "10px 16px",
//                     fontSize: 15,
//                     maxWidth: "80%",
//                     wordBreak: "break-word",
//                   }}
//                 >
//                   {msg.sender === "user" ? "Bạn" : "DriveOn Bot"}: {msg.text}
//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div
//                 style={{ color: "#fb923c", fontStyle: "italic", marginLeft: 4 }}
//               >
//                 DriveOn Bot đang trả lời...
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//           <div
//             className="chat-input"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               padding: "12px 14px",
//               borderTop: "1px solid #f3f4f6",
//               background: "#fff",
//             }}
//           >
//             <textarea
//               ref={inputRef}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Nhập tin nhắn..."
//               style={{
//                 flex: 1,
//                 border: "none",
//                 outline: "none",
//                 borderRadius: 16,
//                 background: "#f3f4f6",
//                 minHeight: 40,
//                 maxHeight: 120,
//                 padding: "10px 14px",
//                 fontSize: 15,
//                 marginRight: 8,
//                 boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//                 transition: "background 0.2s",
//                 resize: "none",
//                 lineHeight: 1.5,
//               }}
//               disabled={loading}
//             />
//             <button
//               onClick={sendMessage}
//               disabled={loading || !input.trim()}
//               style={{
//                 background: "linear-gradient(135deg,#f87171,#fb923c)",
//                 border: "none",
//                 borderRadius: "50%",
//                 width: 40,
//                 height: 40,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#fff",
//                 fontSize: 20,
//                 cursor: loading || !input.trim() ? "not-allowed" : "pointer",
//                 opacity: loading || !input.trim() ? 0.6 : 1,
//                 boxShadow: "0 2px 8px rgba(251,146,60,0.13)",
//                 transition: "opacity 0.2s",
//               }}
//               aria-label="Gửi"
//             >
//               <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
//                 <path d="M3 12l18-7-7 18-2.5-7.5L3 12z" fill="currentColor" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CozeBot;

import { useEffect } from "react";

const decodeJWT = (token) => {
  try {
    const payloadBase64 = token.split(".")[1];
    return JSON.parse(atob(payloadBase64));
  } catch (e) {
    console.error("decodeJWT failed:", e);
    return null;
  }
};

const CozeBot = () => {
  useEffect(() => {
    const waitForToken = async () => {
      let token = null;
      for (let i = 0; i < 10; i++) {
        token = localStorage.getItem("token");
        if (token) break;
        await new Promise((resolve) => setTimeout(resolve, 300)); // Đợi 300ms
      }

      if (!token) {
        console.warn("[CozeBot] Token not found after waiting");
        return;
      }

      const decoded = decodeJWT(token);
      if (!decoded) return;

      const { id = "user", email = "User" } = decoded;

      const script = document.createElement("script");
      script.src =
        "https://sf1-cdn-tos.douyinstatic.com/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.1/libs/oversea/index.js";
      script.async = true;
      script.id = "coze-sdk-script";

      script.onload = () => {
        const CozeSDK = window?.CozeWebSDK?.WebChatClient;
        if (typeof CozeSDK !== "function") {
          console.error("[CozeBot] SDK not available");
          return;
        }

        const chatClient = new CozeSDK({
          config: {
            bot_id: "7506409065133195280",
          },
          auth: {
            type: "jwt",
            token,
            onRefreshToken: async () => {
              const newToken = localStorage.getItem("token") || "";
              console.log("[CozeBot] onRefreshToken returning:", newToken);
              return newToken;
            },
          },
          userInfo: {
            id,
            nickname: email,
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
              width: 500,
              inputPlaceholder: "Nói gì đó...",
              isShowSuggestedReply: false,
            },
            asstBtn: {
              isNeed: true,
              text: "DriveOn Bot",
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

        console.log("[CozeBot] Chat client initialized:", chatClient);
      };

      script.onerror = () => {
        console.error("[CozeBot] Failed to load Coze SDK script");
      };

      document.body.appendChild(script);
    };

    waitForToken();

    return () => {
      const script = document.getElementById("coze-sdk-script");
      if (script) {
        document.body.removeChild(script);
        console.log("[CozeBot] Coze SDK script removed");
      }
    };
  }, []);

  return null;
};

export default CozeBot;
