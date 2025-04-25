import {
  FormResponseDto,
  FormWithoutMaintenanceTypeResponseDto,
} from "../models/maintenance-form-model";

/**
 * Dado un formDto y un array de answers,
 * retorna un objeto con los defaultValues para React Hook Form.
 */
export function generateDefaultValues(
  formDto?: FormResponseDto | FormWithoutMaintenanceTypeResponseDto,
  answers?: { form_field: { id: number }; value: string }[]
): Record<string, any> {
  // Creamos un map de formFieldId → value
  const answerMap = new Map<number, string>(
    answers?.map((ans) => [ans.form_field.id, ans.value]) ?? []
  );

  const defaultValues: Record<string, any> = {};

  // Recorremos campos (si existen)
  formDto?.fields
    .sort((a, b) => a.order - b.order)
    .forEach((field) => {
      // Nombre convertido a snake_case
      const name = field.name.toLowerCase().split(" ").join("_");
      // Si hay respuesta previa, la usamos. Si no, cadena vacía.
      defaultValues[name] = answerMap.get(field.id) ?? "";
    });

  return defaultValues;
}
