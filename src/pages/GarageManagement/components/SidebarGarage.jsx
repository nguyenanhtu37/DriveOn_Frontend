import { useGetGarageDetail } from "@/app/stores/entity/garage";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SidebarItem } from "@/pages/AdminDashboard/components/SidebarItem";
import {
  ArrowUp,
  CalendarDays,
  Clock,
  LayoutDashboard,
  MessageCircle,
  Settings,
  SettingsIcon,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useParams } from "react-router-dom";

const sidebarItem = [
  // {
  //   icon: <LayoutDashboard />,
  //   title: "Dashboard",
  //   link: "dashboard",
  //   role: ["manager", "staff"],
  // },
  { icon: <Users />, title: "Staff", link: "staff", role: ["manager"] },
  {
    icon: <CalendarDays />,
    title: "Appointments",
    link: "appointments",
    role: ["manager", "staff"],
  },
  {
    icon: <Settings />,
    title: "Services",
    link: "services",
    role: ["manager", "staff"],
  },
  // {
  //   icon: <Star />,
  //   title: "Feedback",
  //   link: "feedback",
  //   role: ["manager", "staff"],
  // },
  // {
  //   icon: <Clock />,
  //   title: "Expired",
  //   link: "countdown",
  //   role: ["manager", "staff"],
  // },
  // { icon: <Wallet />, title: "Transactions", link: "transactions" },
  {
    icon: <ArrowUp />,
    title: "Garage Pro",
    link: "/garageProUpgrade",
    role: ["manager"],
  },
  {
    icon: <SettingsIcon />,
    title: "Garage Settings",
    link: "settings",
    role: ["manager"],
  },
];

export const SidebarGarage = () => {
  const { garageId } = useParams();
  const garage = useGetGarageDetail(garageId);
  return (
    <Sidebar>
      <SidebarContent>
        <div className=" p-5 w-full h-full flex flex-col gap-y-4 bg-white  ">
          <div className=" cursor-pointer w-full h-8 px-1 gap-2 flex justify-center items-center">
            <span className="text-md font-semibold px-3 py-1 bg-red-100 text-red-600 rounded-md border border-red-200 inline-block">
              {garage.data.name}
            </span>
          </div>
          <div className=" flex flex-col w-full gap-y-7 ">
            <div className=" flex flex-col gap-y-2">
              <div className=" flex flex-col gap-y-2">
                {sidebarItem.map((item) => (
                  <SidebarItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    link={item.link}
                    role={item.role}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
