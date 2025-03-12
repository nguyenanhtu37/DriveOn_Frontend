import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/view/user";

import { AbsoluteScreenPath } from "@/constants/screen";

const ProtectedRoute = ({ role }) => {
  const user = useUserStore((state) => state.user);
  const authorized = user.roles.some((r) => role.includes(r.roleName));

  return authorized ? (
    <Outlet />
  ) : (
    <Navigate to={AbsoluteScreenPath.PageNotFound} />
  );
};

export default ProtectedRoute;
