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
import { useGetDashboardChart } from "@/app/stores/entity/garage";
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

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex justify-start items-center gap-x-2">
            <CardTitle>Analysis data for {year}</CardTitle>
          </div>
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
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[400px] w-full flex ">
          {activeTab === "appointment" && <AppointmentChart year={year} />}
          {activeTab === "services" && <ServiceChart year={year} />}
          {activeTab === "feedback" && <FeedbackChart year={year} />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-start items-center gap-x-2">
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
      </CardFooter>
    </Card>
  );
}

function AppointmentChart({ year }) {
  const { garageId } = useParams();
  const payload = { garageId, year };
  const charts = useGetDashboardChart(payload);

  const converted = charts.data.appointments?.map((item) => ({
    month: monthNamesEn[item.month - 1],
    Appointment: item.totalAppointments,
  }));

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Completed Appointments Chart by Month</CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full h-[300px]">
        <AreaChart
          accessibilityLayer
          data={converted}
          margin={{
            left: 12,
            right: 12,
            top: 20, // Add sufficient top margin to prevent clipping
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
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

function ServiceChart({ year }) {
  const { garageId } = useParams();
  const payload = { garageId, year };
  const charts = useGetDashboardChart(payload);

  const servicesData = useMemo(() => {
    if (!charts.data || !Array.isArray(charts.data.services)) return [];
    return charts.data.services.map((item) => ({
      serviceId: item.serviceId,
      serviceName: item.serviceName,
      totalUses: item.totalUses,
      fill: stringToColor(item.serviceName),
    }));
  }, [charts.data]);

  const serviceChartConfig = useMemo(() => {
    if (!charts.data || !Array.isArray(charts.data.services)) return {};
    return charts.data.services.reduce((acc, item) => {
      acc[item.serviceId] = {
        label: item.serviceName,
        color: stringToColor(item.serviceName),
      };
      return acc;
    }, {});
  }, [charts.data]);

  const totalUses = useMemo(() => {
    if (!servicesData || servicesData.length === 0) return 0;
    return servicesData.reduce((acc, curr) => acc + curr.totalUses, 0);
  }, [servicesData]);

  if (
    !charts.data ||
    !Array.isArray(charts.data.services) ||
    servicesData.length === 0
  ) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-muted-foreground">
          No service data available.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Service Usage Frequency</CardTitle>
        <CardDescription>
          This chart shows how frequently each service has been used over a
          given period, helping identify the most and least popular services.
        </CardDescription>
      </CardHeader>
      <ChartContainer
        config={serviceChartConfig}
        className="mx-auto aspect-square w-full  max-h-[350px]"
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
  const payload = { garageId, year };
  const feedbacks = useGetFeedbackForGarage(payload);
  const total = feedbacks.data.length;
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

  console.log(ratingChartConfig);

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
                        {total.toLocaleString()}
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
