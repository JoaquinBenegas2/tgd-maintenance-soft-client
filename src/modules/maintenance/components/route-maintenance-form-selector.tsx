import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormWithoutMaintenanceTypeResponseDto } from "@/modules/maintenance-form/models/maintenance-form-model";
import React from "react";
import { useMaintenanceFormStore } from "../store/maintenance-request-form-store";

interface RouteMaintenanceFormSelectorProps {
  onMaintenanceFormSelection: (maintenanceForm: FormWithoutMaintenanceTypeResponseDto) => void;
}
export default function RouteMaintenanceFormSelector({
  onMaintenanceFormSelection,
}: RouteMaintenanceFormSelectorProps) {
  const forms = useMaintenanceFormStore((state) => state.selectedMaintenanceType?.forms);
  const maintenanceForms = React.useMemo(() => forms, [forms]);

  return (
    <>
      <CardHeader>
        <CardTitle>Maintenance Forms</CardTitle>
        <CardDescription>Select a maintenance form to continue</CardDescription>
      </CardHeader>
      <div className="px-6">
        <Separator />
      </div>
      <CardContent>
        <div className="w-full flex flex-wrap gap-16">
          {maintenanceForms?.map((maintenanceForm) => (
            <div key={maintenanceForm.id} className="flex flex-col w-56">
              <Button
                className="w-full"
                onClick={() => onMaintenanceFormSelection(maintenanceForm)}
              >
                {maintenanceForm.name}
              </Button>
              <p className="text-muted-foreground text-sm mt-2 text-center">{maintenanceForm.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}
