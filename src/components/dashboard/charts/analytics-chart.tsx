"use client";

import {
  LineChart,
  Line,
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

// Generate mock data based on interval
const generateData = (interval: string) => {
  const data = [];
  let labels = [];
  let count = 0;

  switch (interval) {
    case "daily":
      labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      count = 24;
      break;
    case "weekly":
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      count = 7;
      break;
    case "monthly":
      labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
      count = 30;
      break;
    case "yearly":
    default:
      labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      count = 12;
      break;
  }

  for (let i = 0; i < count; i++) {
    data.push({
      name: labels[i],
      visitors: Math.floor(Math.random() * 1000) + 500,
      pageViews: Math.floor(Math.random() * 5000) + 1000,
    });
  }

  return data;
};

interface AnalyticsChartProps {
  interval: "daily" | "weekly" | "monthly" | "yearly";
}
const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)", // Using the CSS variable directly
  },
  pageViews: {
    label: "Page Views",
    color: "var(--chart-2)", // Using the CSS variable directly
  },
} satisfies ChartConfig;

export function AnalyticsChart({ interval }: AnalyticsChartProps) {
  const data = generateData(interval);

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="border-none bg-background p-2 shadow-md"
                    items={[
                      {
                        label: "Visitors",
                        value: payload[0].value,
                        color: "var(--chart-1)",
                      },
                      {
                        label: "Page Views",
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
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="var(--chart-1)"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="pageViews"
            stroke="var(--chart-2)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
