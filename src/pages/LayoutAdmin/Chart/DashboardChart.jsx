import {
  useGetGarageStatusCountByMonth,
  useGetServiceUsageCounts,
} from "@/app/stores/entity/admin";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
} from "recharts";

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

export const DashboardChart = () => {
  const [activeTab, setActiveTab] = useState("garages");

  return (
    <div className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-end">
          <Tabs
            defaultValue="garages"
            className="w-[450px]"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="garages">Garages</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full flex ">
          {activeTab === "garages" && <GarageChart />}
          {activeTab === "services" && <ServiceChart />}
          {/* {activeTab === "services" && <ServiceChart />}
          {activeTab === "feedback" && <FeedbackChart />} */}
        </div>
      </CardContent>
    </div>
  );
};

function GarageChart() {
  const garages = useGetGarageStatusCountByMonth();

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
          Number of garages participating monthly
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
