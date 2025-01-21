import React from "react";
import { SidebarLeft } from "./components/SidebarLeft";
import { SidebarRight } from "./components/SidebarRight";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

function Dashboard() {
  return (
    <SidebarProvider>
      <div className="   min-w-[378px]: w-full min-h-screen h-full m-auto  flex items-start shadow-md bg-white border border-black/60 rounded-2xl overflow-hidden">
        <SidebarLeft />
        <div className=" relative flex-1 flex-col ">
          <Header />
          <div className=" overflow-y-auto  scrollbar-hide">
            <Outlet />
          </div>
        </div>
        <div className="hidden lg:block h-full">
          <SidebarRight />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;
