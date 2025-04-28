import { useUserStore } from "@/app/stores/view/user";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

import { NavLink } from "react-router-dom";

export const SidebarItem = ({ icon, title, link, props, role }) => {
  const user = useUserStore((state) => state.user);
  const authorized = useMemo(() => {
    return (
      user &&
      role.some((requiredRole) =>
        user.roles.some((userRole) => userRole.roleName === requiredRole)
      )
    );
  }, [role, user]);

  if (!authorized) {
    return null;
  }

  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
          isActive
            ? "bg-red-300 text-red-600"
            : "text-gray-600 hover:bg-red-50 hover:text-red-600"
        )
      }
      {...props}
    >
      <div className=" flex items-center justify-start gap-x-2">
        <div className=" w-4 h-4">
          {icon && (
            <icon.type
              size={16}
              color="#1C1C1C"
              className=" group-hover/item:opacity-40"
            />
          )}
        </div>
        <span className=" text-md text-start text-black font-medium group-hover/item:opacity-40 ">
          {title}
        </span>
      </div>
    </NavLink>
  );
};
