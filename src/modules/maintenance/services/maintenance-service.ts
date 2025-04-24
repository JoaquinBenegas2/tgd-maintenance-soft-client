import { GenericService } from "@/lib/react-query/services/generic-service";
import { MaintenanceRequestDto, MaintenanceResponseDto } from "../models/maintenance-model";

class MaintenanceService extends GenericService<MaintenanceRequestDto, MaintenanceResponseDto> {
  constructor() {
    super("/maintenances");
  }
}

export const maintenanceService = new MaintenanceService();
