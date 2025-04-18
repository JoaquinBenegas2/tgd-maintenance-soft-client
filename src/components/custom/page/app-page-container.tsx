import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function PageContainer({
  variant = "default",
  children,
}: {
  variant?: "default" | "contained";
  children: React.ReactNode;
}) {

  if (variant === "contained")
    return (
      <Card className="my-4 mx-2 sm:mx-5 flex flex-col flex-1">
        <CardContent>{children}</CardContent>
      </Card>
    );

  return <div className="py-8 px-4 sm:px-10 flex flex-col flex-1">{children}</div>;
}
