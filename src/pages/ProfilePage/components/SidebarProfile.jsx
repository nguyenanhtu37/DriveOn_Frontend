import { Car, Calendar, Settings, Home, Building, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useTabStore } from "@/app/stores/view/tab";
import { userLogout } from "@/app/stores/view/user";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { id: "vehicles", label: "Vehicles", icon: Car },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "register-garage", label: "Register Garage", icon: Building },
  { id: "myGarage", label: "My Garage", icon: Home },
];

export const SidebarProfile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };
  const { tab, setTab } = useTabStore();

  const isMobile = useIsMobile();
  if (!isMobile) return null;
  return (
    <Sidebar
      side="right"
      className="fixed top-0 right-0 z-50 w-[300px] h-full bg-white shadow-lg"
    >
      <SidebarHeader className="flex items-center justify-between px-2">
        <h2 className="text-lg font-semibold">DriveOn</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Profile Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={tab === item.id}
                    onClick={() => setTab(item.id)}
                    className="h-12 data-[active=true]:bg-red-500 data-[active=true]:text-white"
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="h-12 data-[active=true]:bg-red-500 data-[active=true]:text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
