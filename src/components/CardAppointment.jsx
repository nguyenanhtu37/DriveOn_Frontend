import {
  AlertCircle,
  Calendar,
  Car,
  Check,
  Clock,
  MoreHorizontal,
  Settings,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  useCompleteAppointment,
  useConfirmAppointment,
  useDenyAppointment,
} from "@/app/stores/entity/appointment";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const CardAppointment = ({
  id,
  clientName,
  clientImage,
  serviceName,
  start,
  end,
  duration,
  location,
  status,
  notes,
  vehicle,
}) => {
  const { garageId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const confirmAppointmentMutation = useConfirmAppointment();
  const denyAppointmentMutation = useDenyAppointment();
  const completeAppointmentMutation = useCompleteAppointment();
  const handleConfirm = () => {
    confirmAppointmentMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["appointment", "garage", garageId]);
        toast({
          title: "Success",
          description: "Appointment confirmed successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.response.data.error,
          variant: "destructive",
        });
      },
    });
  };
  const handleReject = () => {
    denyAppointmentMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["appointment", "garage", garageId]);
        toast({
          title: "Success",
          description: "Appointment rejected successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.response.data.error,
          variant: "destructive",
        });
      },
    });
  };

  const handleComplete = () => {
    completeAppointmentMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["appointment", "garage", garageId]);
        toast({
          title: "Success",
          description: "Appointment completed successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.response.data.error,
          variant: "destructive",
        });
      },
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <Check className="h-3.5 w-3.5" />;
      case "Cancelled":
        return <AlertCircle className="h-3.5 w-3.5" />;
      case "cancelled":
        return <X className="h-3.5 w-3.5" />;
      case "Completed":
        return <Check className="h-3.5 w-3.5" />;
    }
  };

  return (
    <Card className="w-full h-full max-w-xl overflow-hidden transition-all hover:shadow-md flex flex-col justify-between">
      <div className="flex flex-col w-full">
        <div className={cn("h-2", getStatusColor(status).split(" ")[0])} />
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              <AvatarFallback />
            </Avatar>
            <div>
              <h3 className="font-medium">{clientName}</h3>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn("px-3 py-1", getStatusColor(status))}
          >
            {getStatusIcon(status)}
            <span className="ml-1 capitalize">{status}</span>
          </Badge>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="grid gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span>🔥 {format(start, "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>✅ {format(end, "EEEE, MMMM d, yyyy")}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-semibold">
                {serviceName}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Car className="h-4 w-4 text-muted-foreground" />
              <span>{vehicle}</span>
            </div>
            {notes && (
              <div className="mt-2 rounded-md bg-muted p-3 text-sm">
                <p className="font-medium">Notes:</p>
                <p className="text-muted-foreground">{notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate(`/garageManagement/${garageId}/appointments/${id}`)
          }
        >
          View Details
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            {status !== "confirmed" && (
              <DropdownMenuItem onClick={() => handleConfirm()}>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Accepted</span>
              </DropdownMenuItem>
            )}
            {status !== "completed" && (
              <DropdownMenuItem onClick={() => handleComplete()}>
                <Check className="mr-2 h-4 w-4 text-blue-500" />
                <span>Mark Completed</span>
              </DropdownMenuItem>
            )}
            {status !== "cancelled" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleReject()}>
                  <X className="mr-2 h-4 w-4 text-red-500" />
                  <span>Reject</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default CardAppointment;
