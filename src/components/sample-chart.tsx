"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import chartData from "./../data/cal";
// shacdn var colors defined for HSL, then set on `[data-chart=chart-r1]` by code
const chartConfig = {
  desktop: {
    label: "Desktop",
    //color: "#2563eb", unused dark blue
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    //color: "#60a5fa", unused light blue
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
