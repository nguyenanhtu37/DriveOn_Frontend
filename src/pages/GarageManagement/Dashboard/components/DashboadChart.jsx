import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Analysis</CardTitle>
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
          {activeTab === "appointment" && <AppointmentChart />}
          {activeTab === "services" && <ServiceChart />}
          {activeTab === "feedback" && <FeedbackChart />}
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentChart() {
  const { garageId } = useParams();
  const charts = useGetDashboardChart(garageId);

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
            // Add domain configuration to control scaling
            domain={["auto", "auto"]} // or use [0, 'dataMax + 10%'] for specific padding
            allowDataOverflow={false} // Prevent data from overflowing the chart area
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

function ServiceChart() {
  const { garageId } = useParams();
  const charts = useGetDashboardChart(garageId);

  const servicesData = useMemo(() => {
    return charts.data.services?.map((item) => ({
      serviceId: item.serviceId,
      serviceName: item.serviceName,
      totalUses: item.totalUses,
      fill: stringToColor(item.serviceName),
    }));
  }, [charts.data.services]);
  console.log(servicesData);

  const serviceChartConfig = useMemo(() => {
    return charts.data.services?.reduce((acc, item) => {
      acc[item.serviceId] = {
        label: item.serviceName,
        color: stringToColor(item.serviceName),
      };
      return acc;
    }, {});
  }, [charts.data.services]);

  const totalUses = useMemo(() => {
    return servicesData.reduce((acc, curr) => acc + curr.totalUses, 0);
  }, [servicesData]);

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
function FeedbackChart() {
  const { garageId } = useParams();
  const feedbacks = useGetFeedbackForGarage(garageId);
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
