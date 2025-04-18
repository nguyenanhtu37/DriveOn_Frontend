import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import NavbarMobile from "@/components/NavbarMobile";
import { useGeolocation } from "../hooks/useGeolocation";

function MainLayout() {
  useGeolocation();
  return (
    <div className="min-h-screen min-w-[378px] bg-white max-w-[1920px] mx-auto ">
      <Header />
      <Outlet />
      <NavbarMobile />
    </div>
  );
}

export default MainLayout;
