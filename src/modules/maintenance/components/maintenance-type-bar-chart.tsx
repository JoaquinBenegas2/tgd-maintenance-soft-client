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
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useGetMonthMaintenances } from "../handlers/maintenance-handler";
import { MaintenanceResponseDto } from "../models/maintenance-model";
import { format } from "date-fns";

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

  return (
    <Card className="col-span-9">
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
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
