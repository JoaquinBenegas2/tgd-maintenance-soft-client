"use client";

import React, { HTMLProps, useCallback, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ColumnToggle from "./column-toggle";

import clsx from "clsx";
import Paginator from "@/components/custom/paginator/app-paginator";
import { Input } from "@/components/ui/input";
import "./app-custom-table.css";
import RowFilters, { ActiveFilter, RowFilter } from "./row-filters";

function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={
        "cursor-pointer peer shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
      }
      {...rest}
    />
  );
}

export interface TableColumn<T> {
  header: string | (() => React.ReactNode);
  accessorKey: string;
  cellRenderer?: (item: T) => React.ReactNode;
  footer?: string | (() => React.ReactNode);
  columns?: TableColumn<any>[];
}

export interface CustomTableProps<T> {
  items: T[];
  columns: TableColumn<T>[];
  height?: string;
  searchValue?: string;
  onSearchValueChange?: (searchValue: string) => void;
  columnResizing?:
    | {
        mode: "onChange" | "onEnd";
        direction: "ltr" | "rtl";
      }
    | boolean;
  pagination?: {
    pageIndex: number;
    pageCount: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
  availableRowFilters?: RowFilter[];
  onRowFiltersChange?: (filters: Record<string, string>) => void;
  headerChildren?: React.ReactNode;
  showSearchBar?: boolean;
  showRowFilters?: boolean;
  showColumnToggle?: boolean;
  isDataLoading?: boolean;
}

export default function CustomTable<T>({
  items,
  columns,
  height = "560px",
  columnResizing = { mode: "onChange", direction: "ltr" },
  pagination: serverSidePagination,
  searchValue,
  onSearchValueChange: onServerSideSearchValueChange,
  availableRowFilters,
  onRowFiltersChange,
  headerChildren,
  showColumnToggle = true,
  showRowFilters = true,
  showSearchBar = true,
  isDataLoading,
}: CustomTableProps<T>) {
  const [columnVisibility, setColumnVisibility] = useState({});

  const [clientSidePagination, setClientSidePagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [rowSelection, setRowSelection] = useState({});

  const [globalFilter, setGlobalFilter] = useState("");

  const [columnFilters, setColumnFilters] = useState<any[]>([]);

  const columnHelper = createColumnHelper<T>();

  const getTableColumns: any = (columns: TableColumn<T>[]) => {
    return columns.map((column) => {
      if (column.columns) {
        return columnHelper.group({
          id: column.accessorKey,
          header: column.header,
          footer: column.footer,
          columns: getTableColumns(column.columns),
        });
      }

      return columnHelper.accessor(column.accessorKey as any, {
        header: column.header,
        cell: (info) =>
          column.cellRenderer ? column.cellRenderer(info.row.original) : info.renderValue(),
        footer: column.footer,
      });
    });
  };

  const getTableColumnsWithCheckboxes: any = (columns: TableColumn<T>[]) => {
    const checkboxColumn = columnHelper.accessor("select" as any, {
      id: "select",
      size: 36, // Set size to minimum
      header: ({ table }) => (
        <div className="flex items-center">
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    });

    return [checkboxColumn, ...getTableColumns(columns)];
  };

  const getNestedValue = (obj: any, accessor: string): any => {
    return accessor.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  };

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const getAvailableRowFilters = (items: T[], columns: TableColumn<T>[]): RowFilter[] => {
    const filters: RowFilter[] = [];

    // Función recursiva para procesar columnas (y columnas anidadas)
    function processColumns(cols: TableColumn<T>[]) {
      for (const col of cols) {
        if (col.accessorKey) {
          // Extraemos los valores únicos para la columna
          const distinctValues = new Set<string>();
          for (const item of items) {
            const value = getNestedValue(item, col.accessorKey);
            if (value !== undefined && value !== null && value !== "") {
              distinctValues.add(String(value));
            }
          }
          // Si hay valores únicos, se crea el filtro
          if (distinctValues.size > 0) {
            filters.push({
              id: col.accessorKey,
              label: typeof col.header === "string" ? col.header : col.accessorKey,
              options: Array.from(distinctValues).map((val) => ({
                label: capitalize(val),
                value: val,
              })),
            });
          }
        }
        // Procesar columnas anidadas, si existen
        if (col.columns && col.columns.length > 0) {
          processColumns(col.columns);
        }
      }
    }

    processColumns(columns);
    return filters;
  };

  const tableColumns = getTableColumnsWithCheckboxes(columns);

  const hasFooter = columns.some((column) => column.footer);

  /* Row Filter */
  const handleRowFiltersChange = useCallback(
    (filters: ActiveFilter[]) => {
      const newColumnFilters = filters.map((filter) => ({
        id: filter.id,
        value: filter.selectedValue,
      }));

      const filtersRecord = Object.fromEntries(
        newColumnFilters.map((f) => (f.value ? [f.id, f.value] : []))
      );

      if (onRowFiltersChange) {
        onRowFiltersChange(filtersRecord);
      } else {
        setColumnFilters(newColumnFilters);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /* Search Filter */
  const handleValueChange = (value: string) => {
    if (onServerSideSearchValueChange) {
      // Si es del servidor, delega el cambio al componente padre
      serverSidePagination?.onPageChange(0);
      onServerSideSearchValueChange(value);
    } else {
      // Si es del cliente, actualiza el estado local
      setGlobalFilter(value);
    }
  };

  const inputValue = onServerSideSearchValueChange ? searchValue : globalFilter;

  /* Pagination */
  const pagination = serverSidePagination
    ? { pageIndex: serverSidePagination.pageIndex, pageSize: serverSidePagination.pageSize }
    : clientSidePagination;

  const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    const newPagination =
      typeof updaterOrValue === "function"
        ? updaterOrValue(pagination) // Si es función, se ejecuta con el estado actual
        : updaterOrValue; // Si es un valor directo, se usa directamente

    if (serverSidePagination) {
      if (newPagination.pageIndex !== serverSidePagination.pageIndex) {
        serverSidePagination.onPageChange(newPagination.pageIndex);
      }
      if (newPagination.pageSize !== serverSidePagination.pageSize) {
        serverSidePagination.onPageSizeChange(newPagination.pageSize);
      }
    } else {
      setClientSidePagination(newPagination);
    }
  };

  const manualPagination = !!serverSidePagination;
  const pageCount = serverSidePagination ? serverSidePagination.pageCount : undefined;

  /* Use React Table */
  const table = useReactTable({
    /* State */
    data: items,
    columns: tableColumns,
    columnResizeMode: typeof columnResizing === "object" ? columnResizing.mode : "onChange",
    columnResizeDirection: typeof columnResizing === "object" ? columnResizing.direction : "ltr",
    state: {
      rowSelection,
      columnVisibility,
      pagination,
      globalFilter,
      columnFilters,
    },
    enableRowSelection: true, //enable row selection for all rows
    /* Events */
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: handlePaginationChange,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    /* Pagination */
    manualPagination: manualPagination,
    pageCount: pageCount,
    /* Models */
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col gap-3 items-start md:items-center md:justify-between md:flex-row">
        <div
          className={clsx(
            "flex items-center rounded-lg max-w-xs ",
            showSearchBar && "w-full min-w-72"
          )}
        >
          {/* Row Filters */}
          {showRowFilters && (
            <RowFilters
              filters={availableRowFilters || getAvailableRowFilters(items, columns)}
              onFiltersChange={handleRowFiltersChange}
              resetPageIndex={() => serverSidePagination?.onPageChange(0)}
            />
          )}

          {/* Search Bar */}
          {showSearchBar && (
            <Input
              placeholder="Search..."
              className="border-l-0 rounded-l-none shadow-none"
              value={inputValue}
              onChange={(e) => handleValueChange(e.target.value)}
            />
          )}
        </div>

        {/* Header */}
        {headerChildren}

        {/* Column Filters */}
        {showColumnToggle && <ColumnToggle table={table} />}
      </div>

      {/* Table */}
      <div className="overflow-auto" style={{ height: height }}>
        <Table className="min-w-full" {...{ style: { width: table.getCenterTotalSize() } }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    {/* Header */}
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}

                    {/* Resizer */}
                    {columnResizing && (
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${table.options.columnResizeDirection} ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
                          style: {
                            transform:
                              table.options.columnResizeMode === "onEnd" &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    (table.options.columnResizeDirection === "rtl" ? -1 : 1) *
                                    (table.getState().columnSizingInfo.deltaOffset ?? 0)
                                  }px)`
                                : "",
                          },
                        }}
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isDataLoading ? (
              <>
                {Array.from({ length: 10 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex} className="animate-pulse">
                    {table.getAllColumns().map((column, colIndex) => (
                      <TableCell key={colIndex}>
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
          {hasFooter && (
            <TableFooter>
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.footer, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          )}
        </Table>
      </div>
      <Paginator
        pageIndex={table.getState().pagination.pageIndex + 1}
        pageCount={table.getPageCount()}
        pageSize={table.getState().pagination.pageSize}
        onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
        onPageSizeChange={(tablePageSize) => table.setPageSize(tablePageSize)}
        pageSizeOptions={[10, 20, 30, 40, 50]}
      />
    </div>
  );
}
