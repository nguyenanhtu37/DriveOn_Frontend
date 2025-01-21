import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/common/layouts/MainLayout";
import { AbsoluteScreenPath } from "../../constants/screen";
import HomePage from "../../pages/HomePage/HomePage";
import Login from "@/pages/Login/Login";
import ForgotPassword from "../../pages/forgot-password/Forgot-password";
import NewPassword from "../../pages/forgot-password/New-password"; 
import CarOwnerPage from "@/pages/CarOwner/CarOwnerPage";
const router = createBrowserRouter(
  [
    {
      path: AbsoluteScreenPath.Entry, 
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: AbsoluteScreenPath.Login, element: <Login /> },
        { path: AbsoluteScreenPath.ForgotPassword, element: <ForgotPassword /> },
        { path: AbsoluteScreenPath.CarOwnerPage, element: <CarOwnerPage/>},
        { path: AbsoluteScreenPath.NewPassword, element: <NewPassword /> },
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
