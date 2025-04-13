import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { ColumnsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Column, Table } from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator";

interface ColumnToggleProps<T> {
  table: Table<T>;
}

function ColumnToggle<T>({ table }: ColumnToggleProps<T>) {
  const allColumns = table.getAllLeafColumns();

  const getColumnLabel = (column: Column<T, unknown>) => {
    return column.columnDef.header && typeof column.columnDef.header === "string"
      ? column.columnDef.header
      : column.id;
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" aria-label="Toggle columns">
            <ColumnsIcon className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4 bg-white dark:bg-card rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700  dark:text-gray-300">
              Toggle Columns
            </h3>
            <Switch
              {...{
                checked: table.getIsAllColumnsVisible(),
                onCheckedChange: (checked) => table.toggleAllColumnsVisible(checked),
              }}
            />
          </div>
          <Separator className="mb-3 dark:bg-gray-800" />
          <div className="flex flex-col gap-3">
            {allColumns.map((column) => (
              <div key={column.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize dark:text-gray-300">
                  {getColumnLabel(column)}
                </span>
                <Switch
                  {...{
                    checked: column.getIsVisible(),
                    onCheckedChange: (checked) => column.toggleVisibility(checked),
                  }}
                />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ColumnToggle;
