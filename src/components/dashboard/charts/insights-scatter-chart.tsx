"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate random data for the scatter plot
const generateScatterData = (count: number, name: string) => {
  return Array.from({ length: count }, () => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    z: Math.floor(Math.random() * 50) + 10,
  }))
}

const data01 = generateScatterData(20, "Product A")
const data02 = generateScatterData(15, "Product B")
const chartConfig = {
  x: {
    label: "Engagement",
    color: "var(--chart-1)",
  },
  y: {
    label: "Conversion",
    color: "var(--chart-2)",
  },
  z: {
    label: "Size",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function InsightsScatterChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Engagement" unit="%" />
          <YAxis type="number" dataKey="y" name="Conversion" unit="%" />
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="border-none bg-background p-2 shadow-md"
                    items={[
                      {
                        label: "Engagement",
                        value: `${payload[0].value}%`,
                        color: payload[0].color,
                      },
                      {
                        label: "Conversion",
                        value: `${payload[1].value}%`,
                        color: payload[0].color,
                      },
                      {
                        label: "Size",
                        value: payload[0].payload.z,
                        color: payload[0].color,
                      },
                    ]}
                  />
                )
              }
              return null
            }}
          />
          <Legend />
          <Scatter name="Product A" data={data01} fill="var(--chart-1)" />
          <Scatter name="Product B" data={data02} fill="var(--chart-2)" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
