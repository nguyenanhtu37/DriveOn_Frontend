import { useFilterStore } from "@/app/stores/view/filter";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const days = [
  { value: "Sunday", label: "☀️ Sunday" },
  { value: "Monday", label: "🌙 Monday" },
  { value: "Tuesday", label: "☁️ Tuesday" },
  { value: "Wednesday", label: "🌧️ Wednesday" },
  { value: "Thursday", label: "⚡ Thursday" },
  { value: "Friday", label: "❄️ Friday" },
  { value: "Saturday", label: "💨 Saturday" },
];

export const FilterTime = () => {
  const {
    openTime,
    closeTime,
    setOpenTime,
    setCloseTime,
    operating_days,

    setOperatingDays,
  } = useFilterStore();
  return (
    <div>
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
            <div key={day.value} className=" flex gap-x-4 items-center mb-3">
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
    </div>
  );
};
