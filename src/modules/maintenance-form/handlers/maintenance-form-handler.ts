import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { maintenanceFormService } from "../services/maintenance-form-service";

const QUERY_KEY = "forms";

export const {
  useGetAll: useGetAllForms,
  useGetById: useGetFormById,
  useCreate: useCreateForm,
  useUpdate: useUpdateForm,
  useDelete: useDeleteForm,
} = createReactQueryHandlers(maintenanceFormService, QUERY_KEY);
