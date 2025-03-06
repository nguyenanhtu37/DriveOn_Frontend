import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SidebarItem } from "@/pages/AdminDashboard/components/SidebarItem";
import {
  CalendarDays,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Star,
  Users,
  Wallet,
} from "lucide-react";

const sidebarItem = [
  { icon: <LayoutDashboard />, title: "Dashboard", link: "dashboard" },
  { icon: <Users />, title: "Staff", link: "staff" },
  { icon: <CalendarDays />, title: "Appointments", link: "appointments" },
  { icon: <Settings />, title: "Services", link: "services" },
  { icon: <Star />, title: "Feedback", link: "feedback" },
  { icon: <MessageCircle />, title: "Chat", link: "chat" },
  { icon: <Wallet />, title: "Transactions", link: "transactions" },
];

export const SidebarGarage = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <div className=" p-5 w-full h-full flex bg-gray  flex-col gap-y-4 bg-white  ">
          <div className=" w-full h-8 px-1 gap-2 flex justify-center items-center">
            <span className=" text-md text-center font-semibold text-black">
              Garage Management
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
