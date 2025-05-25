import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import {
  useGetActiveManufacturers
} from "@/modules/manufacturer/handlers/manufacturer-handler";
import { parse } from "date-fns";
import { useEffect } from "react";
import { ElementResponseDto } from "../models/element-model";

interface ElementFormHookProps {
  initialData?: ElementResponseDto;
  editMode?: boolean;
  requestType?: "create" | "update";
  isLoading?: boolean;
}

export default function useElementForm({
  initialData,
  editMode,
  requestType,
  isLoading,
}: ElementFormHookProps) {
  const { data: manufacturers } = useGetActiveManufacturers();

  const lastReplacementDate =
    initialData?.last_replacement_date && initialData?.last_replacement_date !== null
      ? parse(initialData.last_replacement_date, "yyyy-MM-dd", new Date())
      : undefined;

  const lastMaintenanceDate =
    initialData?.last_maintenance_date && initialData?.last_maintenance_date !== null
      ? parse(initialData.last_maintenance_date, "yyyy-MM-dd", new Date())
      : undefined;

  const formConfig: CustomFormConfig = {
    formColumns: 4,
    fieldClassName: "transition-all disabled:cursor-default disabled:opacity-75",
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Element Name",
        fieldSpan: 2,
        defaultValue: initialData?.name,
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
        name: "last_maintenance_date",
        type: "date",
        label: "Last Maintenance Date",
        placeholder: "Last Maintenance Date",
        defaultValue: lastMaintenanceDate,
        disabled: true,
        hideField: requestType === "create",
        loading: isLoading,
      },
      {
        name: "last_replacement_date",
        type: "date",
        label: "Last Replacement Date",
        placeholder: "Last Replacement Date",
        defaultValue: lastReplacementDate,
        disabled: true,
        hideField: requestType === "create",
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
        manufacturer_id: initialData.manufacturer?.id.toString(),
        last_maintenance_date: initialData.last_maintenance_date ?? undefined,
        last_replacement_date: initialData.last_replacement_date ?? undefined,
      });
    }
  }, [initialData]);

  return form;
}
