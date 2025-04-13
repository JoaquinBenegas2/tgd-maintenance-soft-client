import { ZodDate, ZodEffects, ZodString, ZodType, ZodUnion } from "zod";
import { ValidationRule } from "../../models/custom-form-models";
import { getValidationMessage, getValidationValue } from "./get-validation-value-and-message";

export type DateSchema =
  | ZodUnion<[ZodString, ZodDate]>
  | ZodEffects<ZodUnion<[ZodString, ZodDate]>, Date | null>;

export const applyDateRequiredValidation = (
  validation: DateSchema,
  rule: ValidationRule<boolean> | undefined,
  defaultMessage: string
): DateSchema => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value) {
      return (validation as ZodType<any, any, any>).refine(
        (date) => date !== null && date !== undefined && date !== "",
        message
      ) as DateSchema;
    }
  }
  return validation;
};

export const applyMinDateValidation = (
  validation: DateSchema,
  rule: ValidationRule<Date> | undefined,
  defaultMessage: string
): DateSchema => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value) {
      return (validation as ZodType<any, any, any>).refine(
        (dateVal: unknown) => dateVal instanceof Date && dateVal.getTime() >= value.getTime(),
        message
      ) as DateSchema;
    }
  }

  return validation;
};

export const applyMaxDateValidation = (
  validation: DateSchema,
  rule: ValidationRule<Date> | undefined,
  defaultMessage: string
): DateSchema => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value) {
      return (validation as ZodType<any, any, any>).refine(
        (dateVal: unknown) => dateVal instanceof Date && dateVal.getTime() <= value.getTime(),
        message
      ) as DateSchema;
    }
  }

  return validation;
};

export const applyOptionalDateValidation = (validation: DateSchema): DateSchema => {
  return (validation as ZodType<any, any, any>).optional() as unknown as DateSchema;
};
