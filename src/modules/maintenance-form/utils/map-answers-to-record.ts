import { MaintenanceAnswerResponseDto } from "@/modules/maintenance/models/maintenance-model";

export function mapAnswersToRecord(
  answers: MaintenanceAnswerResponseDto[]
): Record<string, string> {
  return answers.reduce((acc, answer) => {
    const key = `field_${answer.form_field.id}`;
    acc[key] = answer.value;
    return acc;
  }, {} as Record<string, string>);
}
