"use client";

import { useEffect, useState } from "react";
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
import { FilterIcon, TrashIcon, ChevronsUpDown, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

export interface RowFilterOption {
  label: string;
  value: string | number;
}

interface BaseFilter {
  id: string;
  label: string;
  nonErasable?: boolean;
}

export interface SelectFilter extends BaseFilter {
  type: "select";
  options: RowFilterOption[];
}

export interface DateFilter extends BaseFilter {
  type: "date";
  placeholder?: string;
}

export interface DateRangeFilter extends BaseFilter {
  type: "date-range";
  startLabel?: string;
  endLabel?: string;
}

export type RowFilter = SelectFilter | DateFilter | DateRangeFilter;

// Tipo extendido para los filtros activos, que incluye el valor seleccionado
export interface ActiveSelectFilter extends SelectFilter {
  selectedValue: string;
}

export interface ActiveDateFilter extends DateFilter {
  selectedValue: string;
}

export interface ActiveDateRangeFilter extends DateRangeFilter {
  selectedRange?: DateRange;
}

export type ActiveFilter = ActiveSelectFilter | ActiveDateFilter | ActiveDateRangeFilter;

interface RowFilterProps {
  filters: RowFilter[];
  onFiltersChange?: (filters: ActiveFilter[]) => void;
  resetPageIndex?: () => void;
  initialFilters?: ActiveFilter[];
}

export default function RowFilters({
  initialFilters,
  filters,
  onFiltersChange,
  resetPageIndex,
}: RowFilterProps) {
  const [open, setOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<ActiveFilter[]>(
    () => initialFilters ?? []
  );

  useEffect(() => {
    onFiltersChange?.(selectedFilters);
  }, [selectedFilters, onFiltersChange]);

  const handleSelectedFiltersChange = (
    updater: ActiveFilter[] | ((prevFilters: ActiveFilter[]) => ActiveFilter[])
  ) => {
    setSelectedFilters((prev) => (updater instanceof Function ? updater(prev) : [...updater]));
    resetPageIndex?.();
  };

  const handleFilterSelect = (filterId: string) => {
    const filterToAdd = filters.find((f) => f.id === filterId);

    if (filterToAdd && !selectedFilters.find((sf) => sf.id === filterId)) {
      let active: ActiveFilter;

      if (filterToAdd.type === "select") {
        active = { ...filterToAdd, selectedValue: "" };
      } else if (filterToAdd.type === "date") {
        active = { ...filterToAdd, selectedValue: "" };
      } else {
        active = { ...filterToAdd, selectedRange: undefined };
      }

      setSelectedFilters([...selectedFilters, active]);
    }

    setOpen(false);
  };

  const handleValueChange = (filterId: string, value: any) => {
    handleSelectedFiltersChange((prev) =>
      prev.map((filter) => {
        if (filter.id !== filterId) return filter;

        if (filter.type === "select" || filter.type === "date") {
          return { ...filter, selectedValue: value };
        }

        if (filter.type === "date-range") {
          return { ...filter, selectedRange: value } as ActiveDateRangeFilter;
        }

        return filter;
      })
    );
  };

  const handleRemoveFilter = (filterId: string) => {
    handleSelectedFiltersChange((prevFilters) =>
      prevFilters.filter((filter) => filter.id !== filterId)
    );
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
    resetPageIndex?.();
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="relative border-r rounded-none shadow-none"
            aria-label="Toggle filters"
          >
            <FilterIcon className="w-5 h-5" />
            {selectedFilters.length > 0 && (
              <span className="h-4 w-4 absolute -top-2 -right-2 inline-flex items-center justify-center px-1 text-[12px] font-bold leading-none text-white bg-primary rounded-full">
                {selectedFilters.length}
              </span>
            )}
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

                    {filter.type === "select" && (
                      <div className="flex items-center gap-2">
                        <Select
                          value={filter.selectedValue}
                          onValueChange={(value) => handleValueChange(filter.id, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select ${filter.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>{filter.label}</SelectLabel>
                              {filter.options.map((option) => (
                                <SelectItem key={option.value} value={String(option.value)}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {!filter.nonErasable && (
                          <Button
                            className="hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-200"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFilter(filter.id)}
                          >
                            <TrashIcon />
                          </Button>
                        )}
                      </div>
                    )}

                    {filter.type === "date" && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="date"
                          value={filter.selectedValue}
                          placeholder={filter.placeholder}
                          onChange={(e) => handleValueChange(filter.id, e.target.value)}
                        />
                        {!filter.nonErasable && (
                          <Button
                            className="hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-200"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFilter(filter.id)}
                          >
                            <TrashIcon />
                          </Button>
                        )}
                      </div>
                    )}

                    {filter.type === "date-range" && (
                      <div className="flex items-center gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex-1 justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2" />
                              {filter.selectedRange?.from && filter.selectedRange.to
                                ? `${format(filter.selectedRange.from, "MMM dd, yyyy")} - ${format(
                                    filter.selectedRange.to,
                                    "MMM dd, yyyy"
                                  )}`
                                : filter.startLabel && filter.endLabel
                                ? `${filter.startLabel} - ${filter.endLabel}`
                                : "Select range"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="range"
                              selected={filter.selectedRange}
                              onSelect={(range: any) => handleValueChange(filter.id, range)}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                        {!filter.nonErasable && (
                          <Button
                            className="hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-200"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFilter(filter.id)}
                          >
                            <TrashIcon />
                          </Button>
                        )}
                      </div>
                    )}
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
                        disabled={!!selectedFilters.find((sf) => sf.id === filter.id)}
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
