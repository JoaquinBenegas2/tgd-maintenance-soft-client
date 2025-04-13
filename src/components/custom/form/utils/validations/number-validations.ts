import { ZodEffects, ZodNumber, ZodString, ZodType, ZodUnion } from "zod";
import { ValidationRule } from "../../models/custom-form-models";
import { getValidationMessage, getValidationValue } from "./get-validation-value-and-message";

export type NumberSchema =
  | ZodUnion<[ZodString, ZodNumber]>
  | ZodEffects<ZodUnion<[ZodString, ZodNumber]>, number | null>;

export const applyNumberRequiredValidation = (
  validation: NumberSchema,
  rule: ValidationRule<boolean> | undefined,
  defaultMessage: string
) => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value)
      return (validation as ZodType<any, any, any>).refine((num) => {
        return num !== null && num !== undefined && num !== "";
      }, message) as NumberSchema;
  }

  return validation;
};

export const applyMinValidation = (
  validation: NumberSchema,
  rule: ValidationRule<number> | undefined,
  defaultMessage: string
) => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value) {
      return (validation as ZodType<any, any, any>).refine((num) => {
        const number = Number(num);
        return number >= value;
      }, message) as NumberSchema;
    }
  }

  return validation;
};

export const applyMaxValidation = (
  validation: NumberSchema,
  rule: ValidationRule<number> | undefined,
  defaultMessage: string
) => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value) {
      return (validation as ZodType<any, any, any>).refine((num) => {
        const number = Number(num);
        return number <= value;
      }, message) as NumberSchema;
    }
  }

  return validation;
};
