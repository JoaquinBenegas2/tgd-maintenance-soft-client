"use client";

import { isAuthorized } from "@/utils/is-authorized";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProtectedPage({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!isAuthorized(session, allowedRoles)) {
      router.push("/");
    } else {
      setShouldRender(true);
    }
  }, [session, status, allowedRoles, router]);

  if (status === "loading" || !shouldRender) {
    return null;
  }

  return <>{children}</>;
}
