import { useMemo, useState, memo } from "react";
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
import { useGetDashboardChart } from "@/app/stores/entity/garage";
import { useParams } from "react-router-dom";
import { useGetAllFeedbacksByGarage } from "@/app/stores/entity/feedbackV2";

import { ChevronDown, Loader2 } from "lucide-react";
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

const LoadingState = memo(function LoadingState() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-muted-foreground">Loading data...</span>
      </div>
    </div>
  );
});

const ErrorState = memo(function ErrorState() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-destructive flex flex-col items-center gap-2">
        <span className="text-lg font-medium">Error loading data</span>
        <span className="text-sm">Please try again later</span>
      </div>
    </div>
  );
});

export function DashboardCharts() {
  const [activeTab, setActiveTab] = useState("revenue");
  const [year, setYear] = useState(new Date().getFullYear());
  const [revenueViewMode, setRevenueViewMode] = useState("month"); // 'month' or 'quarter'
  const [serviceViewMode] = useState("quarter"); // Always 'quarter' for services

  const getViewTitle = () => {
    if (revenueViewMode === "month") {
      return "Monthly View";
    }
    return "Quarterly View";
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            {activeTab !== 'services' && activeTab !== 'feedback' ? (
              <>
                <CardTitle>Analysis data for {year}</CardTitle>
                <CardDescription>{getViewTitle()}</CardDescription>
              </>
            ) : activeTab === 'services' ? (
              <CardTitle>Service Analysis</CardTitle>
            ) : (
              <CardTitle>Feedbacks</CardTitle>
            )}
          </div>
          <div className="flex items-center gap-x-4">
            {activeTab === "revenue" && (
              <div className="flex items-center gap-x-2 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setRevenueViewMode("month")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    revenueViewMode === "month"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setRevenueViewMode("quarter")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    revenueViewMode === "quarter"
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
                <TabsTrigger value="feedback" className="text-sm">Feedbacks</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[400px] w-full flex ">
          {activeTab === "revenue" && <RevenueChart year={year} viewMode={revenueViewMode} />}
          {activeTab === "services" && <ServiceChart year={year} viewMode={serviceViewMode} />}
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

const RevenueChart = memo(function RevenueChart({ year, viewMode }) {
  const { garageId } = useParams();
  const chartData = useGetDashboardChart({ 
    garageId, 
    year,
    type: viewMode 
  });

  const converted = useMemo(() => {
    if (!chartData.data?.appointments) return [];
    
    if (viewMode === "month") {
      return chartData.data.appointments.map((item) => ({
        month: monthNamesEn[item.month - 1],
        Revenue: item.revenue || 0,
        Appointments: item.totalAppointments || 0,
      }));
    } else {
      return chartData.data.appointments.map((item) => ({
        month: `Quarter ${item.quarter}`,
        Revenue: item.revenue || 0,
        Appointments: item.totalAppointments || 0,
      }));
    }
  }, [chartData.data?.appointments, viewMode]);

  if (chartData.isLoading) return <LoadingState />;
  if (chartData.isError) return <ErrorState />;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle className="text-xl font-semibold">Revenue & Appointments</CardTitle>
        <CardDescription className="text-base">
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
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
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
            domain={[0, 'auto']}
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
            domain={[0, 'auto']}
            allowDataOverflow={false}
          />
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background/80 backdrop-blur-sm p-3 shadow-lg">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#0ea5e9" }} />
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Revenue
                          </span>
                          <span className="font-bold text-foreground">
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
                          <span className="font-bold text-foreground">
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
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="Appointments"
            fill="#f97316"
            fillOpacity={0.8}
            barSize={20}
            radius={[4, 4, 0, 0]}
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
});

const ServiceChart = memo(function ServiceChart({ year, viewMode }) {
  const { garageId } = useParams();
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedQuarter, setSelectedQuarter] = useState("total");
  const chartData = useGetDashboardChart({ 
    garageId, 
    year: selectedYear,
    type: viewMode 
  });

  const servicesData = useMemo(() => {
    if (!chartData.data?.services || !Array.isArray(chartData.data.services)) {
      console.log('No valid services data available');
      return [];
    }

    // Nếu là chế độ quý và đã chọn quý cụ thể
    if (viewMode === "quarter" && selectedQuarter !== "total") {
      // Lọc services theo quý đã chọn
      const quarterServices = chartData.data.services.filter(
        service => service.quarter === parseInt(selectedQuarter)
      );

      // Gộp dữ liệu cho cùng một service trong quý
      const serviceMap = new Map();
      quarterServices.forEach(service => {
        if (!service.serviceName) return;

        if (!serviceMap.has(service.serviceName)) {
          serviceMap.set(service.serviceName, {
            serviceName: service.serviceName,
            totalUses: 0,
            fill: stringToColor(service.serviceName)
          });
        }

        const serviceData = serviceMap.get(service.serviceName);
        serviceData.totalUses += service.totalUses || 0;
      });

      return Array.from(serviceMap.values());
    }

    // Nếu là chế độ quý và chọn "total"
    if (viewMode === "quarter") {
      // Gộp dữ liệu từ tất cả các quý
      const serviceMap = new Map();
      chartData.data.services.forEach(service => {
        if (!service.serviceName) return;

        if (!serviceMap.has(service.serviceName)) {
          serviceMap.set(service.serviceName, {
            serviceName: service.serviceName,
            totalUses: 0,
            fill: stringToColor(service.serviceName)
          });
        }

        const serviceData = serviceMap.get(service.serviceName);
        serviceData.totalUses += service.totalUses || 0;
      });

      return Array.from(serviceMap.values());
    }

    // Nếu là chế độ tháng
    return chartData.data.services.map(service => ({
      serviceName: service.serviceName,
      totalUses: service.totalUses || 0,
      fill: stringToColor(service.serviceName)
    }));
  }, [chartData.data?.services, selectedQuarter, viewMode]);

  const totalUses = useMemo(
    () => servicesData.reduce((acc, curr) => acc + (curr?.totalUses || 0), 0),
    [servicesData]
  );

  const totalServices = useMemo(
    () => servicesData.length,
    [servicesData]
  );

  const serviceChartConfig = useMemo(() => {
    return servicesData.reduce((acc, item) => {
      if (item && item.serviceName) {
        acc[item.serviceName] = {
          label: item.serviceName,
          color: item.fill,
        };
      }
      return acc;
    }, {});
  }, [servicesData]);

  if (chartData.isLoading) return <LoadingState />;
  if (chartData.isError) return <ErrorState />;

  if (servicesData.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-between">
        <CardHeader className="py-1">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Service Usage Frequency</CardTitle>
              <CardDescription className="text-base">
                No services found for {selectedYear}
                {viewMode === "quarter" && selectedQuarter !== "total" ? ` (Q${selectedQuarter})` : ""}
              </CardDescription>
            </div>
            <div className="flex items-center gap-x-4">
              {viewMode === "quarter" && (
                <div className="flex items-center gap-x-2 bg-muted p-1 rounded-lg">
                  <button
                    onClick={() => setSelectedQuarter("total")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      selectedQuarter === "total"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Total
                  </button>
                  {[1, 2, 3, 4].map((quarter) => (
                    <button
                      key={quarter}
                      onClick={() => setSelectedQuarter(quarter.toString())}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        selectedQuarter === quarter.toString()
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Q{quarter}
                    </button>
                  ))}
                </div>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                    {selectedYear}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 p-0">
                  <ScrollArea className="max-h-60 overflow-y-auto">
                    {Array.from({ length: 10 }, (_, i) => (
                      <DropdownMenuItem
                        key={i}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        onClick={() => setSelectedYear(new Date().getFullYear() - i)}
                      >
                        {new Date().getFullYear() - i}
                      </DropdownMenuItem>
                    ))}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground text-center">
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm">Please select a different year or quarter</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Service Usage Frequency</CardTitle>
            <CardDescription className="text-base">
              Total Services: {totalServices} | Total Usage: {totalUses} for {selectedYear}
              {viewMode === "quarter" && selectedQuarter !== "total" ? ` (Q${selectedQuarter})` : ""}
            </CardDescription>
          </div>
          <div className="flex items-center gap-x-4">
            {viewMode === "quarter" && (
              <div className="flex items-center gap-x-2 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setSelectedQuarter("total")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedQuarter === "total"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Total
                </button>
                {[1, 2, 3, 4].map((quarter) => (
                  <button
                    key={quarter}
                    onClick={() => setSelectedQuarter(quarter.toString())}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      selectedQuarter === quarter.toString()
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Q{quarter}
                  </button>
                ))}
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                  {selectedYear}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 p-0">
                <ScrollArea className="max-h-60 overflow-y-auto">
                  {Array.from({ length: 10 }, (_, i) => (
                    <DropdownMenuItem
                      key={i}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      onClick={() => setSelectedYear(new Date().getFullYear() - i)}
                    >
                      {new Date().getFullYear() - i}
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <ChartContainer
        config={serviceChartConfig}
        className="mx-auto aspect-square w-full max-h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                const percentage = totalUses > 0 
                  ? ((data.totalUses / totalUses) * 100).toFixed(1)
                  : 0;
                return (
                  <div className="rounded-lg bg-background/80 backdrop-blur-sm p-3 shadow-lg">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.fill }} />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {data.serviceName}
                          </span>
                          <span className="text-lg font-bold text-foreground">
                            {data.totalUses} Uses
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {percentage}% of Total
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
            data={servicesData}
            dataKey="totalUses"
            nameKey="serviceName"
            innerRadius={60}
            strokeWidth={5}
            paddingAngle={2}
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
                        {viewMode === "quarter" 
                          ? (selectedQuarter === "total" ? "Total Usage" : `Q${selectedQuarter} Usage`)
                          : "Total Usage"}
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
});

const yellowShades = ["#FF6F00", "#FF8F00", "#FFB300", "#FFCC00", "#FFEB3B"];

const getRatingLevel = (stars) => {
  switch (stars) {
    case 5:
      return "Excellent";
    case 4:
      return "Very Good";
    case 3:
      return "Good";
    case 2:
      return "Fair";
    case 1:
      return "Poor";
    default:
      return "";
  }
};

const StarIcon = ({ color, size = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={size}
    style={{ color }}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

const FeedbackChart = memo(function FeedbackChart() {
  const { garageId } = useParams();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedQuarter, setSelectedQuarter] = useState("total");
  const feedbacks = useGetAllFeedbacksByGarage(
    garageId, 
    selectedYear, 
    selectedQuarter === "total" ? undefined : selectedQuarter
  );

  const feedbackData = useMemo(() => {
    // Initialize default data structure
    const defaultData = Array.from({ length: 5 }, (_, i) => ({
      star: i + 1,
      rating: 0,
      fill: yellowShades[i],
      level: getRatingLevel(i + 1)
    }));

    // If no data or data is not an array, return default data
    if (!feedbacks.data || !Array.isArray(feedbacks.data)) {
      return defaultData;
    }

    const countMap = new Map();
    feedbacks.data.forEach((feedback) => {
      const rating = Number(feedback.rating);
      if (!isNaN(rating) && rating >= 1 && rating <= 5) {
        countMap.set(rating, (countMap.get(rating) || 0) + 1);
      }
    });

    return Array.from({ length: 5 }, (_, i) => {
      const star = i + 1;
      return {
        star,
        rating: countMap.get(star) || 0,
        fill: yellowShades[i],
        level: getRatingLevel(star)
      };
    });
  }, [feedbacks.data]);

  const totalFeedbacks = useMemo(() => {
    if (!feedbacks.data || !Array.isArray(feedbacks.data)) {
      return 0;
    }
    return feedbacks.data.length;
  }, [feedbacks.data]);

  const feedbackChartConfig = useMemo(() => 
    feedbackData.reduce((acc, item) => ({
      ...acc,
      [`${item.star} Star`]: {
        label: `${item.star} Star`,
        color: item.fill,
      }
    }), {}),
    [feedbackData]
  );

  if (feedbacks.isLoading) return <LoadingState />;
  if (feedbacks.isError) return <ErrorState />;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <CardTitle className="text-xl font-semibold">Feedbacks</CardTitle>
            <CardDescription className="text-base">
              {totalFeedbacks === 0 
                ? "No customer ratings available"
                : `Distribution of ${totalFeedbacks} customer ratings`}
            </CardDescription>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setSelectedQuarter("total")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedQuarter === "total"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Total
              </button>
              {[1, 2, 3, 4].map((quarter) => (
                <button
                  key={quarter}
                  onClick={() => setSelectedQuarter(quarter.toString())}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedQuarter === quarter.toString()
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Q{quarter}
                </button>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                  {selectedYear}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 p-0">
                <ScrollArea className="max-h-60 overflow-y-auto">
                  {Array.from({ length: 10 }, (_, i) => (
                    <DropdownMenuItem
                      key={i}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      onClick={() => setSelectedYear(new Date().getFullYear() - i)}
                    >
                      {new Date().getFullYear() - i}
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
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
                        <StarIcon color={data.fill} />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {data.star} Stars
                          </span>
                          <span className="text-lg font-bold text-foreground">
                            {data.rating} Customer Reviews
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {percentage}% of Total Reviews
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
            paddingAngle={2}
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
                        {selectedQuarter === "total" ? "Total Ratings" : `Q${selectedQuarter} Ratings`}
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
                {payload?.map((entry, index) => {
                  const starCount = entry?.value?.toString()?.match(/\d+/)?.[0] || '';
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <StarIcon color={entry.color} />
                      <span className="text-sm text-muted-foreground">
                        {starCount} Stars
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
});
