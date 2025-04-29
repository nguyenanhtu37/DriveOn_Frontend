import ServiceItem from "./ServiceItem";
import { useNavigate, useParams } from "react-router-dom";
import { useGetService } from "@/app/stores/entity/service-detail";
import { Wrench, Search, Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const ServiceList = () => {
  const navigate = useNavigate();
  const { garageId } = useParams();
  const { data: services, isLoading } = useGetService(garageId);
  const [searchTerm, setSearchTerm] = useState("");
  const handleClick = () => {
    navigate(`createService`);
  };
  const filteredServices = services?.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative h-full w-[280px] shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <Wrench className="h-4 w-4 text-red-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800">Services</h4>
          </div>
          <Badge
            variant="outline"
            className="bg-red-50 text-red-600 border-red-200"
          >
            {services?.length || 0}
          </Badge>
        </div>

        {/* Search */}
        <div className="border-b p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for services..."
              className="pl-9 border-gray-200 focus:border-red-300 focus:ring-red-300 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Service List */}
      {isLoading ? (
        <div className="flex h-[300px] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-red-500" />
        </div>
      ) : filteredServices?.length === 0 ? (
        <div className="flex h-[300px] flex-col items-center justify-center p-4 text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Wrench className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">No services found</p>
          {searchTerm && (
            <Button
              variant="link"
              className="mt-1 text-red-600"
              onClick={() => setSearchTerm("")}
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="p-3">
            <div className="flex flex-col gap-2">
              {filteredServices?.map((service) => (
                <ServiceItem
                  key={service._id}
                  service={service}
                  garageId={garageId}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      )}

      {/* Add Service Button */}
      <div className="sticky bottom-0 border-t bg-white p-3">
        <Button
          className="w-full bg-red-400 hover:bg-red-500"
          onClick={handleClick}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Service
        </Button>
      </div>
    </div>
  );
};

export default ServiceList;
