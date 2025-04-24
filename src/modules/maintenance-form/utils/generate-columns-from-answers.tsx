import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MaintenanceAnswerResponseDto } from "@/modules/maintenance/models/maintenance-model";
import { FormFieldType } from "../models/maintenance-form-model";

export function generateColumnsFromAnswers2(
  answers: MaintenanceAnswerResponseDto[]
): ColumnDef<MaintenanceAnswerResponseDto>[] {
  console.log({ answers});
  

  const uniqueFields = Array.from(
    new Map(answers.map((ans) => [ans.form_field.id, ans.form_field])).values()
  );

  return uniqueFields.map((field) => ({
    header: field.name,
    accessorKey: `field_${field.id}`,
    cellRenderer: (answer: any) => {
      console.log({field, answer});
      
/*       const answer = row.original; */
      if (answer.form_field.id !== field.id) return null;

      switch (field.type) {
        case FormFieldType.CHECKBOX:
          return (
            <Badge
              className={
                answer.value === "true"
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-red-600 hover:bg-red-500"
              }
            >
              {answer.value === "true" ? "Yes" : "No"}
            </Badge>
          );

        case FormFieldType.RADIO:
        case FormFieldType.SELECT:
        case FormFieldType.COMBOBOX:
          const option = field.options.find((opt: any) => opt.id.toString() === answer.value);
          return <span>{option?.value ?? answer.value}</span>;

        case FormFieldType.DATE:
          return <span>{new Date(answer.value).toLocaleDateString()}</span>;

        case FormFieldType.FILE:
          return (
            <a
              href={answer.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View file
            </a>
          );

        default:
          return <span>{answer.value}</span>;
      }
    },
  }));
}


export function generateColumnsFromAnswers(
  answers: MaintenanceAnswerResponseDto[]
): ColumnDef<Record<string, any>>[] {
  // 1) Extraigo los campos únicos
  const uniqueFields = Array.from(
    new Map(
      answers.map((ans) => [ans.form_field.id, ans.form_field])
    ).values()
  );

  return uniqueFields.map((field) => {
    const key = `field_${field.id}`;

    return {
      header: field.name,
      accessorKey: key,

      /** 
       * cellRenderer recibe el objeto de fila entero, que tiene
       * { field_533: "Perdida de aceite", field_534: "2", ... }
       */
      cellRenderer: (rowData: Record<string, any>) => {
        const value = rowData[key];
        if (value == null) {
          return <span className="text-muted-foreground">–</span>;
        }

        switch (field.type) {
          case FormFieldType.CHECKBOX:
            return (
              <Badge
                className={
                  value === "true"
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-red-600 hover:bg-red-500"
                }
              >
                {value === "true" ? "Yes" : "No"}
              </Badge>
            );

          case FormFieldType.RADIO:
          case FormFieldType.SELECT:
          case FormFieldType.COMBOBOX:
            // muestro la etiqueta de la opción si existe
            const opt = field.options.find((o) => o.id.toString() === value);
            return <span>{opt?.value ?? value}</span>;

          case FormFieldType.DATE:
            return <span>{new Date(value).toLocaleDateString()}</span>;

          case FormFieldType.FILE:
            return (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View file
              </a>
            );

          default:
            return <span>{value}</span>;
        }
      },
    } as ColumnDef<Record<string, any>>;
  });
}
