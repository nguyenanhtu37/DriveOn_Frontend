import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./app/routes/Route";
import { useState, useEffect } from "react";
import { onMessageListener } from "../firebase-messaging.js";
import { ToastContainer, toast as reactToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./components/Modal";
import CustomToast from "./components/CustomToast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  useEffect(() => {
    const handleMessage = (payload) => {
      console.log("New foreground message received:", payload);

      const { title, body } = payload.notification || {};
      const notificationId = payload.messageId || `${title}-${body}`;

      if (!title || !body) {
        console.warn("No notification payload found");
        return;
      }

      reactToast.info(
        <CustomToast
          title={title}
          body={body}
          details={{ name: "Nguyễn Văn A", vehicle: "Toyota Camry", location: "Hà Nội" }}
        />,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          icon: false,
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
          },
        }
      );

      if (Notification.permission === "granted") {
        new Notification(title, {
          body: body,
          icon: "https://res.cloudinary.com/dt2akiv9y/image/upload/v1743097602/unnamed_ewf2fc.webp",
        });
      }
    };

    onMessageListener(handleMessage);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        pauseOnHover
        draggable
        theme="colored"
        limit={3}
      />
      {isModalOpen && (
        <Modal
          title={modalContent.title}
          body={modalContent.body}
          onClose={handleCloseModal}
        />
      )}
    </QueryClientProvider>
  );
}

export default App;