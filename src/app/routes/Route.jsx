import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/common/layouts/MainLayout";
import {
  AbsoluteScreenPath,
  GarageManagementScreenPath,
} from "../../constants/screen";
import HomePage from "../../pages/HomePage/HomePage";
import Login from "@/pages/Login/Login";
import ForgotPassword from "../../pages/forgot-password/Forgot-password";
import NewPassword from "../../pages/forgot-password/New-password";
import CarOwnerPage from "@/pages/CarOwner/CarOwnerPage";
import GarageRegistrationPage from "../../pages/GarageRegistrationPage/GarageRegistrationPage";
import Dashboard from "@/pages/AdminDashboard/Dashboard";
import { ViewRegisterGarage } from "@/pages/AdminDashboard/ViewRegisterGarage/ViewRegisterGarage";
import { GarageManagement } from "@/pages/GarageManagement/GarageManagement";
import GarageDashboard from "@/pages/GarageManagement/Dashboard/GarageDashboard";
import Appointment from "@/pages/GarageManagement/Appointment/Tab/Appointment";
import AppointmentDetail from "@/pages/GarageManagement/Appointment/AppointmentDetail";
import { AppointmentScheduler } from "@/pages/GarageManagement/Appointment/Tab/AppointmentScheduler";

const router = createBrowserRouter(
  [
    {
      path: AbsoluteScreenPath.Entry,
      element: <MainLayout />,
      children: [{ index: true, element: <HomePage /> }],
    },
    { path: AbsoluteScreenPath.Login, element: <Login /> },
    { path: AbsoluteScreenPath.ForgotPassword, element: <ForgotPassword /> },
    { path: AbsoluteScreenPath.CarOwnerPage, element: <CarOwnerPage /> },
    { path: AbsoluteScreenPath.NewPassword, element: <NewPassword /> },
    {
      path: AbsoluteScreenPath.GarageRegistrationPage,
      element: <GarageRegistrationPage />,
    },
    {
      path: AbsoluteScreenPath.AdminDashBoard,
      element: <Dashboard />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: AbsoluteScreenPath.viewRegisterGarage,
          element: <ViewRegisterGarage />,
        },
      ],
    },

    {
      path: GarageManagementScreenPath.GarageManagement,
      element: <GarageManagement />,
      children: [
        {
          index: true,
          path: GarageManagementScreenPath.garageDashboard,
          element: <GarageDashboard />,
        },
        {
          path: GarageManagementScreenPath.appointment,
          element: <Appointment />,
        },
        {
          path: GarageManagementScreenPath.appointmentScheduler,
          element: <AppointmentScheduler />,
        },
        {
          path: GarageManagementScreenPath.appointmentDetail,
          element: <AppointmentDetail />,
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
