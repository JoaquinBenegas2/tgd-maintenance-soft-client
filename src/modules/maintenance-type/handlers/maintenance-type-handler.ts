import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { maintenanceTypeService } from "../services/maintenance-type-service";

const QUERY_KEY = "maintenanceTypes";

export const {
  useGetAll: useGetAllMaintenanceTypes,
  useGetById: useGetMaintenanceTypeById,
  useCreate: useCreateMaintenanceType,
  useUpdate: useUpdateMaintenanceType,
  useDelete: useDeleteMaintenanceType,
} = createReactQueryHandlers(maintenanceTypeService, QUERY_KEY);
