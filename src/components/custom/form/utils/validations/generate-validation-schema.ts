import { z } from "zod";
import { CustomValidator, FormFieldConfig, ValidationRule } from "../../models/custom-form-models";
import {
  applyCheckboxValidations,
  applyColorPickerValidations,
  applyDateValidations,
  applyIconSelectorValidations,
  applyNumberValidations,
  applySelectAndComboboxValidations,
  applyStringValidations,
} from "./validators";

export const generateValidationSchema = (fields: FormFieldConfig[]) => {
  const schemaObject = fields.reduce((acc, field) => {
    let validation;

    const fieldType = field.type || "text";

    switch (fieldType) {
      case "text":
      case "textarea":
      case "password":
      case "email":
        validation = applyStringValidations(z.string(), field.validations);
        break;

      case "number":
        validation = applyNumberValidations(z.union([z.string(), z.number()]), field.validations);
        break;

      case "checkbox":
        validation = applyCheckboxValidations(
          z.union([z.string(), z.boolean()]),
          field.validations
        );
        break;

      case "date":
        validation = applyDateValidations(z.union([z.string(), z.date()]), field.validations);
        break;

      case "select":
      case "combobox":
        validation = applySelectAndComboboxValidations(z.string(), field.validations);
        break;

      case "colorpicker":
        validation = applyColorPickerValidations(z.string(), field.validations);
        break;

      case "icon":
        validation = applyIconSelectorValidations(z.string(), field.validations);
        break;

      default:
        validation = z.string();
    }

    acc[field.name] = validation;
    return acc;
  }, {} as Record<string, any>);

  const baseSchema = z.object(schemaObject);

  const formSchema = baseSchema.superRefine((values, ctx) => {
    fields.forEach((field) => {
      if (field.validations?.custom) {
        field.validations.custom.forEach((rule: ValidationRule<CustomValidator>) => {
          const validatorFn = typeof rule === "object" ? rule.value : rule;
          const fallbackMessage =
            typeof rule === "object" ? rule.message : "Custom validation failed";

          const result = validatorFn(values);

          if (!result) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: fallbackMessage,
              path: [field.name],
            });
          }
        });
      }
    });
  });

  return formSchema;
};
