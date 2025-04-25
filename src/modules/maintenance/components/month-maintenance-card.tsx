import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMonthMaintenances } from "@/modules/maintenance/handlers/maintenance-handler";
export default function MonthMaintenanceCard() {
  const { data: maintenance, isLoading } = useGetMonthMaintenances();

  return (
    <Card className="h-full">
      <CardHeader className="text-center">
        <CardTitle>Maintenances this month</CardTitle>
        <CardDescription>Maintenances performed this month</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full text-center">
        <div className="flex h-full items-center justify-center">
          {isLoading ? (
            <Skeleton className="h-16 w-16" />
          ) : (
            <p className="text-6xl font-bold">{maintenance?.length}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
