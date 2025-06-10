"use client";

import PageContainer from "@/components/custom/page/app-page-container";
import ProtectedPage from "@/components/protected-page/protected-page";
import ComponentPageContent from "@/modules/component/components/component-page-content";

export default function ComponentsPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <PageContainer variant="contained">
        <ComponentPageContent />
      </PageContainer>
    </ProtectedPage>
  );
}
