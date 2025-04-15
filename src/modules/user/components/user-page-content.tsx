"use client";

import PageHeader from "@/components/custom/page/app-page-header";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { MdPeople } from "react-icons/md";
import { useGetAssignedCompany } from "../handlers/user-handler";
import UserCard from "./user-card";

export default function UserPageContent() {
  const { data: company } = useGetAssignedCompany();

  return (
    <>
      <PageHeader
        icon={<MdPeople className="w-8 h-8" />}
        title="Users"
        description="Here you can manage your users. You can add, edit, and delete users."
      />
      <BentoGrid className="grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 auto-rows-auto">
        {company?.assigned_users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </BentoGrid>
    </>
  );
}
