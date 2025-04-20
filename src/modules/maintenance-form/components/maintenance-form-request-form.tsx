import CustomForm from "@/components/custom/form/app-custom-form";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { FormResponseDto } from "../models/maintenance-form-model";
import { generateFormConfig } from "../utils/generate-form-config";

interface MaintenanceFormRequestFormProps {
  initialData?: FormResponseDto;
}

export default function MaintenanceFormRequestForm({
  initialData,
}: MaintenanceFormRequestFormProps) {
  const customFormConfig = generateFormConfig(initialData || ({} as FormResponseDto));

  const { ...restForm } = useCustomForm(customFormConfig);

  return <CustomForm onSubmit={() => {}} showSubmitButton={false} {...restForm} />;
}
