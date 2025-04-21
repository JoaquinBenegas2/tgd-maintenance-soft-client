import PageHeader from "@/components/custom/page/app-page-header";
import { TbRoute2 } from "react-icons/tb";
import RouteList from "./route-list";

export default function RoutePageContent() {
  return (
    <>
      <PageHeader
        icon={<TbRoute2 className="w-8 h-8" />}
        title="Routes"
        description="Here you can manage your maintenance routes. You can add, edit, and delete routes."
      />
      <RouteList />
    </>
  );
}
