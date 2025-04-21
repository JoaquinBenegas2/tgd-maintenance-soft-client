import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import React, { useEffect } from "react";
import { RouteResponseDto } from "../models/route-model";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { useUpdateRoute } from "../handlers/route-handler";
import CustomForm from "@/components/custom/form/app-custom-form";

interface RouteDetailRequestFormProps {
  initialData?: RouteResponseDto;
  editMode?: boolean;
  onEditModeChange?: (editMode: boolean) => void;
  onExpose?: (utils: { resetForm: () => void; isUpdating: boolean }) => void;
  formId?: string;
}

export default function RouteDetailRequestForm({
  initialData,
  editMode,
  onEditModeChange,
  onExpose,
  formId,
}: RouteDetailRequestFormProps) {
  const { mutate: updateRoute, isPending: isUpdating } = useUpdateRoute();

  const formConfig: CustomFormConfig = {
    fieldClassName: "transition-all disabled:cursor-default disabled:opacity-75",
    formColumns: 4,
    fields: [
      {
        name: "name",
        label: "Nombre",
        defaultValue: initialData?.name,
        disabled: !editMode,
        validations: { required: true },
        loading: !initialData,
      },
      {
        name: "description",
        type: "textarea",
        label: "Descripción",
        defaultValue: initialData?.description,
        disabled: !editMode,
        loading: !initialData,
      },
      {
        name: "periodicity_in_days",
        type: "number",
        label: "Periodicidad (días)",
        fieldSpan: 2,
        defaultValue: initialData?.periodicity_in_days.toString(),
        disabled: !editMode,
        validations: { required: true },
        loading: !initialData,
      },
      {
        name: "start_date",
        type: "date",
        label: "Fecha de inicio",
        fieldSpan: 2,
        defaultValue: initialData?.start_date,
        disabled: !editMode,
        validations: { required: true },
        loading: !initialData,
      },
    ],
  };

  const onSubmit = (values: any) => {
    if (initialData?.id) {
      updateRoute(
        { id: initialData.id, data: values },
        {
          onSuccess: () => {
            onEditModeChange?.(false);
          },
          onError: (error) => {
            console.error("Error updating route:", error);
          },
        }
      );
    }
  };

  const { resetForm, ...restForm } = useCustomForm(formConfig);

  useEffect(() => {
    onExpose?.({ resetForm, isUpdating });
  }, [resetForm, isUpdating, onExpose]);

  return <CustomForm formId={formId} onSubmit={onSubmit} showSubmitButton={false} {...restForm} />;
}
