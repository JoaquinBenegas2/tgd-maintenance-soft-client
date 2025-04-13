import React from "react";

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContent({ children, className }: PageContentProps) {
  return <section className={className}>{children}</section>;
}
