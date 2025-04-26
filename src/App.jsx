import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { requestPermissionAndGetToken } from '../firebase-messaging';
import { RouterProvider } from "react-router-dom";
import router from "./app/routes/Route";
import { useEffect } from "react";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5,
      // cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  useEffect(() => {
    requestPermissionAndGetToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
      {/* <Toaster /> */}
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
