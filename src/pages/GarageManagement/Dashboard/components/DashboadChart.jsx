import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { 
  useGetDashboardChart,
  useGetGarageDashboardChartByQuarter 
} from "@/app/stores/entity/garage";
import { useParams } from "react-router-dom";
import { useGetFeedbackForGarage } from "@/app/stores/entity/feedbackV2";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

const chartConfig = {
  appointment: {
    label: "Appointment",
    color: "var(--accent-color)",
  },
};

const monthNamesEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color =
    "#" +
    ((hash >> 24) & 0xff).toString(16).padStart(2, "0") +
    ((hash >> 16) & 0xff).toString(16).padStart(2, "0") +
    ((hash >> 8) & 0xff).toString(16).padStart(2, "0");
  return color.slice(0, 7);
};

export function DashboardCharts() {
  const [activeTab, setActiveTab] = useState("appointment");
  const [year, setYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState("month"); // 'month' or 'quarter'

  const getViewTitle = () => {
    if (viewMode === "month") {
      return "Monthly View";
    }
    return "Quarterly View";
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            {activeTab !== 'services' ? (
              <>
                <CardTitle>Analysis data for {year}</CardTitle>
                <CardDescription>{getViewTitle()}</CardDescription>
              </>
            ) : (
              <CardTitle>Service Analysis</CardTitle>
            )}
          </div>
          <div className="flex items-center gap-x-4">
            {activeTab !== 'services' && (
              <div className="flex items-center gap-x-2 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("month")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "month"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setViewMode("quarter")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "quarter"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Quarterly
                </button>
              </div>
            )}
            <Tabs
              defaultValue="appointment"
              className="w-[450px]"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appointment">Appointments</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[400px] w-full flex ">
          {activeTab === "appointment" && <AppointmentChart year={year} viewMode={viewMode} />}
          {activeTab === "services" && <ServiceChart year={year} viewMode={viewMode} />}
          {activeTab === "feedback" && <FeedbackChart year={year} />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-start items-center gap-x-2">
        {activeTab !== 'services' && (
          <>
            <CardTitle>Select year</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                  {year}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 p-0">
                <ScrollArea className="max-h-60 overflow-y-auto">
                  {Array.from({ length: 10 }, (_, i) => (
                    <DropdownMenuItem
                      key={i}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      onClick={() => setYear(new Date().getFullYear() - i)}
                    >
                      {new Date().getFullYear() - i}
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

function AppointmentChart({ year, viewMode }) {
  const { garageId } = useParams();
  const monthlyData = useGetDashboardChart({ garageId, year });
  const quarterlyData = useGetGarageDashboardChartByQuarter(garageId, year);

  const charts = viewMode === "month" ? monthlyData : quarterlyData;

  const converted = useMemo(() => {
    if (!charts.data.appointments) return [];
    
    if (viewMode === "month") {
      return charts.data.appointments.map((item) => ({
        month: monthNamesEn[item.month - 1],
        Appointment: item.totalAppointments,
      }));
    } else {
      return charts.data.appointments.map((item) => ({
        month: `Quarter ${item.quarter}`,
        Appointment: item.totalAppointments,
      }));
    }
  }, [charts.data.appointments, viewMode]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Appointments</CardTitle>
        <CardDescription>
          {viewMode === "month" ? "Monthly" : "Quarterly"} Appointments Chart
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full h-[300px]">
        <AreaChart
          accessibilityLayer
          data={converted}
          margin={{
            left: 12,
            right: 12,
            top: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
            width={30}
            domain={["auto", "auto"]}
            allowDataOverflow={false}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={30}
            domain={["auto", "auto"]}
            allowDataOverflow={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="Appointment"
            type="linear"
            fill="var(--color-appointment)"
            fillOpacity={0.4}
            stroke="var(--color-appointment)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

function ServiceChart({ year, viewMode }) {
  const { garageId } = useParams();
  const monthlyData = useGetDashboardChart({ garageId, year });
  const quarterlyData = useGetGarageDashboardChartByQuarter(garageId, year);

  const charts = viewMode === "month" ? monthlyData : quarterlyData;

  const servicesData = useMemo(() => {
    if (!charts.data.services) return [];
    return charts.data.services.map((service) => ({
      serviceName: service.serviceName,
      totalUses: service.totalUses,
      fill: stringToColor(service.serviceName),
    }));
  }, [charts.data.services]);

  const totalUses = useMemo(
    () => servicesData.reduce((acc, curr) => acc + curr.totalUses, 0),
    [servicesData]
  );

  const serviceChartConfig = useMemo(() => {
    return servicesData.reduce((acc, item) => {
      acc[item.serviceName] = {
        label: item.serviceName,
        color: item.fill,
      };
      return acc;
    }, {});
  }, [servicesData]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Service Usage Frequency</CardTitle>
        <CardDescription>Service Usage Chart</CardDescription>
      </CardHeader>
      <ChartContainer
        config={serviceChartConfig}
        className="mx-auto aspect-square w-full max-h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={servicesData}
            dataKey="totalUses"
            nameKey="serviceName"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalUses.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Service Usage
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

const yellowShades = ["#FF6F00", "#FF8F00", "#FFB300", "#FFCC00", "#FFEB3B"];
function FeedbackChart({ year }) {
  const { garageId } = useParams();
  const feedbacks = useGetFeedbackForGarage({ garageId, year });

  const feedbackData = useMemo(() => {
    const countMap = new Map();

    feedbacks.data.forEach((feedback) => {
      countMap.set(feedback.rating, (countMap.get(feedback.rating) || 0) + 1);
    });

    const data = Array.from({ length: 5 }, (_, i) => {
      const star = i + 1;
      const rating = countMap.get(star) || 0;
      return {
        star,
        rating,
        fill: yellowShades[i],
      };
    });

    return data;
  }, [feedbacks.data]);

  const ratingChartConfig = useMemo(() => {
    return feedbackData.reduce((acc, item) => {
      acc[item.star] = {
        label: `${item.star} Star`,
        color: yellowShades[item.star - 1],
      };
      return acc;
    }, {});
  }, [feedbackData]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Feedback</CardTitle>
        <CardDescription>
          This chart shows what percentage of users gave each rating.
        </CardDescription>
      </CardHeader>
      <ChartContainer
        config={ratingChartConfig}
        className="mx-auto aspect-square w-full max-h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={feedbackData}
            dataKey="rating"
            nameKey="star"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {feedbacks.data.length.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total Feedback
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
