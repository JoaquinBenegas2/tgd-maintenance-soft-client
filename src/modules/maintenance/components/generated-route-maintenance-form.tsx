import CustomForm from "@/components/custom/form/app-custom-form";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormWithoutMaintenanceTypeResponseDto } from "@/modules/maintenance-form/models/maintenance-form-model";
import { generateFormConfig } from "@/modules/maintenance-form/utils/generate-form-config";
import React from "react";
import { useMaintenanceFormStore } from "../store/maintenance-request-form-store";

interface GeneratedRouteMaintenanceFormProps {
  formId?: string;
  onMaintenanceSubmit: (data: any) => void;
}

export default function GeneratedRouteMaintenanceForm({
  formId,
  onMaintenanceSubmit,
}: GeneratedRouteMaintenanceFormProps) {
  const form = useMaintenanceFormStore((state) => state.selectedForm);
  const maintenanceForm = React.useMemo(() => form, [form]);

  const customFormConfig = generateFormConfig(
    maintenanceForm || ({} as FormWithoutMaintenanceTypeResponseDto)
  );

  const { ...restForm } = useCustomForm(customFormConfig);

  return (
    <>
      <CardHeader>
        <CardTitle>{form?.name}</CardTitle>
        <CardDescription>{form?.description}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-auto">
        <CustomForm formId={formId} onSubmit={onMaintenanceSubmit} showSubmitButton={false} {...restForm} />
      </CardContent>
    </>
  );
}
