import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { InputTypeProps } from "../../models/custom-form-models";

export default function CheckboxInput({ field, form }: InputTypeProps) {
  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: controllerField }) => (
        <Checkbox
          id={field.name}
          {...controllerField}
          checked={controllerField.value}
          onCheckedChange={controllerField.onChange}
        />
      )}
    />
  );
}
