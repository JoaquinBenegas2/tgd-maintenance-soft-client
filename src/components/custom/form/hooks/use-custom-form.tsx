"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GRID_COLUMNS } from "../constants/constants";
import { CustomFormConfig, UiFields } from "../models/custom-form-models";
import { generateValidationSchema } from "../utils/validations/generate-validation-schema";
import { renderField } from "../utils/renderers/field-renderers";
import useIsMobile from "@/hooks/is-mobile/use-is-mobile";

export default function useCustomForm<T>(formConfig: CustomFormConfig) {
  const isMobile = useIsMobile(768);

  const { fields, formColumns, fieldClassName } = formConfig;

  const formSchema = useMemo(() => generateValidationSchema(fields), [fields]);

  const defaultValues = useMemo(() => {
    return fields.reduce((acc, field) => {
      const defaultValue = field.defaultValue;

      if (defaultValue === null || defaultValue === undefined) {
        return acc;
      }

      acc[field.name] = defaultValue;
      return acc;
    }, {} as Record<string, any>);
  }, [fields]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const gridColumnClass =
    GRID_COLUMNS[(!isMobile && (formColumns as keyof typeof GRID_COLUMNS)) || 1];

  const resetForm = useCallback(
    (values?: Partial<T>) => {
      form.reset(values ?? undefined);
    },
    [form]
  );

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
    renderField: (field: any, className?: string) =>
      renderField(field, form, fieldClassName || className),
    gridColumnClass,
    resetForm,
  };
}
