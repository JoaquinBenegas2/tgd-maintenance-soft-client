import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SelectLabel } from "@/components/ui/select";
import { InputTypeProps } from "../../models/custom-form-models";

export default function ComboboxInput({ field, form, className }: InputTypeProps) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: controllerField }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={"w-full justify-between" + className}
            >
              {controllerField.value
                ? field.options?.find((option: any) => option.value === controllerField.value)
                    ?.label
                : "Select a value..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder={field.placeholder} className="h-9" />
              <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup>
                  {field.optionsTitle && <SelectLabel>{field.optionsTitle}</SelectLabel>}
                  {field.options?.map((option: any) => (
                    <CommandItem
                      key={option.value}
                      /* value={option.value} */
                      onSelect={() => {
                        controllerField.onChange(option.value);
                        setOpen(false);
                      }}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
