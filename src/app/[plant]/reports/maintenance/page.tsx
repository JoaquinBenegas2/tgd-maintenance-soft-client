import ProtectedPage from "@/components/protected-page/protected-page";
import { ReportsPageContent } from "@/modules/reports/maintenance/components/maintenance-reports-page-content";

export default function ReportsPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <ReportsPageContent />;
    </ProtectedPage>
  );
}
