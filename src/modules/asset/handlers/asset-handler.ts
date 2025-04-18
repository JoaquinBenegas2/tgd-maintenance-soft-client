import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { assetService } from "../services/asset-service";

const QUERY_KEY = "assets";

export const {
  useGetAll: useGetAllAssets,
  useGetById: useGetAssetById,
  useCreate: useCreateAsset,
  useUpdate: useUpdateAsset,
  useDelete: useDeleteAsset,
} = createReactQueryHandlers(assetService, QUERY_KEY);
