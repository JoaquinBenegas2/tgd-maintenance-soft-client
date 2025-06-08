import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import { useEffect } from "react";
import { RouteResponseDto } from "../models/route-model";

interface UpdateRouteFormHookProps {
  initialData?: RouteResponseDto;
  editMode?: boolean;
  isLoading?: boolean;
}

export default function useUpdateRouteForm({
  initialData,
  editMode,
  isLoading,
}: UpdateRouteFormHookProps) {
  const formConfig: CustomFormConfig = {
    fieldClassName: "transition-all disabled:cursor-default disabled:opacity-75",
    formColumns: 4,
    fields: [
      {
        name: "name",
        label: "Name",
        defaultValue: initialData?.name,
        disabled: !editMode,
        validations: { required: true },
        loading: isLoading,
      },
      {
        name: "description",
        type: "textarea",
        label: "Description",
        defaultValue: initialData?.description,
        disabled: !editMode,
        loading: isLoading,
      },
      {
        name: "periodicity_in_days",
        type: "number",
        label: "Periodicity (days)",
        fieldSpan: 2,
        defaultValue: initialData?.periodicity_in_days.toString(),
        disabled: !editMode,
        validations: { required: true },
        loading: isLoading,
      },
      {
        name: "start_date",
        type: "date",
        label: "Start Date",
        fieldSpan: 2,
        defaultValue: initialData?.start_date,
        disabled: !editMode,
        validations: { required: true },
        loading: isLoading,
      },
    ],
  };

  const form = useCustomForm(formConfig);

  useEffect(() => {
    if (initialData) {
      form.resetForm({
        name: initialData.name,
        description: initialData.description,
        periodicity_in_days: initialData.periodicity_in_days.toString(),
        start_date: initialData.start_date,
      });
    }
  }, [initialData]);

  return form;
}
