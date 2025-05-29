import { GenericService } from "@/lib/react-query/services/generic-service";
import { ComponentRequestDto, ComponentResponseDto } from "../models/component-model";
import { axiosRequest } from "@/lib/axios/config/axios-config";

const BASE_URL = "components";

class ComponentService extends GenericService<ComponentRequestDto, ComponentResponseDto> {
  constructor() {
    super(`/${BASE_URL}`);
  }

  getAllComponentsByAssetId = async (assetId?: number): Promise<ComponentResponseDto[]> => {
    return await axiosRequest.get(`/assets/${assetId}/${BASE_URL}`);
  };

  getComponentByIdAndAssetId = async (
    assetId?: number,
    componentId?: number
  ): Promise<ComponentResponseDto> => {
    return await axiosRequest.get(`/assets/${assetId}/${BASE_URL}/${componentId}`);
  };

  createAssetComponent = async (assetId: number, component: ComponentRequestDto) => {
    return await axiosRequest.post(`/assets/${assetId}/${BASE_URL}`, component);
  };

  updateAssetComponent = async (
    assetId: number,
    componentId: number,
    component: ComponentRequestDto
  ) => {
    return await axiosRequest.put(`/assets/${assetId}/${BASE_URL}/${componentId}`, component);
  };

  updateStatus = async (
    id: number | string,
    status: "ACTIVE" | "INACTIVE"
  ): Promise<ComponentResponseDto> => {
    return await axiosRequest.put(`${this.baseUrl}/${id}/status`, null, {
      params: { status },
    });
  };
}

export const componentService = new ComponentService();
