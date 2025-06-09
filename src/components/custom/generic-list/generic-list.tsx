import React, { useMemo } from "react";
import CustomTable, { TableColumn } from "../table/app-custom-table";

export interface GenericListProps<T extends Record<string, any>> {
  items: T[];
  isDataLoading?: boolean;
  height?: string;
  className?: string;
  tableClassName?: string;
  showColumnToggle?: boolean;
  showRowFilters?: boolean;
  showSearchBar?: boolean;
}

/**
 * Componente genérico que genera columnas automáticamente a partir de los keys de los items.
 * No incluye columna de acciones.
 */
export default function GenericList<T extends Record<string, any>>({
  items,
  isDataLoading = false,
  height,
  className,
  tableClassName,
  showColumnToggle = true,
  showRowFilters = true,
  showSearchBar = true,
}: GenericListProps<T>) {
  const columns = useMemo((): TableColumn<T>[] => {
    if (!items || items.length === 0) return [];
    return Object.keys(items[0]).map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      accessorKey: key as keyof T,
      cellRenderer: (item: T) => {
        const value = (item as any)[key];
        if (value === null || value === undefined) return "";
        if (typeof value === "object") {
          return <code>{JSON.stringify(value)}</code>;
        }
        return String(value);
      },
    } as TableColumn<T>));
  }, [items]);

  return (
    <CustomTable
      items={items}
      columns={columns}
      isDataLoading={isDataLoading}
      height={height}
      className={className}
      tableClassName={tableClassName}
      showColumnToggle={showColumnToggle}
      showRowFilters={showRowFilters}
      showSearchBar={showSearchBar}
    />
  );
}
