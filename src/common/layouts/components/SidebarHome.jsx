import { SearchServicesByKeyword } from "@/components/SearchServicesByKeyword/SearchServicesByKeyword";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useState, useCallback, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetService } from "@/app/stores/entity/service";
import { useFilterStore } from "@/app/stores/view/filter";

const days = [
  { value: "Sunday", label: "☀️ Sunday" },
  { value: "Monday", label: "🌙 Monday" },
  { value: "Tuesday", label: "☁️ Tuesday" },
  { value: "Wednesday", label: "🌧️ Wednesday" },
  { value: "Thursday", label: "⚡ Thursday" },
  { value: "Friday", label: "❄️ Friday" },
  { value: "Saturday", label: "💨 Saturday" },
];

export const SidebarHome = () => {
  const service = useGetService();
  const {
    serviceSystem,
    setServiceSystem,
    location,
    setLocation,
    clearFilter,
    distance,
    setDistance,
    openTime,
    closeTime,
    setOpenTime,
    setCloseTime,
    operating_days,
    tagPro,
    rating,
    setTagPro,
    setRating,
    setOperatingDays,
  } = useFilterStore();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const handleChooseProvince = useCallback(
    (value) => {
      const selectedProvince = provinces.find((item) => item.id === value);
      if (selectedProvince) {
        setLocation({ province: selectedProvince });
      }
    },
    [provinces, setLocation]
  );

  const handleChooseDistrict = useCallback(
    (value) => {
      const selectedDistrict = districts.find((item) => item.id === value);
      if (selectedDistrict) {
        setLocation({ district: selectedDistrict });
      }
    },
    [districts, setLocation]
  );

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await fetch(
          "https://open.oapi.vn/location/provinces?size=63"
        );
        const data = await res.json();
        const sortedProvinces = data.data.sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        );
        setProvinces(sortedProvinces || []);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!location.province?.id) return;

    const fetchDistricts = async () => {
      try {
        const res = await fetch(
          `https://open.oapi.vn/location/districts/${location.province.id}`
        );
        const data = await res.json();
        setDistricts(data.data || []);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [location.province?.id]);

  return (
    <Sidebar>
      <SidebarHeader className="mb-4">
        <h2 className="text-xl font-bold">What are you looking for?</h2>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2">
        <SidebarGroup>
          <h3 className="px-2 text-lg font-semibold">Search</h3>
          <SearchServicesByKeyword />
        </SidebarGroup>

        <SidebarGroup>
          <h3 className="p-2 mb-4 border-b shadow-b-md text-lg font-semibold">
            Filter Services
          </h3>
          <div className=" px-2">
            <div className="flex flex-col gap-6">
              {/* Services */}
              <div className="border-b pb-4">
                <Label className="text-md font-semibold mb-2 block">
                  Services
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {service.data.map((service) => (
                    <div key={service._id} className="flex items-center gap-2">
                      <Checkbox
                        id={`sidebar-${service._id}`}
                        checked={serviceSystem.includes(service._id)}
                        onClick={() => setServiceSystem(service._id)}
                      />
                      <label
                        htmlFor={`sidebar-${service._id}`}
                        className="text-sm"
                      >
                        {service.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Garage Pro */}
              <div className="border-b pb-4">
                <Label className="text-md font-semibold mb-2 block">
                  Garage Pro
                </Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="sidebar-tagPro"
                    checked={tagPro}
                    onClick={() => setTagPro(!tagPro)}
                  />
                  <label htmlFor="sidebar-tagPro" className="text-sm">
                    Garage Pro
                  </label>
                </div>
              </div>

              {/* Rating */}
              <div className="border-b pb-4">
                <Label className="text-md font-semibold mb-2 block">
                  Rating
                </Label>
                <Select
                  value={rating}
                  onValueChange={(value) => setRating(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Star</SelectLabel>
                      {Array.from({ length: 5 }, (_, index) => (
                        <SelectItem key={index} value={index + 1}>
                          {index + 1}⭐
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Operating Days */}
              <div className="border-b pb-4">
                <Label className="text-md font-semibold mb-2 block">
                  Operating Days
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {days.map((day) => (
                    <div key={day.value} className="flex items-center gap-2">
                      <Checkbox
                        id={`sidebar-${day.value}`}
                        checked={operating_days.includes(day.value)}
                        onClick={() => setOperatingDays(day.value)}
                      />
                      <label
                        htmlFor={`sidebar-${day.value}`}
                        className="text-sm"
                      >
                        {day.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="border-b pb-4">
                <Label className="text-md font-semibold mb-2 block">
                  Operating Hours
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">From</Label>
                    <Input
                      type="time"
                      value={openTime}
                      onChange={(e) => setOpenTime(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">To</Label>
                    <Input
                      type="time"
                      value={closeTime}
                      onChange={(e) => setCloseTime(e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="border-b pb-4">
                <Label className="text-md font-semibold mb-2 block">
                  Location
                </Label>
                <Tabs defaultValue="address" className="w-full">
                  <TabsList className="mb-2 w-full">
                    <TabsTrigger value="address" className="flex-1 text-xs">
                      By Area
                    </TabsTrigger>
                    <TabsTrigger
                      value="currentLocation"
                      className="flex-1 text-xs"
                    >
                      Current Location
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="address">
                    <div className="flex flex-col gap-2">
                      <Select
                        value={location.province?.id}
                        onValueChange={handleChooseProvince}
                      >
                        <SelectTrigger className="w-full h-8">
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Province</SelectLabel>
                            {provinces.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <Select
                        value={location.district?.id}
                        onValueChange={handleChooseDistrict}
                        disabled={!location.province?.id}
                      >
                        <SelectTrigger className="w-full h-8">
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>District</SelectLabel>
                            {districts.map((item) => (
                              <SelectItem key={item.code} value={item.id}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  <TabsContent value="currentLocation">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm">Distance: {distance} km</span>
                      <Slider
                        defaultValue={[distance]}
                        max={20}
                        step={1}
                        onValueChange={(value) => setDistance(value[0])}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Actions */}
              <div className=" sticky bottom-0 border-t  bg-white py-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => clearFilter()}
                  className="text-red-500 hover:text-red-700"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
