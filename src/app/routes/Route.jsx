import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/common/layouts/MainLayout";
import {
  AbsoluteScreenPath,
  AdminScreenPath,
  GarageManagementScreenPath,
} from "../../constants/screen";
import HomePage from "../../pages/HomePage/HomePage";
import Login from "@/pages/Login/Login";
import ForgotPassword from "../../pages/forgot-password/Forgot-password";
import NewPassword from "../../pages/forgot-password/New-password";

import Dashboard from "@/pages/AdminDashboard/Dashboard";
import { ViewRegisterGarage } from "@/pages/AdminDashboard/ViewRegisterGarage/ViewRegisterGarage";
import SignUp from "../../pages/SignUp/SignUp";
import CarOwnerPage from "@/pages/CarOwner/CarOwnerPage";
import { ViewExitsGarage } from "@/pages/AdminDashboard/ViewExitsGararge/ViewExitsGarage";
import { GarageManagement } from "@/pages/GarageManagement/GarageManagement";
import GarageDashboard from "@/pages/GarageManagement/Dashboard/GarageDashboard";
import Appointment from "@/pages/GarageManagement/Appointment/Tab/Appointment";
import AppointmentDetail from "@/pages/GarageManagement/Appointment/AppointmentDetail";
import { AppointmentScheduler } from "@/pages/GarageManagement/Appointment/Tab/AppointmentScheduler";
import { ViewRegisterGarageDetail } from "@/pages/AdminDashboard/ViewRegisterGarageDetail/ViewRegisterGarageDetail";
import { Staff } from "@/pages/GarageManagement/Staff/Staff";
import ProtectedRoute from "./ProtectRoute";
import { ViewServiceSystem } from "@/pages/AdminDashboard/ViewServiceSystem/ViewServiceSystem";
import GarageRegistrationPage from "@/pages/GarageRegistrationPage/GarageRegistrationPage";
import Service from "@/pages/GarageManagement/Service/Service";
import ServiceDetail from "@/pages/GarageManagement/Service/ServiceDetail";
import CreateService from "@/pages/GarageManagement/Service/CreateService";
import PageNotFound from "@/pages/404/PageNotFound";

const router = createBrowserRouter(
  [
    {
      path: AbsoluteScreenPath.Entry,
      element: <MainLayout />,
      children: [{ index: true, element: <HomePage /> }],
    },
    { path: AbsoluteScreenPath.Login, element: <Login /> },
    { path: AbsoluteScreenPath.ForgotPassword, element: <ForgotPassword /> },
    { path: AbsoluteScreenPath.SignUp, element: <SignUp /> },
    { path: AbsoluteScreenPath.NewPassword, element: <NewPassword /> },
    // { path: AbsoluteScreenPath.ProfilePage, element: <ProfilePage/> },
    { path: AbsoluteScreenPath.CarOwnerPage, element: <CarOwnerPage /> },
    { path: AbsoluteScreenPath.NewPassword, element: <NewPassword /> },
    {
      path: AbsoluteScreenPath.GarageRegistrationPage,
      element: <GarageRegistrationPage />,
    },

    //Admin route
    {
      path: AdminScreenPath.AdminDashBoard,
      element: <ProtectedRoute role={["admin"]} />,
      children: [
        {
          element: <Dashboard />,
          children: [
            { index: true, element: <HomePage /> },
            {
              path: AdminScreenPath.ViewRegisterGarage,
              element: <ViewRegisterGarage />,
            },
            {
              path: AdminScreenPath.ViewRegisterGarageDetail,
              element: <ViewRegisterGarageDetail />,
            },
            {
              path: AdminScreenPath.ViewExitsGarage,
              element: <ViewExitsGarage />,
            },
            {
              path: AdminScreenPath.viewServiceSystem,
              element: <ViewServiceSystem />,
            },
          ],
        },
      ],
    },

    //Garage Management route
    {
      path: GarageManagementScreenPath.GarageManagement,
      element: <ProtectedRoute role={["manager", "staff"]} />,
      children: [
        {
          element: <GarageManagement />,
          children: [
            {
              index: true,
              element: <GarageDashboard />,
            },
            {
              path: GarageManagementScreenPath.GarageDashboard,
              element: <GarageDashboard />,
            },
            {
              path: GarageManagementScreenPath.Appointment,
              element: <Appointment />,
            },
            {
              path: GarageManagementScreenPath.AppointmentScheduler,
              element: <AppointmentScheduler />,
            },
            {
              path: GarageManagementScreenPath.AppointmentDetail,
              element: <AppointmentDetail />,
            },
            {
              path: GarageManagementScreenPath.Staff,
              element: <Staff />,
            },
            {
              path: GarageManagementScreenPath.Service,
              element: <Service />,
              children: [
                {
                  path: GarageManagementScreenPath.ServiceDetail,
                  element: <ServiceDetail />,
                },
              ],
            },
            {
              path: GarageManagementScreenPath.CreateService,
              element: <CreateService />,
            },
          ],
        },
      ],
    },

    {
      path: AbsoluteScreenPath.PageNotFound,
      element: <PageNotFound />,
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
