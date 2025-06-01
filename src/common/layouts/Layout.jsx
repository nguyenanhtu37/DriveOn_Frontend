import DialogEmergency from "@/pages/DialogEmergency/DialogEmergency";
import DialogRecuse from "@/pages/DialogEmergency/DialogRecuse";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <Outlet />
      <DialogEmergency />
      <DialogRecuse />
    </div>
  );
};
