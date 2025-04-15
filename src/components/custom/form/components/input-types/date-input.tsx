import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { InputTypeProps } from "../../models/custom-form-models";

export default function DateInput({ field, form, className }: InputTypeProps) {
  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: controllerField }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !controllerField.value && "text-muted-foreground",
                className
              )}
            >
              <CalendarIcon />
              {controllerField.value ? (
                format(controllerField.value, "PPP")
              ) : (
                <span>{field.placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              {...controllerField}
              selected={controllerField.value}
              onSelect={controllerField.onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
