import { GenericService } from "@/lib/react-query/services/generic-service";
import { ElementRequestDto, ElementResponseDto } from "../models/element-model";
import { axiosRequest } from "@/lib/axios/config/axios-config";

const BASE_URL = "elements";

class ElementService extends GenericService<ElementRequestDto, ElementResponseDto> {
  constructor() {
    super(`/${BASE_URL}`);
  }

  getAllElementsByComponentIdAndAssetId = async (
    assetId?: number,
    componentId?: number
  ): Promise<ElementResponseDto[]> => {
    return await axiosRequest.get(`/assets/${assetId}/components/${componentId}/${BASE_URL}`);
  };

  getElementByIdComponentIdAndAssetId = async (
    assetId?: number,
    componentId?: number,
    elementId?: number
  ): Promise<ElementResponseDto> => {
    return await axiosRequest.get(
      `/assets/${assetId}/components/${componentId}/${BASE_URL}/${elementId}`
    );
  };

  createAssetComponentElement = async (
    assetId: number,
    componentId: number,
    element: ElementRequestDto
  ) => {
    return await axiosRequest.post(
      `/assets/${assetId}/components/${componentId}/${BASE_URL}`,
      element
    );
  };

  updateAssetComponentElement = async (
    assetId: number,
    componentId: number,
    elementId: number,
    element: ElementRequestDto
  ) => {
    return await axiosRequest.put(
      `/assets/${assetId}/components/${componentId}/${BASE_URL}/${elementId}`,
      element
    );
  };
}

export const elementService = new ElementService();
