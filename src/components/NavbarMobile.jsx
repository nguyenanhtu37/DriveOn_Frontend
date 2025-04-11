import { cn } from "@/lib/utils";
import { CircleUser, Heart, Filter, Car } from "lucide-react";

const MENU_ITEMS = [
  { icon: Filter, label: "Filter" },
  { icon: Heart, label: "Favourited" },
  { icon: Car, label: "Garage" },
  { icon: CircleUser, label: "Profile" },
  { icon: CircleUser, label: "Profile" },
];

function NavbarMobile() {
  return (
    <div
      className={cn(
        "md:hidden w-full h-[60px] bg-white shadow-sm fixed border-t border-gray-100 bottom-0 grid grid-cols-5 items-center z-50 animate-fade-up animate-once animate-delay-100 animate-ease-out"
      )}
    >
      {MENU_ITEMS.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-col gap-1 items-center cursor-pointer transition-colors hover:text-gray-700"
        >
          <item.icon size={22} className="text-gray-500" aria-hidden="true" />
          <span className="text-[10px] font-medium text-gray-600">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default NavbarMobile;
