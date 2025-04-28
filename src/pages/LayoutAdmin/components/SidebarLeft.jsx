import { Avatar as AvatarUI } from "./Avatar";
import {
  Car,
  CarFront,
  File,
  ServerCog,
  LogOut,
  User,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/common/hooks/useAuth";

const navigationItems = [
  {
    group: "Management",
    items: [
      {
        icon: <LayoutDashboard className="h-4 w-4" />,
        title: "Dashboard",
        link: "dashboard",
        role: ["admin"],
      },
    ],
  },
  {
    group: "Garage Management",
    items: [
      {
        icon: <File className="h-4 w-4" />,
        title: "Register Garage",
        link: "viewRegisterGarage",
        role: ["admin"],
      },
      {
        icon: <Car className="h-4 w-4" />,
        title: "Exists Garage",
        link: "viewExitsGarage",
        role: ["admin"],
      },
    ],
  },
  {
    group: "System Management",
    items: [
      {
        icon: <ServerCog className="h-4 w-4" />,
        title: "Service System",
        link: "viewServiceSystem",
        role: ["admin"],
      },
      {
        icon: <CarFront className="h-4 w-4" />,
        title: "Car Brand",
        link: "brandList",
        role: ["admin"],
      },
      {
        icon: <User className="h-4 w-4" />,
        title: "User Management",
        link: "userManagement",
        role: ["admin"],
      },
    ],
  },
  {
    group: "Settings",
    items: [
      {
        icon: <Settings className="h-4 w-4" />,
        title: "System Settings",
        link: "settings",
        role: ["admin"],
      },
    ],
  },
];

export const SidebarLeft = () => {
  const { handleLogout } = useAuth();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="px-4 py-5 flex items-center">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-100">
            <ServerCog className="h-4 w-4 text-rose-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm leading-none">Drive On</span>
            <span className="text-xs text-muted-foreground leading-relaxed">
              Admin Dashboard
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="px-3 py-4">
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-gradient-to-r from-rose-50 to-rose-100 p-3">
            <AvatarUI
              name="Admin"
              image="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm">NgocTam</span>
              <span className="text-xs text-muted-foreground">
                Administrator
              </span>
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
