import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useParams } from "react-router-dom";
import { SidebarGarage } from "./components/SidebarGarage";
import { Header } from "../LayoutAdmin/components/Header";
import { NotificationEmergency } from "./components/notificationEmergency";
import { useUserStore } from "@/app/stores/view/user";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Archive, X } from "lucide-react";
import { useAcceptedRescueRequest } from "@/app/stores/entity/emergency";
import { toast } from "@/hooks/use-toast";

export const GarageManagement = () => {
  const { socket } = useUserStore();

  const { garageId } = useParams();

  const mutation = useAcceptedRescueRequest();

  const [notification, setNotification] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNotification = () => {
    setIsOpen(false);
  };
  const handleOpenNotification = () => {
    setIsOpen(true);
  };

  const handleClose = (item) => {
    setNotification((prev) => prev.filter((i) => i._id !== item._id));
  };
  const handleRemoveAll = () => {
    setNotification([]);
  };

  const handleAccepted = (item) => {
    mutation.mutate(
      {
        emergencyId: item._id,
        garageId: garageId,
      },
      {
        onSuccess: () => {
          setNotification((prev) => prev.filter((i) => i._id !== item._id));
          toast({
            title: "Rescue request accepted",
            description: "You have successfully accepted the rescue request.",
            variant: "success",
          });
        },
      }
    );
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("newEmergency", (data) => {
      setNotification((prev) => [...prev, data]);
      setIsOpen(true);
    });

    socket.on("cancelRescue", (data) => {
      setNotification((prev) => prev.filter((item) => item._id !== data._id));
    });
    socket.on("acceptedRescue", (data) => {
      setNotification((prev) => prev.filter((item) => item._id !== data._id));
    });
    return () => {
      socket.off("newEmergency");
      socket.off("cancelRescue");
      socket.off("acceptedRescue");
    };
  }, [socket]);

  return (
    <SidebarProvider>
      <div className=" min-w-[378px] w-full h-full  m-auto  flex items-start shadow-md bg-[#ffffff] border border-black/60  overflow-hidden">
        <SidebarGarage />

        <div className=" relative flex-1 flex-col ">
          <Header
            notification={notification}
            handleOpenNotification={handleOpenNotification}
          />
          <div className=" h-full bg-[#ffffff]">
            <Outlet />
          </div>
        </div>
        {isOpen && (
          <div className="fixed top-0 right-6 z-50 max-w-xs flex flex-col gap-y-4 overflow-y-auto bg-white">
            <div className="sticky top-0 z-50">
              <div className="p-6 border-b border-red-300 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      {notification.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                          {notification.length}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">
                      Rescue Notice
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCloseNotification}
                    className="hover:bg-red-400 transition-colors rounded-full"
                  >
                    <X className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-3 border-b bg-gradient-to-b from-zinc-100 to-zinc-200 shadow-sm">
                {notification.length > 0 ? (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {notification.length}{" "}
                      {notification.length === 1 ? "request" : "requests"}{" "}
                      pending
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveAll}
                      className="hover:bg-red-100 hover:text-red-600 transition-colors text-gray-700 rounded-lg"
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Clear all
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-1">
                    <span className="text-sm text-gray-500 font-medium">
                      No pending rescue requests
                    </span>
                  </div>
                )}
              </div>
            </div>

            {notification.map((item, index) => (
              <NotificationEmergency
                key={index}
                data={item}
                onClose={() => handleClose(item)}
                onAccepted={() => handleAccepted(item)}
              />
            ))}
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};
