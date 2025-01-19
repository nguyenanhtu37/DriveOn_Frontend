import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../common/layouts/MainLayout";
import { AbsoluteScreenPath } from "../../constants/screen";
import HomePage from "../../pages/HomePage/HomePage";
import GarageRegistrationPage from "../../pages/GarageRegistrationPage/GarageRegistrationPage";
import Dashboard from "@/pages/AdminDashboard/Dashboard";

const router = createBrowserRouter(
  [
    {
      path: AbsoluteScreenPath.Entry,
      element: <MainLayout />,
      children: [{ index: true, element: <HomePage /> }],
    },
    {
      path: AbsoluteScreenPath.GarageRegistrationPage,
      element: <GarageRegistrationPage />,
    },
    {
      path: AbsoluteScreenPath.AdminDashBoard,
      element: <Dashboard />,
    },
  ],
  {
    /**
     * See https://reactrouter.com/en/6.27.0/upgrading/future
     */
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
