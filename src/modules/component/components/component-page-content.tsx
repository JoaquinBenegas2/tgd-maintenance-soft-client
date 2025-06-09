import PageHeader from "@/components/custom/page/app-page-header";
import { Puzzle } from "lucide-react";
import AllComponentList from "./all-component-list";

export default function ComponentPageContent() {
  return (
    <>
      <PageHeader icon={<Puzzle className="w-8 h-8" />} title="Components" description="In this page you can see your components"  />
      <AllComponentList />
    </>
  );
}
