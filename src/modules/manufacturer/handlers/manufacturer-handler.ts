import { useCustomMutation, useCustomQuery } from "@/lib/react-query/custom/custom-query";
import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { toast } from "sonner";
import { ManufacturerResponseDto } from "../models/manufacturer-model";
import { manufacturerService } from "../services/manufacturer-service";

const QUERY_KEY = "manufacturers";

export const {
  useGetAll: useGetAllManufacturers,
  useGetById: useGetManufacturerById,
  useCreate: useCreateManufacturer,
  useUpdate: useUpdateManufacturer,
  useDelete: useDeleteManufacturer,
} = createReactQueryHandlers(manufacturerService, QUERY_KEY);

export const useGetActiveManufacturers = () => {
  return useCustomQuery<ManufacturerResponseDto[]>([QUERY_KEY, "active"], () =>
    manufacturerService.getAllActive()
  );
};

export const useUpdateActiveManufacturer = () => {
  return useCustomMutation<
    ManufacturerResponseDto,
    { manufacturerId: number; active: boolean }
  >(
    [QUERY_KEY],
    ({ manufacturerId, active }) => manufacturerService.updateActive(manufacturerId, { active }),
    {
      onSuccess: () => {
        toast.success("Updated successfully");
      },
    }
  );
};
