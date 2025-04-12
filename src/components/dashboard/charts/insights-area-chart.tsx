"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  {
    name: "Jan",
    revenue: 4000,
    users: 2400,
    conversion: 1800,
  },
  {
    name: "Feb",
    revenue: 3000,
    users: 1398,
    conversion: 1500,
  },
  {
    name: "Mar",
    revenue: 2000,
    users: 9800,
    conversion: 2200,
  },
  {
    name: "Apr",
    revenue: 2780,
    users: 3908,
    conversion: 2500,
  },
  {
    name: "May",
    revenue: 1890,
    users: 4800,
    conversion: 2100,
  },
  {
    name: "Jun",
    revenue: 2390,
    users: 3800,
    conversion: 2400,
  },
  {
    name: "Jul",
    revenue: 3490,
    users: 4300,
    conversion: 2800,
  },
  {
    name: "Aug",
    revenue: 4000,
    users: 2400,
    conversion: 2600,
  },
  {
    name: "Sep",
    revenue: 3000,
    users: 1398,
    conversion: 2000,
  },
  {
    name: "Oct",
    revenue: 2000,
    users: 9800,
    conversion: 2900,
  },
  {
    name: "Nov",
    revenue: 2780,
    users: 3908,
    conversion: 3000,
  },
  {
    name: "Dec",
    revenue: 1890,
    users: 4800,
    conversion: 2700,
  },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  users: {
    label: "Users",
    color: "var(--chart-2)",
  },
  conversion: {
    label: "Conversion",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function InsightsAreaChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="border-none bg-background p-2 shadow-md"
                    /*@ts-ignore*/
                    items={payload.map((entry) => ({
                      label: entry.name,
                      value: entry.value,
                      color: entry.color,
                    }))}
                  />
                );
              }
              return null;
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stackId="1"
            stroke="var(--chart-1)"
            fill="var(--chart-1)"
          />
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="var(--chart-2)"
            fill="var(--chart-2)"
          />
          <Area
            type="monotone"
            dataKey="conversion"
            stackId="1"
            stroke="var(--chart-3)"
            fill="var(--chart-3)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
