import { useGetProvinces } from "@/app/stores/entity/location";
import { useSearchStore } from "@/app/stores/view/search";
import { getLocation } from "@/app/stores/view/user";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const SearchLocation = React.forwardRef(
  ({ isFocused, setSearchFocused }, ref) => {
    const response = useGetProvinces();

    const { setLocation, province, setProvince } = useSearchStore();

    const { setIsFetched } = useSearchStore();

    const location = getLocation();

    const [provinces, setProvinces] = useState([]);

    const handleChangeInput = (e) => {
      setProvince(e.target.value);
      if (e.target.value.length > 0) {
        setProvinces(
          response.data.data.filter((province) =>
            province.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      } else {
        setProvinces(response.data.data);
      }
    };

    const handleClickProvince = (province) => {
      setProvince(province.name);
      setSearchFocused("");
      setLocation("");
      setIsFetched(true);
    };

    const handleRemoveProvince = (e) => {
      e.stopPropagation();
      setProvince("");
      setLocation("");
      setSearchFocused("");
      setIsFetched(true);
      setProvinces(response.data.data);
    };

    useEffect(() => {
      if (response.isSuccess) {
        setProvinces(response.data.data);
      }
    }, [response.data, response.isSuccess]);
    return (
      <Popover open={isFocused}>
        <PopoverAnchor asChild>
          <div
            ref={ref}
            className={cn(
              "hidden flex-1 md:flex flex-col gap-y-px px-6 py-3  rounded-full bg-transparent hover:bg-box-hover transition-all duration-100 cursor-pointer z-10 ",
              isFocused && "hover:bg-transparent"
            )}
            onClick={() => setSearchFocused("location")}
          >
            <Label className="text-sm font-medium">Location</Label>
            <div className="flex justify-between gap-x-2 items-center">
              <Input
                type="text"
                placeholder="Choose location"
                className="border-none flex-1 p-0 h-auto text-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                value={province}
                onChange={handleChangeInput}
              />
              {province && (
                <X
                  size={16}
                  className="text-muted-foreground cursor-pointer"
                  onClick={handleRemoveProvince}
                />
              )}
            </div>
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="px-2 py-6 w-[350px] rounded-3xl bg-white border"
          sideOffset={10}
          align="start"
        >
          <ScrollArea
            className={cn("h-72 w-full", provinces.length > 0 ? "" : "h-22")}
          >
            <h4 className="mb-4 px-2 text-xs leading-none">
              List of locations
            </h4>
            <div className="grid gap-1">
              {provinces.length > 0 ? (
                <>
                  <div
                    className="flex items-center justify-start gap-x-2 px-2 py-4 rounded-md hover:bg-box-hover cursor-pointer"
                    onClick={() => {
                      setLocation(location);
                      setProvince("Near me");
                      setSearchFocused("");
                      setIsFetched(true);
                    }}
                  >
                    <div className="p-1 bg-blue-100 size-8 rounded-xl overflow-hidden">
                      <img
                        src="/public/direction.png"
                        className="size-full object-cover"
                      />
                    </div>
                    <span className="text-md font-medium">Near me</span>
                  </div>
                  {provinces.map((province) => (
                    <BlurFade key={province.name} delay={0.15} inView>
                      <div
                        key={province.id}
                        className="flex items-center justify-start gap-x-2 px-2 py-4 rounded-md hover:bg-box-hover cursor-pointer"
                        onClick={() => handleClickProvince(province)}
                      >
                        <div className="p-1 bg-green-100 size-8 rounded-xl overflow-hidden">
                          <img
                            src="/public/direction.png"
                            className="size-full object-cover"
                          />
                        </div>
                        <span className="text-md font-medium">
                          {province.name}
                        </span>
                      </div>
                    </BlurFade>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-md text-gray-500">No locations found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    );
  }
);
SearchLocation.displayName = "SearchLocation";
export default SearchLocation;
