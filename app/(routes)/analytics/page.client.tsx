"use client";

import { priorities } from "@/assets/data/filters";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDataTasksForBarChart } from "@/utils/helpers";
import { Label, Task } from "@prisma/client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function PageClient({
  data,
}: {
  data: Array<Task & { label: Label }>;
}) {
  const chartConfig = {
    [priorities[0].value?.toLowerCase()]: {
      label: priorities[0].label,
      color: "#2563eb",
    },
    [priorities[1].value?.toLowerCase()]: {
      label: priorities[1].label,
      color: "#60a5fa",
    },
    [priorities[2].value?.toLowerCase()]: {
      label: priorities[2].label,
      color: "#60a5fe",
    },
  } satisfies ChartConfig;

  const chartData = formatDataTasksForBarChart(data);

  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="high" fill="var(--color-high)" radius={4} />
        <Bar dataKey="medium" fill="var(--color-medium)" radius={4} />
        <Bar dataKey="low" fill="var(--color-low)" radius={4} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent style={{ background: "transparent" }} />
          }
          wrapperStyle={{ background: "transparent" }}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  );
}
