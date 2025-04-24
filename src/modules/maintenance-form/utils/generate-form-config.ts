import { CustomFormConfig, FormFieldConfig } from "@/components/custom/form/models/custom-form-models";
import { FormResponseDto, FormWithoutMaintenanceTypeResponseDto } from "../models/maintenance-form-model";


/**
 * Mapea un FormFieldType del backend (enum string) a uno del frontend (FormFieldType string literal union)
 */
function mapFieldType(type: string): FormFieldConfig["type"] {
  const typeMap: Record<string, FormFieldConfig["type"]> = {
    TEXT: "text",
    TEXTAREA: "textarea",
    NUMBER: "number",
    DATE: "date",
    SELECT: "select",
    CHECKBOX: "checkbox",
    COMBOBOX: "combobox",
    RADIO: "radio",
    FILE: "file",
  };

  return typeMap[type.toUpperCase()] ?? "text";
}

export function generateFormConfig(formDto: FormResponseDto | FormWithoutMaintenanceTypeResponseDto): CustomFormConfig {
  const fields: FormFieldConfig[] = formDto.fields
    .sort((a, b) => a.order - b.order)
    .map((field) => {
      const baseField: FormFieldConfig = {
        name: field.name.toLowerCase().split(" ").join("_"),
        label: field.name,
        type: mapFieldType(field.type),
        defaultValue: "",
        placeholder: field.name,
        validations: field.required
          ? {
              required: {
                value: true,
                message: `${field.name} is required`,
              },
            }
          : undefined,
      };

      // Si el campo tiene opciones (ej: select, radio, combobox)
      if (
        ["SELECT", "COMBOBOX", "RADIO"].includes(field.type) &&
        field.options?.length
      ) {
        baseField.options = field.options.map((opt) => ({
          label: opt.value,
          value: opt.value,
        }));
      }

      return baseField;
    });

  return {
    fields,
  };
}
