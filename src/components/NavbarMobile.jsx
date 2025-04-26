import { AbsoluteScreenPath } from "@/constants/screen";
import { cn } from "@/lib/utils";
import { CircleUser, Heart, Car, Home, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const MENU_ITEMS = [
  { icon: Home, label: "Home", link: "/" },
  {
    icon: Heart,
    label: "Favourited",
    link: AbsoluteScreenPath.FavoriteGarages,
  },
  { icon: Car, label: "Garage" },
  { icon: Activity, label: "Emergency", link: AbsoluteScreenPath.Emergency },
  { icon: CircleUser, label: "Profile", link: AbsoluteScreenPath.ProfilePage },
];

function NavbarMobile() {
  return (
    <div
      className={cn(
        "md:hidden w-full h-[60px] bg-white shadow-sm fixed border-t border-gray-100 bottom-0 grid grid-cols-5 items-center z-50 animate-fade-up animate-once animate-delay-100 animate-ease-out"
      )}
    >
      {MENU_ITEMS.map((item, index) => (
        <Link
          key={index}
          className="w-full flex flex-col gap-1 items-center cursor-pointer transition-colors hover:text-gray-700"
          to={item.link || ""}
        >
          <item.icon size={22} className="text-gray-500" aria-hidden="true" />
          <span className="text-[10px] font-medium text-gray-600">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default NavbarMobile;
