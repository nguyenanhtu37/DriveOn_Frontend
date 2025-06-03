import {
  useGetGarageStatusCountByMonth,
  useGetGarageStatusCountByQuarter,
  useGetServiceUsageCounts,
} from "@/app/stores/entity/admin";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

const chartConfig = {
  garage: {
    label: "Garages",
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

const quarterNames = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];

export const DashboardChart = () => {
  const [activeTab, setActiveTab] = useState("garages");
  const [viewType, setViewType] = useState("month");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <div className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          {activeTab === "garages" ? (
            <Tabs
              defaultValue="month"
              className="w-[200px]"
              onValueChange={setViewType}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="month">Monthly</TabsTrigger>
                <TabsTrigger value="quarter">Quarterly</TabsTrigger>
              </TabsList>
            </Tabs>
          ) : (
            <div className="w-[200px]" />
          )}
          <Tabs
            defaultValue="garages"
            className="w-[450px]"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="garages">Garages</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full flex ">
          {activeTab === "garages" && viewType === "month" && (
            <GarageChart year={selectedYear} />
          )}
          {activeTab === "garages" && viewType === "quarter" && (
            <GarageQuarterChart year={selectedYear} />
          )}
          {activeTab === "services" && <ServiceChart />}
          {/* {activeTab === "services" && <ServiceChart />}
          {activeTab === "feedback" && <FeedbackChart />} */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-start items-center gap-x-2">
        {activeTab === "garages" && (
          <>
            <CardTitle>Select year</CardTitle>
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
          </>
        )}
      </CardFooter>
    </div>
  );
};

function GarageChart({ year }) {
  const garages = useGetGarageStatusCountByMonth(year);

  const converted = useMemo(
    () =>
      garages.data?.map((garage) => ({
        month: monthNamesEn[garage.month - 1],
        Garages: garage.garages,
      })),
    [garages.data]
  );

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Garages</CardTitle>
        <CardDescription>
          Number of garages participating monthly in {year}
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full h-[300px]">
        <AreaChart
          accessibilityLayer
          data={converted}
          margin={{
            left: 12,
            right: 12,
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
            dataKey="Garages"
            type="linear"
            fill="var(--accent-color)"
            fillOpacity={0.4}
            stroke="var(--accent-color)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

function GarageQuarterChart({ year }) {
  const garages = useGetGarageStatusCountByQuarter(year);

  const converted = useMemo(
    () =>
      garages.data?.map((garage) => ({
        quarter: quarterNames[garage.quarter - 1],
        Garages: garage.garages,
      })),
    [garages.data]
  );

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Garages</CardTitle>
        <CardDescription>
          Number of garages participating quarterly in {year}
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
            dataKey="quarter"
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
            dataKey="Garages"
            type="linear"
            fill="var(--accent-color)"
            fillOpacity={0.4}
            stroke="var(--accent-color)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

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

function ServiceChart() {
  const servicesData = useGetServiceUsageCounts();

  const chartData = useMemo(
    () =>
      servicesData.data?.map((service) => ({
        serviceName: service.serviceName,
        usageCount: service.usageCount,
        fill: stringToColor(service.serviceName),
      })) || [],
    [servicesData.data]
  );

  const chartConfig = useMemo(() => {
    return servicesData.data?.reduce((acc, item) => {
      acc[item.serviceName] = {
        label: item.serviceName,
        color: stringToColor(item.serviceName),
      };
      return acc;
    }, {});
  }, [servicesData.data]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Services</CardTitle>
        <CardDescription>Service statistics in the system</CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full h-[300px]">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="serviceName"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              value.length > 10 ? value.slice(0, 10) + "..." : value
            }
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="usageCount" fill="#8884d8">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
