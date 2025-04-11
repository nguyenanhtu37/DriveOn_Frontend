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
import ProfilePage from "@/pages/CarOwner/Profile/index";
import { ViewExitsGarage } from "@/pages/AdminDashboard/ViewExitsGararge/ViewExitsGarage";
import { GarageManagement } from "@/pages/GarageManagement/GarageManagement";
import GarageDashboard from "@/pages/GarageManagement/Dashboard/GarageDashboard";
import Appointment from "@/pages/GarageManagement/Appointment/Appointment";
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
import GarageDetailPage from "@/pages/GarageDetailPage/GarageDetailPage";

import VehicleListPage from "@/pages/CarOwner/Vehicle/VehicleList";
import AddVehiclePage from "@/pages/CarOwner/Vehicle/AddVehicle";
import BrandList from "@/pages/AdminDashboard/Brand/BrandList";
import VehicleDetailsPage from "@/pages/CarOwner/Vehicle/VehicleDetails";
import AppointmentId from "@/pages/GarageManagement/Appointment/AppointmentId";
import FavoriteGarages from "@/pages/CarOwner/FavoriteGarage/FavoriteGarages";
import { GarageProUpgrade } from "@/pages/GarageProUpgrade/GarageProUpgrade";
import { ProfilePageV2 } from "@/pages/ProfilePage/ProfilePageV2";
const router = createBrowserRouter(
  [
    {
      path: AbsoluteScreenPath.Entry,
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },

        {
          element: <ProtectedRoute role={[""]} />,
          children: [
            {
              path: AbsoluteScreenPath.GarageDetail,
              element: <GarageDetailPage />,
            },
          ],
        },
      ],
    },
    { path: AbsoluteScreenPath.Login, element: <Login /> },
    { path: AbsoluteScreenPath.ForgotPassword, element: <ForgotPassword /> },
    { path: AbsoluteScreenPath.SignUp, element: <SignUp /> },
    { path: AbsoluteScreenPath.NewPassword, element: <NewPassword /> },
    { path: AbsoluteScreenPath.ProfilePage, element: <ProfilePageV2 /> },
    // { path: AbsoluteScreenPath.ProfilePageV2, element: <ProfilePageV2 /> },
    { path: AbsoluteScreenPath.VehicleList, element: <VehicleListPage /> },
    { path: AbsoluteScreenPath.FavoriteGarages, element: <FavoriteGarages /> },
    {
      path: AbsoluteScreenPath.GarageProUpgrade,
      element: <GarageProUpgrade />,
    },

    {
      path: AbsoluteScreenPath.VehicleDetail,
      element: <VehicleDetailsPage />,
    },
    { path: AbsoluteScreenPath.AddVehiclePage, element: <AddVehiclePage /> },
    {
      element: (
        <ProtectedRoute
          role={["carowner", "manager"]}
          directTo={AbsoluteScreenPath.Login}
        />
      ),
      children: [
        {
          path: AbsoluteScreenPath.GarageRegistrationPage,
          element: <GarageRegistrationPage />,
        },
      ],
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
              path: AdminScreenPath.BrandList,
              element: <BrandList />,
            },
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
              element: <AppointmentId />,
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
