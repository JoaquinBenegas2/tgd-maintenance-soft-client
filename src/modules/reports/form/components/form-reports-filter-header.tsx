"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, RotateCcw } from "lucide-react";
import { useState } from "react";
import { ReportsFilters } from "./form-reports-page-content";

interface FormReportsFilterHeaderProps {
  filters: ReportsFilters;
  onFiltersChange: (filters: ReportsFilters) => void;
  onResetFilters: () => void;
}

export function FormReportsFilterHeader({
  filters,
  onFiltersChange,
  onResetFilters,
}: FormReportsFilterHeaderProps) {
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  const handleDateFromChange = (date: Date | undefined) => {
    if (date) {
      onFiltersChange({ ...filters, dateFrom: date });
      setIsFromOpen(false);
    }
  };

  const handleDateToChange = (date: Date | undefined) => {
    if (date) {
      onFiltersChange({ ...filters, dateTo: date });
      setIsToOpen(false);
    }
  };

  return (
    <Card className="mb-6 py-4">
      <CardContent className="px-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full flex flex-wrap gap-4 items-start sm:items-center">
            {/* Date From Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">From</label>
              <Popover open={isFromOpen} onOpenChange={setIsFromOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !filters.dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateFrom ? (
                      format(filters.dateFrom, "dd/MM/yyyy", { locale: es })
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateFrom}
                    onSelect={handleDateFromChange}
                    initialFocus
                    locale={es}
                    disabled={{ after: filters.dateTo }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Date To Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">To</label>
              <Popover open={isToOpen} onOpenChange={setIsToOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !filters.dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateTo ? (
                      format(filters.dateTo, "dd/MM/yyyy", { locale: es })
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateTo}
                    onSelect={handleDateToChange}
                    initialFocus
                    locale={es}
                    disabled={{ before: filters.dateFrom }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Reset Button */}
            <div className="mt-auto flex justify-end">
              <Button
                variant="secondary"
                onClick={onResetFilters}
                className="flex items-center gap-2 w-[200px]"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
