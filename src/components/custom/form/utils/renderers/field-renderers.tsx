import {
  BasicInput,
  TextareaInput,
  DateInput,
  SelectInput,
  ComboboxInput,
  CheckboxInput,
  ColorPickerInput,
} from "../../components/input-types";
import { FormFieldConfig } from "../../models/custom-form-models";
import { UseFormReturn } from "react-hook-form";

export const renderField = (
  field: FormFieldConfig,
  form: UseFormReturn<any>,
  className?: string
) => {
  const fieldType = field.type || "text";

  switch (fieldType) {
    case "text":
    case "email":
    case "number":
      return <BasicInput field={field} form={form} fieldType={fieldType} className={className} />;

    case "date":
      return <DateInput field={field} form={form} className={className} />;

    case "textarea":
      return <TextareaInput field={field} form={form} className={className} />;

    case "select":
      return <SelectInput field={field} form={form} className={className} />;

    case "combobox":
      return <ComboboxInput field={field} form={form} className={className} />;

    case "checkbox":
      return <CheckboxInput field={field} form={form} className={className} />;

    case "colorpicker":
      return <ColorPickerInput field={field} form={form} className={className} />;

    default:
      return null;
  }
};
