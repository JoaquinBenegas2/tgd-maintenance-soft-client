import CustomForm from "@/components/custom/form/app-custom-form";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import { Step } from "@/components/custom/stepper/step";
import { Stepper } from "@/components/custom/stepper/stepper";
import { StepConfig } from "@/components/custom/stepper/stepper-types";
import { useStepper } from "@/components/custom/stepper/use-stepper";
import CustomTable from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetElementsByStatus } from "@/modules/element/handlers/element-handler";
import { ElementResponseDto, ElementStatusEnum } from "@/modules/element/models/element-model";
import { useGetAssignedCompany } from "@/modules/user/handlers/user-handler";
import { roleClasses, roleNames } from "@/modules/user/models/user-model";
import { Save } from "lucide-react";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight, FaAnglesRight } from "react-icons/fa6";
import { useCreateRoute } from "../handlers/route-handler";
import { useRouteFormStore } from "../store/route-form-store";

const steps = [
  { label: "Basic information", description: "Route information" },
  { label: "Elements", description: "Element assignment" },
  { label: "Operators", description: "Operator assignment", optional: true },
] satisfies StepConfig[];

export default function RouteRequestForm() {
  const [elementRowSelection, setElementRowSelection] = useState({});
  const [operatorRowSelection, setOperatorRowSelection] = useState({});

  const { mutate: createRoute, isPending: isCreating } = useCreateRoute();

  const { activeStep, nextStep, prevStep, resetSteps, isDisabledStep, isOptionalStep } = useStepper(
    {
      initialStep: 0,
      steps,
    }
  );

  const routeData = useRouteFormStore();

  const formConfig: CustomFormConfig = {
    fields: [
      {
        name: "name",
        label: "Nombre",
        defaultValue: routeData.name,
        validations: { required: true },
      },
      {
        name: "description",
        type: "textarea",
        label: "Descripción",
        defaultValue: routeData.description,
      },
      {
        name: "periodicity_in_days",
        type: "number",
        label: "Periodicidad (días)",
        defaultValue: routeData.periodicity_in_days.toString(),
        validations: { required: true },
      },
      {
        name: "start_date",
        type: "date",
        label: "Fecha de inicio",
        defaultValue: routeData.start_date,
        validations: { required: true },
      },
    ],
  };

  const form = useCustomForm(formConfig);

  const handleNext = async () => {
    if (activeStep === 0) {
      const valid = await form.form.trigger();

      if (!valid) return;

      const values = form.form.getValues();

      useRouteFormStore.getState().setRouteData({
        name: values.name,
        description: values.description,
        periodicity_in_days: Number(values.periodicity_in_days),
        start_date: values.start_date,
      });

      nextStep();
    } else if (activeStep < steps.length - 1) {
      nextStep();
    }
  };

  const handleSubmit = () => {
    const elementIndexes = Object.entries(elementRowSelection)
      .filter(([, sel]) => sel)
      .map(([idx]) => Number(idx));
    const operatorIndexes = Object.entries(operatorRowSelection)
      .filter(([, sel]) => sel)
      .map(([idx]) => Number(idx));

    const elementIds = elementIndexes.map((i) => elements[i].id);
    const operatorIds = operatorIndexes.map((i) => company!.assigned_users[i].id);

    useRouteFormStore.getState().setRouteData({ element_ids: elementIds });
    useRouteFormStore.getState().setRouteData({ operator_ids: operatorIds });

    const data: any = {
      name: useRouteFormStore.getState().name,
      description: useRouteFormStore.getState().description,
      periodicity_in_days: useRouteFormStore.getState().periodicity_in_days,
      start_date: useRouteFormStore.getState().start_date,
      element_ids: useRouteFormStore.getState().element_ids,
      operator_ids: useRouteFormStore.getState().operator_ids,
    };

    createRoute(data, {
      onSuccess: () => {
        setElementRowSelection({});
        setOperatorRowSelection({});
        useRouteFormStore.getState().reset();
        form.resetForm();
        resetSteps();
      },
      onError: (error) => {
        console.error("Error creating route:", error);
      },
    });
  };

  const { data: elements = [] } = useGetElementsByStatus("ACTIVE");
  const { data: company } = useGetAssignedCompany();

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
            <Card className="bg-accent dark:bg-card">
              <CardContent>
                <CustomForm onSubmit={() => {}} showSubmitButton={false} {...form} />
              </CardContent>
            </Card>
          )}
        </Step>

        {/* Step 2 */}
        <Step index={1} label={steps[1].label} description={steps[1].description}>
          {activeStep === 1 && (
            <Card className="bg-accent dark:bg-card">
              <CardContent>
                <CustomTable
                  height="220px"
                  items={elements}
                  columns={[
                    {
                      header: "Asset",
                      accessorKey: "component.asset.name",
                    },
                    {
                      header: "Component",
                      accessorKey: "component.name",
                    },
                    { header: "Element", accessorKey: "name" },
                    { header: "Description", accessorKey: "description" },
                    {
                      header: "Manufacturer",
                      accessorKey: "manufacturer.name",
                    },
                    {
                      header: "Status",
                      accessorKey: "status",
                      cellRenderer: (item: ElementResponseDto) =>
                        item.status === ElementStatusEnum.ACTIVE ? (
                          <Badge className="bg-green-600 hover:bg-green-500">Active</Badge>
                        ) : (
                          <Badge className="bg-red-600 hover:bg-red-500">Inactive</Badge>
                        ),
                    },
                  ]}
                  rowSelection={elementRowSelection}
                  onRowSelectionChange={setElementRowSelection}
                  showCheckbox
                />
              </CardContent>
            </Card>
          )}
        </Step>

        {/* Step 2 */}
        <Step index={2} label={steps[2].label} description={steps[2].description}>
          {activeStep === 2 && (
            <Card className="bg-accent dark:bg-card">
              <CardContent>
                <CustomTable
                  height="220px"
                  items={company?.assigned_users || []}
                  columns={[
                    {
                      header: "Name",
                      accessorKey: "name",
                    },
                    {
                      header: "Email",
                      accessorKey: "email",
                    },
                    {
                      header: "Role",
                      accessorKey: "role",
                      cellRenderer: (user) => {
                        const roleStyle = roleClasses[user.role as keyof typeof roleClasses];

                        return (
                          <Badge
                            key={user.role}
                            className={cn("transition-all", roleStyle.bg, roleStyle.hover)}
                          >
                            {roleNames[user.role as keyof typeof roleNames]}
                          </Badge>
                        );
                      },
                    },
                  ]}
                  rowSelection={operatorRowSelection}
                  onRowSelectionChange={setOperatorRowSelection}
                  showCheckbox
                />
              </CardContent>
            </Card>
          )}
        </Step>
      </Stepper>

      {/* Navigation */}
      <div className="flex justify-end gap-4 mt-6">
        {activeStep === steps.length ? (
          <Button onClick={handleSubmit}>Crear Ruta</Button>
        ) : (
          <>
            <Button variant="outline" disabled={isDisabledStep} onClick={prevStep}>
              <FaAngleLeft />
            </Button>
            <Button
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              disabled={
                (Object.keys(elementRowSelection).length === 0 && activeStep === 1) || isCreating
              }
            >
              {activeStep === steps.length - 1 ? (
                <Save />
              ) : isOptionalStep ? (
                <FaAnglesRight />
              ) : (
                <FaAngleRight />
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
