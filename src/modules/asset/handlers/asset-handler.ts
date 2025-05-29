import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { assetService } from "../services/asset-service";
import { useCustomMutation } from "@/lib/react-query/custom/custom-query";
import { AssetResponseDto } from "../models/asset-model";
import { toast } from "sonner";

const QUERY_KEY = "assets";

export const {
  useGetAll: useGetAllAssets,
  useGetById: useGetAssetById,
  useCreate: useCreateAsset,
  useUpdate: useUpdateAsset,
  useDelete: useDeleteAsset,
} = createReactQueryHandlers(assetService, QUERY_KEY);

export const useUpdateAssetStatus = () => {
  return useCustomMutation<AssetResponseDto, { id: number; status: "ACTIVE" | "INACTIVE" }>(
    [QUERY_KEY],
    ({ id, status }) => assetService.updateStatus(id, status),
    {
      onSuccess: () => {
        toast.success("Estado del activo actualizado");
      },
    }
  );
};