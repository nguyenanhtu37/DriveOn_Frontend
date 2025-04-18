import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import {
  MapPin,
  Phone,
  Calendar,
  Clock,
  Shield,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDisableGarage, useEnableGarage } from "@/app/stores/entity/garage";

export const CardGarage = ({ garage }) => {
  const isEnabled = garage.status.includes("enabled");
  const enabled = useEnableGarage();
  const disabled = useDisableGarage();
  const toggleEnabled = () => {
    if (isEnabled) {
      disabled.mutate(garage._id);
    } else {
      enabled.mutate(garage._id);
    }
  };

  return (
    <Card className="w-full overflow-hidden hover:shadow-md transition-all duration-300  border-y-1 border-r-1 flex flex-col justify-between">
      <div className=" w-full flex flex-col">
        <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
          <div className="flex gap-3">
            <div className="h-12 w-12 rounded-md overflow-hidden border bg-primary/5 flex items-center justify-center shadow-sm">
              <img
                src={garage.interiorImages[0] || "/placeholder.svg"}
                alt={garage.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-primary line-clamp-1">
                  {garage.name}
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant="outline"
                        className={cn(
                          "h-5 text-xs",
                          isEnabled
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        )}
                      >
                        {isEnabled ? "Active" : "Inactive"}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isEnabled
                        ? "Garage is currently active"
                        : "Garage is currently inactive"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {/* <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  ID: {garage.id}
                </span>
                {getVerificationBadge()}
              </div> */}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Garage</DropdownMenuItem>
              <DropdownMenuItem>View Documents</DropdownMenuItem>
              <DropdownMenuItem>Contact Owner</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Suspend Garage
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="p-4 pt-2 space-y-3">
          {/* <div className="grid grid-cols-2 gap-2 border-b pb-3">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Owner</p>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full overflow-hidden border flex-shrink-0">
                  <img
                    src={garage.user.avatar || "/placeholder.svg"}
                    alt={garage.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium line-clamp-1">
                  {garage.user.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {garage.user.email}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Registration
              </p>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm">{garage.registrationDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Last updated: {garage.lastUpdated}
                </span>
              </div>
            </div>
          </div> */}

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm line-clamp-1">{garage.phone}</p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm line-clamp-2">{garage.address}</p>
            </div>
          </div>

          {/* <div className="flex justify-between items-center pt-1">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{garage.documentCount} Documents</span>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              Review
            </Button>
          </div> */}
        </CardContent>
      </div>

      <CardFooter className="p-4 pt-2 flex justify-between items-center border-t mt-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            onCheckedChange={() => toggleEnabled()}
            checked={isEnabled}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </CardFooter>
    </Card>
  );
};
