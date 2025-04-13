import { ZodBoolean, ZodEffects, ZodString, ZodType, ZodUnion } from "zod";
import { ValidationRule } from "../../models/custom-form-models";
import { getValidationMessage, getValidationValue } from "./get-validation-value-and-message";

export type CheckboxSchema =
  | ZodUnion<[ZodString, ZodBoolean]>
  | ZodEffects<ZodUnion<[ZodString, ZodBoolean]>, boolean | null>;

export const applyCheckboxRequiredValidation = (
  validation: CheckboxSchema,
  rule: ValidationRule<boolean> | undefined,
  defaultMessage: string
) => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value)
      return (validation as ZodType<any, any, any>).refine(
        (checked) => checked === true,
        message
      ) as CheckboxSchema;
  }

  return validation;
};
