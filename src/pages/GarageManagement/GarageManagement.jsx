import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarGarage } from "./components/SidebarGarage";
import { Header } from "../AdminDashboard/components/Header";

export const GarageManagement = () => {
  return (
    <SidebarProvider>
      <div className=" min-w-[378px] w-full min-h-screen h-full m-auto  flex items-start shadow-md bg-white border border-black/60 rounded-2xl overflow-hidden">
        <SidebarGarage />

        <div className=" relative flex-1 flex-col ">
          <Header />
          <div className=" overflow-y-auto  scrollbar-hide">
            <Outlet />
          </div>
        </div>
        <div className="hidden lg:block h-full"></div>
      </div>
    </SidebarProvider>
  );
};
