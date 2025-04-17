import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { manufacturerService } from "../services/sector-service";

const QUERY_KEY = "manufacturers";

export const {
  useGetAll: useGetAllManufacturers,
  useGetById: useGetManufacturerById,
  useCreate: useCreateManufacturer,
  useUpdate: useUpdateManufacturer,
  useDelete: useDeleteManufacturer,
} = createReactQueryHandlers(manufacturerService, QUERY_KEY);
