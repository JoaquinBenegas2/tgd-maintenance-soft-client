import CustomForm from "@/components/custom/form/app-custom-form";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import { Button } from "@/components/ui/button";
import { useCreateSector, useUpdateSector } from "../handlers/sector-handler";
import { SectorResponseDto } from "../models/sector-model";

interface SectorRequestFormProps {
  initialData?: SectorResponseDto;
  isUpdating?: boolean;
}

export default function SectorRequestForm({ initialData, isUpdating }: SectorRequestFormProps) {
  const { mutate: createSector, isPending: isCreating } = useCreateSector();
  const { mutate: updateSector, isPending: isUpdatingSector } = useUpdateSector();

  const onSubmit = (values: any) => {
    if (isUpdating && initialData?.id) {
      updateSector(
        { id: initialData.id, data: values },
        {
          onError: (error) => {
            console.error("Error updating sector:", error);
          },
        }
      );
    } else {
      createSector(values, {
        onSuccess: () => {
          resetForm();
        },
        onError: (error) => {
          console.error("Error creating sector:", error);
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
        name: "description",
        label: "Description",
        defaultValue: initialData?.description,
      },
    ],
  };

  const { resetForm, ...restForm } = useCustomForm(formConfig);

  return (
    <CustomForm
      onSubmit={onSubmit}
      submitButton={
        <Button className="mt-2" disabled={isCreating || isUpdatingSector}>
          Save
        </Button>
      }
      {...restForm}
    />
  );
}
