import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { MaintenanceTypeWithFormsResponseDto } from "@/modules/maintenance-type/models/maintenance-type-model";

interface RouteMaintenanceTypeSelectorProps {
  maintenanceTypes: MaintenanceTypeWithFormsResponseDto[];
  onMaintenanceTypeSelection: (maintenanceType: MaintenanceTypeWithFormsResponseDto) => void;
}
export default function RouteMaintenanceTypeSelector({
  maintenanceTypes,
  onMaintenanceTypeSelection,
}: RouteMaintenanceTypeSelectorProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Maintenance Types</CardTitle>
        <CardDescription>Select a maintenance type to continue</CardDescription>
      </CardHeader>
      <div className="px-6">
        <Separator />
      </div>
      <CardContent>
        <div className="w-full flex flex-wrap gap-16">
          {!maintenanceTypes ||
            (maintenanceTypes.length === 0 && (
              <>
                <Skeleton className="bg-accent-foreground/25 w-56 h-9" />
                <Skeleton className="bg-accent-foreground/25 w-56 h-9" />
                <Skeleton className="bg-accent-foreground/25 w-56 h-9" />
              </>
            ))}

          {maintenanceTypes?.map((maintenanceType) => (
            <div key={maintenanceType.id} className="flex flex-col w-56">
              <Button
                className="w-full"
                onClick={() => onMaintenanceTypeSelection(maintenanceType)}
              >
                {maintenanceType.name}
              </Button>
              <p className="text-muted-foreground text-sm text-center mt-2">
                {maintenanceType.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}
