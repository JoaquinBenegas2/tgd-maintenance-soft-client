import { AssetResponseDto } from "@/modules/asset/models/asset-model";
import { ManufacturerResponseDto } from "@/modules/manufacturer/models/manufacturer-model";

export enum ComponentStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ComponentRequestDto {
  name: string;
  description: string;
  asset_id: number;
  manufacturer_id: string;
  model: string;
  serial_number: string;
}

export interface ComponentResponseDto {
  id: number;
  name: string;
  description: string;
  asset: AssetResponseDto;
  manufacturer: ManufacturerResponseDto;
  model: string;
  serial_number: string;
  status: ComponentStatusEnum;
}
