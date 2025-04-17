import { GenericService } from "@/lib/react-query/services/generic-service";
import { SectorRequestDto, SectorResponseDto } from "../models/sector-model";

class SectorService extends GenericService<SectorRequestDto, SectorResponseDto> {
  constructor() {
    super("/sectors");
  }
}

export const sectorService = new SectorService();
