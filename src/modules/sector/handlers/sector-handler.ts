import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { sectorService } from "../services/sector-service";

const QUERY_KEY = "sectors";

export const {
  useGetAll: useGetAllSectors,
  useGetById: useGetSectorById,
  useCreate: useCreateSector,
  useUpdate: useUpdateSector,
  useDelete: useDeleteSector,
} = createReactQueryHandlers(sectorService, QUERY_KEY);
