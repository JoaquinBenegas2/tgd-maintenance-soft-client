"use client";

import PageContainer from "@/components/custom/page/app-page-container";
import ProtectedPage from "@/components/protected-page/protected-page";
import SimpleComponentDetailPageContent from "@/modules/component/components/simple-component-detail-page-content";

export default function SimpleComponentDetailPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <PageContainer variant="contained">
        <SimpleComponentDetailPageContent />
      </PageContainer>
    </ProtectedPage>
  );
}
