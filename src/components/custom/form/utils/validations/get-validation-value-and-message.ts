import { ValidationRule } from "../../models/custom-form-models";

export const getValidationValue = <T>(rule: ValidationRule<T> | null | undefined): T => {
  if (rule && typeof rule === "object" && "value" in rule) {
    return rule.value;
  }

  return rule as T;
};

export const getValidationMessage = (rule: ValidationRule<any>, defaultMessage: string): string => {
  return rule && typeof rule === "object" && "message" in rule ? rule.message : defaultMessage;
};
