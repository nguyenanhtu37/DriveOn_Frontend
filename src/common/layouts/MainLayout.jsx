import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import NavbarMobile from "@/components/NavbarMobile";

function MainLayout() {
  return (
    <div className="min-h-screen min-w-[378px] max-w-[1920px] mx-auto">
      <Header />
      <Outlet />
      <NavbarMobile />
    </div>
  );
}

export default MainLayout;
