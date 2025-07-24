"use client";

import { TrendingUp } from "lucide-react";
import { RadialBarChart, RadialBar, PolarGrid, PolarRadiusAxis, Label, PolarAngleAxis } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { useGetTodayRoutes } from "../handlers/route-handler";

export default function TodayRouteProgressCard() {
  const { data: routes } = useGetTodayRoutes();

  const totalElements =
    routes?.reduce((acc, route) => acc + route.assigned_elements.length, 0) || 0;

  const completedElements =
    routes?.reduce(
      (acc, route) =>
        acc + route.assigned_elements.filter((el) => el.received_maintenance === true).length,
      0
    ) || 0;

  const progress = totalElements > 0 ? (completedElements * 100) / totalElements : 0;

    const chartData = [
    {
      name: "today",
      progress: Math.round(progress),
      fill: "var(--chart-3)",
    },
  ];

  const chartConfig = {
    progress: {
      label: "Progress",
    },
    today: {
      label: "Today",
      color: "hsl(var(--chart-foreground))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col col-span-1 w-full overflow-y-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle>Today progress</CardTitle>
        <CardDescription>Based on all todays routes</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square min-h-[180px]">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <PolarGrid gridType="circle" radialLines={false} stroke="none" polarRadius={[86, 74]} />
            <RadialBar dataKey="progress" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {Math.round(progress)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Completed
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-medium text-foreground">
          {completedElements}/{totalElements} elements done today
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none">Tracking all today’s route elements</div>
      </CardFooter>
    </Card>
  );
}
