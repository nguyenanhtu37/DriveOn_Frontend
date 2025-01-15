import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="min-h-screen max-w-[1920px] mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
