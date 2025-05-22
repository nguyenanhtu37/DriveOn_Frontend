import { useGetService } from "@/app/stores/entity/service";
import { useSearchStore } from "@/app/stores/view/search";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ServiceItem } from "@/pages/HomePage/components/ServiceItem";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const SearchService = React.forwardRef(
  ({ isFocused, setSearchFocused, boxWidth }, ref) => {
    const response = useGetService();
    const [services, setServices] = useState([]);
    const { service: selected, setService: setSelected } = useSearchStore();
    const { setIsFetched } = useSearchStore();

    useEffect(() => {
      if (response.isSuccess && !isFocused) {
        const sorted = [...response.data].sort((a, b) => {
          const aSelected = selected.includes(a._id) ? 1 : 0;
          const bSelected = selected.includes(b._id) ? 1 : 0;
          return bSelected - aSelected;
        });
        setServices(sorted);
      }
    }, [isFocused, response.data, response.isSuccess, selected]);

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
      setSearchFocused("");
      setIsFetched(true);
    };

    const [searchValue, setSearchValue] = useState("");

    const handleChangeInput = (e) => {
      setSearchValue(e.target.value);
      if (e.target.value.length > 0) {
        setServices(
          response.data.filter((province) =>
            province.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      } else {
        setServices(response.data);
      }
    };

    useEffect(() => {
      if (response.isSuccess) {
        setServices(response.data);
      }
    }, [response.data, response.isSuccess]);
    return (
      <Popover open={isFocused}>
        <PopoverAnchor asChild>
          <div
            ref={ref}
            className={cn(
              "hidden flex-1 md:flex flex-col gap-y-px px-6 py-3  rounded-full bg-transparent hover:bg-box-hover transition-all duration-100 cursor-pointer z-10",
              isFocused && "hover:bg-transparent"
            )}
            onClick={() => setSearchFocused("service")}
          >
            <div className="flex justify-start gap-x-3 items-center">
              <Label className="text-sm font-medium">Service</Label>
              <div className=" text-muted-foreground text-xs text-center flex items-center">
                {selected.length} selected
              </div>
            </div>
            <div className="flex justify-between gap-x-2 items-center">
              <Input
                type="text"
                placeholder="Choose services"
                className="border-none p-0 h-auto text-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                value={searchValue}
                onChange={handleChangeInput}
              />
              {selected.length > 0 && (
                <X
                  size={16}
                  className="text-muted-foreground cursor-pointer"
                  onClick={handleRemoveService}
                />
              )}
            </div>
          </div>
        </PopoverAnchor>
        <PopoverContent
          className={cn("px-3 py-6 w-full rounded-3xl bg-white border")}
          sideOffset={10}
          align="center"
        >
          <div style={{ width: (boxWidth / 100) * 95 }}>
            <div className={cn("max-h-80 overflow-auto w-full min-h-22 ")}>
              <h4 className="mb-4 px-2 text-xs leading-none">
                List of Services
              </h4>
              <div className="grid gap-2">
                {services.length > 0 ? (
                  services.map((service, idx) => (
                    <BlurFade
                      key={service._id}
                      delay={0.1 + idx * 0.025}
                      inView
                    >
                      <ServiceItem
                        service={service}
                        key={service._id}
                        isActive={selected?.includes(service._id)}
                        onClick={() => handleClickService(service)}
                      />
                    </BlurFade>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-md text-gray-500">No Service found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
SearchService.displayName = "SearchService";

export { SearchService };
