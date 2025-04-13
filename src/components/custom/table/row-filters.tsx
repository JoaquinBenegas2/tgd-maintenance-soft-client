"use client";

import * as React from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { FilterIcon, TrashIcon, ChevronsUpDown } from "lucide-react";

export interface RowFilterOptions {
  label: string;
  value: string;
}

export interface RowFilter {
  id: string;
  label: string;
  options: RowFilterOptions[];
}

// Tipo extendido para los filtros activos, que incluye el valor seleccionado
export interface ActiveFilter extends RowFilter {
  selectedValue: string;
}

interface RowFilterProps {
  filters: RowFilter[];
  onFiltersChange?: (filters: ActiveFilter[]) => void;
  resetPageIndex?: () => void;
}

export default function RowFilters({ filters, onFiltersChange, resetPageIndex }: RowFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState<ActiveFilter[]>([]);

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(selectedFilters);
    }
  }, [selectedFilters, onFiltersChange]);

  const handleSelectedFiltersChange = (
    filters: ActiveFilter[] | ((prevFilters: ActiveFilter[]) => ActiveFilter[])
  ) => {
    setSelectedFilters(filters instanceof Function ? filters : [...filters]);
    resetPageIndex?.();
  };

  const handleFilterSelect = (currentValue: string) => {
    const filterToAdd = filters.find((f) => f.id === currentValue);
    if (filterToAdd && !selectedFilters.find((f) => f.id === currentValue)) {
      setSelectedFilters([...selectedFilters, { ...filterToAdd, selectedValue: "" }]);
    }
    setOpen(false);
  };

  const handleValueChange = (key: string, newValue: string) => {
    handleSelectedFiltersChange((prevFilters) =>
      prevFilters.map((filter) =>
        filter.id === key ? { ...filter, selectedValue: newValue } : filter
      )
    );
  };

  const handleRemoveFilter = (key: string) => {
    handleSelectedFiltersChange((prevFilters) => prevFilters.filter((filter) => filter.id !== key));
  };

  const handleClearFilters = () => {
    handleSelectedFiltersChange([]);
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="border-r rounded-none" aria-label="Toggle filters">
            <FilterIcon className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[360px] p-4 bg-white dark:bg-card rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filters</h3>
            <Button
              className="hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-200"
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
            >
              <TrashIcon />
            </Button>
          </div>
          {selectedFilters.length > 0 && (
            <>
              <Separator className="dark:bg-gray-800" />
              <div className="flex flex-col mt-6 mb-6">
                {selectedFilters.map((filter, index) => (
                  <div key={filter.id} className={`flex flex-col ${index !== 0 ? "mt-3" : ""}`}>
                    <Label className="mb-2">{filter.label}</Label>
                    <div className="flex items-center gap-2">
                      <Select
                        value={filter.selectedValue}
                        onValueChange={(newValue) => handleValueChange(filter.id, newValue)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${filter.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{filter.label}</SelectLabel>
                            {filter.options.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button
                        className="hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-200"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFilter(filter.id)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <Separator className="dark:bg-gray-800" />
          {/* Combobox para agregar filtros */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between mt-3"
              >
                Add filter
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search filter..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No filter found.</CommandEmpty>
                  <CommandGroup>
                    {filters.map((filter) => (
                      <CommandItem
                        key={filter.id}
                        value={filter.id}
                        onSelect={() => {
                          handleFilterSelect(filter.id);
                          setOpen(false);
                        }}
                        disabled={!!selectedFilters.find((f) => f.id === filter.id)}
                      >
                        {filter.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </PopoverContent>
      </Popover>
    </div>
  );
}
