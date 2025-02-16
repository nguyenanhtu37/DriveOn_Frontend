import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import NavbarMobile from "@/components/NavbarMobile";
import { Toaster } from "@/components/ui/toaster";

function MainLayout() {
  return (
    <div className="min-h-screen min-w-[378px] bg-white max-w-[1920px] mx-auto">
      <Header />
      <Outlet />
      <NavbarMobile />
      <Toaster />
    </div>
  );
}

export default MainLayout;
