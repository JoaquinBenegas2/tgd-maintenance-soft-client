import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import { InputTypeProps } from "../../models/custom-form-models";

export default function TextareaInput({ field, form, className }: InputTypeProps) {
  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: controllerField }) => (
        <Textarea id={field.name} placeholder={field.placeholder} {...controllerField} className={className} />
      )}
    />
  );
}
