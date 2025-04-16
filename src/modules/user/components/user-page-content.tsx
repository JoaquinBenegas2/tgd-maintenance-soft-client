"use client";

import PageHeader from "@/components/custom/page/app-page-header";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import { MdPeople } from "react-icons/md";
import { useGetAssignedCompany } from "../handlers/user-handler";
import UserCard from "./user-card";
import { useState } from "react";
import UserRequestSheet from "./user-request-sheet";

export default function UserPageContent() {
  const { data: company, isLoading } = useGetAssignedCompany();

  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <PageHeader
        icon={<MdPeople className="w-8 h-8" />}
        title="Users"
        description="Here you can manage your users. You can add, edit, and delete users."
      />
      <BentoGrid className="grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 auto-rows-auto">
        {/* Loading */}
        {isLoading && (
          <>
            <Skeleton className="h-36 col-span-1" />
            <Skeleton className="h-36 col-span-1" />
            <Skeleton className="h-36 col-span-1" />
          </>
        )}

        {!isLoading && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="w-full h-36" variant={"ghost"} onClick={() => setSheetOpen(true)}>
                  <Plus className="scale-175" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="translate-y-14">
                <p>Add user</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {company?.assigned_users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        <UserRequestSheet open={sheetOpen} onOpenChange={setSheetOpen} />
      </BentoGrid>
    </>
  );
}
