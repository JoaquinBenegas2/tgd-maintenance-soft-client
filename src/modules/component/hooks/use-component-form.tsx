import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import { useGetAllManufacturers } from "@/modules/manufacturer/handlers/manufacturer-handler";
import { useEffect } from "react";
import { ComponentResponseDto } from "../models/component-model";

interface ComponentFormHookProps {
  initialData?: ComponentResponseDto;
  editMode?: boolean;
  requestType?: "create" | "update";
  isLoading?: boolean;
}

export default function useComponentForm({
  initialData,
  editMode,
  requestType,
  isLoading,
}: ComponentFormHookProps) {
  const { data: manufacturers } = useGetAllManufacturers();

  const formConfig: CustomFormConfig = {
    formColumns: 4,
    fieldClassName: "transition-all disabled:cursor-default disabled:opacity-75",
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Component Name",
        fieldSpan: 2,
        defaultValue: initialData?.name,
        disabled: !editMode && requestType !== "create",
        validations: {
          required: true,
        },
        loading: isLoading,
      },
      {
        name: "model",
        label: "Model",
        placeholder: "Model",
        fieldSpan: 2,
        defaultValue: initialData?.model,
        disabled: !editMode && requestType !== "create",
        validations: {
          required: true,
        },
        loading: isLoading,
      },
      {
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder: "Description",
        defaultValue: initialData?.description,
        disabled: !editMode && requestType !== "create",
        validations: {
          required: true,
        },
        loading: isLoading,
      },
      {
        type: "select",
        name: "manufacturer_id",
        label: "Manufacturer",
        placeholder: "Manufacturer",
        fieldSpan: 2,
        defaultValue: initialData?.manufacturer?.id.toString(),
        disabled: !editMode && requestType !== "create",
        options:
          manufacturers?.map((manufacturer: any) => ({
            value: manufacturer.id.toString(),
            label: manufacturer.name,
          })) || [],
        validations: {
          required: true,
        },
        loading: isLoading,
      },
      {
        name: "serial_number",
        label: "Serial Number",
        placeholder: "Serial Number",
        fieldSpan: 2,
        defaultValue: initialData?.serial_number,
        disabled: !editMode && requestType !== "create",
        validations: {
          required: true,
        },
        loading: isLoading,
      },
    ],
  };

  const form = useCustomForm(formConfig);

  useEffect(() => {
    if (initialData) {
      form.resetForm({
        name: initialData.name,
        model: initialData.model,
        description: initialData.description,
        manufacturer_id: initialData.manufacturer?.id.toString(),
        serial_number: initialData.serial_number,
      });
    }
  }, [initialData]);

  return form;
}
