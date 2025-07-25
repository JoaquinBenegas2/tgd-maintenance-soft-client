import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllMaintenanceTypes } from "@/modules/maintenance-type/handlers/maintenance-type-handler";
import { MaintenanceTypeResponseDto } from "@/modules/maintenance-type/models/maintenance-type-model";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useCreateForm } from "../handlers/maintenance-form-handler";
import { FieldBuilder } from "../models/maintenance-form-model";
import SortableField from "./sortable-field";

type FormValues = {
  name: string;
  description: string;
  maintenanceTypeId: string;
  fields: FieldBuilder[];
};

export default function MaintenanceFormRequestFormBuilder() {
  const { data: maintenanceTypes = [] } = useGetAllMaintenanceTypes();
  const { mutateAsync: createMaintenanceForm, isPending: isCreating } = useCreateForm();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      maintenanceTypeId: maintenanceTypes[0]?.id.toString() || "",
      fields: [{ id: uuidv4(), name: "", type: "TEXT", required: true, options: [] }],
    },
    mode: "onSubmit",
    // No se puede validar el array aquí, se hace en el submit
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = form;

  const { fields, append, remove } = useFieldArray({ control, name: "fields" });
  const sensors = useSensors(useSensor(PointerSensor));

  const appendOption = (fieldIndex: number) => {
    const opts = watch(`fields.${fieldIndex}.options`);
    setValue(`fields.${fieldIndex}.options`, [...opts, ""]);
    clearErrors("fields");
  };

  const removeOption = (fieldIndex: number, optIndex: number) => {
    const opts = watch(`fields.${fieldIndex}.options`);
    setValue(
      `fields.${fieldIndex}.options`,
      opts.filter((_: any, i: number) => i !== optIndex)
    );
    clearErrors("fields");
  };

  const onSubmit = async (data: FormValues) => {
    // Validación custom antes de enviar
    const selectFieldWithoutOptions = data.fields.find(
      (f) => f.type === "SELECT" && (!f.options || f.options.length === 0 || f.options.every(opt => !opt.trim()))
    );
    console.log({selectFieldWithoutOptions});

    if (selectFieldWithoutOptions) {
      setError("fields", { type: "manual", message: "All select fields must have at least one option." });
      return;
    }
    try {
      await createMaintenanceForm({
        name: data.name,
        description: data.description,
        maintenanceTypeId: parseInt(data.maintenanceTypeId, 10),
        fields: data.fields.map((f, idx) => ({
          name: f.name,
          type: f.type,
          required: f.required,
          order: idx,
          options: f.type === "SELECT" ? f.options : [],
        })),
      } as any);
      // Si no hubo error, resetea
      reset({
        name: "",
        description: "",
        maintenanceTypeId: maintenanceTypes[0]?.id.toString() || "",
        fields: [{ id: uuidv4(), name: "", type: "TEXT", required: true, options: [] }],
      });
    } catch (e) {
      // Manejo de error opcional
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-6 overflow-y-hidden" onSubmit={handleSubmit(onSubmit)}>
        {/* Form metadata */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {/* Form name */}
            <FormItem className="w-full">
              <Label className={errors.name ? "text-red-500" : ""}>Form Name</Label>
              <Input
                {...register("name", { required: "Form name is required" })}
                placeholder="Enter form name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <FormMessage className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </FormMessage>
              )}
            </FormItem>

            {/* Maintenance type */}
            <FormItem className="w-full">
              <Label className={errors.maintenanceTypeId ? "text-red-500" : ""}>
                Maintenance Type
              </Label>
              <Controller
                name="maintenanceTypeId"
                control={control}
                rules={{ required: "Maintenance type is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`w-full ${errors.maintenanceTypeId ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {maintenanceTypes.map((mt: MaintenanceTypeResponseDto) => (
                        <SelectItem key={mt.id} value={mt.id.toString()}>
                          {mt.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.maintenanceTypeId && (
                <FormMessage className="text-red-500 text-sm mt-1">
                  {errors.maintenanceTypeId.message}
                </FormMessage>
              )}
            </FormItem>
          </div>

          {/* Form description */}
          <FormItem>
            <Label className={errors.description ? "text-red-500" : ""}>Description</Label>
            <Textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Enter form description"
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <FormMessage className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </FormMessage>
            )}
          </FormItem>
        </div>

        <div className="overflow-y-auto overflow-x-hidden">
          {/* Field builder */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
              if (active.id !== over?.id) {
                const oldIndex = fields.findIndex((f: any) => f.id === active.id);
                const newIndex = fields.findIndex((f: any) => f.id === over?.id);
                const updated = arrayMove(fields, oldIndex, newIndex);
                setValue("fields", updated);
              }
            }}
          >
            <SortableContext
              items={fields.map((f: any) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field: any, index: number) => (
                <SortableField
                  key={field.id}
                  fieldItem={field}
                  index={index}
                  control={control}
                  register={register}
                  remove={remove}
                  appendOption={appendOption}
                  removeOption={removeOption}
                  watch={watch}
                  errors={errors}
                  isSubmitted={form.formState.isSubmitted}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {errors.fields && (
          <FormMessage className="text-red-500 text-sm mt-1">
            {errors.fields.message}
          </FormMessage>
        )}

        <Button
          type="button"
          onClick={() =>
            append({ id: uuidv4(), name: "", type: "TEXT", required: false, options: [] })
          }
          variant={"ghost"}
          className="w-full -mt-4"
        >
          <Plus className="scale-125"></Plus>
        </Button>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Saving..." : "Create Form"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
