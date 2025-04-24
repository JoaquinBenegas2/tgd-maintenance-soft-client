import { axiosRequest } from "@/lib/axios/config/axios-config";
import { GenericService } from "@/lib/react-query/services/generic-service";
import {
  MaintenanceTypeRequestDto,
  MaintenanceTypeResponseDto,
  MaintenanceTypeWithFormsResponseDto,
} from "../models/maintenance-type-model";

class MaintenanceTypeService extends GenericService<
  MaintenanceTypeRequestDto,
  MaintenanceTypeResponseDto
> {
  constructor() {
    super("/maintenance-types");
  }

  getMaintenanceTypesWithForms = async (): Promise<MaintenanceTypeWithFormsResponseDto[]> => {
    return await axiosRequest.get(`${this.baseUrl}/with-forms`);
  };
}

export const maintenanceTypeService = new MaintenanceTypeService();
