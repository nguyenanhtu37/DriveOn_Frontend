import { SidebarLeft } from "./components/SidebarLeft";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

function LayoutAdmin() {
  return (
    <SidebarProvider>
      <div className="  w-full min-h-screen h-full m-auto  flex items-start shadow-md bg-white border border-black/60 rounded-2xl overflow-hidden">
        <SidebarLeft />
        <div className=" relative flex-1 flex-col ">
          <Header />
          <div className=" overflow-y-auto  scrollbar-hide">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}

export default LayoutAdmin;
