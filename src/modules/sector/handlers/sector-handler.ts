import { useCustomMutation, useCustomQuery } from "@/lib/react-query/custom/custom-query";
import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { toast } from "sonner";
import { SectorResponseDto } from "../models/sector-model";
import { sectorService } from "../services/sector-service";

const QUERY_KEY = "sectors";

export const {
  useGetAll: useGetAllSectors,
  useGetById: useGetSectorById,
  useCreate: useCreateSector,
  useUpdate: useUpdateSector,
  useDelete: useDeleteSector,
} = createReactQueryHandlers(sectorService, QUERY_KEY);

export const useGetActiveSectors = () => {
  return useCustomQuery<SectorResponseDto[]>([QUERY_KEY, "active"], () =>
    sectorService.getAllActive()
  );
};

export const useUpdateActiveSector = () => {
  return useCustomMutation<SectorResponseDto, { sectorId: number; active: boolean }>(
    [QUERY_KEY],
    ({ sectorId, active }) => sectorService.updateActive(sectorId, { active }),
    {
      onSuccess: () => {
        toast.success("Updated successfully");
      },
    }
  );
};
