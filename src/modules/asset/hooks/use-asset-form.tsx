import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import { useGetActiveManufacturers } from "@/modules/manufacturer/handlers/manufacturer-handler";
import { useGetActiveSectors } from "@/modules/sector/handlers/sector-handler";
import { useEffect } from "react";
import { AssetResponseDto } from "../models/asset-model";

interface AssetFormHookProps {
  initialData?: AssetResponseDto;
  editMode?: boolean;
  requestType?: "create" | "update";
  isLoading?: boolean;
}

export default function useAssetForm({
  initialData,
  editMode,
  requestType,
  isLoading,
}: AssetFormHookProps) {
  const { data: sectors } = useGetActiveSectors();
  const { data: manufacturers } = useGetActiveManufacturers();

  const formConfig: CustomFormConfig = {
    formColumns: 3,
    fieldClassName: "transition-all disabled:cursor-default disabled:opacity-75",
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Asset Name",
        fieldSpan: 1,
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
        fieldSpan: 1,
        defaultValue: initialData?.model,
        disabled: !editMode && requestType !== "create",
        validations: {
          required: true,
        },
        loading: isLoading,
      },
      {
        name: "serial_number",
        label: "Serial Number",
        placeholder: "Serial Number",
        fieldSpan: 1,
        defaultValue: initialData?.serial_number,
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
        name: "sector_id",
        label: "Sector",
        placeholder: "Sector",
        fieldSpan: 1,
        defaultValue: initialData?.sector?.id.toString(),
        disabled: !editMode && requestType !== "create",
        options:
          sectors?.map((sector: any) => ({
            value: sector.id.toString(),
            label: sector.name,
          })) || [],
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
        fieldSpan: 1,
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
        type: "date",
        name: "installation_date",
        label: "Installation Date",
        placeholder: "Installation Date",
        fieldSpan: 1,
        defaultValue: initialData?.installation_date,
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
        serial_number: initialData.serial_number,
        description: initialData.description,
        sector_id: initialData.sector?.id.toString(),
        manufacturer_id: initialData.manufacturer?.id.toString(),
        installation_date: initialData.installation_date,
      });
    }
  }, [initialData]);

  return form;
}
