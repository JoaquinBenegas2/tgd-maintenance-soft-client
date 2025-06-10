import ProtectedPage from "@/components/protected-page/protected-page";
import { FormReportsPageContent } from "@/modules/reports/form/components/form-reports-page-content";

export default function FormReportsPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <FormReportsPageContent />;
    </ProtectedPage>
  );
}
