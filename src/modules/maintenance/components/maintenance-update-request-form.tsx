import CustomForm from "@/components/custom/form/app-custom-form";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateAnswersPayload } from "@/modules/maintenance-form/utils/generate-answers-payload";
import { generateDefaultValues } from "@/modules/maintenance-form/utils/generate-default-values";
import { generateFormConfig } from "@/modules/maintenance-form/utils/generate-form-config";
import React, { useEffect, useMemo } from "react";
import { useUpdateMaintenanceAnswers } from "../handlers/maintenance-handler";
import { MaintenanceResponseDto } from "../models/maintenance-model";

interface MaintenanceUpdateRequestFormProps {
  maintenance?: MaintenanceResponseDto;
  children?: React.ReactNode;
}

export default function MaintenanceUpdateRequestForm({
  maintenance,
  children,
}: MaintenanceUpdateRequestFormProps) {
  console.log({ maintenance });

  const customFormConfig = useMemo(
    () => generateFormConfig(maintenance?.form, maintenance?.answers),
    [maintenance?.form, maintenance?.answers]
  );

  const defaultValues = useMemo(
    () => generateDefaultValues(maintenance?.form, maintenance?.answers),
    [maintenance?.form, maintenance?.answers]
  );

  const { resetForm, ...restForm } = useCustomForm(customFormConfig);

  const { mutate: updateMaintenanceAnswers, isPending: isUpdating } = useUpdateMaintenanceAnswers();

  const onSubmit = (values: any) => {
    if (!maintenance?.form) return;

    const data = generateAnswersPayload(values, maintenance.form);

    if (maintenance?.form?.id) {
      updateMaintenanceAnswers(
        { id: maintenance?.id, data },
        {
          onError: (error) => {
            console.error("Error updating sector:", error);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (maintenance?.id) {
      resetForm(defaultValues);
    }
  }, [maintenance?.id, resetForm, defaultValues]);

  return (
    <Dialog>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader className="gap-1">
          <DialogTitle>{maintenance?.form?.name}</DialogTitle>
          <DialogDescription className="mt-1">
            <span className="font-bold">Maintenance Type: </span>
            {maintenance?.form?.maintenance_type?.name}
          </DialogDescription>
          <DialogDescription>{maintenance?.form?.description}</DialogDescription>
        </DialogHeader>
        <CustomForm
          onSubmit={onSubmit}
          submitButton={
            <Button className="mt-2" disabled={isUpdating}>
              Save
            </Button>
          }
          {...restForm}
        />
      </DialogContent>
    </Dialog>
  );
}
