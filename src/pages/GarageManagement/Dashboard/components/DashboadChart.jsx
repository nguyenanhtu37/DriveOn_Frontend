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
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Legend,
} from "recharts";
import { 
  useGetDashboardChart,
  useGetGarageDashboardChartByQuarter 
} from "@/app/stores/entity/garage";
import { useParams } from "react-router-dom";
import { useGetAllFeedbacksByGarage } from "@/app/stores/entity/feedbackV2";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#0ea5e9",
  },
  appointments: {
    label: "Appointments",
    color: "#f97316",
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
  const [activeTab, setActiveTab] = useState("revenue");
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
              defaultValue="revenue"
              className="w-[550px]"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="revenue" className="text-sm">Revenue & Appointment</TabsTrigger>
                <TabsTrigger value="services" className="text-sm">Services</TabsTrigger>
                <TabsTrigger value="feedback" className="text-sm">Customer Ratings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[400px] w-full flex ">
          {activeTab === "revenue" && <RevenueChart year={year} viewMode={viewMode} />}
          {activeTab === "services" && <ServiceChart year={year} viewMode={viewMode} />}
          {activeTab === "feedback" && <FeedbackChart />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-start items-center gap-x-2">
        {activeTab !== 'services' && activeTab !== 'feedback' && (
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

function RevenueChart({ year, viewMode }) {
  const { garageId } = useParams();
  const monthlyData = useGetDashboardChart({ garageId, year });
  const quarterlyData = useGetGarageDashboardChartByQuarter(garageId, year);

  const charts = viewMode === "month" ? monthlyData : quarterlyData;

  const converted = useMemo(() => {
    if (!charts.data.appointments) return [];
    
    if (viewMode === "month") {
      return charts.data.appointments.map((item) => ({
        month: monthNamesEn[item.month - 1],
        Revenue: item.revenue || 0,
        Appointments: item.totalAppointments || 0,
      }));
    } else {
      return charts.data.appointments.map((item) => ({
        month: `Quarter ${item.quarter}`,
        Revenue: item.revenue || 0,
        Appointments: item.totalAppointments || 0,
      }));
    }
  }, [charts.data.appointments, viewMode]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Revenue & Appointments</CardTitle>
        <CardDescription>
          {viewMode === "month" ? "Monthly" : "Quarterly"} Revenue and Appointment Chart
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full h-[300px]">
        <BarChart
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
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={60}
            domain={["auto", "auto"]}
            allowDataOverflow={false}
            tickFormatter={(value) => {
              if (value >= 1000000) {
                return `${(value / 1000000).toFixed(1)}M VND`;
              } else if (value >= 1000) {
                return `${(value / 1000).toFixed(1)}K VND`;
              }
              return `${value} VND`;
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={60}
            domain={["auto", "auto"]}
            allowDataOverflow={false}
          />
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#0ea5e9" }} />
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Revenue
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].value.toLocaleString()} VND
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f97316" }} />
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Appointments
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[1].value.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-[0.70rem] text-muted-foreground mt-1">
                        {payload[0].payload.month}
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="Revenue"
            fill="#0ea5e9"
            fillOpacity={0.8}
            barSize={20}
          />
          <Bar
            yAxisId="right"
            dataKey="Appointments"
            fill="#f97316"
            fillOpacity={0.8}
            barSize={20}
          />
          <Legend
            verticalAlign="top"
            height={36}
            content={({ payload }) => (
              <div className="flex justify-center gap-4 mt-2">
                {payload.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />
        </BarChart>
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
function FeedbackChart() {
  const { garageId } = useParams();
  const feedbacks = useGetAllFeedbacksByGarage(garageId);

  const feedbackData = useMemo(() => {
    // Initialize default data structure with all ratings set to 0
    const defaultData = Array.from({ length: 5 }, (_, i) => ({
      star: i + 1,
      rating: 0,
      fill: yellowShades[i],
    }));

    // If data is still loading or there's an error, return default data
    if (feedbacks.isLoading || feedbacks.isError || !feedbacks.data) {
      return defaultData;
    }

    const feedbacksArray = feedbacks.data || [];
    
    // Count ratings
    const countMap = new Map();
    feedbacksArray.forEach((feedback) => {
      const rating = Number(feedback.rating);
      if (!isNaN(rating) && rating >= 1 && rating <= 5) {
        countMap.set(rating, (countMap.get(rating) || 0) + 1);
      }
    });

    // Create data array with actual counts
    return Array.from({ length: 5 }, (_, i) => {
      const star = i + 1;
      return {
        star,
        rating: countMap.get(star) || 0,
        fill: yellowShades[i],
      };
    });
  }, [feedbacks.data, feedbacks.isLoading, feedbacks.isError]);

  const totalFeedbacks = useMemo(() => {
    if (!feedbacks.data) return 0;
    return feedbacks.data.length;
  }, [feedbacks.data]);

  const feedbackChartConfig = useMemo(() => {
    return feedbackData.reduce((acc, item) => {
      acc[`${item.star} Star`] = {
        label: `${item.star} Star`,
        color: item.fill,
      };
      return acc;
    }, {});
  }, [feedbackData]);

  if (feedbacks.isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-muted-foreground">Loading feedback data...</div>
      </div>
    );
  }

  if (feedbacks.isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-destructive">Error loading feedback data</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Customer Ratings</CardTitle>
        <CardDescription>
          {totalFeedbacks === 0 
            ? "No customer ratings available"
            : `Distribution of ${totalFeedbacks} customer ratings`}
        </CardDescription>
      </CardHeader>
      <ChartContainer
        config={feedbackChartConfig}
        className="mx-auto aspect-square w-full max-h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                const percentage = totalFeedbacks > 0 
                  ? ((data.rating / totalFeedbacks) * 100).toFixed(1)
                  : 0;
                return (
                  <div className="rounded-lg bg-background/80 backdrop-blur-sm p-3 shadow-lg">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: data.fill }} />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {data.star} Star Rating
                          </span>
                          <span className="text-lg font-bold text-foreground">
                            {data.rating} feedbacks
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {percentage}% of total
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
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
                        {totalFeedbacks.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total Ratings
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={36}
            content={({ payload }) => (
              <div className="flex justify-center gap-4 mt-2">
                {payload.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
