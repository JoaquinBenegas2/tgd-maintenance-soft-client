// src/utils/exportToExcel.ts
import { TableColumn } from "@/components/custom/table/app-custom-table";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function exportToExcel<T>(items: T[], columns: TableColumn<T>[], fileName = "reporte.xlsx") {
  const flatData = items.map((item) => {
    const row: Record<string, any> = {};
    columns.forEach((col) => {
      if (col.excludeFromExcel) return;

      const header = typeof col.header === "string" ? col.header : (col.accessorKey as string);

      const value = (col.accessorKey as string)
        .split(".")
        .reduce((obj: any, key) => (obj != null ? obj[key] : undefined), item);

      row[header] = value ?? "";
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(flatData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, fileName);
}
