import { ZodString } from "zod";
import { FieldValidations } from "../../models/custom-form-models";
import { applyCheckboxRequiredValidation, CheckboxSchema } from "./checkbox-validations";
import {
  applyDateRequiredValidation,
  applyMaxDateValidation,
  applyMinDateValidation,
  applyOptionalDateValidation,
  DateSchema,
} from "./date-validations";
import {
  applyMaxValidation,
  applyMinValidation,
  applyNumberRequiredValidation,
  NumberSchema,
} from "./number-validations";
import {
  applyMaxLengthValidation,
  applyMinLengthValidation,
  applyPatternValidation,
  applyStringRequiredValidation,
} from "./string-validations";

// ------------------------------------------------------------------------------------------------
// -- String validations
// ------------------------------------------------------------------------------------------------

export const applyStringValidations = (
  validation: ZodString,
  fieldValidations?: FieldValidations
) => {
  validation = applyStringRequiredValidation(
    validation,
    fieldValidations?.required,
    "This field is required"
  );
  validation = applyMinLengthValidation(validation, fieldValidations?.minLength, "Too short");
  validation = applyMaxLengthValidation(validation, fieldValidations?.maxLength, "Too long");
  validation = applyPatternValidation(validation, fieldValidations?.pattern, "Invalid format");

  return validation;
};

// ------------------------------------------------------------------------------------------------
// -- Number validations
// ------------------------------------------------------------------------------------------------
export const applyNumberValidations = (
  validation: NumberSchema,
  fieldValidations?: FieldValidations
) => {
  validation = applyNumberRequiredValidation(
    validation,
    fieldValidations?.required,
    "This field is required"
  );
  validation = applyMinValidation(validation, fieldValidations?.min, "Minimum value not met");
  validation = applyMaxValidation(validation, fieldValidations?.max, "Maximum value exceeded");

  return validation;
};

// ------------------------------------------------------------------------------------------------
// -- Checkbox validations
// ------------------------------------------------------------------------------------------------

export const applyCheckboxValidations = (
  validation: CheckboxSchema,
  fieldValidations?: FieldValidations
) => {
  validation = applyCheckboxRequiredValidation(
    validation,
    fieldValidations?.required,
    "This field is required"
  );

  return validation;
};

// ------------------------------------------------------------------------------------------------
// -- Select and Combobox validations
// ------------------------------------------------------------------------------------------------

export const applySelectAndComboboxValidations = (
  validation: ZodString,
  fieldValidations?: FieldValidations
) => {
  validation = applyStringRequiredValidation(
    validation,
    fieldValidations?.required,
    "Please select an option"
  );

  return validation;
};

// ------------------------------------------------------------------------------------------------
// -- Colorpicker validations
// ------------------------------------------------------------------------------------------------

export const applyColorPickerValidations = (
  validation: ZodString,
  fieldValidations?: FieldValidations
) => {
  validation = applyStringRequiredValidation(
    validation,
    fieldValidations?.required,
    "Please select a color"
  );

  return validation;
};

// ------------------------------------------------------------------------------------------------
// -- Icon selector validations
// ------------------------------------------------------------------------------------------------

export const applyIconSelectorValidations = (
  validation: ZodString,
  fieldValidations?: FieldValidations
) => {
  validation = applyStringRequiredValidation(
    validation,
    fieldValidations?.required,
    "Please select an icon"
  );

  return validation;
};

// ------------------------------------------------------------------------------------------------
// -- Date validations
// ------------------------------------------------------------------------------------------------

export const applyDateValidations = (
  validation: DateSchema,
  fieldValidations?: FieldValidations
): DateSchema => {
  if (fieldValidations?.required) {
    validation = applyDateRequiredValidation(
      validation,
      fieldValidations.required,
      "This field is required"
    );
  } else {
    validation = applyOptionalDateValidation(validation);
  }

    validation = applyMinDateValidation(
    validation,
    fieldValidations?.from,
    "Minimum date not met"
  );
  validation = applyMaxDateValidation(
    validation,
    fieldValidations?.to,
    "Maximum date exceeded"
  );

  return validation;
};
