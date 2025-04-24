"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import DelayedRouteList from "@/modules/route/components/delayed-route-list";
import TodayRouteList from "@/modules/route/components/today-route-list";
import TodayRouteProgressCard from "@/modules/route/components/today-route-progress-card";
import { AlertTriangle, ShieldCheck, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function PlantHomePageContent() {
  const overdue = 12;

  const riskLevel = overdue > 15 ? "High" : overdue > 5 ? "Medium" : "Low";
  const riskColor =
    riskLevel === "High"
      ? "text-red-500"
      : riskLevel === "Medium"
      ? "text-yellow-500"
      : "text-green-500";
  const RiskIcon = riskLevel === "High" ? AlertTriangle : ShieldCheck;

  const chartData = [
    { type: "Lubrication", count: 12 },
    { type: "Inspection", count: 9 },
    { type: "Replacement", count: 7 },
    { type: "Cleaning", count: 5 },
  ];

  const chartConfig = {
    count: {
      label: "Count",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full flex flex-1 gap-4">
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex gap-4 w-full h-full overflow-y-auto">
          <DelayedRouteList />
          <TodayRouteList />
          <TodayRouteProgressCard />
        </div>
        <div className="grid grid-cols-12 gap-4 w-full h-full overflow-y-auto">
          <div className="flex flex-col gap-4 col-span-3">
            <Card className="h-full">
              <CardHeader className="text-center">
                <CardTitle>Risk indicator</CardTitle>
                <CardDescription>Based on the number of overdue items last month</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-center h-full text-center">
                <div className="flex flex-col h-full items-center justify-center">
                  <RiskIcon className={`w-10 h-10 mx-auto ${riskColor}`} />
                  <p className={`mt-2 text-2xl font-bold ${riskColor}`}>{riskLevel}</p>
                  <p className="text-muted-foreground text-sm">{overdue} overdue items</p>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader className="text-center">
                <CardTitle>Maintenances this month</CardTitle>
                <CardDescription>Maintenances performed this month</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full text-center">
                <div className="flex h-full items-center justify-center">
                  <p className="text-6xl font-bold">24</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="col-span-9">
            <CardHeader>
              <CardTitle>Bar Chart</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="max-h-[240px]">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="type"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
