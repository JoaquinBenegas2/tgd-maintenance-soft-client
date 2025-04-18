"use client";

import { useSidebar } from "@/components/ui/sidebar/sidebar-context";

export default function AppMain({
  children,
  navbar,
}: {
  children: React.ReactNode;
  navbar?: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <main
      className={`transition-all duration-300 ease-in-out min-h-screen bg-background ${
        isOpen ? "ml-[70px] sm:ml-64" : "ml-[70px]"
      }`}
    >
      <div className="flex flex-col min-h-screen">
        {navbar}
        <div className="mt-16 flex flex-col flex-1">{children}</div>
      </div>
    </main>
  );
}
