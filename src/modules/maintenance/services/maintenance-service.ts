import { GenericService } from "@/lib/react-query/services/generic-service";
import {
  MaintenanceAnswerRequestDto,
  MaintenanceRequestDto,
  MaintenanceResponseDto,
} from "../models/maintenance-model";
import { axiosRequest } from "@/lib/axios/config/axios-config";

const BASE_URL = "/maintenances";

class MaintenanceService extends GenericService<MaintenanceRequestDto, MaintenanceResponseDto> {
  constructor() {
    super(BASE_URL);
  }

  updateMaintenanceAnswers = async (
    maintenanceId: number,
    data: { answers: MaintenanceAnswerRequestDto[] }
  ): Promise<MaintenanceResponseDto> => {
    return await axiosRequest.put(`${BASE_URL}/${maintenanceId}`, data);
  };

  getByElementAndDateRange = async (
    elementId: number,
    dateFrom: string,
    dateTo: string
  ): Promise<MaintenanceResponseDto[]> => {
    return axiosRequest.get(this.baseUrl, {
      params: { elementId, dateFrom, dateTo },
    });
  };

  getByComponentAndDateRange = async (
    componentId: number,
    dateFrom: string,
    dateTo: string
  ): Promise<MaintenanceResponseDto[]> => {
    return axiosRequest.get(this.baseUrl, {
      params: { componentId, dateFrom, dateTo },
    });
  };

  getByAssetAndDateRange = async (
    assetId: number,
    dateFrom: string,
    dateTo: string
  ): Promise<MaintenanceResponseDto[]> => {
    return axiosRequest.get(this.baseUrl, {
      params: { assetId, dateFrom, dateTo },
    });
  };
}

export const maintenanceService = new MaintenanceService();
