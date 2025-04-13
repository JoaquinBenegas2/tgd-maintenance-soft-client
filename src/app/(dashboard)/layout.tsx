import AppMain from "@/components/custom/main/app-main";
import Navbar from "@/components/custom/navbar/app-navbar";
import AppSidebar from "@/components/custom/sidebar/app-sidebar";
import { auth } from "@/config/auth";

export default async function DashboardLayout({
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
      <AppSidebar />
      <AppMain navbar={<Navbar session={session} />}>{children}</AppMain>
    </div>
  );
}
