import { AbsoluteScreenPath } from "@/constants/screen";
import { cn } from "@/lib/utils";
import { CircleUser, Heart, Car, Home, Activity } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { DialogMyGarage } from "@/components/DialogMyGagrage/DialogMyGarage";

const MENU_ITEMS = [
  { icon: Home, label: "Home", link: "/" },
  {
    icon: Heart,
    label: "Favourited",
    link: AbsoluteScreenPath.FavoriteGarages,
  },
  { icon: Activity, label: "Emergency", link: AbsoluteScreenPath.Emergency },
  { icon: Car, label: "Garage" }, // No link, will open dialog
  { icon: CircleUser, label: "Profile", link: AbsoluteScreenPath.ProfilePage },
];

function NavbarMobile() {
  const [openGarageDialog, setOpenGarageDialog] = useState(false);

  return (
    <>
      <div
        className={cn(
          "md:hidden w-full h-[60px] bg-white shadow-sm fixed border-t border-gray-100 bottom-0 grid grid-cols-5 items-center z-50 animate-fade-up animate-once animate-delay-100 animate-ease-out"
        )}
      >
        {MENU_ITEMS.map((item, index) =>
          item.label === "Garage" ? (
            <span
              key={index}
              className={cn(
                "w-full flex flex-col gap-1 items-center cursor-pointer transition-colors focus:outline-none",
                openGarageDialog
                  ? "text-red-500"
                  : "text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setOpenGarageDialog(true)}
              role="button"
              tabIndex={0}
            >
              <item.icon size={22} aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </span>
          ) : item.label === "Emergency" ? (
            <NavLink
              key={index}
              className={({ isActive }) =>
                cn(
                  "w-full flex flex-col gap-1 items-center cursor-pointer transition-colors relative -top-4",
                  isActive
                    ? "text-white"
                    : "text-white"
                )
              }
              to={item.link || ""}
            >
              <div className="bg-red-500 rounded-full p-3 shadow-lg">
                <item.icon size={28} aria-hidden="true" />
              </div>
              <span className="text-[10px] font-medium text-red-500">{item.label}</span>
            </NavLink>
          ) : (
            <NavLink
              key={index}
              className={({ isActive }) =>
                cn(
                  "w-full flex flex-col gap-1 items-center cursor-pointer transition-colors",
                  isActive
                    ? "text-red-500"
                    : "text-gray-500 hover:text-gray-700"
                )
              }
              to={item.link || ""}
            >
              <item.icon size={22} aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          )
        )}
      </div>
      {/* Dialog for Garage */}
      <DialogMyGarage
        open={openGarageDialog}
        onOpenChange={setOpenGarageDialog}
      />
    </>
  );
}

export default NavbarMobile;
