import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import NavbarMobile from "@/components/NavbarMobile";
import { useGeolocation } from "../hooks/useGeolocation";
import { Footer } from "@/components/Footer/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarHome } from "./components/SidebarHome";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

function MainLayout() {
  useGeolocation();

  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <SidebarHome />
      <div className="min-h-screen bg-white min-w-[378px] max-w-[1920px] mx-auto ">
        <Header />
        <Outlet />
        <NavbarMobile />
        <Footer />
      </div>
    </SidebarProvider>
  );
}

export default MainLayout;
