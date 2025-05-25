import { GenericService } from "@/lib/react-query/services/generic-service";
import { ManufacturerRequestDto, ManufacturerResponseDto } from "../models/manufacturer-model";
import { AxiosRequestConfig } from "axios";
import { axiosRequest } from "@/lib/axios/config/axios-config";

class ManufacturerService extends GenericService<ManufacturerRequestDto, ManufacturerResponseDto> {
  constructor() {
    super("/manufacturers");
  }

  updateActive = async (
    id: string | number,
    data: { active: boolean }
  ): Promise<ManufacturerResponseDto> => {
    return await axiosRequest.patch(`${this.baseUrl}/${id}/status`, data);
  };

  getAllActive = async (config?: AxiosRequestConfig): Promise<ManufacturerResponseDto[]> => {
    return await axiosRequest.get(this.baseUrl, { params: { active: true }, ...config });
  };
}

export const manufacturerService = new ManufacturerService();
