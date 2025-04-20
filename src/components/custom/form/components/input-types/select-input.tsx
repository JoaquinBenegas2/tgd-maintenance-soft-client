import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { InputTypeProps } from "../../models/custom-form-models";

export default function SelectInput({ field, form, className }: InputTypeProps) {
  return (
    <Controller
      name={field.name}
      control={form.control}
      defaultValue={field.defaultValue ?? ""}
      render={({ field: controllerField }) => (
        <Select
          name={controllerField.name}
          value={controllerField.value}
          onValueChange={controllerField.onChange}
          disabled={field.disabled}
        >
          <SelectTrigger className={`w-full ${className}`}>
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {field.optionsTitle && <SelectLabel>{field.optionsTitle}</SelectLabel>}
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
