"use client";

import PageContainer from "@/components/custom/page/app-page-container";
import ProtectedPage from "@/components/protected-page/protected-page";
import AssetPageContent from "@/modules/asset/components/asset-page-content";

export default function AssetsPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <PageContainer variant="contained">
        <AssetPageContent />
      </PageContainer>
    </ProtectedPage>
  );
}
