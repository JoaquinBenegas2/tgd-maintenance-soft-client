"use client";

import PageContainer from "@/components/custom/page/app-page-container";
import ProtectedPage from "@/components/protected-page/protected-page";
import ElementPageContent from "@/modules/element/components/element-page-content";

export default function ElementsPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <PageContainer variant="contained">
        <ElementPageContent />
      </PageContainer>
    </ProtectedPage>
  );
}
