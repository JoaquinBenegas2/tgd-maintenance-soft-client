import CustomForm from "@/components/custom/form/app-custom-form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useCreateAssetComponent, useUpdateAssetComponent } from "../handlers/component-handler";
import useComponentForm from "../hooks/use-component-form";
import { ComponentResponseDto } from "../models/component-model";

interface ComponentRequestFormProps {
  assetId?: number;
  initialData?: ComponentResponseDto;
  requestType?: "create" | "update";
  editMode?: boolean;
  onEditModeChange?: (editMode: boolean) => void;
  onExpose?: (utils: { resetForm: () => void; isUpdating: boolean }) => void;
  formId?: string;
}

export default function ComponentRequestForm({
  assetId,
  initialData,
  requestType = "create",
  editMode,
  onEditModeChange,
  onExpose,
  formId,
}: ComponentRequestFormProps) {
  const { mutate: createComponent, isPending: isCreating } = useCreateAssetComponent();
  const { mutate: updateComponent, isPending: isUpdating } = useUpdateAssetComponent();

  const { resetForm, ...restForm } = useComponentForm({
    initialData: initialData,
    requestType,
    editMode,
  });

  const onSubmit = (values: any) => {
    if (requestType === "update" && initialData?.id && assetId) {
      updateComponent(
        { assetId: assetId, componentId: initialData.id, data: values },
        {
          onSuccess: () => {
            onEditModeChange?.(false);
          },
          onError: (error) => {
            console.error("Error updating component:", error);
          },
        }
      );
    } else {
      if (assetId) {
        createComponent(
          { assetId: assetId, data: values },
          {
            onSuccess: () => {
              resetForm();
            },
            onError: (error) => {
              console.error("Error creating component:", error);
            },
          }
        );
      }
    }
  };

  useEffect(() => {
    onExpose?.({ resetForm, isUpdating });
  }, [resetForm, isUpdating, onExpose]);

  return (
    <CustomForm
      formId={formId}
      onSubmit={onSubmit}
      showSubmitButton={requestType === "create"}
      submitButton={
        <Button className="mt-2 col-span-4" disabled={isCreating || isUpdating}>
          Save
        </Button>
      }
      {...restForm}
    />
  );
}
