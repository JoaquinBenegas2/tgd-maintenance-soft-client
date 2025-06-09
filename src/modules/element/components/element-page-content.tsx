import PageHeader from "@/components/custom/page/app-page-header";
import { Grip } from "lucide-react";
import AllElementList from "./all-element-list";

export default function ElementPageContent() {
  return (
    <>
      <PageHeader icon={<Grip className="w-8 h-8" />} title="Elements" description="In this page you can see your elements" />
      <AllElementList />
    </>
  );
}
