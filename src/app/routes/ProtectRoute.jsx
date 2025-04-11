import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/view/user";

import { AbsoluteScreenPath } from "@/constants/screen";
import { useMemo } from "react";

const ProtectedRoute = ({ role, directTo }) => {
  const user = useUserStore((state) => state.user);

  const authorized = useMemo(() => {
    return (
      user &&
      role.some((requiredRole) =>
        user.roles.some((userRole) => userRole.roleName === requiredRole)
      )
    );
  }, [role, user]);

  if (!user) {
    return <Navigate to={AbsoluteScreenPath.Login} />;
  }

  return authorized ? (
    <Outlet />
  ) : (
    <Navigate to={directTo ?? AbsoluteScreenPath.PageNotFound} />
  );
};

export default ProtectedRoute;
