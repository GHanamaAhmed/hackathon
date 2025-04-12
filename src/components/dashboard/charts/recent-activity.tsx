"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { name: "Admin", value: 10 },
  { name: "Editor", value: 25 },
  { name: "Viewer", value: 65 },
];

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
];

const chartConfig = {
  Admin: {
    label: "Admin",
    color: "var(--chart-1)",
  },
  Editor: {
    label: "Editor",
    color: "var(--chart-2)",
  },
  Viewer: {
    label: "Viewer",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function RecentActivity() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="border-none bg-background p-2 shadow-md"
                    items={[
                      {
                        label: payload[0].name,
                        value: `${payload[0].value}%`,
                        color: payload[0].color,
                      },
                    ]}
                  />
                );
              }
              return null;
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
