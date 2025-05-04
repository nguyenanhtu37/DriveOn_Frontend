import { createBrowserRouter, Navigate } from "react-router-dom";
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
import { ViewRegisterGarage } from "@/pages/LayoutAdmin/ViewRegisterGarage/ViewRegisterGarage";
import SignUp from "../../pages/SignUp/SignUp";
import { ViewExitsGarage } from "@/pages/LayoutAdmin/ViewExitsGararge/ViewExitsGarage";
import { GarageManagement } from "@/pages/GarageManagement/GarageManagement";
import GarageDashboard from "@/pages/GarageManagement/Dashboard/GarageDashboard";
import Appointment from "@/pages/GarageManagement/Appointment/Appointment";
import { AppointmentScheduler } from "@/pages/GarageManagement/Appointment/Tab/AppointmentScheduler";
import { ViewRegisterGarageDetail } from "@/pages/LayoutAdmin/ViewRegisterGarageDetail/ViewRegisterGarageDetail";
import { Staff } from "@/pages/GarageManagement/Staff/Staff";
import ProtectedRoute from "./ProtectRoute";
import { ViewServiceSystem } from "@/pages/LayoutAdmin/ViewServiceSystem/ViewServiceSystem";
import GarageRegistrationPage from "@/pages/GarageRegistrationPage/GarageRegistrationPage";
import Service from "@/pages/GarageManagement/Service/Service";
import ServiceDetail from "@/pages/GarageManagement/Service/ServiceDetail";
import CreateService from "@/pages/GarageManagement/Service/CreateService";
import PageNotFound from "@/pages/404/PageNotFound";
import GarageDetailPage from "@/pages/GarageDetailPage/GarageDetailPage";
import EmergencyGarageScreen from "@/pages/Emergency/Emergency";
import VehicleListPage from "@/pages/CarOwner/Vehicle/VehicleList";
import AddVehiclePage from "@/pages/CarOwner/Vehicle/AddVehicle";
import BrandList from "@/pages/LayoutAdmin/Brand/BrandList";
import VehicleDetailsPage from "@/pages/CarOwner/Vehicle/VehicleDetails";
import AppointmentId from "@/pages/GarageManagement/Appointment/AppointmentId";
import FavoriteGarages from "@/pages/CarOwner/FavoriteGarage/FavoriteGarages";
import { GarageProUpgrade } from "@/pages/GarageProUpgrade/GarageProUpgrade";
import { ProfilePageV2 } from "@/pages/ProfilePage/ProfilePageV2";
import GarageSetting from "@/pages/GarageManagement/GarageSetting/GarageSetting";
import { Feedback } from "@/pages/GarageManagement/Feedback/Feedback";
import { UserManagement } from "@/pages/LayoutAdmin/UserManagement/UserManagement";
import LayoutAdmin from "@/pages/LayoutAdmin/LayoutAdmin";
import { Dashboard } from "@/pages/LayoutAdmin/Dashboard/Dashboard";
import ScrollToTop from "@/components/ScrollToTop";
import { TransactionHistory } from "@/pages/LayoutAdmin/Transaction/TransactionHistory";
import ExpiredDate from "@/pages/ExpiredDate/ExpiredDate";

const router = createBrowserRouter(
  [
    {
      element: <ScrollToTop />,
      children: [
        {
          path: AbsoluteScreenPath.Entry,
          element: <MainLayout />,
          children: [
            { index: true, element: <HomePage /> },
            {
              path: AbsoluteScreenPath.GarageDetail,
              element: <GarageDetailPage />,
            },
          ],
        },
        {
          element: (
            <ProtectedRoute
              role={["carowner", "admin"]}
              directTo={AbsoluteScreenPath.Login}
            />
          ),
          children: [
            {
              path: AbsoluteScreenPath.ProfilePage,
              element: <ProfilePageV2 />,
            },
            {
              path: AbsoluteScreenPath.FavoriteGarages,
              element: <FavoriteGarages />,
            },
          ],
        },
        { path: AbsoluteScreenPath.Login, element: <Login /> },
        {
          path: AbsoluteScreenPath.ForgotPassword,
          element: <ForgotPassword />,
        },
        { path: AbsoluteScreenPath.SignUp, element: <SignUp /> },
        { path: AbsoluteScreenPath.NewPassword, element: <NewPassword /> },
        { path: AbsoluteScreenPath.VehicleList, element: <VehicleListPage /> },
        {
          path: AbsoluteScreenPath.GarageProUpgrade,
          element: <GarageProUpgrade />,
        },
        {
          path: AbsoluteScreenPath.Emergency,
          element: <EmergencyGarageScreen />,
        },
        {
          path: AbsoluteScreenPath.VehicleDetail,
          element: <VehicleDetailsPage />,
        },
        {
          path: AbsoluteScreenPath.AddVehiclePage,
          element: <AddVehiclePage />,
        },
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
          path: AdminScreenPath.Admin,
          element: <ProtectedRoute role={["admin"]} />,
          children: [
            {
              element: <LayoutAdmin />,
              children: [
                {
                  index: true,
                  element: <Navigate to={AdminScreenPath.Dashboard} />,
                },
                {
                  path: AdminScreenPath.Dashboard,
                  element: <Dashboard />,
                },
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
                {
                  path: AdminScreenPath.UserManagement,
                  element: <UserManagement />,
                },
                {
                  path: AdminScreenPath.TransactionHistory,
                  element: <TransactionHistory />,
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
                  path: GarageManagementScreenPath.Feedback,
                  element: <Feedback />,
                },
                {
                  element: <ProtectedRoute role={["manager"]} />,
                  children: [
                    {
                      path: GarageManagementScreenPath.Staff,
                      element: <Staff />,
                    },
                  ],
                },
                {
                  path: GarageManagementScreenPath.Service,
                  element: <Service />,
                  children: [
                    {
                      path: GarageManagementScreenPath.ServiceDetail,
                      element: <ServiceDetail />,
                    },
                    {
                      path: GarageManagementScreenPath.CreateService,
                      element: <CreateService />,
                    },
                  ],
                },
                {
                  path: GarageManagementScreenPath.ExpiredDate,
                  element: <ExpiredDate />,
                },
                {
                  path: GarageManagementScreenPath.Settings,
                  element: <GarageSetting />,
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
