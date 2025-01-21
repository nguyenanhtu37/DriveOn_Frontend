import { Outlet } from "react-router-dom";



function MainLayout() {
  return (
    <div className="min-h-screen min-w-[378px] max-w-[1920px] mx-auto">
      <Outlet />
    </div>
  );
}

export default MainLayout;