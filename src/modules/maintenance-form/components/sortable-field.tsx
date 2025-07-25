import { Button } from "@/components/ui/button";
import { FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu, Plus, TrashIcon, X } from "lucide-react";
import { Control, Controller, FieldErrors, useForm, UseFormWatch } from "react-hook-form";
import { FieldBuilder } from "../models/maintenance-form-model";

type FormValues = {
  name: string;
  description: string;
  maintenanceTypeId: string;
  fields: FieldBuilder[];
};

interface SortableFieldProps {
  fieldItem: FormValues["fields"][number];
  index: number;
  control: Control<FormValues>;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  remove: (index: number) => void;
  appendOption: (fieldIndex: number) => void;
  removeOption: (fieldIndex: number, optIndex: number) => void;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<FormValues>;
  isSubmitted: boolean;
}

export default function SortableField({
  fieldItem,
  index,
  control,
  register,
  remove,
  appendOption,
  removeOption,
  watch,
  errors,
  isSubmitted,
}: SortableFieldProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: fieldItem.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  console.log(isSubmitted);

  const type = watch(`fields.${index}.type`);
  const options = watch(`fields.${index}.options`);
  const fieldErrors = errors.fields?.[index];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col mb-2 p-4 bg-accent dark:bg-accent/50 rounded-lg shadow-sm"
      {...attributes}
    >
      <div className="flex">
        {/* Drag handle */}
        {/*< div className="flex flex-col justify-end mr-4">
          <Button
            variant={"outline"}
            {...listeners}
            className="cursor-grab text-lg text-gray-500 p-0 m-0"
          >
            <Menu className="scale-150" />
          </Button>
        </div> */}

        <div className="flex-1 flex gap-4">
          {/* Required */}
          <FormItem className="gap-1">
            <Label>Required</Label>
            <div className="flex items-center bg-card-foreground/5 h-9 rounded px-3">
              <Input
                className="mx-auto h-4 w-4"
                type="checkbox"
                {...register(`fields.${index}.required`)}
              />
            </div>
          </FormItem>

          {/* Name */}
          <FormItem className="gap-1 w-full">
            <Label className={fieldErrors?.name ? "text-red-500" : ""}>Name</Label>
            <Input
              {...register(`fields.${index}.name`, { required: "Field name is required" })}
              placeholder="Field name"
              className={fieldErrors?.name && isSubmitted ? "border-red-500" : ""}
            />
            {isSubmitted && fieldErrors?.name && (
              <FormMessage className="text-red-500 text-sm mt-1">
                {fieldErrors.name.message as string}
              </FormMessage>
            )}
          </FormItem>

          {/* Type */}
          <div className="flex w-full gap-4">
            <Controller
              name={`fields.${index}.type`}
              control={control}
              render={({ field }) => (
                <FormItem className="gap-1 w-full">
                  <Label>Type</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TEXT">Text</SelectItem>
                      <SelectItem value="TEXTAREA">Textarea</SelectItem>
                      <SelectItem value="NUMBER">Number</SelectItem>
                      <SelectItem value="DATE">Date</SelectItem>
                      <SelectItem value="SELECT">Select</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Options for select */}
            {type === "SELECT" && (
              <FormItem className="gap-1">
                <Label>Options</Label>
                <Button type="button" variant={"ghost"} className="border-1" onClick={() => appendOption(index)}>
                  <Plus />
                </Button>
              </FormItem>
            )}
          </div>
        </div>

        {/* Delete button */}
        <div className="flex flex-col justify-end ml-4">
          <Button
            type="button"
            disabled={index === 0}
            variant="outline"
            size="icon"
            onClick={() => remove(index)}
          >
            <TrashIcon className="h-5 w-5 text-red-500" />
          </Button>
        </div>
      </div>

      {type === "SELECT" && (
        <>
          <Separator className="my-3" />
          {options.map((opt: string, idx: number) => {
            const optError = fieldErrors?.options?.[idx];
            return (
              <div key={idx} className="flex items-center mb-2 gap-2 w-full">
                <div className="w-full">
                  <Input
                    {...register(`fields.${index}.options.${idx}`, {
                      validate: (v) => !!v || "Option cannot be empty",
                    })}
                    placeholder="Option value"
                    className={optError && isSubmitted ? "border-red-500" : ""}
                  />
                  {isSubmitted && optError && (
                    <FormMessage className="text-red-500 text-sm mt-1">
                      {(optError as any).message}
                    </FormMessage>
                  )}
                </div>
                <Button type="button" variant="destructive" size="icon" onClick={() => removeOption(index, idx)}>
                  <X />
                </Button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
