import { CalendarIcon, SlidersHorizontal } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useGetService } from "@/app/stores/entity/service";
import { Form } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Range } from "react-daisyui";
import { formatCurrency } from "@/utils";

import { InputDate } from "../ui/inputDate";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const PRICE_VALUE = 1000;

const DialogFilter = () => {
  const service = useGetService();
  const [priceValue, setPriceValue] = useState(0);
  const [date, setDate] = useState(new Date());
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [location, setLocation] = useState({ province: null });

  const handleChooseProvince = useCallback(
    (value) => {
      const selectedProvince = provinces.find((item) => item.id === value);
      if (selectedProvince) {
        setLocation((prev) => ({ ...prev, province: selectedProvince }));
      }
    },
    [provinces]
  );

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await fetch(
          "https://open.oapi.vn/location/provinces?size=63"
        );
        const data = await res.json();
        setProvinces(data.data || []);
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

      <DialogContent className="w-[590px] h-[818px] max-w-none flex p-2 pt-0 pb-4 flex-col items-center gap-y-0 overflow-y-auto">
        <DialogTitle className="text-center text-xl sticky top-0 py-2 bg-white border-y-px border-[#1c1c1c]/50 w-full items-center justify-center shadow-sm z-30">
          Filter
        </DialogTitle>
        <form className="w-full h-full relative flex flex-col justify-between ">
          <div className="">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className="px-6 py-7 w-full flex-col gap-y-6 border-b border-[#1c1c1c]/50"
                open={true}
              >
                <AccordionTrigger className="w-full">
                  <div className=" flex justify-between items-center">
                    <div className=" flex flex-col items-start gap-y-2">
                      <Label className="text-lg">Service</Label>
                      <DialogDescription>
                        Choose the service you want
                      </DialogDescription>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className=" mt-4">
                  <div className=" grid grid-cols-2 gap-2">
                    {service.data.map((service) => (
                      <div
                        key={service._id}
                        className=" flex gap-x-4 items-center mb-3"
                      >
                        <Checkbox id={service._id} color="red" />
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="px-6 py-7 w-full flex-col gap-y-6 border-b border-[#1c1c1c]/50">
              <div className=" flex justify-between items-center mb-4">
                <div className=" flex flex-col items-start gap-y-2">
                  <Label className="text-lg">Select price range</Label>
                  <DialogDescription className=" flex items-center gap-x-2">
                    Choose the price you want
                    <span className="text-md font-semibold">
                      {formatCurrency(priceValue * PRICE_VALUE)}
                    </span>
                  </DialogDescription>
                </div>
              </div>
              <div className=" w-full ">
                <Range
                  size="xs"
                  color="error"
                  className="range"
                  value={priceValue}
                  onChange={(e) => {
                    setPriceValue(e.target.value);
                  }}
                  max={5000}
                />
              </div>
            </div>

            <div className="px-6 py-7 w-full flex-col gap-y-6 border-b border-[#1c1c1c]/50">
              <div className=" flex justify-between items-center mb-4">
                <div className=" flex flex-col items-start gap-y-2">
                  <Label className="text-lg">Select date </Label>
                  <DialogDescription className=" flex items-center gap-x-2">
                    Select the date you want to schedule an appointment
                  </DialogDescription>
                </div>
              </div>
              <div className=" grid grid-cols-2 gap-x-2">
                <div className=" w-full ">
                  <InputDate date={date} setDate={setDate} />
                </div>
              </div>
            </div>

            <div className="px-6 py-7 w-full flex-col gap-y-6 border-b border-[#1c1c1c]/50">
              <div className=" flex justify-between items-center mb-4">
                <div className=" flex flex-col items-start gap-y-2">
                  <Label className="text-lg">Select Location </Label>
                  <DialogDescription className=" flex items-center gap-x-2">
                    Select the location where you want to make an appointment
                  </DialogDescription>
                </div>
              </div>
              <div className=" grid grid-cols-2 gap-x-2">
                <div className=" w-full ">
                  <Select onValueChange={handleChooseProvince}>
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
                  <Select>
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
            </div>
          </div>

          <div className="flex justify-end pt-4 pb-4 rounded-t-md bg-white w-full shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)]">
            <Button className="mr-2" type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFilter;
