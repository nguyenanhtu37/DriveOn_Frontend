import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, Clock, MapPin } from "lucide-react";

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      const displayTime = formatDisplayTime(hour, minute);
      times.push({ value: timeString, label: displayTime });
    }
  }
  times.push({ value: "23:59", label: "11:59 PM" });
  return times;
};

// Format time for display (12-hour format)
const formatDisplayTime = (hour, minute) => {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const displayMinute = minute.toString().padStart(2, "0");
  return `${displayHour}:${displayMinute} ${period}`;
};

const days = [
  { value: "Monday", label: "Monday", short: "Mon" },
  { value: "Tuesday", label: "Tuesday", short: "Tue" },
  { value: "Wednesday", label: "Wednesday", short: "Wed" },
  { value: "Thursday", label: "Thursday", short: "Thu" },
  { value: "Friday", label: "Friday", short: "Fri" },
  { value: "Saturday", label: "Saturday", short: "Sat" },
  { value: "Sunday", label: "Sunday", short: "Sun" },
];

const timeOptions = generateTimeOptions();

export function BusinessDetailsStep({ form }) {
  const openTime = form.watch("openTime");
  const closeTime = form.watch("closeTime");

  const isWeekend = (dayValue) => {
    return dayValue === "saturday" || dayValue === "sunday";
  };

  return (
    <div className="space-y-8">
      {/* Business Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                Business Description *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your garage services, specialties, and what makes you unique..."
                  className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-red-500 border-gray-300 hover:border-red-300 focus:border-none resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      {/* Operating Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          Operating Hours
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="openTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Opening Time *
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-gray-300 hover:border-blue-300 bg-white">
                      <SelectValue placeholder="Select opening time" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {timeOptions.map((time) => {
                        const hour = Number.parseInt(time.value.split(":")[0]);
                        let dotColor = "bg-green-400"; // Morning (5-11)
                        if (hour >= 12 && hour < 18) dotColor = "bg-blue-400"; // Afternoon (12-17)
                        if (hour >= 18 || hour < 5) dotColor = "bg-purple-400"; // Evening (18-4)

                        return (
                          <SelectItem
                            key={time.value}
                            value={time.value}
                            className="hover:bg-blue-50 focus:bg-blue-50"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 ${dotColor} rounded-full`}
                              ></span>
                              {time.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="closeTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Closing Time *
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-gray-300 hover:border-blue-300 bg-white">
                      <SelectValue placeholder="Select closing time" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {timeOptions.map((time) => {
                        const hour = Number.parseInt(time.value.split(":")[0]);
                        let dotColor = "bg-green-400"; // Morning (5-11)
                        if (hour >= 12 && hour < 18) dotColor = "bg-blue-400"; // Afternoon (12-17)
                        if (hour >= 18 || hour < 5) dotColor = "bg-purple-400"; // Evening (18-4)

                        return (
                          <SelectItem
                            key={time.value}
                            value={time.value}
                            className="hover:bg-blue-50 focus:bg-blue-50"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 ${dotColor} rounded-full`}
                              ></span>
                              {time.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Hours Preview */}
        {openTime && closeTime && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-white rounded-lg border border-blue-200"
          >
            <div className="flex items-center gap-2 text-blue-700">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Business Hours:</span>
              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-sm">
                {timeOptions.find((t) => t.value === openTime)?.label} -{" "}
                {timeOptions.find((t) => t.value === closeTime)?.label}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Operating Days */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-100"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-red-500" />
          Operating Days
        </h3>

        {/* Quick Selection Buttons */}

        {/* Days Selection Grid */}
        <FormField
          control={form.control}
          name="openDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">
                Select Operating Days *
              </FormLabel>

              <div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-4 lg:grid-cols-7">
                {days.map((day, index) => {
                  const isSelected = (field.value || []).some(
                    (d) => d.value === day.value
                  );

                  return (
                    <motion.div
                      key={day.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <motion.label
                        className={cn(
                          "relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 group bg-white",
                          "hover:shadow-md hover:-translate-y-0.5",
                          isSelected
                            ? isWeekend(day.value)
                              ? "border-purple-400 bg-gradient-to-br from-purple-50 to-purple-100 shadow-md shadow-purple-200/50"
                              : "border-red-400 bg-gradient-to-br from-red-50 to-red-100 shadow-md shadow-red-200/50"
                            : "border-gray-200 hover:border-red-300 hover:bg-red-50/50"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Selection Indicator */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className={cn(
                                "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg",
                                isWeekend(day.value)
                                  ? "bg-purple-500"
                                  : "bg-red-500"
                              )}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Day Emoji */}

                        {/* Day Short Name */}
                        <span
                          className={cn(
                            "text-sm font-semibold text-center transition-colors duration-300",
                            isSelected
                              ? isWeekend(day.value)
                                ? "text-purple-700"
                                : "text-red-700"
                              : "text-gray-600 group-hover:text-red-600"
                          )}
                        >
                          {day.short}
                        </span>

                        {/* Hidden Checkbox */}
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isSelected}
                          onChange={(e) => {
                            const currentDays = [...(field.value || [])];
                            if (e.target.checked) {
                              field.onChange([...currentDays, day]);
                            } else {
                              field.onChange(
                                currentDays.filter((d) => d.value !== day.value)
                              );
                            }
                          }}
                        />

                        {/* Pulse Effect for Selected */}
                        {isSelected && (
                          <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-red-300"
                            animate={{
                              scale: [1, 1.05, 1],
                              opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                      </motion.label>
                    </motion.div>
                  );
                })}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Selected Days Summary */}
      </motion.div>
    </div>
  );
}
