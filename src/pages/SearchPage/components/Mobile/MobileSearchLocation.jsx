import { useGetProvinces } from "@/app/stores/entity/location";
import { useSearchStore } from "@/app/stores/view/search";
import { getLocation } from "@/app/stores/view/user";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";

const MobileSearchLocation = React.forwardRef(({ onClose }, ref) => {
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
    setLocation("");
    setIsFetched(true);
    onClose?.();
  };

  const handleRemoveProvince = (e) => {
    e.stopPropagation();
    setProvince("");
    setLocation("");
    setIsFetched(true);
    setProvinces(response.data.data);
  };

  useEffect(() => {
    if (response.isSuccess) {
      setProvinces(response.data.data);
    }
  }, [response.data, response.isSuccess]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <Label className="text-lg font-semibold mb-3 block">
          Choose Location
        </Label>
        <div className="relative">
          <Input
            ref={ref}
            type="text"
            placeholder="Search for a location..."
            className="pr-8 h-12 text-base"
            value={province}
            onChange={handleChangeInput}
          />
          {province && (
            <X
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer"
              onClick={handleRemoveProvince}
            />
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="py-4 space-y-2">
          {provinces.length > 0 ? (
            <>
              <div
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  setLocation(location);
                  setProvince("Near me");
                  setIsFetched(true);
                  onClose?.();
                }}
              >
                <div className="p-2 bg-blue-100 rounded-full">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <div>
                  <span className="text-base font-medium">Near me</span>
                  <p className="text-sm text-gray-500">Use current location</p>
                </div>
              </div>

              {provinces.map((province, index) => (
                <BlurFade
                  key={province.name}
                  delay={0.05 + index * 0.02}
                  inView
                >
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleClickProvince(province)}
                  >
                    <div className="p-2 bg-green-100 rounded-full">
                      <MapPin size={20} className="text-green-600" />
                    </div>
                    <span className="text-base font-medium">
                      {province.name}
                    </span>
                  </div>
                </BlurFade>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <MapPin size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">No locations found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
});

MobileSearchLocation.displayName = "MobileSearchLocation";
export default MobileSearchLocation;
