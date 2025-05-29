import { useSearchStore } from "@/app/stores/view/search";
import Calendar from "@/components/Calendar/Calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import React from "react";

const SearchTime = React.forwardRef(
  ({ isFocused, setSearchFocused, boxWidth }, ref) => {
    const { setIsFetched } = useSearchStore();

    const { time: selectedDate, setTime: setSelectedDate } = useSearchStore();

    const handleSelectedDate = (date) => {
      setSelectedDate(date);
      setIsFetched(true);
    };
    const handleRemoveDate = (e) => {
      e.stopPropagation();
      setSelectedDate(null);
      setSearchFocused("");
      setIsFetched(true);
    };

    return (
      <Popover open={isFocused}>
        <PopoverAnchor asChild>
          <div
            ref={ref}
            className={cn(
              "hidden flex-1 md:flex flex-col gap-y-px px-6 py-3 rounded-full bg-transparent hover:bg-box-hover transition-all duration-100 cursor-pointer z-10",
              isFocused && "hover:bg-transparent"
            )}
            onClick={() => setSearchFocused("time")}
          >
            <Label className="text-sm font-medium">Time</Label>
            <div className="flex justify-between items-center ">
              <div className="h-5 line-clamp-1 text-muted-foreground text-xs text-center flex items-center">
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Choose date"}
              </div>
              {selectedDate && (
                <X
                  size={16}
                  className="text-muted-foreground cursor-pointer"
                  onClick={handleRemoveDate}
                />
              )}
            </div>
          </div>
        </PopoverAnchor>
        <PopoverContent
          className={cn("px-3 py-6 w-full rounded-3xl bg-white border")}
          sideOffset={10}
          align="end"
        >
          <div style={{ width: (boxWidth / 100) * 95 }}>
            <div className={cn(" overflow-auto w-full min-h-22 ")}>
              <div className="mb-2 px-2 bg-box-hover py-2 rounded-full w-fit mx-auto shadow-md flex justify-center items-center text-sm font-semibold text-center leading-none">
                <div className=" px-4 py-2 rounded-full bg-white w-fit">
                  Select the date you want to make an appointment
                </div>
              </div>
              <Calendar date={selectedDate} chooseDate={handleSelectedDate} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
SearchTime.displayName = "SearchTime";

export { SearchTime };
