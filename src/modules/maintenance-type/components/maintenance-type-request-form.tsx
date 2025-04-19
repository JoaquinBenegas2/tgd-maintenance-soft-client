import CustomForm from "@/components/custom/form/app-custom-form";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import { Button } from "@/components/ui/button";
import { useCreateMaintenanceType, useUpdateMaintenanceType } from "../handlers/maintenance-type-handler";
import { MaintenanceTypeResponseDto } from "../models/maintenance-type-model";

interface MaintenanceTypeRequestFormProps {
  initialData?: MaintenanceTypeResponseDto;
  isUpdating?: boolean;
}

export default function MaintenanceTypeRequestForm({ initialData, isUpdating }: MaintenanceTypeRequestFormProps) {
  const { mutate: createMaintenanceType, isPending: isCreating } = useCreateMaintenanceType();
  const { mutate: updateMaintenanceType, isPending: isUpdatingMaintenanceType } = useUpdateMaintenanceType();

  const onSubmit = (values: any) => {
    if (isUpdating && initialData?.id) {
      updateMaintenanceType(
        { id: initialData.id, data: values },
        {
          onError: (error) => {
            console.error("Error updating maintenanceType:", error);
          },
        }
      );
    } else {
      createMaintenanceType(values, {
        onSuccess: () => {
          resetForm();
        },
        onError: (error) => {
          console.error("Error creating maintenanceType:", error);
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
        <Button className="mt-2" disabled={isCreating || isUpdatingMaintenanceType}>
          Save
        </Button>
      }
      {...restForm}
    />
  );
}
