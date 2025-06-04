import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Archive, AlertTriangle } from "lucide-react";
import { useAcceptedRescueRequest } from "@/app/stores/entity/emergency";
import { toast } from "@/hooks/use-toast";
import { useNotificationStore } from "@/app/stores/view/notification";
import { useParams } from "react-router-dom";
import { EmptyNotificationState } from "./EmptyNotificationState";
import { EmergencyRequestCard } from "./EmergencyRequestCard";

export function NotificationPanel() {
  const { garageId } = useParams();
  const mutation = useAcceptedRescueRequest();
  const { notifications, removeNotification, clearNotifications } =
    useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (item) => {
    removeNotification(item._id);
  };

  const handleRemoveAll = () => {
    clearNotifications([]);
  };

  const handleAccepted = (item) => {
    mutation.mutate(
      {
        emergencyId: item._id,
        garageId: garageId,
      },
      {
        onSuccess: () => {
          removeNotification(item._id);
          toast({
            title: "Rescue request accepted",
            description: "You have successfully accepted the rescue request.",
            variant: "default",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description:
              "Failed to accept the rescue request. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {notifications.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px] p-0">
        <NotificationHeader />
        <NotificationStats
          notifications={notifications}
          onClearAll={handleRemoveAll}
        />
        <NotificationList
          notifications={notifications}
          onClose={handleClose}
          onAccepted={handleAccepted}
          isLoading={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
}

function NotificationHeader() {
  return (
    <SheetHeader className="p-6 pb-4 bg-gradient-to-r from-red-50 to-orange-50 border-b">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-full">
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>
        <div className="flex-1">
          <SheetTitle className="text-xl font-bold text-gray-900">
            Emergency Rescue Requests
          </SheetTitle>
          <p className="text-sm text-gray-600 mt-1">
            Manage incoming rescue requests from customers
          </p>
        </div>
      </div>
    </SheetHeader>
  );
}

function NotificationStats({ notifications, onClearAll }) {
  return (
    <div className="p-4 border-b bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-medium">
            {notifications.length}{" "}
            {notifications.length === 1 ? "Request" : "Requests"}
          </Badge>
          {notifications.length > 0 && (
            <span className="text-sm text-gray-600">pending response</span>
          )}
        </div>

        {notifications.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-gray-600 hover:text-red-600 hover:bg-red-50"
          >
            <Archive className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
}

function NotificationList({ notifications, onClose, onAccepted, isLoading }) {
  return (
    <ScrollArea className="flex-1 h-[calc(100vh-200px)]">
      <div className="p-4 space-y-4">
        {notifications.length === 0 ? (
          <EmptyNotificationState />
        ) : (
          notifications.map((item, index) => (
            <EmergencyRequestCard
              key={item._id || index}
              data={item}
              onAccept={() => onAccepted(item)}
              onDismiss={() => onClose(item)}
              isLoading={isLoading}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
}
