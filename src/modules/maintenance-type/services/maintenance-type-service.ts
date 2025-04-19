import { GenericService } from "@/lib/react-query/services/generic-service";
import { MaintenanceTypeRequestDto, MaintenanceTypeResponseDto } from "../models/maintenance-type-model";

class MaintenanceTypeService extends GenericService<MaintenanceTypeRequestDto, MaintenanceTypeResponseDto> {
  constructor() {
    super("/maintenance-types");
  }
}

export const maintenanceTypeService = new MaintenanceTypeService();
