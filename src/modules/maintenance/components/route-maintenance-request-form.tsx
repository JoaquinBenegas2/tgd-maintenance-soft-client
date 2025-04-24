import { Step } from "@/components/custom/stepper/step";
import { Stepper } from "@/components/custom/stepper/stepper";
import { useStepper } from "@/components/custom/stepper/use-stepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressElementResponseDto } from "@/modules/element/models/element-model";
import { FormWithoutMaintenanceTypeResponseDto } from "@/modules/maintenance-form/models/maintenance-form-model";
import { MaintenanceTypeWithFormsResponseDto } from "@/modules/maintenance-type/models/maintenance-type-model";
import { ProgressRouteResponseDto } from "@/modules/route/models/route-model";
import { Save } from "lucide-react";
import { FaAngleLeft } from "react-icons/fa";
import { useCreateMaintenance } from "../handlers/maintenance-handler";
import { MaintenanceAnswerRequestDto } from "../models/maintenance-model";
import { useMaintenanceFormStore } from "../store/maintenance-request-form-store";
import GeneratedRouteMaintenanceForm from "./generated-route-maintenance-form";
import RouteMaintenanceFormSelector from "./route-maintenance-form-selector";
import RouteMaintenanceTypeSelector from "./route-maintenance-type-selector";
import { queryClient } from "@/providers/providers";

const steps = [
  {
    label: "Tipo de mantenimiento",
    description: "Tipo de mantenimiento a realizar",
  },
  {
    label: "Selección de formulario",
    description: "Formulario de mantenimiento",
  },
  {
    label: "Completar formulario",
    description: "Rellena el formulario seleccionado",
  },
];

export default function RouteMaintenanceRequestForm({
  route,
  selectedElement,
  onSubmit,
}: {
  route: ProgressRouteResponseDto;
  selectedElement: ProgressElementResponseDto;
  onSubmit: () => void;
}) {
  const { mutate: createMaintenance } = useCreateMaintenance();

  const { activeStep, nextStep, prevStep, resetSteps, isDisabledStep } = useStepper({
    initialStep: 0,
    steps,
  });

  const handleMaintenanceTypeSelection = (maintenanceType: MaintenanceTypeWithFormsResponseDto) => {
    useMaintenanceFormStore
      .getState()
      .setMaintenanceData({ selectedMaintenanceType: maintenanceType });

    nextStep();
  };

  const handleMaintenanceFormSelection = (form: FormWithoutMaintenanceTypeResponseDto) => {
    useMaintenanceFormStore.getState().setMaintenanceData({ selectedForm: form });

    nextStep();
  };

  const handleMaintenanceSubmit = (formData: Record<string, any>) => {
    const answers: MaintenanceAnswerRequestDto[] = Object.keys(formData).map((key) => ({
      form_field_id:
        useMaintenanceFormStore
          .getState()
          .selectedForm?.fields.find(
            (field) => field.name.toLowerCase().split(" ").join("_") === key
          )?.id || 0,
      value: formData[key],
    }));

    const data: any = {
      route_id: route.id,
      element_id: selectedElement.id,
      form_id: useMaintenanceFormStore.getState().selectedForm?.id || 0,
      maintenance_date: useMaintenanceFormStore.getState().maintenance_date,
      answers,
    };

    createMaintenance(data, {
      onSuccess: () => {
        onSubmit();
        // useMaintenanceFormStore.getState().reset();
        resetSteps();
        queryClient.invalidateQueries({ queryKey: ["routes"] });
      },
    });
  };

  return (
    <div className="w-full h-full mx-auto flex flex-col justify-between">
      <Stepper
        activeStep={activeStep}
        orientation="horizontal"
        clickableSteps={false}
        labelOrientation="bottom"
      >
        {/* Step 1 */}
        <Step index={0} label={steps[0].label} description={steps[0].description}>
          {activeStep === 0 && (
            <Card className="bg-accent h-[448px]">
              <RouteMaintenanceTypeSelector
                onMaintenanceTypeSelection={handleMaintenanceTypeSelection}
              />
            </Card>
          )}
        </Step>
        {/* Step 2 */}
        <Step index={1} label={steps[1].label} description={steps[1].description}>
          {activeStep === 1 && (
            <Card className="bg-accent h-[448px]">
              <RouteMaintenanceFormSelector
                onMaintenanceFormSelection={handleMaintenanceFormSelection}
              />
            </Card>
          )}
        </Step>
        {/* Step 3 */}
        <Step index={2} label={steps[2].label} description={steps[2].description}>
          {activeStep === 2 && (
            <Card className="bg-accent h-[448px]">
              <GeneratedRouteMaintenanceForm
                formId="maintenance-request-form"
                onMaintenanceSubmit={handleMaintenanceSubmit}
              />
            </Card>
          )}
        </Step>
      </Stepper>
      {/* Navigation */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" disabled={isDisabledStep} onClick={prevStep}>
          <FaAngleLeft />
        </Button>
        {activeStep === steps.length - 1 && (
          <Button form="maintenance-request-form">
            <Save />
          </Button>
        )}
      </div>
    </div>
  );
}
