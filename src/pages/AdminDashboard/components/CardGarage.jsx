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

export const CardGarage = ({ garage }) => {
  const isEnabled = garage.status === "approved";
  return (
    <Card className=" lg:max-w-[350px] w-full min-h-[150px] h-full hover:shadow-sm transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <CardHeader className="p-4 flex items-center justify-between">
        <div className=" w-full flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">{garage.name}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="primary"
                  className={isEnabled ? "bg-green-500" : ""}
                >
                  {isEnabled ? "Đang mở cửa" : "Đóng cửa"}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {isEnabled ? "Garage đang mở cửa" : "Garage đang đóng cửa"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className=" gap-y-2">
        <div className=" w-full h-8 gap-2 flex justify-start items-center mb-1">
          <img
            src={"/"}
            alt=""
            className=" w-6 h-6 object-cover rounded-full ring-1 ring-white"
          />
          <span className=" text-sm text-start text-black">
            {garage.user.name}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Phone: {garage.phone}
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          Address: {garage.address}
        </p>
      </CardContent>
      <CardFooter>
        <Switch checked={isEnabled} />
      </CardFooter>
    </Card>
  );
};
