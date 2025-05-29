import { useFilterStore } from "@/app/stores/view/filter";
import { DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Day } from "../components/Day";

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
  const { openTime, setOpenTime, operating_days, setOperatingDays } =
    useFilterStore();
  return (
    <div>
      <div className="px-6 py-4 w-full flex-col gap-y-6  ">
        <div className=" flex justify-between items-center mb-4">
          <div className=" flex flex-col items-start gap-y-2">
            <Label className="text-lg">Select the day of the week</Label>
            <DialogDescription className=" flex items-center gap-x-2">
              <span className="text-md font-semibold">
                Choose the days you want to open the service
              </span>
            </DialogDescription>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <Day
              key={day.value}
              day={day.label}
              isActive={operating_days.includes(day.value)}
              onClick={() => setOperatingDays(day.value)}
            />
          ))}
        </div>
      </div>

      <div className="px-6 py-4 w-full flex-col gap-y-6  ">
        <div className=" flex justify-between items-center mb-4">
          <div className=" flex flex-col items-start gap-y-2">
            <Label className="text-lg">Select Time </Label>
            <DialogDescription className=" flex items-center gap-x-2">
              Choose the opening time of the service
            </DialogDescription>
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-x-2">
          <div className=" w-fit flex flex-col gap-y-2 ">
            <Label className="text-sm">Open Time</Label>
            <Input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
