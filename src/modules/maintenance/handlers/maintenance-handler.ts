import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { maintenanceService } from "../services/maintenance-service";

const QUERY_KEY = "maintenances";

export const {
  useGetAll: useGetAllMaintenances,
  useGetById: useGetMaintenanceById,
  useCreate: useCreateMaintenance,
  useUpdate: useUpdateMaintenance,
  useDelete: useDeleteMaintenance,
} = createReactQueryHandlers(maintenanceService, QUERY_KEY);
