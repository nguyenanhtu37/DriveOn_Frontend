import React from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  Ellipsis,
  Settings,
  User,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

const CardAppointment = ({
  date,
  time,
  doctorName,
  doctorSpecialty,
  appointmentType,
  status,
  hiddenButton = false,
}) => {
  const statusColors = {
    upcoming: "bg-blue-500",
    completed: "bg-green-500",
    canceled: "bg-red-500",
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("1");
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Appointment Details</span>
          <div className=" flex items-center justify-center gap-2">
            <span
              className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusColors[status]}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>

            <Popover>
              <PopoverTrigger>
                <Ellipsis className="w-5 h-5 text-gray-500 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className=" p-1 w-24 flex flex-col gap-2"
              >
                <Button variant="secondary" className="w-full bg-slate-400">
                  Accept
                </Button>
                <Button className="w-full">Cancel</Button>
              </PopoverContent>
            </Popover>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 pb-2">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-gray-500" />
          <div>
            <p className="font-semibold">{doctorName}</p>
            <p className="text-sm text-gray-500">{doctorSpecialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Video className="w-5 h-5 text-gray-500" />
          <span>{appointmentType}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!hiddenButton && (
          <Button
            variant="outline"
            className="w-full hover:shadow-md transition-all ease-in-out"
            onClick={handleClick}
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardAppointment;
