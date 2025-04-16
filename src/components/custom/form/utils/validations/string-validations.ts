import { ZodString } from "zod";
import { getValidationMessage, getValidationValue } from "./get-validation-value-and-message";
import { ValidationRule } from "../../models/custom-form-models";

export const applyStringRequiredValidation = (
  validation: ZodString,
  rule: ValidationRule<boolean> | undefined,
  defaultMessage: string
) => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value) return validation.nonempty(message);
  }

  return validation;
};

export const applyMinLengthValidation = (
  validation: ZodString,
  rule: ValidationRule<number> | undefined,
  defaultMessage: string
) => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value) return validation.min(value, message);
  }

  return validation;
};

export const applyMaxLengthValidation = (
  validation: ZodString,
  rule: ValidationRule<number> | undefined,
  defaultMessage: string
) => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value) return validation.max(value, message);
  }

  return validation;
};

export const applyPatternValidation = (
  validation: ZodString,
  rule: ValidationRule<RegExp> | undefined,
  defaultMessage: string
) => {
  if (rule) {
    const value = getValidationValue(rule);
    const message = getValidationMessage(rule, defaultMessage);

    if (value) return validation.regex(new RegExp(value), message);
  }

  return validation;
};