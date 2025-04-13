import React from "react";

export default function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="py-8 px-4 sm:px-10 flex flex-col flex-1">{children}</div>;
}
