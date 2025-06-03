import {
  useGetGarageStatusCountByMonth,
  useGetGarageStatusCountByQuarter,
  useGetServiceUsageCounts,
  useGetTransactionsByMonthOrQuarter,
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
  Legend,
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
  transaction: {
    label: "Transactions",
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
          {(activeTab === "garages" || activeTab === "transactions") ? (
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="garages">Garages</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
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
          {activeTab === "transactions" && viewType === "month" && (
            <TransactionChart year={selectedYear} />
          )}
          {activeTab === "transactions" && viewType === "quarter" && (
            <TransactionQuarterChart year={selectedYear} />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-start items-center gap-x-2">
        {(activeTab === "garages" || activeTab === "transactions") && (
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
        Garages that have been operating on the system in {year}
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
          Number of garages registered quarterly in {year}
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

  const formatServiceName = (name) => {
    const words = name.split(' ');
    if (words.length > 2) {
      return words.map((word, index) => 
        index % 2 === 0 ? word : word + '\n'
      ).join(' ');
    }
    return name;
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Services</CardTitle>
        <CardDescription>Service system used by garage</CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full h-[300px]">
        <BarChart
          data={chartData}
          margin={{
            left: 12,
            right: 12,
            top: 20,
            bottom: 120,
          }}
          barSize={40}
        >
          <CartesianGrid 
            vertical={false} 
            strokeDasharray="3 3"
            stroke="var(--border-color)"
          />
          <XAxis
            dataKey="serviceName"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            tick={{ 
              fontSize: 12,
              fill: "var(--foreground-color)"
            }}
            tickFormatter={formatServiceName}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={40}
            domain={["auto", "auto"]}
            allowDataOverflow={false}
            tick={{ 
              fontSize: 12,
              fill: "var(--foreground-color)"
            }}
          />
          <ChartTooltip
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">{label}</p>
                    <p className="text-sm">
                      <span className="font-medium text-accent">Usage Count: </span>
                      <span className="text-gray-700">{payload[0].value}</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="usageCount" 
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill}
                stroke="var(--border-color)"
                strokeWidth={1}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function TransactionChart({ year }) {
  const transactions = useGetTransactionsByMonthOrQuarter("month", year);

  const converted = useMemo(
    () =>
      transactions.data?.map((transaction) => ({
        month: monthNamesEn[transaction.month - 1],
        Transactions: transaction.totalTransactions,
        Amount: transaction.totalAmount,
      })),
    [transactions.data]
  );

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(value);
  };

  if (transactions.isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (transactions.isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-500">Error loading transaction data</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Transaction statistics monthly in {year}
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
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
            width={30}
            domain={["auto", "auto"]}
            allowDataOverflow={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatVND}
            width={80}
            domain={["auto", "auto"]}
            allowDataOverflow={false}
          />
          <ChartTooltip
            cursor={false}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">{label}</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium text-accent">Transaction Count: </span>
                        <span className="text-gray-700">{payload[0].value}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-primary">Total Amount: </span>
                        <span className="text-gray-700">{formatVND(payload[1].value)}</span>
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value) => (
              <span className="text-sm text-gray-600">{value}</span>
            )}
          />
          <Bar
            yAxisId="left"
            dataKey="Transactions"
            fill="#0ea5e9"
            name="Transaction Count"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="Amount"
            fill="#f97316"
            name="Transaction Amount"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function TransactionQuarterChart({ year }) {
  const transactions = useGetTransactionsByMonthOrQuarter("quarter", year);

  const converted = useMemo(
    () =>
      transactions.data?.map((transaction) => ({
        quarter: quarterNames[transaction.quarter - 1],
        Transactions: transaction.totalTransactions,
        Amount: transaction.totalAmount,
      })),
    [transactions.data]
  );

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(value);
  };

  if (transactions.isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (transactions.isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-500">Error loading transaction data</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <CardHeader className="py-1">
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Transaction statistics quarterly in {year}
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
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={30}
            domain={["auto", "auto"]}
            allowDataOverflow={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatVND}
            width={80}
            domain={["auto", "auto"]}
            allowDataOverflow={false}
          />
          <ChartTooltip
            cursor={false}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">{label}</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium text-accent">Transaction Count: </span>
                        <span className="text-gray-700">{payload[0].value}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-primary">Total Amount: </span>
                        <span className="text-gray-700">{formatVND(payload[1].value)}</span>
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value) => (
              <span className="text-sm text-gray-600">{value}</span>
            )}
          />
          <Bar
            yAxisId="left"
            dataKey="Transactions"
            fill="#0ea5e9"
            name="Transaction Count"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="Amount"
            fill="#f97316"
            name="Transaction Amount"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
