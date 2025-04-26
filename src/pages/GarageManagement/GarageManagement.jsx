import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarGarage } from "./components/SidebarGarage";
import { Header } from "../AdminDashboard/components/Header";

export const GarageManagement = () => {
  return (
    <SidebarProvider>
      <div className=" min-w-[378px] w-full h-full  m-auto  flex items-start shadow-md bg-[#ffffff] border border-black/60  overflow-hidden">
        <SidebarGarage />

        <div className=" relative flex-1 flex-col ">
          <Header />
          <div className=" h-full bg-[#ffffff]">
            <Outlet />
          </div>
        </div>
        <div className="hidden lg:block h-full"></div>
      </div>
    </SidebarProvider>
  );
};
