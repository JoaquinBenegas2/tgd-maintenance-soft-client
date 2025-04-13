import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GRID_COLUMNS } from "../constants/constants";
import { CustomFormConfig, UiFields } from "../models/custom-form-models";
import { generateValidationSchema } from "../utils/validations/generate-validation-schema";
import { renderField } from "../utils/renderers/field-renderers";

export default function useCustomForm<T>(formConfig: CustomFormConfig) {
  const { fields, formColumns } = formConfig;

  const formSchema = useMemo(() => generateValidationSchema(fields), [fields]);

  const defaultValues = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue ?? "";
      return acc;
    }, {} as Record<string, any>);
  }, [fields]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const gridColumnClass = GRID_COLUMNS[(formColumns as keyof typeof GRID_COLUMNS) || 1];

  const resetForm = useCallback(() => form.reset(), [form]);

  const uiFields = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.name as keyof T] = {
        ...field,
        key: field.name as keyof T,
        name: field.name,
        control: form.control,
      };
      return acc;
    }, {} as UiFields<T>);
  }, [fields, form.control]);

  return {
    form,
    fields,
    uiFields,
    formColumns,
    renderField: (field: any, className?: string) => renderField(field, form, className),
    gridColumnClass,
    resetForm,
  };
}
