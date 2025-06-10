import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { assetService } from "../services/asset-service";
import { useCustomMutation } from "@/lib/react-query/custom/custom-query";
import { AssetResponseDto } from "../models/asset-model";
import { toast } from "sonner";
import { queryClient } from "@/providers/providers";

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
        queryClient.invalidateQueries({queryKey: ["components"]});
        queryClient.invalidateQueries({queryKey: ["elements"]});
        toast.success("Updated asset status");
      },
    }
  );
};