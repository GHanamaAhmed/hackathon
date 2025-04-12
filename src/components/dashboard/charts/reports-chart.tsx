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
    name: "Q1",
    "Product A": 4000,
    "Product B": 2400,
    "Product C": 2400,
    "Product D": 1800,
  },
  {
    name: "Q2",
    "Product A": 3000,
    "Product B": 1398,
    "Product C": 2800,
    "Product D": 2300,
  },
  {
    name: "Q3",
    "Product A": 2000,
    "Product B": 9800,
    "Product C": 2200,
    "Product D": 3200,
  },
  {
    name: "Q4",
    "Product A": 2780,
    "Product B": 3908,
    "Product C": 2900,
    "Product D": 2650,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;
export function ReportsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
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
          <Bar
            dataKey="Product A"
            fill="var(--chart-1)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Product B"
            fill="var(--chart-2)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Product C"
            fill="var(--chart-3)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Product D"
            fill="var(--chart-4)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
