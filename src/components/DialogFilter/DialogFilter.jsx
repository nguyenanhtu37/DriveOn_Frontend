import { SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

import { useGetService } from "@/app/stores/entity/service";
import { Checkbox } from "../ui/checkbox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFilterStore } from "@/app/stores/view/filter";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Slider } from "../ui/slider";

const days = [
  { value: "Sunday", label: "☀️ Sunday" },
  { value: "Monday", label: "🌙 Monday" },
  { value: "Tuesday", label: "☁️ Tuesday" },
  { value: "Wednesday", label: "🌧️ Wednesday" },
  { value: "Thursday", label: "⚡ Thursday" },
  { value: "Friday", label: "❄️ Friday" },
  { value: "Saturday", label: "💨 Saturday" },
];

const DialogFilter = () => {
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
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 px-5 py-3 rounded-md border border-[#dddddd] bg-white hover:bg-[#1c1c1c]/10 hover:border-[#1c1c1c] transition-colors ease-in-out cursor-pointer duration-150  group">
          <SlidersHorizontal
            size={18}
            className="text-gray-800 group-hover:text-black transition-all"
          />
          <span className="text-sm font-medium text-gray-800 group-hover:text-black">
            Filter
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[590px] h-[818px] max-w-none flex p-2 pt-0 pb-4 flex-col items-center gap-y-0 overflow-y-auto scrollbar-hide">
        <DialogTitle className="text-center text-xl sticky top-0 py-2 bg-white border-y-px border-[#1c1c1c]/50 w-full items-center justify-center shadow-sm z-30">
          Filter
        </DialogTitle>
        <div className="w-full h-[818px] pb-4  overflow-y-auto scrollbar-hide relative flex flex-col justify-between ">
          <div className="">
            <div className="px-6 py-7 w-full flex-col gap-y-6 border-b border-[#1c1c1c]/50">
              <div className=" flex justify-between items-center mb-4">
                <div className=" flex flex-col items-start gap-y-2">
                  <Label className="text-lg">Service</Label>
                  <DialogDescription className=" flex items-center gap-x-2">
                    <span className="text-md font-semibold">
                      Choose the service you want
                    </span>
                  </DialogDescription>
                </div>
              </div>
              <div className=" grid grid-cols-2 gap-2">
                {service.data.map((service) => (
                  <div
                    key={service._id}
                    className=" flex gap-x-4 items-center mb-3"
                  >
                    <Checkbox
                      id={service._id}
                      color="red"
                      checked={serviceSystem.includes(service._id)}
                      onClick={() => setServiceSystem(service._id)}
                    />
                    <div className="grid gap-1.5 leading-none ">
                      <label
                        htmlFor={service._id}
                        className="text-sm font-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {service.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-7 w-full flex-col gap-y-6 border-b border-[#1c1c1c]/50">
              <div className=" flex justify-between items-center mb-4">
                <div className=" flex flex-col items-start gap-y-2">
                  <Label className="text-lg">Garage Pro</Label>
                  <DialogDescription className=" flex items-center gap-x-2">
                    <span className="text-md font-semibold"></span>
                  </DialogDescription>
                </div>
              </div>
              <div className=" flex gap-x-4 items-center mb-3">
                <Checkbox
                  id={"tagPro"}
                  color="red"
                  checked={tagPro}
                  onClick={() => setTagPro(!tagPro)}
                />
                <div className="grid gap-1.5 leading-none ">
                  <label
                    htmlFor={"tagPro"}
                    className="text-sm font-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Garage Pro (looking for Pro garages to enhance your
                    experience)
                  </label>
                </div>
              </div>
            </div>

            <div className="px-6 py-7 w-full flex-col gap-y-6 border-b border-[#1c1c1c]/50">
              <div className=" flex justify-between items-center mb-4">
                <div className=" flex flex-col items-start gap-y-2">
                  <Label className="text-lg">Rating</Label>
                  <DialogDescription className=" flex items-center gap-x-2">
                    <span className="text-md font-semibold"></span>
                  </DialogDescription>
                </div>
              </div>
              <div className=" flex gap-x-4 items-center mb-3">
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
            </div>

            <div className="px-6 py-7 w-full flex-col gap-y-6 border-b border-[#1c1c1c]/50">
              <div className=" flex justify-between items-center mb-4">
                <div className=" flex flex-col items-start gap-y-2">
                  <Label className="text-lg">
                    Select the day of the week you want to schedule
                  </Label>
                  <DialogDescription className=" flex items-center gap-x-2">
                    <span className="text-md font-semibold"></span>
                  </DialogDescription>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 ">
                {days.map((day) => (
                  <div
                    key={day.value}
                    className=" flex gap-x-4 items-center mb-3"
                  >
                    <Checkbox
                      id={day.value}
                      color="red"
                      checked={operating_days.includes(day.value)}
                      onClick={() => setOperatingDays(day.value)}
                    />
                    <div className="grid gap-1.5 leading-none ">
                      <label
                        htmlFor={day.value}
                        className="text-sm font-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {day.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-7 w-full flex-col gap-y-6 border-b border-[#1c1c1c]/50">
              <div className=" flex justify-between items-center mb-4">
                <div className=" flex flex-col items-start gap-y-2">
                  <Label className="text-lg">Select Time </Label>
                  <DialogDescription className=" flex items-center gap-x-2">
                    Chosse the opening time of the service
                  </DialogDescription>
                </div>
              </div>
              <div className=" grid grid-cols-2 gap-x-2">
                <div className=" w-fit flex flex-col gap-y-2 ">
                  <Label className="text-sm">From</Label>
                  <Input
                    type="time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                  />
                </div>
                <div className=" w-fit flex flex-col gap-y-2 ">
                  <Label className="text-sm">To</Label>
                  <Input
                    type="time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-7 w-full flex-col gap-y-6 border-b border-[#1c1c1c]/50">
              <div className=" flex justify-between items-center mb-4">
                <div className=" flex flex-col items-start gap-y-4">
                  <Label className="text-lg">Select Location </Label>
                  <DialogDescription className=" flex items-center gap-x-2">
                    Select the location where you want to make an appointment
                  </DialogDescription>
                </div>
              </div>

              <Tabs defaultValue="address">
                <TabsList className="mb-6">
                  <TabsTrigger value="address">Search by area</TabsTrigger>
                  <TabsTrigger value="currentLocation">
                    Search around current location
                  </TabsTrigger>
                </TabsList>
                <TabsContent className="mt-0" value="address">
                  <div className=" grid grid-cols-2 gap-x-2">
                    <div className=" w-full ">
                      <Select
                        value={location.province?.id}
                        onValueChange={handleChooseProvince}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a province" />
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
                    </div>
                    <div className=" w-full ">
                      <Select
                        value={location.district?.id}
                        onValueChange={handleChooseDistrict}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a district" />
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
                  </div>
                </TabsContent>
                <TabsContent className="mt-0" value="currentLocation">
                  <div className=" flex flex-col gap-y-2">
                    <DialogDescription className=" flex items-center gap-x-2">
                      Distance from your current location {distance} (km)
                    </DialogDescription>
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
          </div>
        </div>
        <div className=" flex justify-end pt-4 pb-4 rounded-t-md bg-white w-full shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)]">
          <Button
            variant="ghost"
            className="mr-2 hover:text-red-400"
            type="submit"
            onClick={() => clearFilter()}
          >
            Reset Filter
          </Button>
          <DialogTrigger asChild>
            <Button className="mr-2" type="submit">
              Cancel
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFilter;
