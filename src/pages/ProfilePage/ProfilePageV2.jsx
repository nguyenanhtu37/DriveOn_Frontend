import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Car, EllipsisVertical, Settings, User } from "lucide-react";
import { Vehicle } from "./Tab/Vehicle/Vehicle";
import { Setting } from "./Tab/Setting/Setting";
import { useGetProfile, useUpdateProfile } from "@/app/stores/entity/user";
import { formatDate } from "@/lib/formatDate";
import { Loading } from "@/components/Loading";
import useUpload from "@/app/services/Cloudinary/upload";
import { toast } from "@/hooks/use-toast";
import { UserAppointment } from "./Tab/UserAppointment/UserAppointment";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useTabStore } from "@/app/stores/view/tab";
import { userLogout } from "@/app/stores/view/user";
import { useNavigate } from "react-router-dom";
import { RegisterGarage } from "./Tab/RegisterGarage/RegisterGarage";
import { MyGarage } from "./Tab/MyGarage/MyGarage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarProfile } from "./components/SidebarProfile";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const ProfilePageV2 = () => {
  const profile = useGetProfile();
  const { files, handleFileChange, handleUpload } = useUpload();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();

  const { tab, setTab } = useTabStore();

  const updateProfile = useUpdateProfile();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  const handleSave = async () => {
    if (files.length !== 0) {
      const url = await handleUpload(files);
      const data = {
        avatar: url[0],
        name: profile.data.name,
      };
      updateProfile.mutate(data, {
        onSuccess: () => {
          profile.refetch();
          toast({
            title: "Profile updated successfully",
            description: "Your profile has been updated.",
            duration: 2000,
          });
        },
        onError: () => {
          toast({
            title: "Error updating profile",
            description: "Please try again later.",
            variant: "destructive",
          });
        },
      });
    }
  };

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  if (profile.isLoading) return <Loading />;
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className=" bg-white w-full">
        <div className="mx-auto py-8 pt-4 px-4">
          <Button
            variant="outline"
            className="rounded-full p-2 size-9 mb-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </Button>
          <div className="flex flex-col gap-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center border-b border-gray-100 pb-6">
              <div className="flex w-full flex-row items-start justify-between gap-x-4">
                <div className="flex items-start gap-x-2 ">
                  <Avatar className="w-20 h-20 border-2 border-red-500 relative">
                    <AvatarImage
                      src={
                        files[0]
                          ? URL.createObjectURL(files[0])
                          : profile.data?.avatar
                      }
                      alt="User profile"
                    />
                    <AvatarFallback className="bg-red-500 text-white">
                      {profile.data?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </Avatar>
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {profile.data.name}
                    </h1>
                    <Badge>{profile.data.status}</Badge>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>
                          Member since {formatDate(profile.data.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Car className="h-4 w-4" />
                        <span>{profile.data.vehicles.length} Vehicles</span>
                      </div>
                    </div>
                  </div>
                </div>
                <SidebarTrigger className="md:hidden" />
              </div>
              <div className="flex flex-1 justify-end items-center gap-2">
                <Button
                  className="ml-auto bg-red-500 hover:bg-red-600"
                  size="sm"
                  onClick={handleSave}
                  disabled={updateProfile.isPending || files.length === 0}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-white hidden md:flex hover:bg-gray-100 border border-gray-300 w-fit  items-center justify-center min-w-0"
                    >
                      <EllipsisVertical color="black" className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="w-20 flex justify-end p-1"
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-sm"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Tabs value={tab} className="w-full" onValueChange={setTab}>
              <TabsList className="hidden md:grid grid-cols-5 w-fit ">
                <TabsTrigger
                  value="vehicles"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Vehicles
                </TabsTrigger>
                <TabsTrigger
                  value="appointments"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Appointments
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Settings
                </TabsTrigger>
                <TabsTrigger
                  value="register-garage"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Register Garage
                </TabsTrigger>
                <TabsTrigger
                  value="myGarage"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  My Garage
                </TabsTrigger>
              </TabsList>

              {/* Vehicles Tab */}
              <Vehicle />

              {/* Appointments Tab */}
              <UserAppointment />

              {/* Settings Tab */}
              <Setting />

              {/* Register Garage Tab */}
              <RegisterGarage />

              {/* My Garage Tab */}
              <MyGarage />
            </Tabs>
          </div>
        </div>
      </div>
      <SidebarProfile />
    </SidebarProvider>
  );
};
