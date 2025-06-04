import { useSearchStore } from "@/app/stores/view/search";
import Calendar from "@/components/Calendar/Calendar";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import React from "react";

const MobileSearchTime = React.forwardRef(({ onClose }, ref) => {
  const { setIsFetched } = useSearchStore();
  const { time: selectedDate, setTime: setSelectedDate } = useSearchStore();

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    setIsFetched(true);
  };

  const handleRemoveDate = () => {
    setSelectedDate(null);
    setIsFetched(true);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-lg font-semibold">Choose Date</Label>
          {selectedDate && (
            <button
              onClick={handleRemoveDate}
              className="text-red-600 text-sm font-medium hover:text-red-800"
            >
              Clear date
            </button>
          )}
        </div>

        {selectedDate ? (
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CalendarIcon size={20} className="text-green-600" />
            <div>
              <p className="font-medium text-green-800">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-green-600">Selected date</p>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">
              Select your preferred appointment date
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <Calendar date={selectedDate} chooseDate={handleSelectedDate} />
      </div>
    </div>
  );
});

MobileSearchTime.displayName = "MobileSearchTime";
export { MobileSearchTime };
