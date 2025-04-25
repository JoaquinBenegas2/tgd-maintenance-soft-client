import {
  CustomFormConfig,
  FormFieldConfig,
} from "@/components/custom/form/models/custom-form-models";
import {
  FormResponseDto,
  FormWithoutMaintenanceTypeResponseDto,
} from "../models/maintenance-form-model";
import { MaintenanceAnswerResponseDto } from "@/modules/maintenance/models/maintenance-model";

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

export function generateFormConfig(
  formDto?: FormResponseDto | FormWithoutMaintenanceTypeResponseDto,
  answers?: MaintenanceAnswerResponseDto[]
): CustomFormConfig {
  const fields: FormFieldConfig[] =
    formDto?.fields
      ?.sort((a, b) => a.order - b.order)
      .map((field) => {
        const fieldName = field.name.toLowerCase().split(" ").join("_");

        const answerValue = answers?.find((ans) => ans.form_field.id === field.id)?.value;

        const baseField: FormFieldConfig = {
          name: fieldName,
          label: field.name,
          type: mapFieldType(field.type),
          defaultValue: answerValue ?? "",
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
        if (["SELECT", "COMBOBOX", "RADIO"].includes(field.type) && field.options?.length) {
          baseField.options = field.options.map((opt) => ({
            label: opt.value,
            value: opt.value,
          }));
        }

        return baseField;
      }) ?? [];

  return {
    fields,
  };
}
