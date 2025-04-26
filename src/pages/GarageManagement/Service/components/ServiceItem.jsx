import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronRight, Clock, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const ServiceItem = ({ service, garageId }) => {
  const link = `/garageManagement/${garageId}/services/${service._id}`;
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        cn(
          "py-2 px-3 w-full flex items-center justify-between  rounded-md  hover:shadow-sm cursor-pointer transition-colors ease-in-out duration-100 group",
          isActive &&
            "bg-[#1C1C1C] bg-opacity-5 shadow-sm hover:bg-[#1C1C1C] hover:bg-opacity-5"
        )
      }
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 group-hover:bg-red-200">
          <Settings className="h-5 w-5" />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-medium text-gray-800 line-clamp-1 group-hover:text-red-700">
            {service.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {service.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-gray-50 text-gray-700 border-gray-200 px-2 py-0.5 text-xs"
            >
              <Clock className="h-3 w-3" />
              {service.duration} phút
            </Badge>
            <span className="ml-auto text-red-500 opacity-0 transition-opacity group-hover:opacity-100">
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ServiceItem;
