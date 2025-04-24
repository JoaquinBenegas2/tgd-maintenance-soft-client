import { CustomFormConfig } from "@/components/custom/form/models/custom-form-models";
import React from "react";
import { MaintenanceResponseDto } from "../models/maintenance-model";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import CustomForm from "@/components/custom/form/app-custom-form";

interface MaintenanceDetailRequestFormProps {
  initialData?: MaintenanceResponseDto;
}
export default function MaintenanceDetailRequestForm({
  initialData,
}: MaintenanceDetailRequestFormProps) {
  const formConfig: CustomFormConfig = {
    fieldClassName: "transition-all disabled:cursor-default disabled:opacity-75",
    formColumns: 6,
    fields: [
      {
        name: "route",
        label: "Route Name",
        defaultValue: initialData?.route.name,
        disabled: true,
        loading: !initialData,
        fieldSpan: 2,
      },
      {
        name: "route_description",
        label: "Route Description",
        defaultValue: initialData?.route.description,
        disabled: true,
        loading: !initialData,
        fieldSpan: 2,
      },
      {
        name: "route_periodity",
        label: "Route Periodicity",
        defaultValue: initialData?.route.periodicity_in_days.toString(),
        disabled: true,
        loading: !initialData,
        fieldSpan: 2,
      },
      {
        name: "form",
        label: "Form",
        defaultValue: initialData?.form.name,
        disabled: true,
        loading: !initialData,
        fieldSpan: 2,
      },
      {
        name: "form_description",
        label: "Form Description",
        defaultValue: initialData?.form.description,
        disabled: true,
        loading: !initialData,
        fieldSpan: 4,
      },
      {
        name: "asset",
        label: "Asset",
        defaultValue: initialData?.element.component.asset.name,
        disabled: true,
        loading: !initialData,
        fieldSpan: 2,
      },
      {
        name: "component",
        label: "Component",
        defaultValue: initialData?.element.component.name,
        disabled: true,
        loading: !initialData,
        fieldSpan: 2,
      },
      {
        name: "element",
        label: "Element",
        defaultValue: initialData?.element.name,
        disabled: true,
        loading: !initialData,
        fieldSpan: 2,
      },
    ],
  };

  const form = useCustomForm(formConfig);

  return <CustomForm onSubmit={() => {}} showSubmitButton={false} {...form} />;
}
