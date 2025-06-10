"use client";

import PageContainer from "@/components/custom/page/app-page-container";
import ProtectedPage from "@/components/protected-page/protected-page";
import ElementDetailPageContent from "@/modules/element/components/element-detail-page-content";

export default function ElementDetailPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <PageContainer variant="contained">
        <ElementDetailPageContent />
      </PageContainer>
    </ProtectedPage>
  );
}
