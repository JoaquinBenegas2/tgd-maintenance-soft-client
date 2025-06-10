"use client";

import PageContainer from "@/components/custom/page/app-page-container";
import ProtectedPage from "@/components/protected-page/protected-page";
import ComponentDetailPageContent from "@/modules/component/components/component-detail-page-content";

export default function ComponentDetailPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <PageContainer variant="contained">
        <ComponentDetailPageContent />
      </PageContainer>
    </ProtectedPage>
  );
}
