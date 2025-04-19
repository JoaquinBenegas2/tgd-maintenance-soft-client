import PageHeader from "@/components/custom/page/app-page-header";
import { RiSurveyLine } from "react-icons/ri";

export default function MaintenanceFormPageContent() {
  return (
    <>
      <PageHeader
        icon={<RiSurveyLine className="w-8 h-8" />}
        title="Maintenance Forms"
        description="Here you can manage your maintenance forms"
      />
    </>
  );
}
