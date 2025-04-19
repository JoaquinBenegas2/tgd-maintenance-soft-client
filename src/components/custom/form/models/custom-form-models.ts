import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  UseFormReturn,
  UseFormStateReturn,
} from "react-hook-form";

export type FormFieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "email"
  | "password"
  | "select"
  | "combobox"
  | "radio"
  | "checkbox"
  | "colorpicker"
  | "icon"
  | "file"
  | "boolean";

export interface SelectOption {
  label: string;
  value: string;
}

export type CustomValidator = (formValues: Record<string, any>) => boolean;

export type ValidationRule<T> = T | { value: T; message?: string };

export interface FieldValidations {
  required?: ValidationRule<boolean>;
  min?: ValidationRule<number>;
  max?: ValidationRule<number>;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  pattern?: ValidationRule<RegExp>;
  from?: ValidationRule<Date>;
  to?: ValidationRule<Date>;
  custom?: ValidationRule<CustomValidator>[];
}

export interface BaseFormFieldConfig {
  name: string;
  type?: FormFieldType;
  options?: SelectOption[];
  optionsTitle?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  validations?: FieldValidations;
  fieldSpan?: number;
  hideField?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
}

type DateFieldConfig = Omit<BaseFormFieldConfig, "type" | "defaultValue"> & {
  type: "date";
  defaultValue: Date;
};

type NumberFieldConfig = Omit<BaseFormFieldConfig, "type" | "defaultValue"> & {
  type: "number";
  defaultValue: number | string;
};

type BooleanFieldConfig = Omit<BaseFormFieldConfig, "type" | "defaultValue"> & {
  type: "boolean";
  defaultValue: boolean;
};

export type FormFieldConfig = BaseFormFieldConfig | DateFieldConfig | NumberFieldConfig | BooleanFieldConfig;

export interface CustomFormConfig {
  formColumns?: number;
  fields: FormFieldConfig[];
  fieldClassName?: string;
}

type ReactHookFormRenderArgs = {
  field: ControllerRenderProps;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<any>;
};

export type UiFields<T> = {
  [K in keyof T]: {
    key: K;
    name: string;
    label?: string;
    control: Control;
    render?: ({ field, fieldState, formState }: ReactHookFormRenderArgs) => React.ReactElement;
  };
};

export interface InputTypeProps {
  field: FormFieldConfig;
  form: UseFormReturn;
  className?: string;
}
