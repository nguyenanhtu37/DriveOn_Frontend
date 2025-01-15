import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../common/layouts/MainLayout";
import { AbsoluteScreenPath } from "../../constants/screen";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/Login";  // Make sure the path is correct

const router = createBrowserRouter(
  [
    {
      path: AbsoluteScreenPath.Entry,
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> }, // HomePage as the default index page
        {
          path: "/login",  // Define a route for LoginPage
          element: <LoginPage />, 
        },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
