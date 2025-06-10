"use client";

import PageContainer from "@/components/custom/page/app-page-container";
import ProtectedPage from "@/components/protected-page/protected-page";
import AssetDetailPageContent from "@/modules/asset/components/asset-detail-page-content";

export default function AssetDetailPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <PageContainer variant="contained">
        <AssetDetailPageContent />
      </PageContainer>
    </ProtectedPage>
  );
}
