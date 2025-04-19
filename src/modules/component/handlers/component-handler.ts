import { useCustomMutation, useCustomQuery } from "@/lib/react-query/custom/custom-query";
import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { queryClient } from "@/providers/providers";
import { ComponentRequestDto, ComponentResponseDto } from "../models/component-model";
import { componentService } from "../services/component-service";

const QUERY_KEY = "components";

export const {
  useGetAll: useGetAllComponents,
  useGetById: useGetComponentById,
  useCreate: useCreateComponent,
  useUpdate: useUpdateComponent,
  useDelete: useDeleteComponent,
} = createReactQueryHandlers(componentService, QUERY_KEY);

export const useGetAllComponentsByAssetId = (assetId?: number) => {
  return useCustomQuery<ComponentResponseDto[]>(
    [QUERY_KEY, assetId],
    () => componentService.getAllComponentsByAssetId(assetId),
    { enabled: !!assetId }
  );
};

export const useGetComponentByIdAndAssetId = (assetId?: number, componentId?: number) => {
  return useCustomQuery<ComponentResponseDto>(
    [QUERY_KEY, assetId, componentId],
    () => componentService.getComponentByIdAndAssetId(assetId, componentId),
    { enabled: !!assetId && !!componentId }
  );
};

export const useCreateAssetComponent = () => {
  return useCustomMutation<ComponentResponseDto, { assetId: number; data: ComponentRequestDto }>(
    [QUERY_KEY],
    ({ assetId, data }) => componentService.createAssetComponent(assetId, data),
    { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["assets"] }) }
  );
};

export const useUpdateAssetComponent = () => {
  return useCustomMutation<
    ComponentResponseDto,
    { assetId: number; componentId: number; data: ComponentRequestDto }
  >(
    [QUERY_KEY],
    ({ assetId, componentId, data }) =>
      componentService.updateAssetComponent(assetId, componentId, data),
    { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["assets"] }) }
  );
};
