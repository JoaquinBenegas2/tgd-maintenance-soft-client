import React from "react";
import { InputTypeProps } from "../../models/custom-form-models";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface FieldTypeInterface {
  fieldType: "text" | "email" | "number" | "password";
}

export default function BasicInput({
  field,
  form,
  fieldType,
  className,
}: InputTypeProps & FieldTypeInterface) {
  return (
    <Controller
      name={field.name}
      control={form.control}
      defaultValue={field.defaultValue ?? ""}
      render={({ field: controllerField }) => (
        <Input
          id={field.name}
          type={fieldType}
          placeholder={field.placeholder}
          {...controllerField}
          className={"focus-visible:ring-0" + " " + className}
          disabled={field.disabled}
          readOnly={field.readOnly}
        />
      )}
    />
  );
}
