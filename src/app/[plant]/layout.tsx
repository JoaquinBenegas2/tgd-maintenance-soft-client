import AppMain from "@/components/custom/main/app-main";
import Navbar from "@/components/custom/navbar/app-navbar";
import PlantSidebar from "@/components/custom/sidebar/plant-sidebar";
import { auth } from "@/config/auth";

export default async function PlantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <PlantSidebar />
      <AppMain navbar={<Navbar session={session} />}>{children}</AppMain>
    </div>
  );
}
