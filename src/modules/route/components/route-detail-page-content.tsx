"use client";

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/radix-tabs";
import PageHeader from "@/components/custom/page/app-page-header";
import CustomTable from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ElementResponseDto, ElementStatusEnum } from "@/modules/element/models/element-model";
import { roleClasses, roleNames, UserResponseDto } from "@/modules/user/models/user-model";
import { Pen, Save, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdAssignment } from "react-icons/md";
import { TbRoute2 } from "react-icons/tb";
import { useGetRouteById } from "../handlers/route-handler";
import AssignElementToRouteDialog from "./assign-user-or-element-to-route-dialog";
import RouteDetailRequestForm from "./route-detail-request-form";
import useIsMobile from "@/hooks/is-mobile/use-is-mobile";

export default function RouteDetailPageContent() {
  const isMobile = useIsMobile();

  const { routeId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [formUtils, setFormUtils] = useState<{
    resetForm: () => void;
    isUpdating: boolean;
  } | null>(null);

  const { data: route, isLoading } = useGetRouteById(Number(routeId));

  const title = `Route Detail: ${route?.name || "..."}`;

  return (
    <>
      <PageHeader
        icon={<TbRoute2 className="w-8 h-8" />}
        title={title}
        description="This is the route detail page"
      >
        <div className="flex flex-1 justify-end">
          {editMode ? (
            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto"
                variant={"secondary"}
                size={"sm"}
                type="button"
                onClick={() => {
                  setEditMode(false);
                  formUtils?.resetForm();
                }}
                disabled={formUtils?.isUpdating}
              >
                <X />
              </Button>
              <Button
                className="w-full sm:w-auto"
                size={"sm"}
                type="submit"
                form="route-form"
                disabled={formUtils?.isUpdating}
              >
                <Save />
              </Button>
            </div>
          ) : (
            <Button
              className="w-full sm:w-auto"
              size={"sm"}
              type="button"
              onClick={() => setEditMode(true)}
              disabled={isLoading}
            >
              <Pen />
            </Button>
          )}
        </div>
      </PageHeader>

      <RouteDetailRequestForm
        initialData={route}
        formId="route-form"
        editMode={editMode}
        onEditModeChange={setEditMode}
        onExpose={setFormUtils}
      />
      <Separator className="my-6" />
      <Tabs defaultValue="elements" className="w-full flex flex-1">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="operators">Operators</TabsTrigger>
        </TabsList>
        <TabsContents className="mx-1 mt-2 flex flex-1">
          <TabsContent value="elements" className="flex">
            <CustomTable
              height={!isMobile ? "100%" : "400px"}
              className={!isMobile ? "flex-1" : "w-full"}
              tableClassName={!isMobile ? "flex-1" : ""}
              items={route?.assigned_elements || []}
              isDataLoading={isLoading}
              headerChildren={
                <div className="w-full flex justify-end">
                  <AssignElementToRouteDialog assignType="element" route={route}>
                    <Button className="w-full md:w-auto">
                      <MdAssignment />
                    </Button>
                  </AssignElementToRouteDialog>
                </div>
              }
              columns={[
                {
                  header: "Asset",
                  accessorKey: "component.asset.name",
                },
                {
                  header: "Component",
                  accessorKey: "component.name",
                },
                { header: "Element", accessorKey: "name" },
                { header: "Description", accessorKey: "description" },
                {
                  header: "Manufacturer",
                  accessorKey: "manufacturer.name",
                },
                {
                  header: "Status",
                  accessorKey: "status",
                  cellRenderer: (item: ElementResponseDto) =>
                    item.status === ElementStatusEnum.ACTIVE ? (
                      <Badge className="bg-green-600 hover:bg-green-500">Active</Badge>
                    ) : (
                      <Badge className="bg-red-600 hover:bg-red-500">Inactive</Badge>
                    ),
                },
              ]}
            />
          </TabsContent>
          <TabsContent value="operators" className="flex">
            <CustomTable
              height={!isMobile ? "100%" : "400px"}
              className={!isMobile ? "flex-1" : "w-full"}
              tableClassName={!isMobile ? "flex-1" : ""}
              items={route?.assigned_operators || []}
              isDataLoading={isLoading}
              headerChildren={
                <div className="w-full flex justify-end">
                  <AssignElementToRouteDialog assignType="operator" route={route}>
                    <Button className="w-full md:w-auto">
                      <MdAssignment />
                    </Button>
                  </AssignElementToRouteDialog>
                </div>
              }
              columns={[
                {
                  header: "Name",
                  accessorKey: "name",
                },
                {
                  header: "Email",
                  accessorKey: "email",
                },
                {
                  header: "Role",
                  accessorKey: "role",
                  cellRenderer: (user: UserResponseDto) => {
                    const roleStyle = roleClasses[user.role as keyof typeof roleClasses];

                    return (
                      <Badge
                        key={user.role}
                        className={cn("transition-all", roleStyle.bg, roleStyle.hover)}
                      >
                        {roleNames[user.role as keyof typeof roleNames]}
                      </Badge>
                    );
                  },
                },
              ]}
            />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </>
  );
}
