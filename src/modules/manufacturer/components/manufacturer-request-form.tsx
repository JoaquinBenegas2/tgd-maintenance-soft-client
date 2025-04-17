import CustomForm from "@/components/custom/form/app-custom-form";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import { Button } from "@/components/ui/button";
import { useCreateManufacturer, useUpdateManufacturer } from "../handlers/manufacturer-handler";
import { ManufacturerResponseDto } from "../models/manufacturer-model";

interface ManufacturerRequestFormProps {
  initialData?: ManufacturerResponseDto;
  isUpdating?: boolean;
}

export default function ManufacturerRequestForm({
  initialData,
  isUpdating,
}: ManufacturerRequestFormProps) {
  const { mutate: createManufacturer, isPending: isCreating } = useCreateManufacturer();
  const { mutate: updateManufacturer, isPending: isUpdatingManufacturer } = useUpdateManufacturer();

  const onSubmit = (values: any) => {
    if (isUpdating && initialData?.id) {
      updateManufacturer(
        { id: initialData.id, data: values },
        {
          onError: (error) => {
            console.error("Error updating manufacturer:", error);
          },
        }
      );
    } else {
      createManufacturer(values, {
        onSuccess: () => {
          resetForm();
        },
        onError: (error) => {
          console.error("Error creating manufacturer:", error);
        },
      });
    }
  };

  const formConfig: CustomFormConfig = {
    fields: [
      {
        name: "name",
        label: "Name",
        defaultValue: initialData?.name,
        validations: {
          required: true,
        },
      },
      {
        type: "textarea",
        name: "country",
        label: "Country",
        defaultValue: initialData?.country,
      },
    ],
  };

  const { resetForm, ...restForm } = useCustomForm(formConfig);

  return (
    <CustomForm
      onSubmit={onSubmit}
      submitButton={
        <Button className="mt-2" disabled={isCreating || isUpdatingManufacturer}>
          Save
        </Button>
      }
      {...restForm}
    />
  );
}
