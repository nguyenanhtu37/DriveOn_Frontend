import { useGetService } from "@/app/stores/entity/service";
import { useSearchStore } from "@/app/stores/view/search";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ServiceItem } from "@/pages/HomePage/components/ServiceItem";
import { X, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const MobileSearchService = React.forwardRef(({ onClose }, ref) => {
  const response = useGetService();
  const [services, setServices] = useState([]);
  const { service: selected, setService: setSelected } = useSearchStore();
  const { setIsFetched } = useSearchStore();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (response.isSuccess) {
      const sorted = [...response.data].sort((a, b) => {
        const aSelected = selected.includes(a._id) ? 1 : 0;
        const bSelected = selected.includes(b._id) ? 1 : 0;
        return bSelected - aSelected;
      });
      setServices(sorted);
    }
  }, [response.data, response.isSuccess, selected]);

  const handleClickService = (service) => {
    if (selected.includes(service._id)) {
      setSelected(selected.filter((item) => item !== service._id));
    } else {
      setSelected([...selected, service._id]);
    }
    setIsFetched(true);
  };

  const handleRemoveService = (e) => {
    e.stopPropagation();
    setSelected([]);
    setIsFetched(true);
  };

  const handleChangeInput = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length > 0) {
      setServices(
        response.data.filter((service) =>
          service.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setServices(response.data);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    setServices(response.data);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-lg font-semibold">Choose Services</Label>
          {selected.length > 0 && (
            <Badge variant="secondary" className="text-sm">
              {selected.length} selected
            </Badge>
          )}
        </div>

        <div className="relative mb-3">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Input
            ref={ref}
            type="text"
            placeholder="Search services..."
            className="pl-10 pr-8 h-12 text-base"
            value={searchValue}
            onChange={handleChangeInput}
          />
          {searchValue && (
            <X
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer"
              onClick={clearSearch}
            />
          )}
        </div>

        {selected.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-blue-700">
              {selected.length} service{selected.length > 1 ? "s" : ""} selected
            </span>
            <button
              onClick={handleRemoveService}
              className="text-blue-600 text-sm font-medium hover:text-blue-800"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="py-4 space-y-2">
          {services.length > 0 ? (
            services.map((service, idx) => (
              <BlurFade key={service._id} delay={0.05 + idx * 0.02} inView>
                <ServiceItem
                  service={service}
                  isActive={selected?.includes(service._id)}
                  onClick={() => handleClickService(service)}
                />
              </BlurFade>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Search size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">No services found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
});

MobileSearchService.displayName = "MobileSearchService";
export { MobileSearchService };
