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
import { format } from "date-fns";
import { PencilRuler, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useGetMonthMaintenances } from "../handlers/maintenance-handler";
import { MaintenanceResponseDto } from "../models/maintenance-model";

export default function MaintenanceTypeBarChart() {
  const { data: maintenance } = useGetMonthMaintenances();

  const chartData = (maintenance as MaintenanceResponseDto[])?.reduce((acc, item) => {
    const type = item.form.maintenance_type.name;

    const existing = acc.find((bar) => bar.type === type);

    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ type, count: 1 });
    }

    return acc;
  }, [] as { type: string; count: number }[]);

  const chartConfig = {
    count: {
      label: "Count",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  const totalTasks = chartData?.reduce((sum, bar) => sum + bar.count, 0);
  const topType = chartData?.reduce(
    (prev, curr) => (curr.count > prev.count ? curr : prev),
    chartData[0] || { type: "", count: 0 }
  );

  return (
    <Card className="col-span-1 lg:col-span-9">
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>{format(new Date(), "MMMM yyyy")}</CardDescription>
      </CardHeader>
      <CardContent className="justify-end">
        <ChartContainer config={chartConfig} className="max-h-[240px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="type" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <PencilRuler size={16} /> Total maintenance this month: {totalTasks}
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          <TrendingUp size={16} /> Most common type : {topType?.type} ({topType?.count} tareas)
        </div>
      </CardFooter>
    </Card>
  );
}
