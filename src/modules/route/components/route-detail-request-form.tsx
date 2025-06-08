import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import React, { useEffect } from "react";
import { RouteResponseDto } from "../models/route-model";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { useUpdateRoute } from "../handlers/route-handler";
import CustomForm from "@/components/custom/form/app-custom-form";
import useUpdateRouteForm from "../hooks/use-update-route-form";

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

  const { resetForm, ...restForm } = useUpdateRouteForm({
    initialData: initialData,
    editMode,
    isLoading: !initialData,
  });

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

  useEffect(() => {
    onExpose?.({ resetForm, isUpdating });
  }, [resetForm, isUpdating, onExpose]);

  return <CustomForm formId={formId} onSubmit={onSubmit} showSubmitButton={false} {...restForm} />;
}
