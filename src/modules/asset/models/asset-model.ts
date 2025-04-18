import { ManufacturerResponseDto } from "@/modules/manufacturer/models/manufacturer-model";
import { SectorResponseDto } from "@/modules/sector/models/sector-model";

export enum AssetStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface AssetRequestDto {
  name: string;
  description: string;
  sector_id: number;
  manufacturer_id: number;
  model: string;
  serial_number: string;
  installation_date: string;
}

export interface AssetResponseDto {
  id: number;
  name: string;
  description: string;
  sector: SectorResponseDto;
  manufacturer: ManufacturerResponseDto;
  model: string;
  serial_number: string;
  status: AssetStatusEnum;
  installation_date: string;
}
