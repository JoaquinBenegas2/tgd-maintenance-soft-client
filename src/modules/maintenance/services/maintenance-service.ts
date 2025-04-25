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
}

export const maintenanceService = new MaintenanceService();
