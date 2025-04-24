import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetMaintenanceTypesWithForms } from "@/modules/maintenance-type/handlers/maintenance-type-handler";
import { MaintenanceTypeWithFormsResponseDto } from "@/modules/maintenance-type/models/maintenance-type-model";
import React from "react";

interface RouteMaintenanceTypeSelectorProps {
  onMaintenanceTypeSelection: (maintenanceType: MaintenanceTypeWithFormsResponseDto) => void;
}
export default function RouteMaintenanceTypeSelector({
  onMaintenanceTypeSelection,
}: RouteMaintenanceTypeSelectorProps) {
  const { data: maintenanceTypes } = useGetMaintenanceTypesWithForms();

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
          {maintenanceTypes?.map((maintenanceType) => (
            <div key={maintenanceType.id} className="flex flex-col w-56">
              <Button
                className="w-full"
                onClick={() => onMaintenanceTypeSelection(maintenanceType)}
              >
                {maintenanceType.name}
              </Button>
              <p className="text-muted-foreground text-sm text-center mt-2">{maintenanceType.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}
