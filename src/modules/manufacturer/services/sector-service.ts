import { GenericService } from "@/lib/react-query/services/generic-service";
import { ManufacturerRequestDto, ManufacturerResponseDto } from "../models/manufacturer-model";

class ManufacturerService extends GenericService<ManufacturerRequestDto, ManufacturerResponseDto> {
  constructor() {
    super("/manufacturers");
  }
}

export const manufacturerService = new ManufacturerService();
