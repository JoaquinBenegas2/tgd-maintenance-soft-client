import { useCustomMutation, useCustomQuery } from "@/lib/react-query/custom/custom-query";
import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { queryClient } from "@/providers/providers";
import { ElementRequestDto, ElementResponseDto } from "../models/element-model";
import { elementService } from "../services/element-service";
import { toast } from "sonner";

const QUERY_KEY = "elements";

export const {
  useGetAll: useGetAllElements,
  useGetById: useGetElementById,
  useCreate: useCreateElement,
  useUpdate: useUpdateElement,
  useDelete: useDeleteElement,
} = createReactQueryHandlers(elementService, QUERY_KEY);

export const useGetAllElementsByComponentIdAndAssetId = (
  assetId?: number,
  componentId?: number
) => {
  return useCustomQuery<ElementResponseDto[]>(
    [QUERY_KEY, assetId, componentId],
    () => elementService.getAllElementsByComponentIdAndAssetId(assetId, componentId),
    { enabled: !!assetId && !!componentId }
  );
};

export const useGetElementByIdComponentIdAndAssetId = (
  assetId?: number,
  componentId?: number,
  elementId?: number
) => {
  return useCustomQuery<ElementResponseDto>(
    [QUERY_KEY, assetId, componentId, elementId],
    () => elementService.getElementByIdComponentIdAndAssetId(assetId, componentId, elementId),
    { enabled: !!assetId && !!componentId && !!elementId }
  );
};

export const useCreateAssetComponentElement = () => {
  return useCustomMutation<
    ElementResponseDto,
    { assetId: number; componentId: number; data: ElementRequestDto }
  >(
    [QUERY_KEY],
    ({ assetId, componentId, data }) =>
      elementService.createAssetComponentElement(assetId, componentId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["components"] });
        toast.success("Created successfully");
      },
    }
  );
};

export const useUpdateAssetComponentElement = () => {
  return useCustomMutation<
    ElementResponseDto,
    { assetId: number; componentId: number; elementId: number; data: ElementRequestDto }
  >(
    [QUERY_KEY],
    ({ assetId, componentId, elementId, data }) =>
      elementService.updateAssetComponentElement(assetId, componentId, elementId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["components"] });
        toast.success("Updated successfully");
      },
    }
  );
};
