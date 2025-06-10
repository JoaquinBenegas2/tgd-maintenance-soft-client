"use client";

import PageContainer from "@/components/custom/page/app-page-container";
import ProtectedPage from "@/components/protected-page/protected-page";
import SimpleElementDetailPageContent from "@/modules/element/components/simple-element-detail-page-content";

export default function SimpleElementDetailPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <PageContainer variant="contained">
        <SimpleElementDetailPageContent />
      </PageContainer>
    </ProtectedPage>
  );
}
