import { useGetGarageDetail } from "@/app/stores/entity/garage";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  CalendarDays,
  Crown,
  LayoutDashboard,
  LogOut,
  SettingsIcon,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarItem } from "@/pages/LayoutAdmin/components/SidebarItem";
import { useAuth } from "@/common/hooks/useAuth";

const navigationItems = [
  {
    group: "Management",
    items: [
      {
        icon: <LayoutDashboard className="h-4 w-4" />,
        title: "Dashboard",
        link: "dashboard",
        role: ["manager", "staff"],
      },
      {
        icon: <Users className="h-4 w-4" />,
        title: "Staff",
        link: "staff",
        role: ["manager"],
      },
    ],
  },
  {
    group: "Activities",
    items: [
      {
        icon: <CalendarDays className="h-4 w-4" />,
        title: "Appointments",
        link: "appointments",
        role: ["manager", "staff"],
      },
      {
        icon: <Wrench className="h-4 w-4" />,
        title: "Services",
        link: "services",
        role: ["manager", "staff"],
      },
      {
        icon: <Star className="h-4 w-4" />,
        title: "Feedback",
        link: "feedback",
        role: ["manager", "staff"],
      },
    ],
  },
  {
    group: "Settings",
    items: [
      {
        icon: <SettingsIcon className="h-4 w-4" />,
        title: "Garage Settings",
        link: "settings",
        role: ["manager"],
      },
    ],
  },
];

export const SidebarGarage = () => {
  const { garageId } = useParams();
  const garage = useGetGarageDetail(garageId);

  const { handleLogout } = useAuth();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className=" px-4 py-5 flex items-center ">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-100">
            <Wrench className="h-4 w-4 text-rose-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm leading-none">Drive On</span>
            <span className="text-xs text-muted-foreground leading-relaxed">
              Garage Management
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="px-3 py-4">
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-gradient-to-r from-rose-50 to-rose-100 p-3">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage
                src={"/placeholder.svg?height=40&width=40"}
                alt={garage.data.name}
              />
              <AvatarFallback className="bg-rose-500 text-white">
                {garage.data.name?.charAt(0) || "G"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{garage.data.name}</span>
              <div className="flex items-center gap-1">
                <Crown className="h-3 w-3 text-amber-500" />
                {garage.data.tag === "pro" && (
                  <span className="text-xs text-rose-600">Pro</span>
                )}
              </div>
            </div>
          </div>

          {navigationItems.map((group, index) => (
            <SidebarGroup key={group.group}>
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                {group.group}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarItem
                      key={item.title}
                      icon={item.icon}
                      title={item.title}
                      link={item.link}
                      role={item.role}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              {index < navigationItems.length - 1 && (
                <SidebarSeparator className="my-4" />
              )}
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-muted-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
