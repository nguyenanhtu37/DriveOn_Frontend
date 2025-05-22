import { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, format, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default function Calendar({ date, chooseDate }) {
  const [currentMonth, setCurrentMonth] = useState(date ?? new Date());
  const [selectedDate, setSelectedDate] = useState(date);

  const nextMonth = addMonths(currentMonth, 1);

  const handlePreviousMonth = () => {
    setCurrentMonth((prevDate) => addMonths(prevDate, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevDate) => addMonths(prevDate, 1));
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    if (chooseDate) {
      chooseDate(newDate);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 ">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePreviousMonth} className="p-2 text-gray-500">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold">
              Month {format(currentMonth, "MM  yyyy", { locale: vi })}
            </h2>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">
              Month {format(nextMonth, "MM  yyyy", { locale: vi })}
            </h2>
          </div>
        </div>
        <button onClick={handleNextMonth} className="p-2 text-gray-500">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MonthCalendar
          month={currentMonth}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <MonthCalendar
          month={nextMonth}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>
    </div>
  );
}

function MonthCalendar({ month, selectedDate, onDateChange }) {
  // Generate days of the week
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Generate dates for the month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const daysInMonth = lastDay.getDate();

    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days = getDaysInMonth(month);

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Create a full date object from day number
  const createDateFromDay = (day) => {
    if (day === null) return null;
    return new Date(month.getFullYear(), month.getMonth(), day);
  };

  // Check if a date is the selected date
  const isSelectedDate = (day) => {
    if (day === null) return false;
    const date = createDateFromDay(day);
    return isSameDay(date, selectedDate);
  };

  return (
    <div>
      <div className="grid grid-cols-7 text-center mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, index) => (
          <div
            key={index}
            className={cn(
              "h-10 w-10 flex items-center justify-center rounded-full text-sm",
              day === null ? "invisible" : "cursor-pointer",
              isSelectedDate(day) ? "bg-black text-white" : "hover:bg-gray-100"
            )}
            onClick={() => {
              if (day !== null) {
                const newDate = createDateFromDay(day);
                onDateChange(newDate);
              }
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
