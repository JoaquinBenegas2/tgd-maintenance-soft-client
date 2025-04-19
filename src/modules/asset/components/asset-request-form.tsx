import CustomForm from "@/components/custom/form/app-custom-form";
import { Button } from "@/components/ui/button";
import { useCreateAsset, useUpdateAsset } from "../handlers/asset-handler";
import useAssetForm from "../hooks/use-asset-form";
import { AssetResponseDto } from "../models/asset-model";
import { useEffect } from "react";

interface AssetRequestFormProps {
  initialData?: AssetResponseDto;
  requestType?: "create" | "update";
  editMode?: boolean;
  onEditModeChange?: (editMode: boolean) => void;
  onExpose?: (utils: { resetForm: () => void; isUpdating: boolean }) => void;
  formId?: string;
}

export default function AssetRequestForm({
  initialData,
  requestType = "create",
  editMode,
  onEditModeChange,
  onExpose,
  formId,
}: AssetRequestFormProps) {
  const { mutate: createAsset, isPending: isCreating } = useCreateAsset();
  const { mutate: updateAsset, isPending: isUpdating } = useUpdateAsset();

  const { resetForm, ...restForm } = useAssetForm({
    initialData: initialData,
    requestType,
    editMode,
    isLoading: requestType === "update" && !initialData,
  });

  const onSubmit = (values: any) => {
    if (requestType === "update" && initialData?.id) {
      updateAsset(
        { id: initialData.id, data: values },
        {
          onSuccess: () => {
            onEditModeChange?.(false);
          },
          onError: (error) => {
            console.error("Error updating asset:", error);
          },
        }
      );
    } else {
      createAsset(values, {
        onSuccess: () => {
          resetForm();
        },
        onError: (error) => {
          console.error("Error creating asset:", error);
        },
      });
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
        <Button className="mt-2 col-span-3" disabled={isCreating || isUpdating}>
          Save
        </Button>
      }
      {...restForm}
    />
  );
}
