import { GenericService } from "@/lib/react-query/services/generic-service";
import { SectorRequestDto, SectorResponseDto } from "../models/sector-model";
import { AxiosRequestConfig } from "axios";
import { axiosRequest } from "@/lib/axios/config/axios-config";

class SectorService extends GenericService<SectorRequestDto, SectorResponseDto> {
  constructor() {
    super("/sectors");
  }

  updateActive = async (
    id: string | number,
    data: { active: boolean }
  ): Promise<SectorResponseDto> => {
    return await axiosRequest.patch(`${this.baseUrl}/${id}/status`, data);
  };

  getAllActive = async (config?: AxiosRequestConfig): Promise<SectorResponseDto[]> => {
    return await axiosRequest.get(this.baseUrl, { params: { active: true }, ...config });
  };
}

export const sectorService = new SectorService();
