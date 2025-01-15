import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./app/routes/Route"; // Import the router from here
import "./App.css";

// Create the QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* This will manage all routes including the LoginPage */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
