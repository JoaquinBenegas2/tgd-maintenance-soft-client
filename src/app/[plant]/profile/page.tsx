import PageContainer from "@/components/custom/page/app-page-container";
import { auth } from "@/config/auth";
import ProfilePageContent from "@/modules/profile/components/profile-page-content";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <PageContainer>
      <ProfilePageContent user={session.user} />
    </PageContainer>
  );
}
