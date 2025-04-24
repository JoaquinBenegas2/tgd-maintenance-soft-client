import { useCustomQuery } from "@/lib/react-query/custom/custom-query";
import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { MaintenanceTypeWithFormsResponseDto } from "../models/maintenance-type-model";
import { maintenanceTypeService } from "../services/maintenance-type-service";

const QUERY_KEY = "maintenanceTypes";

export const {
  useGetAll: useGetAllMaintenanceTypes,
  useGetById: useGetMaintenanceTypeById,
  useCreate: useCreateMaintenanceType,
  useUpdate: useUpdateMaintenanceType,
  useDelete: useDeleteMaintenanceType,
} = createReactQueryHandlers(maintenanceTypeService, QUERY_KEY);

export const useGetMaintenanceTypesWithForms = () => {
  return useCustomQuery<MaintenanceTypeWithFormsResponseDto[]>([QUERY_KEY, "with-forms"], () =>
    maintenanceTypeService.getMaintenanceTypesWithForms()
  );
};
