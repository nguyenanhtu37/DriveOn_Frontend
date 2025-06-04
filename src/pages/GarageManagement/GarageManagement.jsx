import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { SidebarGarage } from "./components/SidebarGarage";
import { NotificationPanel } from "./components/NotificationPanel";

export const GarageManagement = () => {
  return (
    <SidebarProvider>
      <div className="min-w-[378px] w-full h-full m-auto flex items-start shadow-md bg-white border border-gray-200 overflow-hidden">
        <SidebarGarage />

        <div className="relative flex-1 flex flex-col">
          <Header notificationComponent={<NotificationPanel />} />
          <div className="flex-1 bg-white overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
