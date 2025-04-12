"use client";
import {
  BarChart,
  Bar,
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
  },
  {
    name: "Feb",
    revenue: 3000,
    users: 1398,
  },
  {
    name: "Mar",
    revenue: 2000,
    users: 9800,
  },
  {
    name: "Apr",
    revenue: 2780,
    users: 3908,
  },
  {
    name: "May",
    revenue: 1890,
    users: 4800,
  },
  {
    name: "Jun",
    revenue: 2390,
    users: 3800,
  },
  {
    name: "Jul",
    revenue: 3490,
    users: 4300,
  },
  {
    name: "Aug",
    revenue: 4000,
    users: 2400,
  },
  {
    name: "Sep",
    revenue: 3000,
    users: 1398,
  },
  {
    name: "Oct",
    revenue: 2000,
    users: 9800,
  },
  {
    name: "Nov",
    revenue: 2780,
    users: 3908,
  },
  {
    name: "Dec",
    revenue: 1890,
    users: 4800,
  },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563eb",
  },
  users: {
    label: "Users",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function Overview() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="border-none bg-background p-2 shadow-md"
                    items={[
                      {
                        label: "Revenue",
                        value: `$${payload[0].value}`,
                        color: "var(--chart-1)",
                      },
                      {
                        label: "Users",
                        value: payload[1].value,
                        color: "var(--chart-2)",
                      },
                    ]}
                  />
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar
            dataKey="revenue"
            fill="var(--chart-1)"
            name="Revenue"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="users"
            fill="var(--chart-2)"
            name="Users"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
