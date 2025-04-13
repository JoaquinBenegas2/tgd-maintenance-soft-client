import { Controller } from "react-hook-form";
import { ColorPicker } from "@/components/ui/color-picker";
import { InputTypeProps } from "../../models/custom-form-models";

export default function ColorPickerInput({ field, form }: InputTypeProps) {
  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: controllerField }) => (
        <div className="w-full flex gap-2">
          <ColorPicker id={field.name} {...controllerField} />
          <div
            className="h-9 flex-1 rounded-md border border-input shadow-sm"
            style={{ padding: "6px" }}
          >
            <div
              className="w-full h-full rounded-md"
              style={{ backgroundColor: controllerField.value }}
            ></div>
          </div>
        </div>
      )}
    />
  );
}
