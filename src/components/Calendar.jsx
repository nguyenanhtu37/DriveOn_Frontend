import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";
import { useState } from "react";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Calendar(props) {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");
  return (
    <BigCalendar
      {...props}
      date={date}
      view={view}
      localizer={localizer}
      onNavigate={(newDate) => setDate(newDate)}
      onView={(newView) => setView(newView)}
    />
  );
}
