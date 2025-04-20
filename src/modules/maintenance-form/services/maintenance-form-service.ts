import { GenericService } from "@/lib/react-query/services/generic-service";
import { FormRequestDto, FormResponseDto } from "../models/maintenance-form-model";

class MaintenanceFormService extends GenericService<FormRequestDto, FormResponseDto> {
  constructor() {
    super("/forms");
  }
}

export const maintenanceFormService = new MaintenanceFormService();
