import CustomForm from "@/components/custom/form/app-custom-form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import useElementForm from "../hooks/use-element-form";
import { ElementResponseDto } from "../models/element-model";
import {
  useUpdateAssetComponentElement,
  useCreateAssetComponentElement,
} from "../handlers/element-handler";

interface ElementRequestFormProps {
  assetId?: number;
  componentId?: number;
  initialData?: ElementResponseDto;
  requestType?: "create" | "update";
  editMode?: boolean;
  onEditModeChange?: (editMode: boolean) => void;
  onExpose?: (utils: { resetForm: () => void; isUpdating: boolean }) => void;
  formId?: string;
}

export default function ElementRequestForm({
  assetId,
  componentId,
  initialData,
  requestType = "create",
  editMode,
  onEditModeChange,
  onExpose,
  formId,
}: ElementRequestFormProps) {
  const { mutate: createElement, isPending: isCreating } = useCreateAssetComponentElement();
  const { mutate: updateElement, isPending: isUpdating } = useUpdateAssetComponentElement();

  const { resetForm, ...restForm } = useElementForm({
    initialData: initialData,
    requestType,
    editMode,
  });

  const onSubmit = (values: any) => {
    if (requestType === "update" && initialData?.id && assetId && componentId) {
      updateElement(
        { assetId, componentId, elementId: initialData.id, data: values },
        {
          onSuccess: () => {
            onEditModeChange?.(false);
          },
          onError: (error) => {
            console.error("Error updating element:", error);
          },
        }
      );
    } else {
      if (assetId && componentId) {
        createElement(
          { assetId, componentId, data: values },
          {
            onSuccess: () => {
              resetForm();
            },
            onError: (error) => {
              console.error("Error creating element:", error);
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
