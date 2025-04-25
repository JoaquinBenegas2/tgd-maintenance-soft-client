import { MaintenanceAnswerRequestDto } from "@/modules/maintenance/models/maintenance-model";
import {
  FormResponseDto,
  FormWithoutMaintenanceTypeResponseDto,
} from "../models/maintenance-form-model";

function toFieldKey(name: string) {
  return name.toLowerCase().split(" ").join("_");
}

export function generateAnswersPayload(
  values: Record<string, any>,
  formDto: FormResponseDto | FormWithoutMaintenanceTypeResponseDto
): { answers: MaintenanceAnswerRequestDto[] } {
  const answers: MaintenanceAnswerRequestDto[] = [];

  Object.entries(values).forEach(([key, rawValue]) => {
    const field = formDto.fields.find((f) => toFieldKey(f.name) === key);

    if (!field) {
      console.warn(`⚠️ No se encontró field para "${key}", lo salto.`);
      return;
    }

    const value = rawValue instanceof Date ? rawValue.toISOString() : String(rawValue);

    answers.push({
      form_field_id: field.id,
      value,
    });
  });

  return { answers };
}
